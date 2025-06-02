import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommonQuestion } from "@/types";

const FAQs = ({ commonQuestions }: { commonQuestions: CommonQuestion[] }) => {
  const locale = useLocale();
  const t = useTranslations("faqs");

  return (
    <section
      className="w-full bg-cover md:bg-contain bg-repeat-x bg-center"
      style={{
        backgroundImage: "url(/assets/backgrounds/faqs-bg.svg)",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="relative grow max-w-xs md:max-w-max pointer-events-none select-none">
          {locale === "en" ? (
            <h2 className="z-10 absolute top-[12%] xl:top-[13%] right-[18%] rotate-[12deg] !text-base md:!text-xl xl:!text-4xl !font-extrabold text-primary text-center">
              <span>{t("title.line1")}</span>
              <span className="block">{t("title.line2")}</span>
            </h2>
          ) : (
            <h2 className="z-10 absolute top-[14%] right-[40%] -rotate-[16.2deg] !text-lg sm:!text-xl xl:!text-[2.5rem] !font-extrabold text-primary text-nowrap">
              {t("title")}
            </h2>
          )}
          <Image
            className={locale === "en" ? "rotate-x-180 rotate-z-180" : ""}
            src="/assets/illustrations/faqs-child.png"
            alt="child"
            width={640}
            height={1016.52}
          />
        </div>

        <FAQAccordion commonQuestions={commonQuestions} />
      </div>
    </section>
  );
};

const FAQAccordion = ({
  commonQuestions,
}: {
  commonQuestions: CommonQuestion[];
}) => {
  const t = useTranslations("faqs.questions");

  return (
    <div className="grow w-full max-w-[600px] mx-auto rounded-lg">
      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-y-2 md:gap-y-4 text-mid-gray"
      >
        {Array(5)
          .fill(1)
          .map((item, index) => (
            <AccordionItem
              className="bg-white rounded-2xl stroke-1 stroke-light-gray"
              key={index}
              value={`item-${t(`${index + 1}.question`)}-${index + 1}`}
            >
              <AccordionTrigger className="text-left font-medium md:!text-lg lg:!text-xl p-4 lg:p-6">
                {t(`${index + 1}.question`)}
              </AccordionTrigger>
              <AccordionContent className="px-4 lg:px-6">
                {t(`${index + 1}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
