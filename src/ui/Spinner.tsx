import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

type CircularIndeterminateProps = {
  boxSx?: SxProps<Theme>;
  progressSx?: SxProps<Theme>;
  size?: number;
};

 function Spinner({
  boxSx,
  progressSx,
  size,
}: CircularIndeterminateProps) {
  return (
    <Box sx={{ display: "flex", ...boxSx }}>
      <CircularProgress
        sx={{ color: "#E87B22", ...progressSx }}
        {...(size && { size })}
      />
    </Box>
  );
}
export default Spinner;