"use client";

import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFetch } from "../hooks/useFetch";

interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export default function OrderList() {
  const { data: orders, loading, error } = useFetch<Order[]>("/api/orders");

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      {orders && orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </div>
  );
}
