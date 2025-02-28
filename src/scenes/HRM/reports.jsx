import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  CardContent,
  Button,
} from "@mui/material";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import GetAppIcon from "@mui/icons-material/GetApp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "chart.js/auto";

// Dummy Employee Data
const topEmployees = [
  { name: "Abdul Mutebi (UG)", role: "Software Engineer", rating: "⭐ 4.9" },
  { name: "Priya Patel (IN)", role: "HR Manager", rating: "⭐ 4.7" },
  { name: "James Anderson (USA)", role: "Finance Lead", rating: "⭐ 4.8" },
  { name: "Chinedu Okafor (NG)", role: "Marketing Head", rating: "⭐ 4.6" },
];

const employeeOfTheMonth = {
  name: "Moses Lubega (UG)",
  role: "Product Manager",
  rating: "⭐ 5.0",
  achievement: "Outstanding Leadership",
};

// Dummy HR Metrics Data
const hrReportsData = {
  payrollBreakdown: [400000, 70000, 20000, 50000],
  genderDiversity: [60, 40],
  departmentCount: [30, 25, 20, 15, 10],
  turnoverRate: [5, 6, 7, 4, 3, 5],
  absenteeismRate: [2, 4, 5, 3, 6, 5, 4],
  overtimeTrend: [10, 15, 20, 30, 25, 35],
  employeeSatisfaction: [50, 30, 20],
  leaveTrends: [15, 20, 25, 10, 30, 18],
};

const HRReportsPage = () => {
  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold">
        📊 HR Reports
      </Typography>

      {/* Download Buttons */}
      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="success"
          startIcon={<TableChartIcon />}
        >
          Download Excel
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdfIcon />}
        >
          Download PDF
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Employee of the Month */}
      <Card sx={{ p: 3, backgroundColor: "#FFF3E0", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          🏆 Employee of the Month
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <EmojiEventsIcon sx={{ fontSize: 50, color: "#FFD700" }} />
          <Box>
            <Typography variant="h6">{employeeOfTheMonth.name}</Typography>
            <Typography>{employeeOfTheMonth.role}</Typography>
            <Typography>{employeeOfTheMonth.rating}</Typography>
            <Typography fontStyle="italic">
              {employeeOfTheMonth.achievement}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Top Employees */}
      <Grid container spacing={2}>
        {topEmployees.map((employee, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2, backgroundColor: "#E3F2FD" }}>
              <Typography variant="h6">{employee.name}</Typography>
              <Typography>{employee.role}</Typography>
              <Typography>{employee.rating}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Charts in Cards */}
      <Grid container spacing={4}>
        {[
          {
            title: "💰 Payroll Breakdown",
            component: (
              <Bar
                data={{
                  labels: ["Salaries", "Bonuses", "Overtime", "Deductions"],
                  datasets: [
                    {
                      label: "Amount ($)",
                      data: hrReportsData.payrollBreakdown,
                      backgroundColor: ["#7E57C2", "#FF7043", "#29B6F6", "#EF5350"],
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "🌍 Gender Diversity",
            component: (
              <Pie
                data={{
                  labels: ["Male", "Female"],
                  datasets: [
                    {
                      data: hrReportsData.genderDiversity,
                      backgroundColor: ["#42A5F5", "#F06292"],
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "🏢 Employees per Department",
            component: (
              <Doughnut
                data={{
                  labels: ["IT", "HR", "Finance", "Marketing", "Sales"],
                  datasets: [
                    {
                      data: hrReportsData.departmentCount,
                      backgroundColor: ["#FFA726", "#AB47BC", "#29B6F6", "#66BB6A", "#FF7043"],
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "📉 Employee Turnover Rate",
            component: (
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Turnover Rate (%)",
                      data: hrReportsData.turnoverRate,
                      borderColor: "#FFCA28",
                      backgroundColor: "#FFECB3",
                      fill: true,
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "⏳ Absenteeism Trends",
            component: (
              <Bar
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                  datasets: [
                    {
                      label: "Absenteeism Rate (%)",
                      data: hrReportsData.absenteeismRate,
                      backgroundColor: "#FF5722",
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "⚡ Overtime Trends",
            component: (
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Overtime Hours",
                      data: hrReportsData.overtimeTrend,
                      borderColor: "#42A5F5",
                      backgroundColor: "#BBDEFB",
                      fill: true,
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "🌟 Employee Satisfaction",
            component: (
              <Pie
                data={{
                  labels: ["Happy", "Neutral", "Unhappy"],
                  datasets: [
                    {
                      data: hrReportsData.employeeSatisfaction,
                      backgroundColor: ["#66BB6A", "#FFCA28", "#EF5350"],
                    },
                  ],
                }}
              />
            ),
          },
          {
            title: "🌴 Leave Trends",
            component: (
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Leave Requests",
                      data: hrReportsData.leaveTrends,
                      borderColor: "#AB47BC",
                      backgroundColor: "#E1BEE7",
                      fill: true,
                    },
                  ],
                }}
              />
            ),
          },
        ].map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <CardContent>{item.component}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HRReportsPage;
