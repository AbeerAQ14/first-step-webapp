"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

type RevenueData = {
  month: string;
  value: number;
};

// Generate the last 5 months dynamically
function getLast5MonthsData(): RevenueData[] {
  const now = new Date();
  const data: RevenueData[] = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    // Format as MM (01, 02, ...)
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    data.push({ month, value: 0 });
  }
  return data;
}

const data: RevenueData[] = getLast5MonthsData();

export default function RevenueChart() {
  const [selected, setSelected] = useState<RevenueData>(data[1]);
  const t = useTranslations("dashboard.charts.revenue");
  const locale = useLocale();

  return (
    <div className="p-4 rounded-xl bg-white shadow-[0_0_4px_rgba(34,34,34,.16)] w-full lg:max-w-md">
      <div className="text-sm text-gray-500 mb-2">
        <span className="text-primary font-bold text-lg">
          {t("title", { month: selected.month })}
        </span>
        <div className="text-mid-gray font-bold text-xl">
          {selected.value} {t("currency")}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ left: 10, right: 10 }}
          onClick={(e) => {
            if (e && e.activePayload && e.activePayload[0]) {
              setSelected(e.activePayload[0].payload);
            }
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ADB7F9" stopOpacity={1} />
              <stop offset="100%" stopColor="#B1B9F8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid horizontal={false} />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#2E2E30", fontSize: 12, fontWeight: 600 }}
            stroke="#E5E7EB"
            reversed={locale === "ar"}
          />

          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

          <Tooltip
            cursor={{ stroke: "#2B3990", strokeWidth: 1 }}
            contentStyle={{
              fontSize: "14px",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value} ${t("currency")}`, ""]}
            labelFormatter={(label) => t("month", { month: label })}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#2B3990"
            fill="url(#colorRevenue)"
            dot={(props) => {
              const { cx, cy, payload } = props;
              const isActive = selected.month === payload.month;
              return (
                <circle
                  key={`dot-${payload.month}`}
                  cx={cx}
                  cy={cy}
                  r={isActive ? 8 : 0}
                  fill="#2B3990"
                  stroke="#fff"
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                />
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
