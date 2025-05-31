"use client";

import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import AreaComparison from "./AreaComparison";
import { useLocale } from "next-intl";

interface MonthRow {
  value: number;
  valueLabel: string;
  trend: "up" | "down";
  data: { v: number }[];
}

interface MonthlyAreaComparisonProps {
  title: string;
  rows: MonthRow[];
}

export default function MonthlyAreaComparison({
  title,
  rows,
}: MonthlyAreaComparisonProps) {
  const locale = useLocale();

  // Get current date and calculate last 3 months
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const twoMonthsAgo = lastMonth === 1 ? 12 : lastMonth - 1;

  // Function to format month with proper locale
  const formatMonth = (month: number) => {
    const date = new Date(2024, month - 1, 1); // Using 2024 as it's a leap year
    return format(date, "MMMM", {
      locale: locale === "ar" ? ar : enUS,
    });
  };

  const formattedRows = rows.map((row, index) => ({
    ...row,
    month: [currentMonth, lastMonth, twoMonthsAgo][index],
    label: formatMonth([currentMonth, lastMonth, twoMonthsAgo][index]),
  }));

  return <AreaComparison title={title} rows={formattedRows} />;
}
