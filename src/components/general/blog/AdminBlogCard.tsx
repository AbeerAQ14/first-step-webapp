import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { Blog } from "@/types";
import { useTranslations } from "next-intl";

interface AdminBlogCardProps {
  blog: Blog & { status: string };
  onAccept?: () => void;
  onReject?: () => void;
  loading?: boolean;
}

const AdminBlogCard = ({
  blog,
  onAccept,
  onReject,
  loading,
}: AdminBlogCardProps) => {
  const t = useTranslations("dashboard.admin.blog.center");

  return (
    <div className="bg-white shadow-card min-w-60 p-2 pb-4 flex flex-col items-start gap-y-2 rounded-2xl text-left rtl:text-right relative">
      <div className="w-full h-40 rounded-xl overflow-hidden relative">
        <Image
          className="object-cover object-center"
          src={blog.image}
          alt={t("imageAlt")}
          fill
        />
      </div>

      <span className="text-primary font-bold">{blog.title}</span>
      <p className="text-gray text-sm line-clamp-3">{blog.description}</p>

      <div className="w-full flex items-end justify-between text-sm">
        <div className="flex flex-col gap-y-2">
          <span className="text-secondary-orange font-medium text-sm">
            {t("readTime")}
          </span>
        </div>
        <div className="flex items-center gap-x-0.5">
          <Icons.calendar className="fill-gray" width={12} height={12} />
          <span className="font-medium">{blog.published_at}</span>
        </div>
      </div>

      {/* Action buttons for pending blogs */}
      {blog.status === "pending" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 rounded-2xl gap-y-2">
          <Button
            variant="secondary"
            className="w-40"
            onClick={onAccept}
            disabled={loading}
          >
            {t("acceptBlog")}
          </Button>
          <Button
            variant="destructive"
            className="w-40"
            onClick={onReject}
            disabled={loading}
          >
            {t("rejectBlog")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogCard;
