import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { BeeLogo, LoadingSpinner, CheckIcon } from "../utils/BrandDecor";
import { validateLogin } from "../utils/validate";
import { loginApi } from "../api/auth.api";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = `w-full py-3 pl-10 rounded-xl outline-none bg-[#fafaf8] text-[#1a1a1a] border-[1.5px] ${
    error ? "border-red-300" : "border-gray-200"
  }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLogin(email, password);
    if (!validation.valid) return setError(validation.message);

    setLoading(true);

    try {
      const result = await loginApi({ email, password, rememberMe });

      if (!result.success) {
        return setError(result.message || "Wrong email or password!");
      }

      if (result.accessToken) localStorage.setItem("token", result.accessToken);
      if (result.refreshToken) localStorage.setItem("refreshToken", result.refreshToken);
      if (result.user) localStorage.setItem("user", JSON.stringify(result.user));

      onLogin(
        result.user?.fullName ||
          result.user?.email?.split("@")[0] ||
          email.split("@")[0]
      );
    } catch {
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed] font-['DM_Sans']">
      <div className="w-full max-w-[440px] mx-4 rounded-3xl p-8 md:p-10 bg-white border border-[#f3e8d0] shadow-xl">
        <div className="flex justify-center mb-8">
          <BeeLogo dark />
        </div>

        <div className="mb-7 text-center">
          <h1 className="text-[1.75rem] font-extrabold text-[#1a1a1a]">
            Login
          </h1>
          <p className="text-sm text-gray-400">Welcome back to MeowBee!</p>
        </div>

        {error && (
          <div className="flex gap-3 p-3.5 rounded-xl mb-5 bg-rose-50 border border-rose-200">
            <AlertCircle className="w-4 h-4 mt-0.5 text-rose-600" />
            <p className="text-sm font-semibold text-rose-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5 font-medium text-gray-700">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600" />
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                className={`${inputClass} pr-4`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1.5 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-600" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter password"
                className={`${inputClass} pr-12`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />

              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  rememberMe
                    ? "bg-[#f5a623] border-[#f5a623]"
                    : "bg-[#fafaf8] border-gray-300"
                }`}
              >
                {rememberMe && <CheckIcon />}
              </span>

              Remember Me
            </label>

            <button type="button" className="text-sm font-medium text-[#f5a623]">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-[#f5a623] to-[#f7c948] disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-400">
          Don't have an account yet?{" "}
          <button className="font-semibold text-[#f5a623]">
            Register now
          </button>
        </p>

        <div className="mt-4 p-3 rounded-xl text-center bg-[#fff8e6] border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>Demo:</strong> user123@gmail.com · Test@123
          </p>
        </div>
      </div>
    </div>
  );
}