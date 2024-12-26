import React from "react";
import { CartItem as CartItemType } from "../utils/cartUtils";
import { IconButton, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatCurrency } from "../utils/cartUtils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4 flex-grow">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-contain"
        />
        <div className="flex-grow">
          <Typography variant="subtitle1" className="text-gray-800 font-medium">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {item.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Compatibility: {item.compatibility}
          </Typography>
          <Typography variant="h6" className="text-blue-500 mt-1">
            {formatCurrency(item.price)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded">
          <IconButton
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            size="small"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography className="px-2">{item.quantity}</Typography>
          <IconButton
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            size="small"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Button
          onClick={() => onRemove(item.id)}
          startIcon={<DeleteOutlineIcon />}
          color="error"
          variant="text"
        >
          REMOVE
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
