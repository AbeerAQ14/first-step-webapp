import { Metadata } from "next";
import BlogsWrapper from "@/components/general/blog/BlogsWrapper";
import Contact from "@/components/general/contact/Contact";
import SocialQR from "@/components/general/SocialQR";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      params.locale === "ar"
        ? "تواصل مع First Step | حلول موثوقة لاختيار حضانة في السعودية"
        : "Contact First Step | Trusted Solutions for Choosing a Nursery in Saudi Arabia",
    description:
      params.locale === "ar"
        ? "هل تحتاج إلى دعم في اختيار حضانة أو مركز تأهيلي لطفلك؟ فريق First Step مستعد للإجابة عن استفساراتك وتقديم التوجيه المناسب بما يتوافق مع احتياجات أسرتك."
        : "Need support in choosing a nursery or rehabilitation center for your child? First Step team is ready to answer your inquiries and provide guidance that aligns with your family's needs.",
  };
}

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
