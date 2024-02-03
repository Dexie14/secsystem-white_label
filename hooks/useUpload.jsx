import { createUpload } from "@/mutations/uploadeFile";
import { useMutation } from "@tanstack/react-query";

export const useCreateUploading = () =>
  useMutation({
    mutationFn: (props) => createUpload(props),
  });
