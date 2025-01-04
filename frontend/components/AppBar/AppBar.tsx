"use client";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import {useForm} from "react-hook-form";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Alert } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  Cog,
  ShoppingCart,
  FilePen,
  LogIn,
  LogOut,
  UserCircle,
  Search,
} from "lucide-react";
import Link from "next/link";

const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Settings", "Logout"];
const settings = [
  {
    name: "Profile",
    href: "/Profile",
    icon: <UserCircle />,
  },
  // {
  //   name: "Settings",
  //   href: "/",
  //   icon: <Cog />,
  // },
  {
    name: "Logout",
    href: "/",
    icon: <LogOut />,
  },
];

interface Search{
  search:string;
}
const cache = createCache({ key: "css", prepend: true });
function ResponsiveAppBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }=useForm<Search>();
  const { isLogin } = useContext(AppContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const doSubmit = (data:Search) => {
    console.log(data);
    const sendData=async()=>{
      try {
        const response = await fetch("http://localhost:5000/product/search")
        const data = await response.json();
        console.log(data);
        if(data.success === false )
        {
          return <Alert severity="error">{data.message}</Alert>
        }
      } catch (error) {
        console.log(error);
      }
    }
    sendData();
  };
  return (
    <CacheProvider value={cache}>
      <AppBar position="static" sx={{ bgcolor: "#ffff", color: "black" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ margin: "5px", display: { md: "block", sm: "none" } }}>
              <Cog />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GearCart
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <Cog style={{ margin: "5px" }} /> */}
            <Box sx={{ margin: "5px", display: { md: "none", sm: "block" } }}>
              <Cog />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GearCart
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
              <form className="mx-auto w-[20rem] " onSubmit={handleSubmit(doSubmit)}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    {...register("search", { required: true })}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </Box>
            <Box sx={{ flexgrow: 1 }}>
              <Link href={"/Cart"}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "black",
                  display: "flex",
                  m: 2,
                  gap: 1,
                  ":hover": { bgcolor: "blue", color: "white" },
                }}
              >
                <ShoppingCart size={24} />
                Cart
              </Button>
              </Link>
            </Box>
            {!isLogin && (
              <>
                <Link href={"/Register"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      color: "black",
                      display: "flex",
                      m: 2,
                      gap: 1,
                      ":hover": { bgcolor: "blue", color: "white" },
                    }}
                  >
                    <FilePen size={24} />
                    Register
                  </Button>
                </Link>
                <Link href={"/Login"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      color: "black",
                      display: "flex",
                      m: 2,
                      gap: 1,
                      ":hover": { bgcolor: "blue", color: "white" },
                    }}
                  >
                    <LogIn size={24} />
                    Login
                  </Button>
                </Link>
              </>
            )}

            {isLogin && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="AT" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ textAlign: "center", display: "flex", gap: 1 }}
                      >
                        <Link href={setting.href}>
                          <Button
                            onClick={() => {
                              handleCloseNavMenu();
                              {
                                if (setting.name === "Logout") {
                                  localStorage.removeItem("token");
                                  window.location.reload();
                                }
                              }
                            }}
                            sx={{
                              my: 2,
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                              color: "black",
                              display: "flex",
                              m: 2,
                              gap: 1,
                              ":hover": { bgcolor: "blue", color: "white" },
                            }}
                          >
                            {setting.icon}
                            {setting.name}
                          </Button>
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </CacheProvider>
  );
}
export default ResponsiveAppBar;
