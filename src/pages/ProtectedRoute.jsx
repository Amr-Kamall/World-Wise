import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FackAuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthanicated } = UseAuth();
  useEffect(
    function () {
      if (isAuthanicated === false) navigate("/");
    },
    [isAuthanicated, navigate]
  );
  return isAuthanicated ? children : null;
}

export default ProtectedRoute;
