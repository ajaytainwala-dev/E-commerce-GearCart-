"use client";
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const FeatureSection = () => {
  const features = [
    {
      icon: <LocalShippingIcon style={{ color: "white", fontSize: 32 }} />,
      title: "Delivery",
      subtitle: "Available on all Area",
    },
    {
      icon: <ReplayIcon style={{ color: "white", fontSize: 32 }} />,
      title: "Easy Returns",
      subtitle: "Best Return Policy",
    },
    {
      icon: <VerifiedIcon style={{ color: "white", fontSize: 32 }} />,
      title: "Genuine Products",
      subtitle: "100% Guaranteed",
    },
    {
      icon: <HeadsetMicIcon style={{ color: "white", fontSize: 32 }} />,
      title: "Customer Support",
      subtitle: "+91 8310181238",
    },
  ];

  return (
    <Box sx={{ py: 4, px: 2, backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: "#4B3EFC",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
             
              {feature.subtitle === "+91 8310181238" ?
               (
                <a href="tel:+918310181238">+91 8310181238</a>
                ): 
                feature.subtitle
                }
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
