import { Metadata } from "next";
import Header from "@/components/general/blog/Header";
import AllBlogs from "@/components/general/blog/AllBlogs";
import Contact from "@/components/general/contact/Contact";
import { blogService } from "@/services/api";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      params.locale === "ar"
        ? "مدونة First Step | كل ما يهمك عن الحضانات والتربية والرعاية وتأهيل ذوي الاحتياجات الخاصة"
        : "First Step Blog | Everything About Nurseries, Education, Care, and Special Needs Support",
    description:
      params.locale === "ar"
        ? "اقرئي مقالاتنا حول تربية الأطفال، اختيار الحضانة المناسبة، ودعم ذوي الاحتياجات الخاصة. محتوى موثوق من First Step يساعدك في اتخاذ قرارات واعية لطفلك."
        : "Read our articles about child-rearing, choosing the right nursery, and supporting children with special needs. Trusted content from First Step helps you make informed decisions for your child.",
  };
}

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
