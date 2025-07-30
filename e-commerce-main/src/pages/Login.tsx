// src/pages/Login.tsx
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authen/AuthContext";
import { Button, TextField, Typography, Box } from "@mui/material";
import AuthLayout from "../components/layout/AuthLayout";

interface LoginInputs {
  username: string;
  password: string;
}

const Login = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: "",
    password: "",
  });
  const [err, setErr] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err: any) {
      setErr(err?.response?.data || "Login failed");
    }
  };

  return (
    <AuthLayout isLogin>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col gap-6 mt-4"
        onSubmit={handleLogin}
      >
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        {err && <Typography className="text-red-500 text-sm">{err}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default Login;
