import AreaComparison from "@/components/charts/AreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";

export default async function CenterDashboardHome() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <CircularProgressChart totalValue={1000} currentValue={350} />
        <AreaComparison />
      </div>
    </div>
  );
}
