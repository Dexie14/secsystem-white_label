import { getAdmin } from "@/queries/getAdminProfile";
import { useQuery } from "@tanstack/react-query";

export const useGetAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: () => getAdmin(),
    // staleTime: 1000 * 5 * 5,
    refetchInterval: 1000,
    refetchQueries: 1000,
    // refetchIntervalInBackground: true,
  });
};
