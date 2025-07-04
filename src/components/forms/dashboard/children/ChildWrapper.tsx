"use client";

import React from "react";
import Child from "./Child";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const ChildWrapper = ({
  initialValues,
  mode,
  childId,
}: {
  initialValues: any;
  mode: "add" | "edit" | "show";
  childId?: string;
}) => {
  const router = useRouter();

  // Fetch child data if in show/edit mode and childId is provided
  const { data: fetchedChild, isLoading } = useQuery({
    queryKey: ["child", childId],
    queryFn: async () => {
      if (!childId) return null;
      const { parentService } = await import("@/services/dashboardApi");
      return parentService.getChild(childId);
    },
    enabled: !!childId && mode !== "add",
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const { parentService } = await import("@/services/dashboardApi");
      if (mode === "edit" && childId) {
        return parentService.updateChild(childId, data);
      } else {
        return parentService.addChild(data);
      }
    },
    onSuccess: (response) => {
      toast(
        mode === "edit"
          ? "تم تحديث بيانات الطفل بنجاح!"
          : "تم إضافة الطفل بنجاح!",
        {
          description:
            mode === "edit"
              ? "تم تحديث بيانات الطفل بنجاح!"
              : "تمت إضافة الطفل بنجاح!",
          icon: <CheckCircle2 className="text-green-500 w-6 h-6" />,
          className:
            "bg-green-50 border-green-400 text-green-900 font-bold text-lg",
          duration: 1800,
        }
      );
      setTimeout(() => {
        router.replace("/dashboard/parent/children");
      }, 1500);
    },
    onError: (error: any) => {
      console.error(
        mode === "edit"
          ? "Failed to update child (mutation):"
          : "Failed to add child (mutation):",
        error
      );
      if (error?.response?.data) {
        console.error("API error details:", error.response.data);
      }
      if (error?.response?.data?.errors) {
        console.error("API validation errors:", error.response.data.errors);
      }
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitting form data:", data); 
    mutation.mutate(data);
  };

  function mapFetchedChildToInitialValues(childData: any) {
    if (!childData) return initialValues;
    return {
      // Parent data
      name: childData?.user?.name || "",
      phone: childData?.user?.phone || "",
      email: childData?.user?.email || "",
      address: childData?.user?.address || "",
      // Child data
      childName: childData?.child_name || "",
      birthDate: childData?.birthday_date
        ? new Date(childData.birthday_date)
        : new Date(),
      fatherName: childData?.parent_name || "",
      motherName: childData?.mother_name || "",
      gender: childData?.gender === "boy" ? "male" : "female",
      kinship: childData?.Kinship || "",
      // Chronic diseases
      chronicDiseases: {
        hasDiseases: childData?.disease ? "yes" : "no",
        diseases: childData?.disease_details
          ? (typeof childData.disease_details === "string"
              ? JSON.parse(childData.disease_details)
              : childData.disease_details
            ).map((disease: any) => ({
              id: disease.id,
              name: disease.disease_name,
              medication: disease.medicament,
              procedures: disease.emergency,
            }))
          : [],
      },
      // Allergies
      allergies: {
        hasAllergies: childData?.allergy ? "yes" : "no",
        allergies:
          childData?.allergies?.map((allergy: any) => ({
            id: allergy.id,
            allergyTypes: allergy.name || "",
            allergyFoods: Array.isArray(allergy.allergy_causes)
              ? allergy.allergy_causes.join(", ")
              : allergy.allergy_causes || "",
            allergyProcedures: allergy.allergy_emergency || "",
          })) || [],
      },
      // Recommendations
      childDescription: childData?.description_3_words || "",
      favoriteThings: childData?.things_child_likes || "",
      recommendations: childData?.recommendations || "",
      // Authorized persons
      authorizedPersons:
        childData?.authorized_people?.map((person: any) => ({
          id: person.id,
          name: person.name || "",
          idNumber: person.cin || "",
        })) || [],
      // Comments
      comments: childData?.notes || "",
    };
  }

  // Use mapped fetched child data as initialValues if available
  const effectiveInitialValues =
    mode !== "add" && fetchedChild
      ? mapFetchedChildToInitialValues(fetchedChild)
      : initialValues;

  if (isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Child
        initialValues={effectiveInitialValues}
        mode={mode}
        onSubmit={onSubmit}
        childId={childId}
      />
    </React.Fragment>
  );
};

export default ChildWrapper;
