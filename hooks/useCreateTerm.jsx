import { createNewTerminal } from "@/mutations/createTerm";
import { useMutation } from "@tanstack/react-query";

export const useCreateTerm = () =>
  useMutation({
    mutationFn: (props) => createNewTerminal(props),
  });
