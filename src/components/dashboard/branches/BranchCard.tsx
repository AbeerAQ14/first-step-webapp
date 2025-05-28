import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BranchCardType } from "@/hooks/useBranches";
import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { centerService } from "@/services/dashboardApi";

const BranchCard = ({
  branch,
  noEdit,
  baseUrl,
}: {
  branch: BranchCardType;
  noEdit?: boolean;
  baseUrl?: string;
}) => {
  const t = useTranslations("dashboard.center.branches");
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await centerService.deleteBranch(branch.id);
      toast.success(t("delete_dialog.success"));
      router.refresh();
    } catch (error) {
      toast.error(t("delete_dialog.error"));
    }
  };

  return (
    <div className="relative bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-4">
          <Image
            src={branch.imageUrl || "/assets/logos/instagram-logo.png"}
            width={81.66}
            height={80}
            alt="Branch Logo"
          />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="font-bold text-primary text-xl">{branch.name}</p>

            <span className="font-medium text-mid-gray">
              <span>{t("card.address")}: </span>
              <span>{branch.address}</span>
            </span>

            <span className="font-medium text-mid-gray">
              <span>{t("card.children")}: </span>
              <span>
                {t("card.child_count", { count: branch.childrenCount })}
              </span>
            </span>

            <span className="font-medium text-mid-gray">
              <span>{t("card.bookings")}: </span>
              <span>
                {t("card.booking_count", { count: branch.bookingsCount })}
              </span>
            </span>
          </div>
        </div>

        <div className="flex gap-5 lg:gap-x-10">
          <Button asChild size={"sm"}>
            <Link href={`${baseUrl || "branches"}/${branch.id}`}>
              {t("view")}
            </Link>
          </Button>
          {!noEdit && (
            <Button asChild size={"sm"} variant={"outline"}>
              <Link href={`${baseUrl || "branches"}/${branch.id}/edit`}>
                {t("edit")}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            {t("card.accepted_ages")}
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {branch.acceptedAges.map((age) => (
              <span key={age}>{age}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium text-primary text-xl">
            {t("card.available_services")}
          </p>

          <div className="flex flex-col gap-y-1 font-medium text-mid-gray">
            {branch.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute p-5 top-4 right-4 rtl:right-auto rtl:left-4"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash2 className="size-5 text-destructive" />
      </Button>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("delete_dialog.title")}
        description={t("delete_dialog.description", { name: branch.name })}
        confirmText={t("delete_dialog.confirm")}
      />
    </div>
  );
};

export default BranchCard;
