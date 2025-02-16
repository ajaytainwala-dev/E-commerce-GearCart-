"use client";
import React from "react";

import {  useState, useEffect } from "react";
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
import { Building2, AlignLeft } from "lucide-react";
import Link from "next/link";
import { Button } from '@mui/material';
import {
  Dashboard,
  Inventory,
  People,
  LocalOffer,
  ShoppingCart,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const CustomAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
const drawerWidth = 240;
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginToken = localStorage.getItem("token");
      if (loginToken) {
        setIsLogin(true);
      }
    }
  }, []);
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, href: "/Dashboard" },
    { text: "Products", icon: <Inventory />, href: "/products" },
    { text: "Brands", icon: <Building2 />, href: "/Brands" },
    { text: "Category", icon: <AlignLeft />, href: "/Category" },
    { text: "Users", icon: <People />, href: "/Users" },
    { text: "Offers", icon: <LocalOffer />, href: "/offers" },
    { text: "Orders", icon: <ShoppingCart />, href: "/orders" },
  ];

  return (
    <>
      <AppBar position="fixed" className="z-50">
        <Toolbar className="flex justify-between items-center">
          {isLogin && (
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
            <Typography variant="h6" noWrap component="div" className="flex-grow-1">
              E-commerce Admin
            </Typography>
          </Link>
            <Button  color="inherit"  className="position-absolute right-0" 
            onClick={() => {
              localStorage.removeItem("token");
              setIsLogin(false);
            }}
            >
            Logout
            </Button>
        </Toolbar>
      </AppBar>
      {isLogin && (
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
    </>
  );
};

export default CustomAppBar;
