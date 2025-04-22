import Header from "@/components/general/blog/Header";
import AllBlogs from "@/components/general/blog/AllBlogs";
import Contact from "@/components/general/contact/Contact";
import { blogService } from "@/services/api";

export const revalidate = 86400;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const blogs = await blogService.getBlogs(locale);

  return (
    <div>
      <Header />
      <AllBlogs blogs={blogs} />
      <Contact />
    </div>
  );
}
