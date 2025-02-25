import React from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { AccessTime, AttachMoney } from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeVsExpenses = () => {
  // Dummy Income Data
  const incomeData = [
    { month: "January", source: "Salary", category: "Employment", amount: 3500000 },
    { month: "February", source: "Freelance", category: "Side Hustle", amount: 2700000 },
    { month: "March", source: "Investments", category: "Stock Market", amount: 1500000 },
    { month: "April", source: "Product Sales", category: "Business", amount: 4200000 },
    { month: "May", source: "Rental Income", category: "Real Estate", amount: 3900000 },
    { month: "June", source: "Consulting", category: "Side Hustle", amount: 3100000 },
    { month: "July", source: "Salary", category: "Employment", amount: 3600000 },
    { month: "August", source: "Freelance", category: "Side Hustle", amount: 2900000 },
    { month: "September", source: "Investments", category: "Stock Market", amount: 1800000 },
    { month: "October", source: "Product Sales", category: "Business", amount: 4500000 },
    { month: "November", source: "Rental Income", category: "Real Estate", amount: 4000000 },
    { month: "December", source: "Consulting", category: "Side Hustle", amount: 3200000 },
  ];

  // Dummy Expense Data
  const expenseData = [
    { month: "January", source: "Rent", category: "Housing", amount: 1200000 },
    { month: "February", source: "Utilities", category: "Bills", amount: 600000 },
    { month: "March", source: "Groceries", category: "Food", amount: 800000 },
    { month: "April", source: "Transport", category: "Commute", amount: 500000 },
    { month: "May", source: "Marketing", category: "Business", amount: 1100000 },
    { month: "June", source: "Salaries", category: "Payroll", amount: 3000000 },
    { month: "July", source: "Rent", category: "Housing", amount: 1200000 },
    { month: "August", source: "Utilities", category: "Bills", amount: 700000 },
    { month: "September", source: "Groceries", category: "Food", amount: 900000 },
    { month: "October", source: "Transport", category: "Commute", amount: 600000 },
    { month: "November", source: "Marketing", category: "Business", amount: 1200000 },
    { month: "December", source: "Salaries", category: "Payroll", amount: 3200000 },
  ];

  // Calculate total income, total expenses, and net profit
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <Box m="20px">
      <Typography variant="h4" component="h1" gutterBottom>
        <AccessTime fontSize="small" /> Income & Expenses Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Income Table */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, backgroundColor: 'white', boxShadow: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              <AttachMoney fontSize="small" /> Monthly Income
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Month</b></TableCell>
                    <TableCell><b>Source</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Amount (UGX)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{`UGX ${row.amount.toLocaleString()}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Expenses Table */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, backgroundColor: 'white', boxShadow: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              <AttachMoney fontSize="small" /> Monthly Expenses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Month</b></TableCell>
                    <TableCell><b>Source</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Amount (UGX)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{`UGX ${row.amount.toLocaleString()}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Total Profit Table */}
        <Grid item xs={12}>
          <Box sx={{ padding: 2, backgroundColor: 'white', boxShadow: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Total Profit Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Amount (UGX)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><b>Total Income</b></TableCell>
                    <TableCell style={{ color: "green" }}>{`UGX ${totalIncome.toLocaleString()}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Total Expenses</b></TableCell>
                    <TableCell style={{ color: "red" }}>{`UGX ${totalExpenses.toLocaleString()}`}</TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                    <TableCell><b>Net Profit</b></TableCell>
                    <TableCell style={{ color: netProfit >= 0 ? "green" : "red" }}><b>{`UGX ${netProfit.toLocaleString()}`}</b></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncomeVsExpenses;
