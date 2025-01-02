import { NextResponse } from "next/server";

const orders = [
  {
    id: 1,
    customerName: "John Doe",
    orderDate: "2023-05-15",
    totalAmount: 99.99,
    status: "Shipped",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    orderDate: "2023-05-16",
    totalAmount: 149.99,
    status: "Processing",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    orderDate: "2023-05-17",
    totalAmount: 79.99,
    status: "Delivered",
  },
];

export async function GET() {
  return NextResponse.json(orders);
}
