import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authen/AuthContext";
import { Button, TextField, Typography, Box } from "@mui/material";
import Breadcrumb from "../components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.config";

export default function CustomerInformation() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    email: "",
    full_name: "",
    role: "",
    created_at: "",
  });

  const [editingInfo, setEditingInfo] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => {
        setInfo({
          email: res.data.email,
          full_name: res.data.full_name,
          role: res.data.role,
          created_at: res.data.created_at,
        });
      })
      .catch((err) => {
        console.error("Lỗi khi lấy user:", err);
        setMessage(
          "Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại."
        );
      });
  }, []);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateInfo = async () => {
    try {
      await axios.put(
        "http://localhost:3000/me",
        {
          ...info,
          currentPassword: password,
        },
        { withCredentials: true }
      );
      setMessage("Cập nhật thông tin thành công!");
      setEditingInfo(false);
      setPassword("");
    } catch (err: any) {
      setMessage(err.response?.data || "Lỗi khi cập nhật.");
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      return setMessage("Mật khẩu mới không khớp!");
    }

    try {
      await axios.put(
        "http://localhost:3000/me",
        {
          currentPassword: password,
          newPassword: newPassword,
          email: info.email,
          full_name: info.full_name,
        },
        { withCredentials: true }
      );
      setMessage("Đổi mật khẩu thành công!");
      setChangingPassword(false);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      setMessage(err.response?.data || "Lỗi khi đổi mật khẩu.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin khách hàng", href: "/customer/info" },
        ]}
      />
      <Box className="p-4 max-w-xl mx-auto">
        <Typography variant="h5" className="mb-4">
          Thông tin tài khoản
        </Typography>

        {!editingInfo && (
          <Box className="mb-6 space-y-2 text-gray-800">
            <Typography>
              <strong>Email:</strong> {info.email}
            </Typography>
            <Typography>
              <strong>Họ tên:</strong> {info.full_name}
            </Typography>
            <Typography>
              <strong>Vai trò:</strong> {info.role}
            </Typography>
            <Typography>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(info.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        )}

        {editingInfo && (
          <>
            <TextField
              label="Email"
              name="email"
              value={info.email}
              fullWidth
              onChange={handleInfoChange}
              disabled={!editingInfo}
              className="mb-4"
            />
            <TextField
              label="Họ tên"
              name="full_name"
              value={info.full_name}
              fullWidth
              onChange={handleInfoChange}
              disabled={!editingInfo}
              className="mb-4"
            />
            <TextField
              label="Nhập mật khẩu để xác nhận"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button
              variant="contained"
              onClick={handleUpdateInfo}
              className="mb-4"
            >
              Xác nhận cập nhật
            </Button>
          </>
        )}

        {changingPassword && (
          <>
            <TextField
              label="Mật khẩu hiện tại"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <TextField
              label="Mật khẩu mới"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4"
            />
            <TextField
              label="Xác nhận mật khẩu mới"
              type="password"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mb-4"
            />
            <Button
              variant="contained"
              onClick={handleUpdatePassword}
              className="mb-4"
            >
              Xác nhận đổi mật khẩu
            </Button>
          </>
        )}

        {message && (
          <Typography className="text-sm text-blue-600 mb-2">
            {message}
          </Typography>
        )}

        <Box className="flex gap-4 mt-4">
          <Button
            variant="outlined"
            onClick={() => {
              setEditingInfo((prev) => !prev);
              setChangingPassword(false);
              setMessage("");
            }}
          >
            {editingInfo ? "Huỷ chỉnh sửa" : "Cập nhật thông tin"}
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setChangingPassword((prev) => !prev);
              setEditingInfo(false);
              setMessage("");
            }}
          >
            {changingPassword ? "Huỷ đổi mật khẩu" : "Thay đổi mật khẩu"}
          </Button>

          <Button variant="outlined" color="error" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Box>
    </>
  );
}
