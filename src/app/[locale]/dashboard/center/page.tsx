import AreaComparison from "@/components/charts/AreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";

export default async function CenterDashboardHome() {
  return (
    <div>
      <AreaComparison />
      <CircularProgressChart totalValue={1000} currentValue={350} />
    </div>
  );
}
