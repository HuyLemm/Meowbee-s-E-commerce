import { useEffect, useState } from "react";
import { BeeLogo, BackgroundDecor, LoadingSpinner, CheckIcon } from "../utils/BrandDecor";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";

import { validateLogin } from "../utils/validate";
import { loginApi } from "../api/auth.api";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

type FormState = "idle" | "error";

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLogin(email, password);

    if (!validation.valid) {
      setErrorMessage(validation.message);
      setFormState("error");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginApi({
        email,
        password,
        rememberMe,
      });

      if (result.success) {
        console.log(result);
        if (result.accessToken) {
          localStorage.setItem("token", result.accessToken);
        }

        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        const username =
          result.user?.fullName ||
          result.user?.email?.split("@")[0] ||
          email.split("@")[0];

        onLogin(username);
        return;
      }

      setErrorMessage(result.message || "Wrong email or password!");
      setFormState("error");
    } catch (error) {
      setErrorMessage("Cannot connect to server. Please try again.");
      setFormState("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background:
          "linear-gradient(150deg, #fef9f0 0%, #fff7ed 50%, #fdf4e7 100%)",
      }}
    >
      <BackgroundDecor />

      {/* Card */}
      <div
        className="relative w-full mx-4 rounded-3xl p-8 md:p-10"
        style={{
          maxWidth: 440,
          background: "#ffffff",
          border: "1px solid #f3e8d0",
          boxShadow:
            "0 8px 48px rgba(245,166,35,0.12), 0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <BeeLogo />
        </div>

        <div className="mb-7 text-center">
          <h1
            className="mb-1.5"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "#1a1a1a",
            }}
          >
            Login
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            Welcome back to MeowBee!
          </p>
        </div>

        {/* Error state */}
        {formState === "error" && (
          <div
            className="flex items-start gap-3 p-3.5 rounded-xl mb-5"
            style={{
              background: "#fff0f3",
              border: "1px solid #ffccd5",
            }}
          >
            <AlertCircle
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: "#e11d48" }}
            />

            <div>
              <p
                className="text-sm"
                style={{
                  color: "#be123c",
                  fontWeight: 600,
                }}
              >
                {errorMessage || "Wrong email or password!"}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className="block text-sm mb-1.5"
              style={{
                color: "#374151",
                fontWeight: 500,
              }}
            >
              Email
            </label>

            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#d1a84b" }}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormState("idle");
                  setErrorMessage("");
                }}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all"
                style={{
                  background: "#fafaf8",
                  border:
                    formState === "error"
                      ? "1.5px solid #fca5a5"
                      : "1.5px solid #e5e7eb",
                  color: "#1a1a1a",
                  fontSize: "0.9375rem",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1.5px solid #f5a623")
                }
                onBlur={(e) =>
                  (e.target.style.border =
                    formState === "error"
                      ? "1.5px solid #fca5a5"
                      : "1.5px solid #e5e7eb")
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm mb-1.5"
              style={{
                color: "#374151",
                fontWeight: 500,
              }}
            >
              Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#d1a84b" }}
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormState("idle");
                  setErrorMessage("");
                }}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 rounded-xl outline-none transition-all"
                style={{
                  background: "#fafaf8",
                  border:
                    formState === "error"
                      ? "1.5px solid #fca5a5"
                      : "1.5px solid #e5e7eb",
                  color: "#1a1a1a",
                  fontSize: "0.9375rem",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1.5px solid #f5a623")
                }
                onBlur={(e) =>
                  (e.target.style.border =
                    formState === "error"
                      ? "1.5px solid #fca5a5"
                      : "1.5px solid #e5e7eb")
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded"
                style={{ color: "#9ca3af" }}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />

                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                  style={{
                    background: rememberMe ? "#f5a623" : "#fafaf8",
                    border: rememberMe
                      ? "1.5px solid #f5a623"
                      : "1.5px solid #d1d5db",
                  }}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <CheckIcon />}
                </div>
              </div>

              <span
                className="text-sm"
                style={{ color: "#6b7280" }}
              >
                Remember Me
              </span>
            </label>

            <button
              type="button"
              className="text-sm transition-colors"
              style={{
                color: "#f5a623",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #f5a623, #f7c948)",
              color: "#1a1a1a",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 6px 24px rgba(245,166,35,0.4)",
              opacity: isLoading ? 0.8 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "#9ca3af" }}
        >
          Don't have an account yet?{" "}
          <button
            className="transition-colors"
            style={{
              color: "#f5a623",
              fontWeight: 600,
            }}
          >
            Register now
          </button>
        </p>

        {/* Demo hint */}
        <div
          className="mt-4 p-3 rounded-xl text-center"
          style={{
            background: "#fff8e6",
            border: "1px solid #fde68a",
          }}
        >
          <p
            className="text-xs"
            style={{ color: "#92400e" }}
          >
            <strong>Demo:</strong> user123@gmail.com · Test@123
          </p>
        </div>
      </div>
    </div>
  );
}