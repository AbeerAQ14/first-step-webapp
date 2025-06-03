import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { centerService } from "@/services/dashboardApi";

export type Occasion = {
  id: string;
  title: string;
  date: Date;
};

export const useOccasions = () => {
  const queryClient = useQueryClient();

  const {
    data: occasions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["occasions"],
    queryFn: async () => {
      const response = await centerService.getOccasions();
      return response.data.map((occasion: any) => ({
        id: occasion.id,
        title: occasion.title,
        date: new Date(occasion.date),
      }));
    },
  });

  const addOccasion = useMutation({
    mutationFn: async (item: Omit<Occasion, "id">) => {
      const response = await centerService.createOccasion({
        title: item.title,
        date: item.date.toISOString().split("T")[0],
      });
      return response;
    },
    onMutate: async (newOccasion) => {
      await queryClient.cancelQueries({ queryKey: ["occasions"] });
      const previousOccasions = queryClient.getQueryData<Occasion[]>([
        "occasions",
      ]);

      queryClient.setQueryData<Occasion[]>(["occasions"], (old = []) => [
        ...old,
        { ...newOccasion, id: crypto.randomUUID() },
      ]);

      return { previousOccasions };
    },
    onError: (err, newOccasion, context) => {
      if (context?.previousOccasions) {
        queryClient.setQueryData(["occasions"], context.previousOccasions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
    },
  });

  const updateOccasion = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Occasion>;
    }) => {
      await centerService.updateOccasion(id, {
        title: updates.title || "",
        date:
          updates.date?.toISOString().split("T")[0] ||
          new Date().toISOString().split("T")[0],
      });
    },
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["occasions"] });
      const previousOccasions = queryClient.getQueryData<Occasion[]>([
        "occasions",
      ]);

      queryClient.setQueryData<Occasion[]>(["occasions"], (old = []) =>
        old.map((occasion: Occasion) =>
          occasion.id === id ? { ...occasion, ...updates } : occasion
        )
      );

      return { previousOccasions };
    },
    onError: (err, variables, context) => {
      if (context?.previousOccasions) {
        queryClient.setQueryData(["occasions"], context.previousOccasions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
    },
  });

  const deleteOccasion = useMutation({
    mutationFn: async (id: string) => {
      await centerService.deleteOccasion(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["occasions"] });
      const previousOccasions = queryClient.getQueryData<Occasion[]>([
        "occasions",
      ]);

      queryClient.setQueryData<Occasion[]>(["occasions"], (old = []) =>
        old.filter((occasion) => occasion.id !== id)
      );

      return { previousOccasions };
    },
    onError: (err, id, context) => {
      if (context?.previousOccasions) {
        queryClient.setQueryData(["occasions"], context.previousOccasions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
    },
  });

  return {
    occasions,
    isLoading,
    error,
    addOccasion,
    updateOccasion,
    deleteOccasion,
  };
};
