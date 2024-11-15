import { Box, SxProps, Theme } from "@mui/material";
import { BlogCardsComponentProps } from "../types/type";
import { useBlogCards } from "../hooks/useBlogCards";
import ActionCard from "../features/ActionCard/ActionCard";
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode;
};

export default function BlogsCards({
  queryFn,
  queryKey,
  children,
  sx,
}: BlogCardsComponentProps & Props) {
  const { isLoading, error, events } = useBlogCards({ queryFn, queryKey });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        width: "85%",
        mx: "auto",
        pt: "10rem",
        pb: 5,
        ...sx,
      }}
    >
      <ErrorDisplay error={error} />
      {children}
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pt: 10 }}
      >
        {events?.map((event) => (
          <Grid size={{ xs: 12, md: 6 }} key={event.id}>
            <ActionCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
