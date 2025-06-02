"use client";

import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const translations = {
  ar: {
    code: "404",
    title: "الصفحة غير موجودة",
    description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    home: "العودة للصفحة الرئيسية"
  },
  en: {
    code: "404",
    title: "Page Not Found",
    description: "Sorry, the page you are looking for doesn't exist or has been moved.",
    home: "Back to Home"
  }
};

export default function NotFound() {
  const pathname = usePathname();
  const isArabic = pathname?.includes("/ar");
  const t = translations[isArabic ? "ar" : "en"];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black px-4 py-16">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-bold text-destructive dark:text-red-400 mb-4">
          {t.code}
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
          {t.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.description}
        </p>

        <Button asChild variant={"ghost"} size={"sm"}>
          <Link
            href={isArabic ? "/ar" : "/"}
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeftCircle className="w-5 h-5" />
            {t.home}
          </Link>
        </Button>
      </div>
    </section>
  );
} 