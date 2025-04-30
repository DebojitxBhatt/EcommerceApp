import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const router = useRouter();

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

//cart update fixed.
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart 🛒
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                mb: 2,
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CardMedia
                  component="img"
                  image={product.imageUrl || product.image}
                  alt={product.name}
                  sx={{ width: 100, height: 100, objectFit: "contain" }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price per unit: ₹{product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Subtotal: ₹{product.price * product.quantity}
                  </Typography>
                </CardContent>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => decreaseQuantity(product.id)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{product.quantity}</Typography>
                <IconButton onClick={() => increaseQuantity(product.id)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => removeFromCart(product.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h5">Total: ₹{calculateTotal()}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push("/checkout")}>
  Proceed to Checkout
</Button>
          </Box>
        </>
      )}
    </Container>
  );
}
