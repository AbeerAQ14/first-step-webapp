"use client";

import { useState } from "react";
import { Bell, Settings, Search } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";

export default function Header({
  items,
}: {
  items: { title: string; url: string }[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Function to generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const currentPath = pathname;
    const breadcrumbs = [];

    // Always add dashboard as first item
    breadcrumbs.push({
      title: "لوحة التحكم",
      url: "/dashboard/center",
    });

    // Only add "الرئيسية" if we're on the home page
    if (currentPath === "/dashboard/center") {
      breadcrumbs.push({
        title: "الرئيسية",
        url: "/dashboard/center",
      });
    }

    // Find matching items from the navigation items
    items.forEach((item) => {
      // Skip the home item ("الرئيسية") since we handled it above
      if (item.title === "الرئيسية") {
        return;
      }

      // Add item if path matches exactly or is a sub-path
      if (
        currentPath === item.url ||
        (item.url !== "" && currentPath.startsWith(item.url))
      ) {
        breadcrumbs.push(item);
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="flex items-center justify-between px-6 py-4.5">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="text-right w-fit">
        <ol className="flex items-center gap-1">
          {breadcrumbs.map((item, index) => (
            <li
              key={`${item.url}-${item.title}`}
              className="whitespace-nowrap flex items-center gap-1"
            >
              {index > 0 && (
                <span
                  className={`${
                    index === breadcrumbs.length - 1
                      ? "text-primary"
                      : "text-light-gray"
                  }`}
                >
                  /
                </span>
              )}
              <Link
                href={item.url}
                className={`${
                  index === breadcrumbs.length - 1
                    ? "font-bold text-primary pointer-events-none"
                    : index === 0
                    ? "font-medium text-light-gray pointer-events-none"
                    : "font-medium text-light-gray hover:underline"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* Left Section (appears on right in RTL) */}
      <div className="w-full flex justify-end items-center gap-6">
        <Settings className="size-6 text-mid-gray cursor-pointer" />
        <Bell className="size-6 text-mid-gray cursor-pointer" />

        {/* Center Section - Search */}
        <div className="hidden sm:block relative w-full max-w-52 mx-4">
          <Input
            type="text"
            className="rounded-full py-1.5 px-2.5 pr-11 placeholder:text-mid-gray"
            placeholder="بحث"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-light-gray" />
        </div>
      </div>
    </header>
  );
}
