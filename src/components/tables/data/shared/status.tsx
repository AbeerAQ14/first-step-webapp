import { useTranslations } from "next-intl";

export type ReservationStatus =
  | "confirmed"
  | "waitingForPayment"
  | "waitingForConfirmation"
  | "rejected";

export function useReservationStatus() {
  const t = useTranslations("dashboard.tables.shared.status");

  function getStatusText(status: ReservationStatus): string {
    return t(status);
  }

  function getStatusColorClass(status: ReservationStatus): string {
    switch (status) {
      case "confirmed":
        return "bg-success text-white";
      case "waitingForPayment":
        return "bg-warning text-white";
      case "waitingForConfirmation":
        return "bg-light-gray text-white";
      case "rejected":
        return "bg-danger text-white";
      default:
        return "";
    }
  }

  return {
    getStatusText,
    getStatusColorClass,
  };
}
