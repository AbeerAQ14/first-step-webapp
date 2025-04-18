import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icons } from "../icons";
import { useTranslations } from "next-intl";

const Blogs = () => {
  const t = useTranslations("blogsection");

  return (
    <section
      className="my-20 bg-center bg-cover xl:bg-[size-120%] xl:bg-center 2xl:bg-contain bg-no-repeat"
      style={{ backgroundImage: `url(/assets/backgrounds/bubbles-bg.svg)` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center flex flex-col items-center gap-y-6">
          <div className="space-y-4">
            <h2 className="text-primary">
              <span>{t("title.line1")}</span>
              <span className="block">{t("title.line2")}</span>
            </h2>

            <span className="text-gray">{t("subtitle")}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center gap-10">
            {Array(4)
              .fill(1)
              .map((item, idx) => (
                <BlogCard key={idx} />
              ))}
          </div>

          <Button size={"sm"}>{t("button")}</Button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

const BlogCard = () => {
  return (
    <div className="bg-white min-w-60 p-2 pb-4 flex flex-col items-start gap-y-2 rounded-2xl text-left rtl:text-right">
      <div className="w-full h-40 rounded-xl overflow-hidden relative">
        <Image
          className="object-cover object-center"
          src="https://images.unsplash.com/photo-1716908932235-d865878b12a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
        />
      </div>

      <span className="text-primary font-bold">عنوان المدونة</span>

      <p className="text-gray text-sm line-clamp-3">
        نؤمن أن التزامنا بأداء مهمتنا تجاه أطفالكم لا يتوقف عند حدٍ معين، فنسعى
        دوماً إلى إحداث التطويـر والتغييـر الإيجابي المثمر في حيـاة أطفـالـكـم،
        من خـلال فـريق عمـلنـا الـشغــوف بتعليمهم وتحفيزهم وتنمية قداتهم.
      </p>

      <span className="text-secondary-orange font-medium text-sm">
        مدة القراءة 3 دقائق
      </span>

      <div className="w-full flex items-center justify-between text-sm">
        <div className="flex items-center gap-x-1">
          <div className="w-3 h-3 rounded-full overflow-hidden relative">
            <Image
              className="object-cover object-center"
              src="https://images.unsplash.com/photo-1716908932235-d865878b12a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              fill
            />
          </div>
          <span>د. محمود الحسيني</span>
        </div>

        <div className="flex items-center gap-x-0.5">
          <Icons.calendar className="fill-gray" width={12} height={12} />
          <span className="font-medium">27 / 2 / 2025</span>
        </div>
      </div>
    </div>
  );
};
