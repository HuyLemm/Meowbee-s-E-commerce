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

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface VerifyTokenResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const verifyTokenApi = async (): Promise<VerifyTokenResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      success: false,
      message: "No token found",
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
};

export const refreshTokenApi = async (): Promise<LoginResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return {
      success: false,
      message: "No refresh token found",
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();
  return result;
};