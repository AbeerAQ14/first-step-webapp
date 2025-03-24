import { useTranslations } from "next-intl";
import Image from "next/image";

const SocialQR = () => {
  const t = useTranslations("socialqr");

  return (
    <section dir="ltr" className="container mx-auto px-4">
      <div className="relative max-w-3xl mx-auto">
        <div className="max-w-fit mx-auto p-8 text-center sm:absolute -top-10 right-0">
          <div className="hidden sm:block w-52 md:w-60 xl:w-full rotate-[-196.26deg] rotate-z-180 rotate-y-180 absolute top-[20%] right-[70%]">
            <Image src="/arrow.svg" alt="Arrow" width={282.97} height={91.82} />
          </div>
          <div className="hidden sm:block w-52 md:w-60 xl:w-full rotate-[-248.91deg] absolute top-[120%] right-[20%] md:top-[130%] md:right-[22%] xl:top-[170%] xl:right-[4%]">
            <Image src="/arrow.svg" alt="Arrow" width={282.97} height={91.82} />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-primary mb-2">
            <span className="text">{t("title.line1")}</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              {t("title.line2")}
            </span>
          </h2>
        </div>
        <QRSquare />
      </div>
    </section>
  );
};

const QRSquare = () => {
  const socialQRs = [
    {
      platform: "Snapchat",
      image: "/qr/snapchat.jpg",
    },
    {
      platform: "Facebook",
      image: "/qr/facebook.jpg",
    },
    {
      platform: "LinkedIn",
      image: "/qr/linkedin.jpg",
    },
    {
      platform: "Instagram",
      image: "/qr/instagram.jpg",
    },
    {
      platform: "TikTok",
      image: "/qr/tiktok.jpg",
    },
    {
      platform: "X",
      image: "/qr/x.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-start sm:w-fit">
        <div className="grow sm:shrink">
          <Image
            className="w-full sm:w-fit"
            src={socialQRs[0].image}
            alt={`${socialQRs[0].platform} QR Code`}
            width={160}
            height={160}
          />
        </div>
      </div>

      <div className="flex justify-start sm:w-fit">
        {socialQRs.slice(1, 3).map((item) => (
          <div key={item.platform} className="grow sm:shrink">
            <Image
              className="w-full sm:w-fit"
              src={item.image}
              alt={`${item.platform} QR Code`}
              width={160}
              height={160}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-start sm:w-fit">
        {socialQRs.slice(3).map((item) => (
          <div key={item.platform} className="grow sm:shrink">
            <Image
              className="w-full sm:w-fit"
              src={item.image}
              alt={`${item.platform} QR Code`}
              width={160}
              height={160}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialQR;
