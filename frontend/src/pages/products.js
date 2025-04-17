import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Products() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProducts = () => {
    fetch("http://localhost:8181/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

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

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Amazon Clone - Products</title>
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
            All Products
          </Typography>

          <Box sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
          }}>
            {products.map((product) => (
              <Box
                key={product.id}
                onClick={() => router.push(`/products/${product.id}`)}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: 2,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" }
                }}
              >
                {product.imageUrl && (
                  <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                      mb: 2
                    }}
                  />
                )}
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                <Typography variant="h5">₹{product.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent click bubbling to box
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            ))}
          </Box>
        </Container>

        <Box component="footer" sx={{ bgcolor: "#232f3e", color: "white", textAlign: "center", p: 2 }}>
          @amazon 2025 All rights reserved
        </Box>
      </Box>
    </>
  );
}
