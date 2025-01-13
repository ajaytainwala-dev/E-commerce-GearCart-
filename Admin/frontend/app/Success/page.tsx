"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
// import { Upload } from 'lucide-react';
import { useRouter } from "next/navigation";

const RegistrationSuccess = () => {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      router.push("/products");
    }, 1500);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CheckCircleIcon style={{ fontSize: 100, color: "green" }} />
        <Typography variant="h4" style={{ marginTop: 20 }}>
          Product Uploaded Successfully
        </Typography>
      </Box>
    </>
  );
};

export default RegistrationSuccess;
