import { Metadata } from "next";
import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import Services from "@/components/general/Services";
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
        ? "خدمات First Step | خيارات موثوقة للحضانات والمراكز التأهيلية في السعودية"
        : "First Step Services | Trusted Options for Nurseries and Rehabilitation Centers in Saudi Arabia",
    description:
      params.locale === "ar"
        ? "تعرف على خدمات منصة First Step التي تساعدك في العثور على أنسب حضانة أو مركز تأهيلي لطفلك بسهولة. استعرض، قارن، واحجز في خطوات بسيطة من مكان واحد."
        : "Discover First Step platform services that help you find the most suitable nursery or rehabilitation center for your child. Browse, compare, and book in simple steps from one place.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const adSlides = await websiteService.getAdSlides(locale);
  const services = await websiteService.getOurServices(locale);

  return (
    <main>
      <Advertisment slides={adSlides} />
      <Headline />
      <Services services={services} />
    </main>
  );
}
