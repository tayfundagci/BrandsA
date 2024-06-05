import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface IProtected {
  loggedIn: boolean;
  isAdmin?: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<IProtected> = ({ loggedIn, isAdmin, children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) {
      logout();
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/");
    }
  }, [loggedIn, isAdmin, user, logout, navigate]);

  return <>{children}</>;
};

export default Protected;
