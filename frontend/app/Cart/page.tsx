"use client";

import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import {
  CartItem as CartItemType,
  validateEmail,
  validatePhoneNumber,
  saveCartToCookies,
  getCartFromCookies,
} from "../utils/cartUtils";

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const savedCart = getCartFromCookies();
    setItems(savedCart);
  }, []);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
    );
    setItems(updatedItems);
    saveCartToCookies(updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveCartToCookies(updatedItems);
  };

  const handleCheckout = () => {
    const newErrors = {
      email: validateEmail(email) ? "" : "Invalid email address",
      phone: validatePhoneNumber(phone) ? "" : "Invalid phone number",
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.phone) {
      // Process the order
      console.log("Order processed!");
      setSnackbarOpen(true);
      // Clear the cart after successful order
      setItems([]);
      saveCartToCookies([]);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="mb-6 text-gray-800">
        My Cart ({items.length})
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
            {items.length === 0 && (
              <Typography className="text-center py-8 text-gray-500">
                Your cart is empty
              </Typography>
            )}
          </div>
          {items.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="contained"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={handleCheckout}
              >
                PLACE ORDER
              </Button>
            </div>
          )}
        </div>
        <div>
          <CartSummary items={items} onCheckout={handleCheckout} />
          <div className="mt-6 space-y-4 bg-white p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="mb-2 text-gray-700">
              CONTACT DETAILS
            </Typography>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Order placed successfully!"
      />
    </div>
  );
};

export default Cart;
