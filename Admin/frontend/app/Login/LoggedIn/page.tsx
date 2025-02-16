"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
const RegistrationSuccess = () => {
    const router = useRouter();
    const [timer, setTimer] = React.useState(3);
    React.useEffect(() => {
        if (timer === 0) {
            router.push("/Dashboard");
        }
        const countdown = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer]);

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
          Already Logged In 
        </Typography>
        <Typography>Redirecting to dashboard .... {timer}</Typography>
      </Box>
    </>
  );
};

export default RegistrationSuccess;
