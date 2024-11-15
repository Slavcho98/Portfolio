import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Промените се зачувани");
      queryClient.setQueryData(["user"], user);

      queryClient.removeQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
