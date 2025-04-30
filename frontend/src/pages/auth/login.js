import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const API_URL = "http://localhost:8181/auth/login"; // replace if needed

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      // You can store the JWT/token here if returned
      // localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button variant="contained" type="submit" sx={{ bgcolor: "#f0c14b", color: "black", fontWeight: "bold" }}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
