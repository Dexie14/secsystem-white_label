import { resetPass } from "@/mutations/resetPass";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () =>
  useMutation({
    mutationFn: (props) => resetPass(props),
  });
