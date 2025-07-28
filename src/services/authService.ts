import apiClient from "../lib/axios";
import type { User } from "../stores/auth.store";
import type { RegisterPayload, LoginPayload } from "../types/auth";
import { jwtDecode } from "jwt-decode";

/**
 * @file authService.ts
 * @description Lớp dịch vụ để tương tác với các API xác thực (đăng ký, đăng nhập).
 */

/**
 * Gửi yêu cầu đăng ký tài khoản mới đến API.
 * @param {RegisterPayload} payload - Dữ liệu đăng ký của người dùng (username, email, password).
 * @returns {Promise<any>} Dữ liệu trả về từ API, thường là thông báo thành công.
 */
export const register = async (payload: RegisterPayload) => {
  // Thực hiện một HTTP POST request đến endpoint 'auth/signup'.
  const response = await apiClient.post("auth/signup", payload);
  return response.data;
};

/**
 * Gửi yêu cầu đăng nhập đến API.
 * @param {LoginPayload} payload - Thông tin đăng nhập của người dùng (username, password).
 * @returns {Promise<{user: User, token: string}>} Một object chứa thông tin user và token.
 */
export const login = async (payload: LoginPayload) => {
  // Thực hiện HTTP POST request đến 'auth/signin'.
  const response = await apiClient.post("auth/signin", payload);
  const { token } = response.data;

  // Nếu API trả về một token...
  if (token) {
    // **Mentor's Note: Giải mã JWT ở phía Client**
    // Thư viện `jwt-decode` cho phép chúng ta xem nội dung (payload) của một JWT
    // mà không cần xác minh chữ ký. Điều này hữu ích để lấy nhanh thông tin cơ bản.
    const decodedToken: {
      sub: string; // `sub` (Subject) thường chứa username hoặc ID người dùng.
      iat: number; // `iat` (Issued At) là thời điểm token được tạo.
      exp: number; // `exp` (Expiration Time) là thời điểm token hết hạn.
    } = jwtDecode(token);

    // Tạo một đối tượng `User` tạm thời từ thông tin trong token.
    // Lưu ý: Cách làm này có thể không lấy được đầy đủ thông tin (như id, email đầy đủ).
    // Một giải pháp tốt hơn là sau khi đăng nhập, gọi thêm một API tới endpoint '/users/me'
    // để lấy toàn bộ thông tin chi tiết của người dùng.
    const user: User = {
      id: 0, // Tạm thời gán id = 0 vì không có trong token.
      username: decodedToken.sub, // Lấy username từ `sub` claim.
      email: "", // Tạm thời gán rỗng vì không có trong token.
    };

    // Trả về cả thông tin người dùng và token để store có thể cập nhật.
    return { user, token };
  }

  // Nếu không có token, trả về dữ liệu gốc từ response (thường là lỗi).
  return response.data;
};
