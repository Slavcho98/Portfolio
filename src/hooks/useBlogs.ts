import { useQuery } from "@tanstack/react-query";

import { getBlogs } from "../services/apiEvents";

export function useBlogs() {
  const {
    isPending,
    data: blogsData,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return { isPending, error, blogsData };
}
