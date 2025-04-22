import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import VisionMission from "@/components/general/VisionMission";
import Values from "@/components/general/Values";
import BlogsWrapper from "@/components/general/blog/BlogsWrapper";
import FAQs from "@/components/general/FAQs";
import Contact from "@/components/general/contact/Contact";
import { websiteService } from "@/services/api";

export const revalidate = 86400;

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
