"use client";

import React, { ReactNode, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  People,
  LocalOffer,
  ShoppingCart,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import Footer from "@/components/Footer/Footer"
import Link from "next/link";
import "./globals.css"
import NextTopLoader from "nextjs-toploader";
const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, href: "/Dashboard" },
  { text: "Products", icon: <Inventory />, href: "/products" },
  { text: "Users", icon: <People />, href: "/Users" },
  { text: "Offers", icon: <LocalOffer />, href: "/offers" },
  { text: "Orders", icon: <ShoppingCart />, href: "/orders" },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <html lang="en">
      <body>
        <NextTopLoader height={5} showSpinner={false} />
        <AppBar position="fixed" className="z-50">
          <Toolbar>
            {token && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ marginRight: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link href="/" passHref>
            <Typography variant="h6" noWrap component="div">
              E-commerce Admin
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        {token && (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <List>
              {menuItems.map((item) => (
                <Link href={item.href} key={item.text} passHref>
                  <ListItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        )}
        {children}
        <Footer />
      </body>
    </html>
  );
}
