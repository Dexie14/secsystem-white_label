import { verifyOtp } from "@/mutations/verifyOtp"; 
import { useMutation } from "@tanstack/react-query";

export const useVerifyAccount = () =>
  useMutation({
    mutationFn: (props) => verifyOtp(props),
  });
