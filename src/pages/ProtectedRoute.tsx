import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ChildrenProps } from "../types/types";
import { useEffect } from "react";

function ProtectedRoute({ children }: ChildrenProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return children;
}

export default ProtectedRoute;
