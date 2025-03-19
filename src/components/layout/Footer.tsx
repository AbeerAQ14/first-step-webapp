import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../general/icons";

const Footer = () => {
  return (
    <footer dir="ltr" className="mt-auto">
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
    </footer>
  );
};

export default Footer;

const TopLeftSection = () => {
  return (
    <div className="relative order-2 flex-1/2 xl:flex-4/12 bg-secondary-burgundy text-white flex flex-col items-center md:items-end justify-between pt-10 pb-5 pr-10">
      <div className="-z-50  absolute top-0 bottom-0 right-[-500%] md:right-0 left-[-500%] bg-secondary-burgundy" />

      <div className="w-full flex flex-col items-center md:items-end space-y-4">
        <h3 className="text-xl font-bold text-right">نشرة أخبارنا</h3>

        <div className="flex flex-col md:flex-row w-full gap-3">
          <Button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium order-2 md:order-1">
            سجل الآن
          </Button>
          <div className="relative grow w-full md:w-auto order-1 md:order-2 flex bg-white rounded-lg">
            <Input
              className="text-[#2A3342] text-xs pl-12"
              type="email"
              placeholder="Email"
            />
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Icons.mail className="stroke-gray-500" />
            </div>
          </div>
        </div>

        <div className="text-center md:text-right w-full md:w-auto">
          <p className="text-lg font-bold mb-3">حمل التطبيق الآن</p>
          <div className="flex gap-3 justify-center md:justify-end">
            <Link href="#" className="inline-block">
              <Image
                src="/googleplay.png"
                alt="Get it on Google Play"
                width={138}
                height={40}
              />
            </Link>
            <Link href="#" className="inline-block">
              <Image
                src="/appstore.png"
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
  return (
    <div className="relative md:order-2 flex-1/2 xl:flex-8/12 bg-secondary-mint-green flex flex-col   justify-between pt-10 pb-5">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] md:left-0 bg-secondary-mint-green" />

      <div className="w-full mb-6 justify-items-center md:justify-items-end">
        <div className="flex justify-center md:justify-start mb-6">
          <Image
            src="/complete_logo.svg"
            alt="First Step"
            width={236}
            height={60}
          />
        </div>

        <div className="max-w-[523px] mt-6 text-right font-medium">
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-9 gap-y-2">
            <Link href="#" className="text-white hover:underline">
              الرئيسية
            </Link>
            <Link href="#" className="text-white hover:underline">
              خدماتنا
            </Link>
            <Link href="#" className="text-white hover:underline">
              الحضانات
            </Link>
            <Link href="#" className="text-white hover:underline">
              المراكز
            </Link>
            <Link href="#" className="text-white hover:underline">
              المدونة
            </Link>
            <Link href="#" className="text-white hover:underline">
              قصتنا
            </Link>
            <Link href="#" className="text-white hover:underline">
              تواصل معنا
            </Link>
            <Link href="#" className="text-white hover:underline">
              المساعدة
            </Link>
            <Link href="#" className="text-white hover:underline">
              الخصوصية
            </Link>
            <Link href="#" className="text-white hover:underline">
              الشروط والأحكام
            </Link>
          </nav>

          <div className="mt-9 flex flex-wrap justify-center md:justify-end gap-x-9 gap-y-2">
            <p className="text-white font-medium">تواصل معنا:</p>
            <a
              href="mailto:info@firststep.com"
              className="text-white hover:underline"
            >
              info@firststep.com
            </a>
            <a href="tel:+966539949732" className="text-white hover:underline">
              +966 53 994 9732
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomLeftSection = () => {
  return (
    <div className="order-2 relative flex-1/2 xl:flex-4/12 flex bg-primary text-white pt-2.5 pb-5  text-center md:text-left">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] md:right-0 left-[-500%] bg-primary" />

      <p className="mt-auto w-full">© 2025 First Step. All rights reserved.</p>
    </div>
  );
};

const BottomRightSection = () => {
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
    <div className="md:order-2 relative flex-1/2 xl:flex-8/12 bg-secondary-orange text-white pt-2.5 pb-5 flex justify-center md:justify-end items-center">
      <div className="-z-50 absolute top-0 bottom-0 right-[-500%] left-[-500%] md:left-0 bg-secondary-orange" />

      <div className="flex flex-col gap-3 items-center md:items-end">
        <span className="font-bold">تابعونا هنا</span>
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
