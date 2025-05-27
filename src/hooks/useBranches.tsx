import { centerService } from "@/services/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ApiError } from "@/lib/error-handling";

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

  return useQuery<BranchCardType[], ApiError>({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await centerService.getBranches();
      return response.map((branch: any) => mapBranchData(branch, t));
    },
  });
};

export const useBranch = (branchId?: string) => {
  return useQuery<any, ApiError>({
    enabled: !!branchId,
    queryKey: ["branch", branchId],
    queryFn: () => centerService.getBranch(branchId!),
  });
};
