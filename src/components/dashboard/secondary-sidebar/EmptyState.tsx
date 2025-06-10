import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type EmptyStateProps = {
  onAdd?: () => void;
};

const EmptyState = ({ onAdd }: EmptyStateProps) => {
  const t = useTranslations("dashboard.secondary-sidebar");

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <Image
        src="/assets/illustrations/empty.png"
        width={60}
        height={60}
        alt="empty"
      />
      {onAdd ? (
        <Button
          onClick={onAdd}
          className="h-7 px-4 font-bold text-[.75rem]"
          size="sm"
          variant="outline"
        >
          {t("empty.add-now")}
          <Plus className="size-4 ml-1" />
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
