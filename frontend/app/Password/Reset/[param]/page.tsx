"use client";
import * as React from "react";
// import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
// import AxiosInstance from "../../utils/AxiosInstance";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import NoteContext from "../../Context/Context";
import { useRouter, useParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const params = useParams();
  // const { id } = router.query;
  // const myTheme = useContext(NoteContext);
  // const auth = useContext(NoteContext);

  // const defaultTheme = createTheme({
  //     palette: {
  //         mode: myTheme.theme,
  //     },
  // });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting },
  } = useForm();

  //  Using React Hook Form to reset the form after successful submission
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ password: "" });
    }
  }, [formState, reset]);

  // Submit function
  const doSubmit = async (data: unknown) => {
    try {
      fetch("http://localhost:5000/auth/reset/" + params.param, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          router.push("/Login");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(doSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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
              label="Password"
            />
          </FormControl>
          {errors.password && (
            <span
              className="text-red-500 text-center "
              style={{ textAlign: "center", marginLeft: "5%" }}
            >
              {errors.password.message}
            </span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          {/* <ToastContainer /> */}
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
