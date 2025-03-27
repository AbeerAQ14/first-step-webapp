import { useLocale } from "next-intl";
import Carousel from "./Carousel";

const Advertisment = () => {
  const locale = useLocale();
  const items = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1742783199458-aa2ec62ae5f5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1698719853447-4a53e6676595?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1664935058289-5ec0517d8cc5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="2xl:container mx-auto pt-0 px-0">
      <Carousel items={items} locale={locale} />
    </section>
  );
};

export default Advertisment;
