import { requestPasswordReset } from "@/mutations/requestPasswordReset";
import { useMutation } from "@tanstack/react-query";



export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: (props) => requestPasswordReset(props),
  });
