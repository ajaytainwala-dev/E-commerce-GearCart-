import Cookies from "js-cookie";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  compatibility: string;
}

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const saveCartToCookies = (items: CartItem[]): void => {
  Cookies.set("cart", JSON.stringify(items), { expires: 7 }); // Expires in 7 days
};

export const getCartFromCookies = (): CartItem[] => {
  const cartData = Cookies.get("cart");
  return cartData ? JSON.parse(cartData) : [];
};
