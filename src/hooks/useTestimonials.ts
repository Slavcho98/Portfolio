import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../services/apiEvents";

export function useTestimonials() {
  const {
    isPending,
    data: testimonialsList,
    error,
  } = useQuery({
    queryKey: ["speakersTestimonials"],
    queryFn: getTestimonials,
  });

  return { isPending, error, testimonialsList };
}
