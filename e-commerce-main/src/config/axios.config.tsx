import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://localhost:3000", // backend URL
  withCredentials: true, // ✅ Cho phép gửi kèm cookie httpOnly
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ❌ KHÔNG cần interceptor gán token nếu bạn dùng cookie để xác thực

export default serverInstance;
