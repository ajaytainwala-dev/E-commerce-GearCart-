import React from "react";
import { Typography, Button } from "@mui/material";
import { CartItem, calculateTotal, formatCurrency } from "../utils/cartUtils";

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
  const subtotal = calculateTotal(items);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Typography variant="h6" className="mb-4 text-gray-700">
        PRICE DETAILS
      </Typography>
      <div className="space-y-2 border-b border-gray-200 pb-4">
        <div className="flex justify-between">
          <Typography>Price ({items.length} items):</Typography>
          <Typography>{formatCurrency(subtotal)}</Typography>
        </div>
        <div className="flex justify-between">
          <Typography>Delivery Charges:</Typography>
          <Typography className={shipping === 0 ? "text-green-600" : ""}>
            {shipping === 0 ? "FREE" : formatCurrency(shipping)}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between font-bold py-4 border-b border-gray-200">
        <Typography>Total Amount:</Typography>
        <Typography>{formatCurrency(total)}</Typography>
      </div>
      {shipping === 0 && (
        <Typography className="text-green-600 mt-2 text-sm">
          You will save ₹50 on this order
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        className="mt-4 bg-orange-500 hover:bg-orange-600"
        onClick={onCheckout}
      >
        PLACE ORDER
      </Button>
    </div>
  );
};

export default CartSummary;
