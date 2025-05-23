"use client";

import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black px-4 py-16">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-bold text-destructive dark:text-red-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Button asChild variant={"ghost"} size={"sm"}>
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeftCircle className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </section>
  );
}
