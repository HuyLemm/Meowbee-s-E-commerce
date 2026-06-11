import { useEffect, useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { verifyTokenApi, refreshTokenApi } from "./api/auth.api";

const clearAuth = () =>
  ["token", "refreshToken", "user", "username"].forEach((key) =>
    localStorage.removeItem(key)
  );

const getName = (user: any) => user?.fullName || user?.email || null;

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!localStorage.getItem("token") && !localStorage.getItem("refreshToken")) return;

        let result = await verifyTokenApi();

        if (!result.success) {
          result = await refreshTokenApi();

          if (result.accessToken) localStorage.setItem("token", result.accessToken);
          if (result.refreshToken) localStorage.setItem("refreshToken", result.refreshToken);
        }

        if (result.success && result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
          setUser(getName(result.user));
        } else {
          clearAuth();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return user ? (
    <HomePage username={user} onLogout={logout} />
  ) : (
    <LoginPage onLogin={setUser} />
  );
}