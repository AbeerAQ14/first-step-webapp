"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Demo data for the sparkline charts and months, Arabic
const rows = [
  {
    month: "شهر إبريل",
    value: 3620,
    trend: "up",
    data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
  },
  {
    month: "شهر مارس",
    value: 3620,
    trend: "down",
    data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
  },
  {
    month: "شهر فبراير",
    value: 3620,
    trend: "up",
    data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
  },
];

export default function AreaComparison() {
  return (
    <div className="bg-white rounded-xl shadow w-full max-w-xl py-8 px-6 font-tajawal">
      <div className="text-[1.45rem] font-bold mb-8 text-primary text-right">
        مقارنة الحجوزات
      </div>
      <div className="flex flex-col gap-7">
        {rows.map((row, idx) => (
          <div className="flex items-center justify-between gap-4" key={idx}>
            {/* Amount and Arrow */}
            <div className="flex items-center min-w-24 gap-1">
              {row.trend === "up" ? (
                <ArrowUp size={18} className="text-[#2ECC71]" />
              ) : (
                <ArrowDown size={18} className="text-[#EA384C]" />
              )}
              <span
                className={`text-lg ${
                  row.trend === "up" ? "text-[#2ECC71]" : "text-[#EA384C]"
                }`}
              >
                {row.value.toLocaleString("ar-EG")} ر.س
              </span>
            </div>

            {/* Mini Area Chart */}
            <div className="w-24 h-8 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={row.data}>
                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke={row.trend === "up" ? "#2ECC71" : "#EA384C"}
                    fillOpacity={row.trend === "up" ? 0.15 : 0.18}
                    fill={row.trend === "up" ? "#2ECC71" : "#EA384C"}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Month */}
            <div className="text-right font-medium text-gray-700 text-lg">
              {row.month}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
