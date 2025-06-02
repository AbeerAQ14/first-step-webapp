"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface Row {
  label: string;
  value: number;
  valueLabel: string;
  trend: "up" | "down";
  data: { v: number }[];
}

interface AreaComparisonProps {
  title: string;
  rows: Row[];
}

export default function AreaComparison({ title, rows }: AreaComparisonProps) {
  return (
    <div className="grow flex flex-col items-center gap-y-2 bg-white py-4 px-2.5">
      <p className="font-bold text-primary">{title}</p>
      <div className="flex flex-col items-center gap-2 w-full">
        {rows.map((row, idx) => (
          <div
            className="grow flex items-center justify-between gap-4 py-2.5 w-full max-w-[20.75rem]"
            key={idx}
          >
            {/* Label */}
            <div className="font-medium text-gray">{row.label}</div>

            {/* Mini Area Chart */}
            <div className="w-20 h-8 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={row.data}>
                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke={row.trend === "up" ? "#5DB48A" : "#EB7487"}
                    fillOpacity={row.trend === "up" ? 0.15 : 0.18}
                    fill={row.trend === "up" ? "#5DB48A" : "#EB7487"}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Amount and Arrow */}
            <div className="flex items-center min-w-24 gap-1">
              <span className={`font-medium text-sm text-gray`}>
                {row.value.toLocaleString()} {row.valueLabel}
              </span>

              {row.trend === "up" ? (
                <ArrowUp size={18} className="text-[#5DB48A]" />
              ) : (
                <ArrowDown size={18} className="text-[#EB7487]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
