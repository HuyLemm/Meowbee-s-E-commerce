const API_BASE_URL = "http://localhost:5000/api";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return res.json();
};

const jsonHeader = {
  "Content-Type": "application/json",
};

export const loginApi = (data: LoginRequest): Promise<AuthResponse> =>
  request("/auth/login", {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify(data),
  });

export const verifyTokenApi = (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.resolve({ success: false, message: "No token found" });
  }

  return request("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refreshTokenApi = (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return Promise.resolve({
      success: false,
      message: "No refresh token found",
    });
  }

  return request("/auth/refresh-token", {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify({ refreshToken }),
  });
};