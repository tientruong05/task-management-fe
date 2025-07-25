// Data structure required for user registration request
export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}

// Data structure required for user login request
export interface LoginPayload {
  username: string;
  password: string;
}
