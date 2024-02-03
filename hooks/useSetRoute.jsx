import { settingRoute } from "@/mutations/setRoute";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdminRoute = () =>
  useMutation({
    mutationFn: (props) => settingRoute(props),
  });
