import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import Services from "@/components/general/Services";
import { websiteService } from "@/services/api";

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
