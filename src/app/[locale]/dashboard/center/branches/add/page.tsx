"use client";

import { use, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { centerService } from "@/services/dashboardApi";
import BranchWrapper from "@/components/forms/dashboard/branches/BranchWrapper";
import BranchAdminForm from "@/components/forms/dashboard/branches/BranchAdminForm";
import { BranchAdminFormData } from "@/lib/schemas";

export default function DashboardAddBranch({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("dashboard.center.branches");
  const router = useRouter();
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [branchName, setBranchName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBranchCreated = (data: { id: string; name: string }) => {
    setBranchId(data.id);
    setBranchName(data.name);
    setIsAdminFormOpen(true);
  };

  const handleAdminSubmit = async (data: BranchAdminFormData) => {
    if (!branchId) return;
    
    try {
      setIsSubmitting(true);
      
      // Assign admin to the new branch
      await centerService.assignBranch(branchId, data);
      toast.success(t("admin.assigned"));
      
      // Redirect to branches list after successful assignment
      router.push(`/${locale}/dashboard/center/branches`);
    } catch (error) {
      console.error("Error assigning admin:", error);
      toast.error(t("errors.something_went_wrong"));
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
          {locale === "ar" ? "إضافة فرع" : "Add Branch"}
        </h1>
      </div>
      
      <BranchWrapper 
        mode="add" 
        onBranchCreated={handleBranchCreated} 
      />

      <BranchAdminForm
        open={isAdminFormOpen}
        setOpen={setIsAdminFormOpen}
        onSubmit={handleAdminSubmit}
        branchName={branchName}
        disabled={!branchId || isSubmitting}
      />
    </div>
  );
}
