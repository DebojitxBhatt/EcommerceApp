import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const API_URL = "http://localhost:8181/auth/register"; // replace if needed

export default function RegisterPage() {
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

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      // You can store token if returned
      // localStorage.setItem("token", data.token);
      router.push("/auth/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button variant="contained" type="submit" sx={{ bgcolor: "#f0c14b", color: "black", fontWeight: "bold" }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}
