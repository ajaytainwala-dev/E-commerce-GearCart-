"use client";

import React, { ReactNode, useState } from "react";
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
import Link from "next/link";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, href: "/" },
  { text: "Products", icon: <Inventory />, href: "/products" },
  { text: "Users", icon: <People />, href: "/users" },
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

  return (
    <html lang="en">
      <div className="flex h-screen">
        <AppBar position="fixed" className="z-50">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              E-commerce Admin
            </Typography>
          </Toolbar>
        </AppBar>
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
                <ListItem component="a">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <body className="flex-grow p-6 mt-16 ml-60">{children}</body>
      </div>
    </html>
  );
}
