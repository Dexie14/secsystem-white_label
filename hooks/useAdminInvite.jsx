import { sendAdminInvite } from "@/mutations/inviteAdmin";
import { useMutation } from "@tanstack/react-query";

export const useAdminInvite = () =>
  useMutation({
    mutationFn: (props) => sendAdminInvite(props),
  });
