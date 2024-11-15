import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginProps = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginProps) =>
      loginApi({ email, password }),
    onSuccess: async (data) => {
      const userData = data.data.user.user_metadata as User;

      queryClient.setQueryData(["user"], userData);

      toast.success("Успешно логирање", {
        style: {
          backgroundColor: "#4CAF50",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#4CAF50",
        },
      });

      navigate("/user", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Внесовте погрешни податоци");
    },
  });

  return { login, isPending };
}
