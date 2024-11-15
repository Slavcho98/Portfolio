import { useQuery } from "@tanstack/react-query";

import { getRecommendations } from "../services/apiEvents";

export function useRecommendations() {
  const {
    isPending,
    data: recommendations,
    error,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: getRecommendations,
  });

  return { isPending, error, recommendations };
}
