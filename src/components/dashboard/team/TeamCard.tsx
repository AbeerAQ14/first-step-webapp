import { TeamMember } from "@/app/[locale]/dashboard/center/team/page";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface TeamCardProps extends TeamMember {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TeamCard = ({
  imageUrl,
  role,
  name,
  onEdit,
  onDelete,
}: TeamCardProps) => {
  return (
    <div className="p-2 rounded-3xl border border-light-gray flex flex-col items-center gap-y-2">
      <div
        className="w-full min-w-[11.25rem] h-[12.5rem] rounded-2xl bg-cover bg-left-top"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <p className="font-bold text-primary">{role}</p>
      <p className="text-sm text-mid-gray">{name}</p>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit className="size-4 text-mid-gray" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="size-4 text-mid-gray" />
        </Button>
      </div>
    </div>
  );
};
