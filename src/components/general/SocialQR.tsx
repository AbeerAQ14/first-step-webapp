import Image from "next/image";
import React from "react";

const SocialQR = () => {
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
    <div className="max-w-4xl mx-auto p-8 text-center" dir="rtl">
      <h2 className="text-4xl font-bold text-primary mb-2">
        <span>تابعونا</span>
        <span className="block">خطوة بخطوة</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <div className={`relative p-1 rounded-lg mb-2`}>
            <Image
              src={socialQRs[0].image}
              alt={`${socialQRs[0].platform} QR Code`}
              width={160}
              height={160}
            />
          </div>
        </div>

        <div>
          {socialQRs.slice(1, 3).map((item) => (
            <div key={item.platform} className="flex flex-col items-center">
              <div className={`relative p-1 rounded-lg mb-2`}>
                <Image
                  src={item.image}
                  alt={`${item.platform} QR Code`}
                  width={160}
                  height={160}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          {socialQRs.slice(3).map((item) => (
            <div key={item.platform} className="flex flex-col items-center">
              <div className={`relative p-1 rounded-lg mb-2`}>
                <Image
                  src={item.image}
                  alt={`${item.platform} QR Code`}
                  width={160}
                  height={160}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialQR;
