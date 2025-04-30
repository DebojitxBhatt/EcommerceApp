import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm) {
      fetch(`http://localhost:8181/products?search=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error("Error fetching suggestions:", err));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    router.push(`/products/${productId}`);
    setQuery("");
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <Head>
        <title>Amazoff Clone</title>
      </Head>
  
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar position="static" sx={{ bgcolor: "#131921" }}>
          <Toolbar sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
            >
              amazoff<span style={{ color: "#f0c14b" }}>.clone</span>
            </Typography>
  
            <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search products..."
                fullWidth
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <IconButton type="submit" sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            </Box>
  
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" href="/auth/login">Login</Button>
              <Button color="inherit" href="/auth/register">Register</Button>
              <Button color="inherit" href="/wishlist">❤️ Wishlist</Button>
              <Button color="inherit" href="/cart">🛒 Cart</Button>
            </Box>
          </Toolbar>
        </AppBar>
  
        {suggestions.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              top: 64,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: "60%",
              maxHeight: 300,
              overflowY: "auto"
            }}
          >
            <List>
              {suggestions.map((product) => (
                <ListItem button key={product.id} onClick={() => handleSuggestionClick(product.id)}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
  
        <Container sx={{ textAlign: "center", mt: 8, flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to amazoff Clone
          </Typography>
          <Typography variant="h6" gutterBottom>
            Shop your favorite items, save to wishlist, and manage your cart seamlessly.
          </Typography>
  
          <Button
            href="/products"
            variant="contained"
            sx={{ mt: 3, bgcolor: "#f0c14b", color: "black", fontWeight: "bold", '&:hover': { bgcolor: "#e2b33e" } }}
          >
            View Products
          </Button>
        </Container>
  
        <Box component="footer" sx={{ bgcolor: "#232f3e", color: "white", textAlign: "center", p: 2 }}>
          @amazoff 2025 All rights reserved
        </Box>
      </Box>
    </>
  );
}
