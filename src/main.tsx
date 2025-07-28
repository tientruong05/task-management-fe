/**
 * Đây là điểm khởi đầu (entry point) chính của ứng dụng React.
 * File này chịu trách nhiệm render (hiển thị) component gốc là `App` vào trong DOM.
 *
 * `createRoot` là API từ React 18 để tạo ra một "gốc" (root) cho ứng dụng,
 * cho phép sử dụng các tính năng mới như Concurrent Mode.
 *
 * `StrictMode` là một công cụ giúp phát hiện các vấn đề tiềm ẩn trong ứng dụng.
 * Nó không render ra bất kỳ UI nào và chỉ chạy ở chế độ development.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
