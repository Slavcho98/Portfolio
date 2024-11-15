import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data.data.user);
      toast.success(
        "Успешно креиран профил!"
      );

      navigate("/user");
    },
  });

  return { signup, isPending };
}
