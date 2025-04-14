import { useLocale } from "next-intl";
import Carousel from "./Carousel";
import { AdSlide } from "@/types";

const Advertisment = ({ slides }: { slides: AdSlide[] }) => {
  const locale = useLocale();

  return (
    <section className="2xl:container mx-auto pt-0 px-0">
      <Carousel items={slides} locale={locale} />
    </section>
  );
};

export default Advertisment;
