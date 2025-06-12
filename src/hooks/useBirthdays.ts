import { useQuery } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";

export type Birthday = {
  id: string;
  title: string;
  date: Date;
};

export const useBirthdays = () => {
  const {
    data: birthdays = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      const response = await centerService.getChildrenBirthdays();
      return response.data.map((birthday: any) => ({
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
