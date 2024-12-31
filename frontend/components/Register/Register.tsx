"use client";
import * as React from "react";
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
// import { GoogleIcon, FacebookIcon } from "./CustomIcons";
// import AppTheme from "../shared-theme/AppTheme";
// import ColorModeSelect from "../shared-theme/ColorModeSelect";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  googleId?: string;
  facebookId?: string;
  isAdmin: boolean;
}

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
  // React Hook Form
  const { register, handleSubmit, reset, formState } = useForm<IUser>();

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      console.log(errors);
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to log in");
      // }
      if (response.status === 400) {
        throw new Error("User already exists");
      }

      const result = await response.json();
      // document.cookie = `token=${result.token}; path=/; max-age=3600; secure; samesite=strict`;
      localStorage.setItem("token", result.token);
      console.log("Registration successful:", result.token);
      window.location.href="/";
    } catch (err) {
      console.log(err);
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
        {/* <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        /> */}
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Mobile"
                {...register("mobile", {
                  required: "Mobile number is required",
                })}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
              <TextField
                label="Street"
                {...register("address.street", {
                  required: "Street is required",
                })}
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
              <TextField
                label="City"
                {...register("address.city", { required: "City is required" })}
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
              <TextField
                label="State"
                {...register("address.state", {
                  required: "State is required",
                })}
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message}
              />
              <TextField
                label="Postal Code"
                {...register("address.postalCode", {
                  required: "Postal code is required",
                })}
                error={!!errors.address?.postalCode}
                helperText={errors.address?.postalCode?.message}
              />
              <TextField
                label="Country"
                {...register("address.country", {
                  required: "Country is required",
                })}
                error={!!errors.address?.country}
                helperText={errors.address?.country?.message}
              />
            </Box>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <FormLabel htmlFor="outlined-adornment-password" className="m-2">
                Password
              </FormLabel>
              <OutlinedInput
                // sx={{ width: "100%" }}
                id="outlined-adornment-password"
                autoComplete="current-password"
                placeholder="••••••"
                aria-label="Password"
                // label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true, // Shorthand for required message
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
                Registering...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
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
          {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Log in with Google
            </Button>
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
          </Box> */}
        </Card>
      </SignInContainer>
    </>
    // </AppTheme>
  );
}
