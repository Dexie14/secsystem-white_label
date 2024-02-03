import { createNewMerch } from "@/mutations/createMerch";
import { useMutation } from "@tanstack/react-query";

export const useCreateMerch = () =>
  useMutation({
    mutationFn: (props) => createNewMerch(props),
  });
