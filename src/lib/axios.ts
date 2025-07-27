import axios from "axios";

/**
 * An Axios client instance configured for making API requests.
 * It includes a base URL and default headers for JSON content.
 */
const apiClient = axios.create({
  // The base URL for all API requests
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
