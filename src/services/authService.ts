import apiClient from "../lib/axios";
import type { RegisterPayload, LoginPayload } from "../types/auth";

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
  return response.data;
};
