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
    <div className="grow flex flex-col items-center gap-y-5 py-4">
      <div className="font-bold text-primary">عدد الأطفال</div>

      <div className="relative">
        <div className="z-10 absolute inset-0 flex flex-col items-center justify-center font-bold text-info">
          <span className="-mb-1 text-3xl">{currentValue}</span>
          <span>طفل</span>
        </div>

        <CircularCut value={currentValue} max={totalValue} />
        <dashboardIcons.Circle />
      </div>

      <div className="font-medium text-gray">سعة الحضانة: {totalValue} طفل</div>
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
