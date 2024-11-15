import { Box, SxProps, Theme } from "@mui/material";
import CommentForm from "./CommentForm";
import { useUser } from "../../authentication/useUser";
import Grid from "@mui/material/Grid2";

type Props = {
  sx?: SxProps<Theme>;
};

function CommentSection({ sx }: Props) {
  const { isAuthenticated, fetchStatus } = useUser();

  return (
    <Box>
      <Box
        sx={{
          width: "85%",
          mx: "auto",
          my: "5rem",
          position: "relative",

          ...sx,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              padding: "0 !important",
              position: "relative",
            }}
          >
            {isAuthenticated && fetchStatus ? <CommentForm /> : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CommentSection;
