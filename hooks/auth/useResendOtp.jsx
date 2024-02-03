import { resendOtp } from "@/mutations/resendOtp"; 
import { useMutation } from "@tanstack/react-query";

export const useResendAccount = () =>
  useMutation({
    mutationFn: (props) => resendOtp(props),
  });
