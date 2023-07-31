import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("token");
    navigate("/");
    navigate(0);
  }, [navigate]);

  return null;
};
