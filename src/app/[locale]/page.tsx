import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import VisionMission from "@/components/general/VisionMission";
import Values from "@/components/general/Values";
import Blogs from "@/components/general/blog/Blogs";
import FAQs from "@/components/general/FAQs";
import Contact from "@/components/general/contact/Contact";
import { blogService, websiteService } from "@/services/api";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  const adSlides = await websiteService.getAdSlides(locale);

  const blogs = await blogService.getBlogs(locale);
  const latestBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 4);

  const commonQuestions = await websiteService.getCommonQuestions(locale);

  return (
    <main>
      <Advertisment slides={adSlides} />
      <Headline />
      <VisionMission />
      <Values locale={locale} />
      <Blogs blogs={latestBlogs} />
      <FAQs commonQuestions={commonQuestions} />
      <Contact />
    </main>
  );
}
