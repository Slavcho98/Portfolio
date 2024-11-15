import { Alert, Grid } from "@mui/material";
import Spinner from "../Spinner";
import { useBoardMembers } from "./useBoardMembers";
import BoardMemberItem from "./BoardMemberItem";

function BoardMemberList() {
  const { isPending, error, boardList } = useBoardMembers();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="filled" severity="error" sx={{ fontSize: ".7em" }}>
        Настана грешка при вчитувањето на податоците.
      </Alert>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12 }}>
      {boardList?.map((board) => (
        <Grid item xs={2} sm={4} md={4} key={board.id}>
          <BoardMemberItem board={board} />
        </Grid>
      ))}
    </Grid>
  );
}

export default BoardMemberList;
