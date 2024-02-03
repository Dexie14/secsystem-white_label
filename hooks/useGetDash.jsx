import { getDash } from "@/queries/getDashboard"; 
import { useQuery } from "@tanstack/react-query";

import { useToken } from "@/hooks/auth/useToken";

const { token } = useToken();


export const useGetDash = () => {
  return useQuery({
      queryKey: ["admin/dashboard", token],
      queryFn: () => getDash(),
    cacheTime: 0,
    staleTime: 0,
  });
};

