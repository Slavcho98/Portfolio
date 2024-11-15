import { useQuery } from "@tanstack/react-query";
import { getFriendsList } from "../services/apiEvents";

export function useFriendsList() {
  const {
    isPending,
    data: friendsList,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsList,
  });

  return { isPending, error, friendsList };
}
