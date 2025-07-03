import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { blogService } from "@/services/api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

// export const revalidate = 86400;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string; blogId: string }>;
}) {
  const { locale, blogId } = await params;
  const t = await getTranslations("blog");

  const blog = await blogService.getBlogById(blogId, locale);

  return (
    <div className="mb-9">
      <div className="relative w-full aspect-[1440/610]">
        <Image
          className="object-cover object-center"
          src={blog.file}
          alt={blog.title?.[locale] || "Blog Image"}
          fill
          priority
        />
      </div>

      <div className="mt-9 container px-4 mx-auto flex flex-col gap-6 lg:flex-row xl:gap-12 2xl:gap-14.5">
        <div className="flex-[3]" dir="rtl">
          <div className="prose prose-lg mx-auto">
            <h1 className="text-2xl prose prose-lg">
              {typeof blog.title === "string"
                ? blog.title
                : blog.title?.[locale]}
            </h1>
            <div
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: blog.content?.[locale] }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-primary">{t("relatedBlogs")}</h4>
          <RelatedBlogs locale={locale} currentBlogId={blogId} />
        </div>
      </div>
    </div>
  );
}
