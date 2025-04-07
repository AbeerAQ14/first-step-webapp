import { useLocale } from "next-intl";
import Image from "next/image";

const VisionMission = () => {
  const locale = useLocale();

  return (
    <section className="2xl:container mx-auto my-10 px-4 sm:px-0 flex flex-col ltr:flex-col-reverse sm:gap-y-28">
      <div className="rtl:-mb-[80%] ltr:-mt-[80%] sm:!my-0 flex flex-col items-start ltr:items-end text-center text-primary">
        <div className="sm:max-w-[988px] flex flex-col sm:relative items-center sm:items-start ltr:sm:items-end sm:left-0 sm:right-0">
          {locale === "en" ? <MissionContent /> : <VisionContent />}
        </div>
      </div>

      <div className="flex flex-col items-end ltr:items-start text-center text-primary">
        <div className="sm:max-w-[988px] flex flex-col sm:relative items-center sm:items-end ltr:sm:items-start sm:left-0 sm:right-0">
          {locale === "en" ? <VisionContent /> : <MissionContent />}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;

const VisionContent = () => {
  return (
    <>
      <div className="w-[90%] px-4 pt-4 pb-[60%] sm:pb-4 sm:pl-[38%] ltr:sm:pl-4 ltr:sm:pr-[38%]  sm:w-[85%] space-y-6 shadow-subtle lg:py-6 md:pr-16 ltr:md:pl-16">
        <h2>رؤيتنا</h2>
        <p className="font-medium">
          نؤمن بأن رعاية الأطفال ليست مجرد خدمة، بل تجربة تصنع فارقًا في حياة
          كل‌‌ أسرة. لهذا، نسعى إلى إعادة تعريف مفهوم رعاية الأطفال من خلال دمج
          التكنولوجيا‌‌ بالقيم الإنسانية، لنمنح العائلات حلولًا ذكية ومبتكرة،
          تُحدث تأثيرًا إيجابيًا يعزز‌‌ راحة بالهم ويضمن لطفلهم بداية قوية
          ومتميزة.
        </p>
      </div>

      <Image
        className="select-none pointer-events-none w-full rounded-full -translate-y-1/2 sm:absolute sm:w-fit sm:top-1/2 sm:left-0 ltr:sm:left-auto ltr:sm:right-0"
        src={"/assets/general/vision.jpg"}
        alt="our vision"
        width={280}
        height={280}
      />
    </>
  );
};

const MissionContent = () => {
  return (
    <>
      <Image
        className="select-none pointer-events-none w-full rounded-full translate-y-1/2 sm:absolute sm:w-fit sm:bottom-1/2 sm:right-0 ltr:sm:left-0"
        src={"/assets/general/vision.jpg"}
        alt="our vision"
        width={280}
        height={280}
      />

      <div className="w-[90%] px-4 pb-4 pt-[60%] sm:pt-4 sm:pr-[38%] ltr:sm:pr-4 ltr:sm:pl-[38%] sm:w-[85%] space-y-6 shadow-subtle lg:py-6 md:pl-16 ltr:md:pr-16">
        <h2>رسالتنا</h2>
        <p className="font-medium">
          نطمح لأن نكون أكثر من مجرد منصة، بل رفيقًا موثوقًا لكل أسرة تبحث عن
          أفضل‌‌ رعاية لأطفالها. نحن الجسر الذي يربط العائلات بأفضل الحضانات
          والمراكز‌‌ التأهيلية، مقدمين تجربة سلسة وسهلة تجعل كل خطوة في رحلة
          البحث عن البيئة‌‌ الأنسب لنمو أطفالهم أكثر راحة، أمانًا، واطمئنانًا.
        </p>
      </div>
    </>
  );
};
