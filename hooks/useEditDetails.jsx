import { editingDetails } from "@/mutations/editDetail";
import { useMutation } from "@tanstack/react-query";

export const useEditDetails = () =>
  useMutation({
    mutationFn: (props) => editingDetails(props),
  });
