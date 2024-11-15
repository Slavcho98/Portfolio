import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../services/apiEvents";

export function useBoardMembers() {
  const {
    isPending,
    data: boardList,
    error,
  } = useQuery({
    queryKey: ["board"],
    queryFn: getBoard,
  });

  return { isPending, error, boardList };
}
