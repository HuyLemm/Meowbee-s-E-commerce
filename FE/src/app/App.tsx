import { useEffect, useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { verifyTokenApi, refreshTokenApi } from "./api/auth.api";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token && !refreshToken) {
        setCheckingAuth(false);
        return;
      }

      const verifyResult = await verifyTokenApi();

      if (verifyResult.success && verifyResult.user) {
        localStorage.setItem("user", JSON.stringify(verifyResult.user));
        setLoggedInUser(verifyResult.user.fullName || verifyResult.user.email);
        setCheckingAuth(false);
        return;
      }

      const refreshResult = await refreshTokenApi();
      console.log("Refresh token API result:", refreshResult);

      if (refreshResult.success && refreshResult.accessToken) {
        localStorage.setItem("token", refreshResult.accessToken);

        if (refreshResult.refreshToken) {
          localStorage.setItem("refreshToken", refreshResult.refreshToken);
        }

        if (refreshResult.user) {
          localStorage.setItem("user", JSON.stringify(refreshResult.user));
          setLoggedInUser(
            refreshResult.user.fullName || refreshResult.user.email
          );
        } else {
          const savedUser = localStorage.getItem("user");

          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setLoggedInUser(parsedUser.fullName || parsedUser.email);
          }
        }

        setCheckingAuth(false);
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      setLoggedInUser(null);
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (username: string) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("username");

    setLoggedInUser(null);
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!loggedInUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <HomePage username={loggedInUser} onLogout={handleLogout} />;
}