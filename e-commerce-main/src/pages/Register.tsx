// src/pages/Register.tsx
import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";
import axios from "axios";
import AuthLayout from "../components/layout/AuthLayout";

interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  const [inputs, setInputs] = useState<RegisterInputs>({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", inputs);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data || "Đã xảy ra lỗi");
    }
  };

  return (
    <AuthLayout isLogin={false}>
      <Typography variant="h4">Register</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col gap-6 mt-4"
      >
        <TextField
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Full Name"
          name="name"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        {error && (
          <Alert severity="error" className="mt-2">
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          className="w-full mt-4"
        >
          Register
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default Register;
