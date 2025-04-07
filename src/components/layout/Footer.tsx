import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../general/icons";
import { useTranslations } from "next-intl";

const Footer = () => {
  return (
    <footer className="mt-auto max-w-full w-full box-border overflow-hidden">
      <div>
        <div className="flex flex-col container mx-auto px-4">
          <div className="w-full flex flex-col md:flex-row">
            {/* Left section (Red) */}
            <TopLeftSection />

            {/* Right section (Green) */}
            <TopRightSection />
          </div>

          <div className="w-full flex flex-col md:flex-row">
            {/* Navy blue section */}
            <BottomLeftSection />

            {/* Red section */}
            <BottomRightSection />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const TopLeftSection = () => {
  const t = useTranslations("footer");

  return (
    <div className="relative order-2 flex-1/2 xl:flex-4/12 bg-secondary-burgundy text-white flex flex-col items-center md:items-end justify-between pt-10 pb-5 rtl:md:pr-10 ltr:md:pl-10">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] rtl:md:right-0 ltr:md:left-0 bg-secondary-burgundy" />

      <div className="w-full flex flex-col items-center md:items-start space-y-4">
        <p className="text-xl font-medium text-right">
          {t("newsletter.title")}
        </p>

        <div className="flex flex-col items-center sm:flex-row w-full gap-3">
          <Button
            size={"sm"}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium order-2"
          >
            {t("newsletter.button")}
          </Button>
          <div className="relative grow w-full sm:w-auto order-1 sm:order-1 flex bg-white rounded-lg">
            <Input
              className="text-[#2A3342] text-xs pl-12 py-5"
              type="email"
              placeholder="Email"
            />
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Icons.mail className="stroke-gray-500" />
            </div>
          </div>
        </div>

        <div className="text-center rtl:md:text-right ltr:md:text-left w-full md:w-auto">
          <p className="text-lg font-bold mb-3">{t("appDownloadTitle")}</p>
          <div className="flex gap-3 justify-center md:justify-end">
            <Link href="#" className="inline-block">
              <Image
                src="/assets/store/googleplay.png"
                alt="Get it on Google Play"
                width={138}
                height={40}
              />
            </Link>
            <Link href="#" className="inline-block">
              <Image
                src="/assets/store/appstore.png"
                alt="Download on the App Store"
                width={138}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopRightSection = () => {
  const t = useTranslations("footer");

  const keys = [
    "home",
    "services",
    "nurseries",
    "centers",
    "blog",
    "story",
    "contact",
    "help",
    "privacy",
    "terms",
  ];
  const links = keys.map((key, index) => {
    return {
      id: index,
      title: t(`links.${key}.title`),
      path: t(`links.${key}.path`),
    };
  });

  const hoverEffect =
    "hover:text-primary hover:font-bold hover:text-xl hover:text-secondary-orange duration-300 ";
  const linkClasses =
    "absolute inset-0 md:left-0 md:right-auto rtl:md:right-0 rtl:md:left-auto";

  return (
    <div className="relative md:order-1 flex-1/2 xl:flex-8/12 bg-primary flex flex-col justify-between pt-10 pb-5">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] rtl:md:left-0 ltr:md:right-0 bg-primary" />

      <div className="w-full mb-6 justify-items-center md:justify-items-start">
        <div className="flex justify-center md:justify-start mb-6">
          <Image
            src="/assets/logos/complete_logo_white.svg"
            alt="First Step"
            width={236.4}
            height={60}
          />
        </div>

        <div className="max-w-[523px] mt-6 font-medium">
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-9 gap-y-2">
              {links.map((link) => (
                <li
                  key={link.id}
                  className="relative inline-block font-medium text-center"
                >
                  <Link
                    href={link.path}
                    className={`text-white ${linkClasses} ${hoverEffect}`}
                  >
                    {link.title}
                  </Link>

                  <span className="relative -top-1/2 pointer-events-none flex items-center justify-center md:justify-start text-xl font-bold opacity-0">
                    {link.title}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-9 flex flex-wrap justify-center md:justify-start gap-x-9 gap-y-2">
            <p className="text-white font-medium">{t("contactTitle")}:</p>
            <div className="relative">
              <a
                href="mailto:info@firststep.com"
                className={`text-white ${linkClasses} ${hoverEffect}`}
              >
                info@firststep.com
              </a>
              <span className="relative -top-1/2 pointer-events-none flex items-center justify-center md:justify-start text-xl font-bold opacity-0">
                info@firststep.com
              </span>
            </div>

            <div className="relative">
              <a
                dir="ltr"
                href="tel:+966539949732"
                className={`text-white ${linkClasses} ${hoverEffect}`}
              >
                +966 53 994 9732
              </a>
              <span className="relative -top-1/2 pointer-events-none flex items-center justify-center md:justify-start text-xl font-bold opacity-0">
                +966 53 994 9732
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomLeftSection = () => {
  return (
    <div className="order-2 relative flex-1/2 xl:flex-4/12 flex bg-secondary-mint-green text-white pt-2.5 pb-5  text-center md:text-left">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] rtl:md:right-0 ltr:md:left-0 bg-secondary-mint-green" />

      <p className="mt-auto w-full text-gray font-medium ltr:md:text-right">
        © 2025 First Step. All rights reserved.
      </p>
    </div>
  );
};

const BottomRightSection = () => {
  const t = useTranslations("footer");

  const icons = [
    {
      title: "X",
      icon: Icons.twitter,
      link: "/",
    },
    {
      title: "Linkedin",
      icon: Icons.linkedin,
      link: "/",
    },
    {
      title: "Facebook",
      icon: Icons.facebook,
      link: "/",
    },
    {
      title: "Snapchat",
      icon: Icons.snapchat,
      link: "/",
    },
    {
      title: "Instagram",
      icon: Icons.instagram,
      link: "/",
    },
    {
      title: "Tiktok",
      icon: Icons.tiktok,
      link: "/",
    },
  ];

  return (
    <div className="md:order-1 relative flex-1/2 xl:flex-8/12 bg-secondary-orange text-white pt-2.5 pb-5 flex justify-center md:justify-start items-center">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] rtl:md:left-0 ltr:md:right-0 bg-secondary-orange" />

      <div className="flex flex-col gap-3 items-center md:items-start">
        <span className="font-bold">{t("followTitle")}</span>
        <div className="flex gap-2">
          {icons.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="flex items-center justify-center"
              aria-label={item.title}
            >
              <item.icon className="fill-white" width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
