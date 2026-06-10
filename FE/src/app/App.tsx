import { useEffect, useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { verifyTokenApi } from "./api/auth.api";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCheckingAuth(false);
        return;
      }

      const result = await verifyTokenApi();

      if (result.success && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        setLoggedInUser(result.user.fullName || result.user.email);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLoggedInUser(null);
      }

      setCheckingAuth(false);
    };

    checkToken();
  }, []);

  const handleLogin = (username: string) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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