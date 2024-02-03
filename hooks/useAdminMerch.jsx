import { getAdminMerch } from "@/queries/getAdminMerch";
import { useQuery } from "@tanstack/react-query";


export const useGetAdminMerch = () => {
  return useQuery({
      queryKey: ["Adminmerch"],
      queryFn: () => getAdminMerch(),
    staleTime: 1000 * 5 * 5,
  });
};

