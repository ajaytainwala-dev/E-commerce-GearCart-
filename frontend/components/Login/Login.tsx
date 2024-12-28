"use client";
import * as React from "react";
// import { useContext } from "react";
// import { AppContext } from "../../Context/AppContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
// import OtpInput from "react-otp-input";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
// import {OTPInput} from "./OTP.jsx"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
// import { useSession, signIn, signOut } from "next-auth/react";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { useRouter } from "next/navigation";
// import AppTheme from "../shared-theme/AppTheme";
// import ColorModeSelect from "../shared-theme/ColorModeSelect";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  // const { data: session } = useSession();
  // React Hook Form
  // const { isLogin } = useContext(AppContext);

  const router = useRouter();
  const { register, handleSubmit, reset, formState } = useForm<{
    email: string;
    password: string;
  }>();

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: "", password: "" });
    }
    // eslint-disable-next-line
  }, [formState, reset]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlSubmit = async (data: { email: string; password: string }) => {
    console.log({
      email: data.email,
      password: data.password,
    });
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer
        direction="column"
        justifyContent="space-between"
        sx={{ height: "auto" }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handlSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              {/* <OTPInput/> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email I'D"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is must!",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <span
                  className="text-red-500 text-center "
                  style={{ textAlign: "center", marginLeft: "5%" }}
                >
                  {errors.email.message}
                </span>
              )}
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <FormLabel htmlFor="outlined-adornment-password" className="m-2">
                Password
              </FormLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                autoComplete="current-password"
                placeholder="••••••"
                aria-label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <span
                  className="text-red-500 text-center "
                  style={{ textAlign: "center", marginLeft: "5%" }}
                >
                  {errors.password.message}
                </span>
              )}
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />

            {isSubmitting ? (
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Link href="/api/auth/signin">
              <Button
                fullWidth
                variant="outlined"
                // onClick={() => signIn()}

                startIcon={<GoogleIcon />}
              >
                Log in with Google
              </Button>
            </Link>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Log in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
    // </AppTheme>
  );
}
