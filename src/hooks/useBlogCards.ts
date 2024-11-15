import { useQuery } from "@tanstack/react-query";
import { BlogCardsHookProps, EventItem } from "../types/type";


export function useBlogCards({ queryFn, queryKey }: BlogCardsHookProps) {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery<EventItem[]>({
    queryKey: [queryKey],
    queryFn,
  });

  return { isLoading, error, events };
}
