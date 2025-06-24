"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";
import BranchAdminForm from "@/components/forms/dashboard/branches/BranchAdminForm";
import { centerService } from "@/services/dashboardApi";
import { BranchAdminFormData } from "@/lib/schemas";

interface BranchData {
  id: string;
  name: string;
  user_id?: string;
}

export default function DashboardEditBranch({
  params,
}: {
  params: Promise<{ branchId: string; locale: "ar" | "en" }>;
}) {
  const router = useRouter();
  const { branchId, locale } = use(params);
  const t = useTranslations("dashboard.center.branches");
  
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const [branchData, setBranchData] = useState<BranchData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBranchData = (data: any) => {
    console.log('Branch data received:', data);
    // Only update if data has actually changed to prevent unnecessary re-renders
    setBranchData(prev => {
      if (prev?.id === data.id && prev?.name === data.name && prev?.user_id === data.user_id) {
        return prev; // Return previous state if nothing changed
      }
      return {
        id: data.id,
        name: data.name,
        user_id: data.user_id
      };
    });
  };

  const handleAdminSubmit = async (data: BranchAdminFormData) => {
    if (!branchId) return;
    console.log('Submitting admin data:', data);
    
    try {
      setIsSubmitting(true);
      
      if (branchData?.user_id) {
        // Update existing admin
        await centerService.updateBranchAdmin(branchData.user_id, data);
        toast.success(t("admin.success"));
      } else {
        // Assign new admin
        await centerService.assignBranch(branchId, data);
        toast.success(t("admin.success"));
      }
      
      // Close the form and refresh the page to show updated data
      setIsAdminFormOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error(t("error.title"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when dialog is closed
  useEffect(() => {
    if (!isAdminFormOpen) {
      setIsSubmitting(false);
    }
  }, [isAdminFormOpen]);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="heading-4 font-bold text-primary">
          {locale === "ar" ? "تعديل فرع" : "Edit Branch"}
        </h1>
        
        <Button 
          onClick={() => setIsAdminFormOpen(true)}
          variant="outline"
          className="whitespace-nowrap"
          disabled={isSubmitting}
        >
          {branchData?.user_id ? t("update_admin") : t("assign_admin")}
        </Button>
      </div>

      <BranchWrapper 
        mode="edit" 
        editBranchId={branchId}
        onBranchData={handleBranchData}
      />

      <BranchAdminForm
        open={isAdminFormOpen}
        setOpen={setIsAdminFormOpen}
        onSubmit={handleAdminSubmit}
        branchName={branchData?.name || ""}
        disabled={isSubmitting}
      />
    </div>
  );
}
