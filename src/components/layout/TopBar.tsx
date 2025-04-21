"use client";

import { Icons } from "../general/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const TopBar = () => {
  const icons = [
    {
      title: "X",
      icon: Icons.twitter,
      link: "https://x.com/first_stepsa",
    },
    {
      title: "Linkedin",
      icon: Icons.linkedin,
      link: "https://www.linkedin.com/company/first-stepsa",
    },
    {
      title: "Facebook",
      icon: Icons.facebook,
      link: "https://www.facebook.com/share/1Y8X5MapYR",
    },
    {
      title: "Snapchat",
      icon: Icons.snapchat,
      link: "https://www.snapchat.com/add/first_stepsa",
    },
    {
      title: "Instagram",
      icon: Icons.instagram,
      link: "https://www.instagram.com/first_stepsa",
    },
    {
      title: "Tiktok",
      icon: Icons.tiktok,
      link: "https://www.tiktok.com/@first_stepsa",
    },
  ];

  return (
    <div dir="ltr" className="bg-secondary-orange text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-1.5">
        <LanguageSwitcher />

        <div className="flex items-center gap-x-4">
          {icons.map((item) => (
            <Link key={item.title} href={item.link}>
              <item.icon className="fill-white" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("language");
  const language = locale === "en" ? t("en") : t("ar");
  const iconSrc =
    locale === "en" ? "/assets/icons/english.svg" : "/assets/icons/arabic.svg";

  const toggleLanguage = (newLocale: "ar" | "en") => {
    const path = window.location.pathname;
    const pathWithoutLocale = path.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-x-1">
            <Image src={iconSrc} alt="arabic" width={20} height={20} />
            <div className="caption-12-medium font-bold">{language}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleLanguage("ar")}>
          <div className="flex items-center gap-x-1">
            <Image
              src="/assets/icons/arabic.svg"
              alt="arabic"
              width={20}
              height={20}
            />
            <div className="caption-12-medium font-bold">{t("ar")}</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleLanguage("en")}>
          <div className="flex items-center gap-x-1">
            <Image
              src="/assets/icons/english.svg"
              alt="english"
              width={20}
              height={20}
            />
            <div className="caption-12-medium font-bold">{t("en")}</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
