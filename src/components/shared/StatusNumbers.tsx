"use client";

import { useTranslations } from "next-intl";

export const useStatusNumbers = () => {
  const t = useTranslations("shared.status");

  const numbers = {
    rejected: { title: t("rejected"), value: 10, color: "#F6D6D5" },
    waitingForConfirmation: {
      title: t("waitingForConfirmation"),
      value: 10,
      color: "#FFECC5",
    },
    waitingForPayment: {
      title: t("waitingForPayment"),
      value: 10,
      color: "#F87070",
    },
    confirmed: { title: t("confirmed"), value: 10, color: "#B1CDFB" },
  };

  return numbers;
};

interface CardProps {
  title: string;
  value: number;
  color: string;
}

const Card = ({ title, value, color }: CardProps) => {
  return (
    <div
      className="rounded-xl px-4 py-2 min-w-fit text-primary font-bold"
      style={{ background: color }}
    >
      <p className="whitespace-nowrap">{title}</p>
      <p className="text-4xl">{value}</p>
    </div>
  );
};

const StatusNumbers = () => {
  const numbers = useStatusNumbers();

  return (
    <div className="grow">
      <div className="grid grid-cols-2 gap-4">
        {Object.values(numbers).map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default StatusNumbers;
