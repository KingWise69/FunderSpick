import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Assessment, GridOn, PictureAsPdf, Print } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample P&L data
const profitLossData = [
  { month: 'Jan', revenue: 5000000, cogs: 2000000, profit: 3000000 },
  { month: 'Feb', revenue: 6000000, cogs: 2400000, profit: 3600000 },
  { month: 'Mar', revenue: 5500000, cogs: 2200000, profit: 3300000 },
];

export default function ProfitAndLossPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Profit & Loss Statement</Typography>
      
      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Gross Profit</Typography>
              <Typography variant="h4">UGX 9,900,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Net Profit</Typography>
              <Typography variant="h4">UGX 5,200,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#FF9800', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Profit Margin</Typography>
              <Typography variant="h4">31.5%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<GridOn />} sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}>
          Export to Excel
        </Button>
        <Button variant="contained" startIcon={<PictureAsPdf />} sx={{ bgcolor: '#F44336', '&:hover': { bgcolor: '#D32F2F' } }}>
          Export to PDF
        </Button>
        <Button variant="contained" startIcon={<Print />} sx={{ bgcolor: '#2196F3', '&:hover': { bgcolor: '#1976D2' } }}>
          Print Report
        </Button>
      </Box>

      {/* P&L Trend Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Profit Trend</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`UGX ${value.toLocaleString()}`, 'Amount']} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4CAF50" name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#2196F3" name="Net Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed P&L Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Detailed Profit & Loss</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">COGS</TableCell>
                  <TableCell align="right">Gross Profit</TableCell>
                  <TableCell align="right">Expenses</TableCell>
                  <TableCell align="right">Net Profit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profitLossData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{row.revenue.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.cogs.toLocaleString()}</TableCell>
                    <TableCell align="right">{(row.revenue - row.cogs).toLocaleString()}</TableCell>
                    <TableCell align="right">{(row.revenue * 0.3).toLocaleString()}</TableCell>
                    <TableCell align="right">{row.profit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}