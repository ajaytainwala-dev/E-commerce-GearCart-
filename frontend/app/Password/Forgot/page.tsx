"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme({
  palette: {
    mode: "light", // You can change this to "dark" if needed
  },
});

export default function ForgetPassword() {
  const [alert, setAlert] = React.useState(false);
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: {
      errors,
      isSubmitting,
      //  isSubmitSuccessful
    },
  } = useForm();

  // Using React Hook Form to reset the form after successful submission
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "" });
    }
  }, [formState, reset]);

  // Submit function
  const doSubmit = async (data: unknown) => {
    const finalData = JSON.stringify(data);
    try {
      fetch("http://localhost:5000/auth/forget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: finalData,
      });
      // Display success message using MUI Alert
      setAlert(true);
      //
      // alert("Mail sent successfully!");
    } catch (error) {
      console.error(error);
    }
    // console.log(finalData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {alert && (
            <Alert severity="success" onClose={() => setAlert(false)}>
                Mail sent successfully!
            </Alert>
        )}
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
            Forget Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(doSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              //   name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Email is required!",
                minLength: {
                  value: 5,
                  message: "Email must be at least 5 characters",
                },
              })}
            />
            {errors.email && (
              <span
                className="text-red-500 text-center"
                style={{ textAlign: "center", marginLeft: "5%" }}
              >
                {typeof errors.email?.message === "string" &&
                  errors.email.message}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
