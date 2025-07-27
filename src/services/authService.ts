import apiClient from "../lib/axios";
import type { User } from "../stores/auth.store";
import type { RegisterPayload, LoginPayload } from "../types/auth";
import { jwtDecode } from "jwt-decode";

/**
 * Sends a registration request to the API.
 * @param payload The user registration data.
 * @returns The response data from the API.
 */
export const register = async (payload: RegisterPayload) => {
  const response = await apiClient.post("auth/signup", payload);
  return response.data;
};

/**
 * Sends a login request to the API.
 * @param payload The user login credentials.
 * @returns The response data from the API, typically containing a token.
 */
export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post("auth/signin", payload);
  const { token } = response.data;

  if (token) {
    const decodeToken: {
      sub: string;
      iat: number;
      exp: number;
    } = jwtDecode(token);
    const user: User = {
      id: 0,
      username: decodeToken.sub,
      email: "",
    };
    return { user, token };
  }
  return response.data;
};
