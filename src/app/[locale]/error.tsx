"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md">
        <div className="flex justify-center mb-6 text-destructive">
          <AlertTriangle className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          {error?.message || t("default-message")}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size={"sm"} onClick={() => location.reload()}>
            {t("refresh")}
          </Button>
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link
              href="/"
              className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {t("home")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
