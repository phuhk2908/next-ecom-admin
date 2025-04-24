import { categoryApi } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data, isLoading, isSuccess, refetch, error, status } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getCategories,
  });

  return {
    categories: data?.items || [],
    isLoading,
    isSuccess,
    refetch,
    status,
    error,
  };
};

export const useCategory = (id: string) => {
  const { data, isLoading, isSuccess, refetch, error, status } = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getCategory(id),
    enabled: !!id,
  });

  return {
    category: data || {},
    isLoading,
    isSuccess,
    refetch,
    status,
    error,
  };
};
