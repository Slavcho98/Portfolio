import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../services/apiEvents";

export function useReplies() {
  const {
    isLoading,
    data: repliesData,
    error,
  } = useQuery({
    queryKey: ["commentReplies"],
    queryFn: getReplies,
  });

  const sortedReplies = repliesData?.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  console.log(repliesData)

  return { isLoading, error, repliesData: sortedReplies };
}
