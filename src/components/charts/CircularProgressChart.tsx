import React from "react";
import { dashboardIcons } from "@/components/general/icons";

interface CircularProgressChartProps {
  currentValue: number;
  totalValue: number;
}

const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
  currentValue,
  totalValue,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold mb-4">عدد الأطفال</div>{" "}
      {/* Top Label */}
      <div className="relative">
        <CircularCut value={currentValue} max={totalValue} />
        <dashboardIcons.Circle />
      </div>
      <div className="text-lg font-bold mt-4">
        سعة الحضانة: {totalValue} طفل
      </div>{" "}
      {/* Bottom Label */}
    </div>
  );
};

export default CircularProgressChart;

function CircularCut({
  value,
  max,
  color = "#D9534F",
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const percent = value / max;
  const angle = 360 * percent;

  return (
    <div
      className="absolute inset-0 rounded-full mix-blend-color-burn"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `conic-gradient(black 0deg, black ${angle}deg, transparent ${angle}deg)`,
        maskImage: `conic-gradient(black 0deg, black ${angle}deg, transparent ${angle}deg)`,
      }}
    />
  );
}
