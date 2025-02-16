"use client";
import React from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../ContextAPI/AppContext";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const { isLogin, stats, fetchDashboardData } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const loadData = async () => {
       await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!isLogin) {
        router.push("/Login");
      } else {
        await fetchDashboardData();
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <div className="h-[100vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div style={{ padding: "20px", marginTop: "5rem" }}>
          <Typography variant="h4" gutterBottom align="center">
            Welcome to the Dashboard
          </Typography>
          <div
            style={{
              display: "grid",
              marginTop: "2rem",
              gap: "1rem",
              padding: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              margin: "0 auto",
              maxWidth: "1200px",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.title}>
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "16px",
                      color: "#3f51b5",
                      fontSize: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ fontWeight: 500, textAlign: "center" }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="p"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {stat.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
