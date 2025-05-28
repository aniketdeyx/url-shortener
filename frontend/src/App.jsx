import { Outlet } from "@tanstack/react-router"
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getCurrentUser } from "./api/user.api";

const App = () => {
  const { login } = useAuth();
  
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          login(user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);
  return(
    <>
    <Outlet />
    </>
  )
}

export default App