import { getHealth } from "@/queries/getHealthReport";
import { useQuery } from "@tanstack/react-query";


export const useGetingHealth = () => {
  return useQuery({
      queryKey: ["health"],
      queryFn: () => getHealth(),
    staleTime: 1000 * 5 * 5,
  });
};

