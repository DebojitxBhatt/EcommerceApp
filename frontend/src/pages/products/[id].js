import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ProductDetail({ product }) {
  const [query, setQuery] = useState("");

  if (!product) return <p>Product not found</p>;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <>
      <Head>
        <title>{product.name} | Amazoff Clone</title>
      </Head>

      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar position="static" sx={{ bgcolor: "#131921" }}>
          <Toolbar sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
            >
              amazon<span style={{ color: "#f0c14b" }}>.clone</span>
            </Typography>

            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{ flexGrow: 1, display: "flex", gap: 1 }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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

        <Container sx={{ textAlign: "center", mt: 8, flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom>{product.name}</Typography>

          {product.imageUrl && (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                maxWidth: 400,
                height: 300,
                objectFit: "contain",
                mx: "auto",
                mb: 2,
              }}
            />
          )}

          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Typography variant="h4" sx={{ mb: 2 }}>
            ₹{product.price}
          </Typography>

          <Button variant="contained" color="primary" sx={{ mb: 4 }} onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Box>
            <Button variant="outlined" href="/products">
              ⬅ Back to Products
            </Button>
          </Box>
        </Container>

        <Box component="footer" sx={{ bgcolor: "#232f3e", color: "white", textAlign: "center", p: 2 }}>
          @amazon 2025 All rights reserved
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8181/products/${id}`);
  if (!res.ok) return { props: { product: null } };
  const product = await res.json();
  return { props: { product } };
}
