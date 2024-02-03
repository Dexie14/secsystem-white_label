import { getTrans } from "@/queries/getAllTrans";
import { useQuery } from "@tanstack/react-query";

export const useGetTrans = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: () => getTrans(),
    cacheTime: 0,
    staleTime: 0,
  });
};
