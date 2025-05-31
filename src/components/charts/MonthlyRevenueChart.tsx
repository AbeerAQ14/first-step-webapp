"use client";

import { useState } from "react";
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

const data: RevenueData[] = [
  { month: "01", value: 950 },
  { month: "02", value: 1000 },
  { month: "03", value: 960 },
  { month: "04", value: 990 },
  { month: "05", value: 970 },
];

export default function RevenueChart() {
  const [selected, setSelected] = useState<RevenueData>(data[1]);

  return (
    <div
      className="p-4 rounded-xl bg-white shadow-[0_0_4px_rgba(34,34,34,.16)] w-full max-w-md"
      dir="rtl"
    >
      <div className="text-sm text-gray-500 mb-2">
        <span className="text-primary font-bold text-lg">
          العائد لشهر {selected.month}
        </span>
        <div className="text-mid-gray font-bold text-xl">
          {selected.value} ر.س
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
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
          />

          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

          <Tooltip
            cursor={{ stroke: "#2B3990", strokeWidth: 1 }}
            contentStyle={{
              fontSize: "14px",
              borderRadius: "8px",
              direction: "rtl",
            }}
            formatter={(value: number) => [`${value} ر.س`, ""]}
            labelFormatter={(label) => `الشهر ${label}`}
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
