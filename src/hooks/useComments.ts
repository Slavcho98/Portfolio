import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/apiEvents";

export function useComments() {
  const {
    isLoading,
    data: commentsData,
    error,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const sortedComments = commentsData?.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return { isLoading, error, commentsData: sortedComments };
}
