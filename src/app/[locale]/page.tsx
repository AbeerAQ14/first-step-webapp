import Advertisment from "@/components/general/Advertisment";
import Headline from "@/components/general/Headline";
import VisionMission from "@/components/general/VisionMission";
import Values from "@/components/general/Values";
import Blogs from "@/components/general/blog/Blogs";
import FAQs from "@/components/general/FAQs";
import Contact from "@/components/general/contact/Contact";

export default function HomePage() {
  return (
    <main>
      <Advertisment />
      <Headline />
      <VisionMission />
      <Values />
      <Blogs />
      <FAQs />
      <Contact />
    </main>
  );
}
