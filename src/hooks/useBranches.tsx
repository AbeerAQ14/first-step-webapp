import { apiClient } from "@/services/api";
import { centerService } from "@/services/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export interface BranchCardType {
  id: number;
  name: string;
  address: string;
  childrenCount: number;
  bookingsCount: number;
  acceptedAges: string[];
  services: string[];
  imageUrl?: string;
}

const mapBranchData = (apiData: any, t: any): BranchCardType => {
  return {
    id: apiData.id,
    name: apiData.name,
    address: `${apiData.city}، ${apiData.neighborhood}`,
    childrenCount: 0,
    bookingsCount: 0,
    acceptedAges: [
      ...(apiData.accepted_ages?.map((id: string) => t(`centerAges.${id}`)) ||
        []),
    ],
    services: [
      ...(apiData.services?.map((id: string) => t(`centerServices.${id}`)) ||
        []),
      ...(apiData.additional_service ? [apiData.additional_service] : []),
    ],
    imageUrl: apiData.image || null,
  };
};

export const useBranches = () => {
  const t = useTranslations("options");

  return useQuery<BranchCardType[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await centerService.getBranches();

      const branches = response.data.map((branch: any) =>
        mapBranchData(branch, t)
      );

      console.log(branches);

      return branches;
    },
  });
};
