"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminBlogRequestFormData } from "@/lib/schemas";
import { adminService } from "@/services/dashboardApi";
import { toast } from "sonner";
import AdminBlogRequestForm from "@/components/forms/dashboard/adblog-request/AdminBlogRequest";

type BlogType = "accepted" | "pending" | "rejected";

// just show and edit
const BlogDetailsWrapper = ({
  blogId,
  initialValues,
  mode,
  blogType,
}: {
  blogId: string;
  initialValues: AdminBlogRequestFormData;
  mode: "add" | "show";
  blogType?: BlogType;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (data: Partial<AdminBlogRequestFormData>) => {
      // Transform the data structure to match the API's expected format
      const transformedData = {
        titleAr: data.title?.ar,
        titleEn: data.title?.en,
        descriptionAr: data.description?.ar,
        descriptionEn: data.description?.en,
        contentAr: data.content?.ar,
        contentEn: data.content?.en,
        mainImage: data.mainImage?.[0],
        cardImage: data.cardImage?.[0],
      };
      return adminService.updateAdvertisement(blogId, transformedData as any);
    },
    onSuccess: () => {
      toast.success("تم تحديث المدونة بنجاح");
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء تحديث المدونة");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminService.deleteAdvertisement(blogId),
    onSuccess: () => {
      toast.success("تم حذف المدونة بنجاح");
      router.push(`blog`);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف المدونة");
    },
  });

  const acceptMutation = useMutation({
    mutationFn: () => adminService.approveCenterAd(blogId),
    onSuccess: () => {
      toast.success("تم قبول المدونة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["centerBlogs"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء قبول المدونة");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => adminService.rejectCenterAd(blogId),
    onSuccess: () => {
      toast.success("تم رفض المدونة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["centerBlogs"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء رفض المدونة");
    },
  });

  const editHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: AdminBlogRequestFormData,
    dirtyFields: string[]
  ) => {
    e.preventDefault();
    const payload: Partial<AdminBlogRequestFormData> = {};
    dirtyFields.forEach((field) => {
      // @ts-ignore
      payload[field] = data[field];
    });
    // editMutation.mutate(payload);
    console.log("edited");
  };

  const rejectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // rejectMutation.mutate();
    console.log("rejected");
  };

  const acceptHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // acceptMutation.mutate();
    console.log("accepted");
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // deleteMutation.mutate();
    console.log("deleted");
  };

  const blogTypeButtons = (
    blogType: BlogType,
    data: AdminBlogRequestFormData,
    isValid: boolean
  ) => {
    switch (blogType) {
      case "accepted":
        return (
          <>
            <Button asChild size={"sm"}>
              <Link href={`${blogId}/edit`}>تعديل المدونة</Link>
            </Button>
            <Button
              onClick={deleteHandler}
              size={"sm"}
              variant={"outline"}
              className="!border-destructive text-destructive"
              disabled={deleteMutation.status === "pending"}
            >
              {deleteMutation.status === "pending"
                ? "جاري الحذف..."
                : "حذف المدونة"}
            </Button>
          </>
        );
      case "pending":
        return (
          <>
            <Button
              onClick={acceptHandler}
              size={"sm"}
              disabled={acceptMutation.isPending}
            >
              {acceptMutation.isPending ? "جاري القبول..." : "قبول المدونة"}
            </Button>
            <Button
              onClick={rejectHandler}
              size={"sm"}
              variant={"outline"}
              className="!border-destructive text-destructive"
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? "جاري الرفض..." : "رفض المدونة"}
            </Button>
          </>
        );
      case "rejected":
        return (
          <>
            <Button onClick={acceptHandler} size={"sm"}>
              قبول المدونة
            </Button>
            <Button
              asChild
              size={"sm"}
              variant={"outline"}
              className="!border-light-gray text-mid-gray"
            >
              <Link href={`${blogId}/edit`}>تعديل المدونة</Link>
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const buttons = (
    data: AdminBlogRequestFormData,
    isValid: boolean,
    dirtyFields: string[]
  ) => {
    if (mode === "add") {
      return (
        <>
          <Button
            onClick={(e) => editHandler(e, data, dirtyFields)}
            size={"sm"}
            disabled={
              dirtyFields.length === 0 || editMutation.status === "pending"
            }
          >
            {editMutation.status === "pending"
              ? "جاري التحديث..."
              : "تعديل المدونة"}
          </Button>
          <Button
            onClick={deleteHandler}
            size={"sm"}
            variant={"outline"}
            className="!border-destructive text-destructive"
            disabled={deleteMutation.status === "pending"}
          >
            {deleteMutation.status === "pending"
              ? "جاري الحذف..."
              : "حذف المدونة"}
          </Button>
        </>
      );
    } else if (mode === "show") {
      return blogTypeButtons(blogType || "accepted", data, isValid);
    }
  };

  return (
    <div>
      <AdminBlogRequestForm initialData={initialValues} mode={mode}>
        {(data, isValid, isSubmitting, dirtyFields) =>
          buttons(data, isValid, dirtyFields)
        }
      </AdminBlogRequestForm>
    </div>
  );
};

export default BlogDetailsWrapper;
