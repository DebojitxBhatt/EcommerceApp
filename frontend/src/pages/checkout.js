import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = () => {
    alert(`Order placed with ${paymentMethod.toUpperCase()}!`);
    localStorage.removeItem("cart");
    router.push("/success"); // You can create a success page if needed
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout 🧾
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Items in your order:
          </Typography>

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
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ₹{product.price} x {product.quantity} = ₹
                    {product.price * product.quantity}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Delivery in 2-3 days | Free Delivery
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Select Payment Method:
          </Typography>

          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
          </RadioGroup>

          <Divider sx={{ my: 3 }} />

          <Box textAlign="right">
            <Typography variant="h5" gutterBottom>
              Total: ₹{calculateTotal()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              Proceed to Pay & Place Order
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
