import { getRoute } from "@/queries/getRoute";
import { useQuery } from "@tanstack/react-query";


export const useGetRoute = () => {
  return useQuery({
      queryKey: ["route"],
      queryFn: () => getRoute(),
    staleTime: 1000 * 5 * 5,
  });
};

