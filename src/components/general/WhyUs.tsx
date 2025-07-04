import Image from "next/image";
import { useLocale } from "next-intl";

const WhyUs = ({ locale }: { locale: "ar" | "en" }) => {
  const items = [
    {
      title: "سهولة البحث والاختيار",
      description:
        "نوفر لك أداة بحث متقدمة تتيح تصفية الحضانات حسب الموقع، العمر، مواعيد العمل،‌‌ والخدمات المتاحة، مما يساعدك على العثور على الحضانة المثالية لطفلك بكل سهولة.",
    },
    {
      title: "دعم احتياجات الأطفال المختلفة",
      description:
        "نهتم بالأطفال جميعهم، لذا نوفر قسماً خاصاً بمراكز ذوي الاحتياجات الخاصة، مما يسهل‌‌ على الأهالي العثور على المكان الأنسب لرعاية أطفالهم باهتمام واحترافية.",
    },
    {
      title: "التواصل فعال بين العائلات والحضانات",
      description:
        "نساعد على تعزيز التواصل بين الأهالي ودور الحضانة من خلال تقارير يومية عن تطور‌‌  الأطفال، مع إمكانية التواصل المباشر مع الإدارة لمتابعة كل جديد.",
    },
    {
      title: "المصداقية والأمان‌",
      description:
        "نوفر لك بيانات دقيقة ومحدثة عن الحضانات، مع التزامنا بأعلى معايير الجودة لضمان‌‌ تجربة آمنة وموثوقة للعائلات. نحرص على تيسير عملية البحث واتخاذ القرار بثقة.",
    },
  ];

  return (
    <section className="xl:container mx-auto px-4 overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-x-4 2xl:gap-x-24">
        <div className="order-2 md:order-1 rtl:md:pl-72 rtl:xl:pl-0 ltr:md:pr-72 ltr:xl:pr-0">
          <h2 className="text-primary">
            {locale === "ar" ? "لماذا First Step؟" : "Why First Step?"}
          </h2>

          <div className="mt-9 flex flex-col gap-y-6">
            {items.map((item) => (
              <div key={item.title} className="space-y-4">
                <p className="font-bold text-2xl text-gray">{item.title}</p>
                <p className="font-medium text-mid-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-h-[500px] relative order-1 inset-x-0 md:inset-x-auto md:order-2 grow md:absolute inset-y-0 rtl:-left-40 ltr:-right-40 -z-50 xl:relative rtl:xl:left-0 ltr:xl:right-0">
          <Image
            className="shrink-0"
            src="/assets/backgrounds/whyus-bg.svg"
            alt="Mother And Daughter Background"
            width={508}
            height={499.33}
          />

          <Image
            className="absolute left-1/2 -translate-x-1/2 bottom-10"
            src="/assets/general/mother-and-daughter.png"
            alt="Mother And Daughter"
            width={424}
            height={283}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
