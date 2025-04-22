import BlogsWrapper from "@/components/general/blog/BlogsWrapper";
import Contact from "@/components/general/contact/Contact";
import SocialQR from "@/components/general/SocialQR";

export const revalidate = 86400;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Contact />
      <SocialQR />
      <BlogsWrapper locale={locale} number={4} />
    </div>
  );
}
