import { Alert, Box, Divider, Typography } from "@mui/material";
import Agenda from "./Agenda";
import useConferenceAgenda from "../../hooks/useConferenceAgenda";
import { useSearchParams } from "react-router-dom";
import Filter from "../EventsPageComponents/Filter";
import Spinner from "../Spinner";

const styles = {
  container: { width: "85%", mx: "auto", py: 15, },
  header: { fontWeight: 600, textAlign: "center" },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    mx: "auto",
    py: 5,
  },
  filterContainer: {
    width: "15%",
    display: "flex",
    justifyContent: "space-between",
    pb: 2,
  },
  divider: { backgroundColor: "#E87B22" },
  agendaList: { pt: 3 },
  spinnerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const customButtonStyles = (isActive: boolean) => ({
  color: isActive ? "#E87B22" : "#21383E",
  textTransform: "capitalize",
  fontSize: "1rem",
  p: 0,
});

type AgendaType = {
  title: string;
};

const filterOptions = [
  { value: "Ден_1", label: "Ден 1" },
  { value: "Ден_2", label: "Ден 2" },
];

function AgendaList({ title }: AgendaType) {
  const { isPending, error, conferenceAgenda } = useConferenceAgenda();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category") || "Ден_1";

  const filteredAgenda = conferenceAgenda
    ?.filter((agenda) => {
      if (filterValue === "Ден_1") return agenda.status === "day1";
      if (filterValue === "Ден_2") return agenda.status === "day2";
      return false;
    })
    ?.sort((a, b) => a.id - b.id);

  if (isPending) {
    return (
      <Box sx={styles.spinnerWrapper}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorWrapper}>
        <Alert variant="filled" severity="error">
          Настана грешка при вчитувањето податоци
        </Alert>
      </Box>
    );
  }

  return (

    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.header}>
        {title}
      </Typography>

      <Box sx={styles.contentWrapper}>
        <Box sx={styles.filterContainer}>
          <Filter
            disableWhenActive={false}
            filterField="category"
            options={filterOptions}
            buttonStyles={customButtonStyles}
            defaultValue="Ден_1"
          />
        </Box>

        <Divider sx={styles.divider} />
        <Box sx={styles.agendaList}>
          {filteredAgenda?.map((agenda) => (
            <Agenda key={agenda.id} data={agenda} />
          ))}
        </Box>
      </Box>
      

    </Box>
  );
}

export default AgendaList;
