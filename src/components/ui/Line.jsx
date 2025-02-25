import { Box, Typography } from "@mui/material";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LineChart = ({ title }) => {
  const data = [
    { name: "Day 1", sent: 3000, received: 2400 },
    { name: "Day 2", sent: 2000, received: 1398 },
    { name: "Day 3", sent: 2780, received: 3908 },
    { name: "Day 4", sent: 1890, received: 4800 },
    { name: "Day 5", sent: 2390, received: 3800 },
  ];

  return (
    <Box p={3} bgcolor="white" borderRadius={2} boxShadow={1} width="48%">
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sent" stroke="#f50057" />
          <Line type="monotone" dataKey="received" stroke="#3f51b5" />
        </ReLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart;
