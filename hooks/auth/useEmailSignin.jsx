import { signinWithEmail } from "@/mutations/signinWithEmail";
import { useMutation } from "@tanstack/react-query";


export const useEmailSignin = () =>
  useMutation({
    mutationFn: (props) => signinWithEmail(props),
  });
