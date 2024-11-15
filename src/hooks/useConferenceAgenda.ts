import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";
import { getAgenda } from "../services/apiAgenda";

function useConferenceAgenda() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter = !filterValue ? null : { field: "status", value: filterValue };

  const {
    isPending,
    data: conferenceAgenda,
    error,
  } = useQuery({
    queryKey: ["conferenceAgenda", filter],
    queryFn: () => getAgenda({ filter }),
  });

  return { isPending, error, conferenceAgenda };
}

export default useConferenceAgenda;
