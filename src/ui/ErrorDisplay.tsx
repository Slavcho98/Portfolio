import { Box, Alert } from "@mui/material";

interface ErrorDisplayProps {
  error: Error | null; 
}
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Alert variant="filled" severity="error">
        Настана грешка при вчитувањето податоци
      </Alert>
    </Box>
  );
};

export default ErrorDisplay;
