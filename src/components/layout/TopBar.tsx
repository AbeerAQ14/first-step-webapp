import Image from "next/image";
import { Icons } from "../general/icons";
import Link from "next/link";

const TopBar = () => {
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
    <div className="bg-secondary-orange text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-1.5">
        <div className="flex items-center">
          <Image
            src={"/saudi-arabia.svg"}
            alt="arabic"
            width={20}
            height={20}
          />
          <div className="caption-12-medium font-bold">لغة عربية</div>
        </div>
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
