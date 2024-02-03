import { deletingMerch } from "@/mutations/deleteMerch";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMerch = () =>
  useMutation({
    mutationFn: (props) => deletingMerch(props),
  });
