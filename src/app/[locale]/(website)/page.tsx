import { Metadata } from "next";
import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import VisionMission from "@/components/general/VisionMission";
import Values from "@/components/general/Values";
import BlogsWrapper from "@/components/general/blog/BlogsWrapper";
import FAQs from "@/components/general/FAQs";
import Contact from "@/components/general/contact/Contact";
import { websiteService } from "@/services/api";

export const revalidate = 86400;

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;

  return {
    title:
      params.locale === "ar"
        ? "منصة First Step اختاري الحضانة المناسبة لطفلك بسهولة في السعودية"
        : "First Step Platform - Find the Perfect Nursery for Your Child in Saudi Arabia",
    description:
      params.locale === "ar"
        ? "اكتشفي أفضل الحضانات وروضات الأطفال الموثوقة في السعودية من مكان واحد. First Step تساعدك في اختيار حضانة توفر رعاية وتعليم متوازن لطفلك."
        : "Discover trusted nurseries and kindergartens in Saudi Arabia in one place. First Step helps you choose a nursery that provides balanced care and education for your child.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  const [adSlides, commonQuestions] = await Promise.all([
    websiteService.getAdSlides(locale),
    websiteService.getCommonQuestions(locale),
  ]);

  return (
    <main>
      <Advertisment slides={adSlides} />
      <Headline />
      <VisionMission />
      <Values locale={locale} />
      <BlogsWrapper locale={locale} number={4} />
      <FAQs commonQuestions={commonQuestions} />
      <Contact />
    </main>
  );
}
