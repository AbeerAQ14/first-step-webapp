import { websiteService } from "@/services/api";
import Image from "next/image";

const Values = async ({ locale }: { locale: "ar" | "en" }) => {
  const values = await websiteService.getOurValues(locale);

  const valuesConstants = [
    {
      iconSrc: "/assets/illustrations/mother.svg",
      bg: "#B12F53",
      color: "#fff",
    },
    {
      iconSrc: "/assets/illustrations/mother.svg",
      bg: "#2B3990",
      color: "#fff",
    },
    {
      iconSrc: "/assets/illustrations/mother-nurse.svg",
      bg: "#D9534F",
      color: "#fff",
    },
    {
      iconSrc: "/assets/illustrations/mother-nurse.svg",
      bg: "#73B094",
      color: "#fff",
    },
  ];

  return (
    <section dir="rtl" className="container mx-auto px-4 text-center space-y-9">
      <h2 className="text-primary space-y-9">
        <span>قيم</span>
        <span className="block">First Step</span>
      </h2>

      <div className="grid gap-y-2 sm:gap-y-0 sm:grid-cols-2 sm:w-fit sm:mx-auto">
        {values.map((item, index) => (
          <div
            key={index}
            className={`w-full sm:max-w-[400px] gap-y-6 py-6 px-8 md:px-14 flex flex-col items-center ${
              index === 0 ? "rounded-tl-5xl rounded-br-5xl" : ""
            }
            ${index === 1 || index === 2 ? "rounded-tr-5xl rounded-bl-5xl" : ""}
            ${index === 3 ? "rounded-tl-5xl rounded-br-5xl" : ""}`}
            style={{
              background: valuesConstants[index].bg,
              color: valuesConstants[index].color,
            }}
          >
            <Image
              src={valuesConstants[index].iconSrc}
              width={120}
              height={120}
              alt={item.title}
            />
            <p className="font-bold">{item.title}</p>
            <p className="sm:max-w-72">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
