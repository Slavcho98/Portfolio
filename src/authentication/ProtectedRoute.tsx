import { useUser } from "../authentication/useUser";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { Box } from "@mui/material";
import Spinner from "../ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated, fetchStatus } = useUser();

  useEffect(() => {
    if (!isPending && !isAuthenticated && fetchStatus !== "fetching") {
      navigate("/signup");
    }
  }, [isPending, isAuthenticated, fetchStatus, navigate]);

  if (isPending) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
