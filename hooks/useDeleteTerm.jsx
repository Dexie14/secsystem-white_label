import { deletingTerm } from "@/mutations/deleteTerm";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTerm = () =>
  useMutation({
    mutationFn: (props) => deletingTerm(props),
  });
