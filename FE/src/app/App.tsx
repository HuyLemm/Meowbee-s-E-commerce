import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";

// MARKER-MAKE-KIT-INVOKED — no @make-kits package installed; using Tailwind + Radix + lucide-react

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!loggedInUser) {
    return <LoginPage onLogin={(username) => setLoggedInUser(username)} />;
  }

  return (
    <HomePage
      username={loggedInUser}
      onLogout={() => setLoggedInUser(null)}
    />
  );
}
