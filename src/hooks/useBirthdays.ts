import { useQuery } from "@tanstack/react-query";
import { sidebarService } from "@/services/dashboardApi";
import { useHasRole } from "@/store/authStore";

export type Birthday = {
  id: string;
  title: string;
  date: Date;
};

export const useBirthdays = () => {
  const isAdmin = useHasRole("admin");
  const isCenter = useHasRole("center");
  const isParent = useHasRole("parent");

  const {
    data: birthdays = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      let response;

      if (isAdmin) {
        response = await sidebarService.getAdminBirthdays();
      } else if (isCenter) {
        response = await sidebarService.getCenterBirthdays();
      } else if (isParent) {
        response = await sidebarService.getParentBirthdays();
      }
      return response.map((birthday: any) => ({
        id: birthday.id,
        title: birthday.child_name,
        date: new Date(birthday.birthday_date),
      }));
    },
  });

  return {
    birthdays,
    isLoading,
    error,
  };
};
