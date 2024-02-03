import { getMerch } from "@/queries/getMerchant";
import { useQuery } from "@tanstack/react-query";


export const useGetMerch = () => {
  return useQuery({
      queryKey: ["merch"],
      queryFn: () => getMerch(),
    staleTime: 1000 * 5 * 5,
  });
};

