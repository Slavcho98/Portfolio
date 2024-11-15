// ConnectionsList.tsx
import { Alert, Box, Stack, Typography } from "@mui/material";
import SearchBar from "../../ui/SearchBar";
import ConnectionsListItem from "./ConnectionsListItem";
import { useFriendsList } from "../../hooks/useFriendsList";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";

export default function ConnectionsList() {
  const { isPending, error, friendsList } = useFriendsList();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error" sx={{ fontSize: ".7em" }}>
        Настана грешка при вчитувањето на листата со пријатели.
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 9px 80px 0px #2F41581F",
        p: 2.5,
        borderRadius: "20px",
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        Листа на конекции
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
      >
        <Typography
          variant="caption"
          fontSize={11}
          sx={{ pr: 1, whiteSpace: "nowrap" }}
        >
          Додади конекција
        </Typography>

        <SearchBar />
      </Stack>
      <Stack direction="row" justifyContent="space-between" pt={2}>
        <Typography variant="caption" fontWeight={700}>
          Последно додадени
        </Typography>
        <Link to="#" style={{ color: "#E87B22", fontSize: 13 }}>
          Види ги сите
        </Link>
      </Stack>
      <Box sx={{ py: 2 }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          {friendsList?.map((friend, index) => (
            <ConnectionsListItem key={index} friend={friend} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
