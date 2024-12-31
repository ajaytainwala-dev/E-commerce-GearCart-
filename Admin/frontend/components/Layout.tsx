'use client'

import React, { ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard, Inventory, People, LocalOffer, ShoppingCart } from '@mui/icons-material'
import Link from 'next/link'

const drawerWidth = 240

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, href: '/' },
  { text: 'Products', icon: <Inventory />, href: '/products' },
  { text: 'Users', icon: <People />, href: '/users' },
  { text: 'Offers', icon: <LocalOffer />, href: '/offers' },
  { text: 'Orders', icon: <ShoppingCart />, href: '/orders' },
]

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <AppBar position="fixed" className="z-50">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            E-commerce Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <Link href={item.href} key={item.text} passHref>
              <ListItem button component="a">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className="flex-grow p-6 mt-16 ml-60">
        {children}
      </main>
    </div>
  )
}

