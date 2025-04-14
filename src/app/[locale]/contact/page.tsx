import Blogs from "@/components/general/blog/Blogs";
import Contact from "@/components/general/contact/Contact";
import SocialQR from "@/components/general/SocialQR";
import { blogService } from "@/services/api";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  const blogs = await blogService.getBlogs(locale);
  const latestBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 4);

  return (
    <div>
      <Contact />
      <SocialQR />
      <Blogs blogs={latestBlogs} />
    </div>
  );
}
