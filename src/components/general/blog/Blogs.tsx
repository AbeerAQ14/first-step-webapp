import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icons } from "../icons";
import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";

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
