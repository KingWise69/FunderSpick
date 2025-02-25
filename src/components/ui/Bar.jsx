import { Box, Typography } from "@mui/material";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BarChart = ({ title }) => {
  const data = [
    { name: "Monday", sales: 4000, purchases: 2400 },
    { name: "Tuesday", sales: 3000, purchases: 1398 },
    { name: "Wednesday", sales: 2000, purchases: 9800 },
    { name: "Thursday", sales: 2780, purchases: 3908 },
    { name: "Friday", sales: 1890, purchases: 4800 },
  ];

  return (
    <Box p={3} bgcolor="white" borderRadius={2} boxShadow={1} width="48%">
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#3f51b5" />
          <Bar dataKey="purchases" fill="#f50057" />
        </ReBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChart;
