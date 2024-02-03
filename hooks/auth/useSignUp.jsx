import { signUp } from "@/mutations/signUp";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () =>
  useMutation({
    mutationFn: (props) => signUp(props),
  });
