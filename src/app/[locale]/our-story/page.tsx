import Headline from "@/components/general/Headline";
import VisionMisson from "@/components/general/VisionMission";
import Values from "@/components/general/Values";
import WhyUs from "@/components/general/WhyUs";
import SocialQR from "@/components/general/SocialQR";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Headline />
      <VisionMisson />
      <Values locale={locale} />
      <WhyUs />
      <SocialQR />
    </div>
  );
}
