import { Typography,  Paper } from "@mui/material";
import {
  Inventory,
  People,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";

const stats = [
  { title: "Total Products", value: 150, icon: <Inventory /> },
  { title: "Total Users", value: 1200, icon: <People /> },
  { title: "Total Revenue", value: "$15,000", icon: <AttachMoney /> },
  { title: "Total Orders", value: 450, icon: <ShoppingCart /> },
];

export default function Dashboard() {
  return (
    <div className="p-16 flex items-center justify-center flex-col ">
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <div className=" bg-primary-main rounded-full mb-8 flex items-center justify-center gap-2">
        {stats.map((stat) => (
          <div key={stat.title}>
            <Paper className="p-6 flex flex-col items-center justify-center bg-white shadow-md">
              <div className="mb-4 text-primary-main text-4xl">{stat.icon}</div>
              <Typography variant="h6" component="h2" className="font-medium" align="center">
                {stat.title}
              </Typography>
              <Typography variant="h4" component="p" className="font-bold" align="center">
                {stat.value}
              </Typography>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}
