"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
// import { Upload } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";

const RegistrationSuccess = () => {
  const { slug} = useParams();
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if(slug === "Product") router.push("/products");
      if(slug === "Brand") router.push("/Brands");
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
          {slug} Uploaded Successfully
        </Typography>
      </Box>
    </>
  );
};

export default RegistrationSuccess;
