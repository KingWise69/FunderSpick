import { Box, Typography } from "@mui/material";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#3f51b5", "#f50057", "#ff9800", "#4caf50", "#9c27b0"];

const PieChart = ({ title }) => {
  const data = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
    { name: "Product E", value: 150 },
  ];

  return (
    <Box p={3} bgcolor="white" borderRadius={2} boxShadow={1} width="48%">
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <RePieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChart;
