import { getTranslations } from "next-intl/server";
import MonthlyAreaComparison from "@/components/charts/MonthlyAreaComparison";
import CircularProgressChart from "@/components/charts/CircularProgressChart";
import Numbers from "@/components/dashboard/center-bookings/Numbers";
import TopBookings from "@/components/dashboard/center-bookings/TopBooking";
import MonthlyRevenueChart from "@/components/charts/MonthlyRevenueChart";

const CARDS = [
  {
    title: "عدد الفروع",
    icon: (
      <svg
        width={46}
        height={49}
        viewBox="0 0 46 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.541 33.78a2 2 0 1 1 1.12 3.84c-1 .292-1.72.6-2.182.88.476.286 1.228.606 2.272.904 2.31.66 5.616 1.096 9.35 1.096s7.04-.436 9.35-1.096c1.046-.298 1.796-.618 2.272-.904-.46-.28-1.18-.588-2.18-.88a2 2 0 0 1 1.118-3.84c1.336.39 2.56.89 3.5 1.532.87.598 1.94 1.64 1.94 3.188 0 1.566-1.096 2.616-1.98 3.214-.956.644-2.206 1.146-3.572 1.536-2.756.79-6.448 1.25-10.448 1.25s-7.692-.46-10.448-1.25c-1.366-.39-2.616-.892-3.572-1.536-.884-.6-1.98-1.648-1.98-3.214 0-1.548 1.07-2.59 1.94-3.188.94-.642 2.164-1.142 3.5-1.532m10.56-18.28c-3.08 0-5.004 3.334-3.464 6a4 4 0 0 0 3.464 2c3.08 0 5.004-3.334 3.464-6a4 4 0 0 0-3.464-2"
          fill="#83CBAA"
        />
        <path
          opacity={0.3}
          d="M23.1 4.5a15 15 0 0 1 15 15c0 5.136-2.8 9.312-5.7 12.28a33 33 0 0 1-3.705 3.23c-1.188.892-3.904 2.564-3.904 2.564a3.42 3.42 0 0 1-3.38 0 42 42 0 0 1-3.904-2.564 33 33 0 0 1-3.706-3.23c-2.9-2.968-5.7-7.144-5.7-12.28a15 15 0 0 1 15-15"
          fill="#83CBAA"
        />
      </svg>
    ),
  },
  {
    title: "عدد أولياء الأمور",
    icon: (
      <svg
        width={49}
        height={49}
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.611 28.5a4.5 4.5 0 0 1 4.496 4.5v1.15c0 1.788-.64 3.518-1.8 4.876-3.14 3.666-7.914 5.476-14.206 5.476s-11.064-1.81-14.196-5.48a7.5 7.5 0 0 1-1.796-4.868v-1.156a4.5 4.5 0 0 1 4.498-4.498zm0 3H12.605a1.5 1.5 0 0 0-1.5 1.5v1.154c0 1.07.384 2.106 1.08 2.92 2.506 2.938 6.44 4.428 11.914 4.428 5.478 0 9.412-1.49 11.926-4.426a4.5 4.5 0 0 0 1.08-2.926v-1.152a1.5 1.5 0 0 0-1.494-1.498M24.101 4.51a10 10 0 1 1 0 20.001 10 10 0 0 1 0-20.001m0 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14"
          fill="#83CBAA"
        />
      </svg>
    ),
  },
  {
    title: "عدد أعضاء الفريق",
    icon: (
      <svg
        width={49}
        height={49}
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.101 7a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m-6.25 3.75a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0m20-1.25a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-5 2.5a5 5 0 1 1 10 0 5 5 0 0 1-10 0m-25 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m2.5-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m1.5 29.995-.25.005a5 5 0 0 1-5-5v-9.375A.625.625 0 0 1 7.226 22h4.41c.1-.918.425-1.77.913-2.5H7.226a3.126 3.126 0 0 0-3.125 3.125V32a7.5 7.5 0 0 0 8.51 7.432 12.5 12.5 0 0 1-.76-2.437m23.74 2.438q.495.066 1.01.067a7.5 7.5 0 0 0 7.5-7.5v-9.375c0-1.725-1.4-3.125-3.125-3.125h-5.322c.49.73.812 1.582.912 2.5h4.41a.625.625 0 0 1 .625.625V32a5 5 0 0 1-5.25 4.995 12.6 12.6 0 0 1-.76 2.438M17.226 19.5a3.126 3.126 0 0 0-3.125 3.125V34.5a10 10 0 1 0 20 0V22.625c0-1.725-1.4-3.125-3.125-3.125zm-.625 3.125a.625.625 0 0 1 .625-.625h13.75a.625.625 0 0 1 .625.625V34.5a7.5 7.5 0 0 1-15 0z"
          fill="#83CBAA"
        />
      </svg>
    ),
  },
];

export default async function CenterDashboardHome() {
  const t = await getTranslations("dashboard.charts.bookings");

  const bookingsRows = [
    {
      month: 4, // April
      value: 3620,
      valueLabel: t("valueLabel"),
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      month: 3, // March
      value: 3620,
      valueLabel: t("valueLabel"),
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      month: 2, // February
      value: 3620,
      valueLabel: t("valueLabel"),
      trend: "up" as const,
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  const childrenRows = [
    {
      month: 4, // April
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 17 }, { v: 13 }, { v: 15 }],
    },
    {
      month: 3, // March
      value: 3620,
      valueLabel: "طفل",
      trend: "down" as const,
      data: [{ v: 18 }, { v: 12 }, { v: 15 }, { v: 10 }, { v: 7 }, { v: 9 }],
    },
    {
      month: 2, // February
      value: 3620,
      valueLabel: "طفل",
      trend: "up" as const,
      data: [{ v: 7 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 15 }, { v: 17 }],
    },
  ];

  return (
    <div className="grid gap-y-10">
      <div className="flex flex-wrap gap-5 xl:gap-20 text-center">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="flex-1 flex flex-col items-center p-6 rounded-3xl shadow-[0_0_2px_rgba(0,0,0,.08)]"
          >
            {card.icon}
            <span className="mt-4 mb-2 text-secondary-mint-green font-bold text-4xl lg:text-5xl">
              200
            </span>
            <span className="text-xl lg:text-2xl text-primary font-bold">
              {card.title}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <Numbers />
        </div>

        <div className="flex-1">
          <MonthlyAreaComparison title={t("title")} rows={bookingsRows} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-3xs">
          <MonthlyRevenueChart />
        </div>
        <div className="flex-1">
          <TopBookings />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <CircularProgressChart totalValue={1000} currentValue={350} />
        </div>

        <div className="flex-1">
          <MonthlyAreaComparison
            title={"مقارنة عدد الأطفال"}
            rows={childrenRows}
          />
        </div>
      </div>
    </div>
  );
}
