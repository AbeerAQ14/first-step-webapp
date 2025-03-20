import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const locale = useLocale();

  return (
    <section
      className="w-full"
      style={{
        backgroundImage: "url(/faqs-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="relative grow max-w-xs md:max-w-max pointer-events-none select-none">
          {locale === "en" ? (
            <h2 className="z-10 absolute top-[12%] xl:top-[13%] right-[18%] rotate-[12deg] !text-base md:!text-xl xl:!text-4xl !font-extrabold text-primary text-center">
              Frequently Asked
              <br /> Questions
            </h2>
          ) : (
            <h2 className="z-10 absolute top-[14%] right-[40%] -rotate-[16.2deg] !text-lg sm:!text-xl xl:!text-[2.5rem] !font-extrabold text-primary text-nowrap">
              الأسئلة الشائعة
            </h2>
          )}
          <Image
            className={locale === "en" ? "rotate-x-180 rotate-z-180" : ""}
            src="/faqs-child.png"
            alt="child"
            width={640}
            height={1016.52}
          />
        </div>

        <FAQAccordion />
      </div>
    </section>
  );
};

const FAQAccordion = () => {
  const faqData = [
    {
      question: "كيف أصل للمراكز القريبة",
      answer:
        "نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حر معين، فنسعى دوماً إلى إحداث التطوير والتغيير الإيجابي المتمركي حياة أطفالكم. من خلال قريق عملنا الشهوف بتعليمهم وتحفيزهم وتقنية هدائهم.",
    },
    {
      question: "ما هي وسائل النقل المتاحة؟",
      answer:
        "نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حر معين، فنسعى دوماً إلى إحداث التطوير والتغيير الإيجابي المتمركي حياة أطفالكم. من خلال قريق عملنا الشهوف بتعليمهم وتحفيزهم وتقنية هدائهم.",
    },
    {
      question: "هل يمكنني المشي إلى هناك؟",
      answer:
        "نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حر معين، فنسعى دوماً إلى إحداث التطوير والتغيير الإيجابي المتمركي حياة أطفالكم. من خلال قريق عملنا الشهوف بتعليمهم وتحفيزهم وتقنية هدائهم.",
    },
    {
      question: "ما هي أوقات العمل للمراكز؟",
      answer:
        "نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حر معين، فنسعى دوماً إلى إحداث التطوير والتغيير الإيجابي المتمركي حياة أطفالكم. من خلال قريق عملنا الشهوف بتعليمهم وتحفيزهم وتقنية هدائهم.",
    },
    {
      question: "هل هناك مواقف للسيارات بالقرب؟",
      answer:
        "نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حر معين، فنسعى دوماً إلى إحداث التطوير والتغيير الإيجابي المتمركي حياة أطفالكم. من خلال قريق عملنا الشهوف بتعليمهم وتحفيزهم وتقنية هدائهم.",
    },
  ];

  return (
    <div className="grow w-full max-w-[600px] mx-auto rounded-lg">
      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-y-2 md:gap-y-4 text-mid-gray"
      >
        {faqData.map((faq, index) => (
          <AccordionItem
            className="bg-white rounded-2xl stroke-1 stroke-light-gray"
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-left font-medium md:!text-lg lg:!text-xl p-4 lg:p-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 lg:px-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
