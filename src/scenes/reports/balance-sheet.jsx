import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { AccountBalance, GridOn, PictureAsPdf, Print } from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample balance sheet data
const assetsData = [
  { name: 'Cash', value: 8000000 },
  { name: 'Inventory', value: 5000000 },
  { name: 'Equipment', value: 7000000 },
];

const liabilitiesData = [
  { name: 'Loans', value: 6000000 },
  { name: 'Payables', value: 3000000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function BalanceSheetPage() {
  const totalAssets = assetsData.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilitiesData.reduce((sum, item) => sum + item.value, 0);
  const equity = totalAssets - totalLiabilities;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Balance Sheet</Typography>
      
      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#4CAF50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Assets</Typography>
              <Typography variant="h4">UGX {totalAssets.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#F44336', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Liabilities</Typography>
              <Typography variant="h4">UGX {totalLiabilities.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#2196F3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Equity</Typography>
              <Typography variant="h4">UGX {equity.toLocaleString()}</Typography>
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

      {/* Assets Breakdown */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Assets Composition</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {assetsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`UGX ${value.toLocaleString()}`, 'Amount']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Liabilities Breakdown */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Liabilities Composition</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={liabilitiesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {liabilitiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`UGX ${value.toLocaleString()}`, 'Amount']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Balance Sheet */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Detailed Balance Sheet</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account</TableCell>
                  <TableCell align="right">Amount (UGX)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Assets</TableCell>
                </TableRow>
                {assetsData.map((row, index) => (
                  <TableRow key={`asset-${index}`}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Assets</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalAssets.toLocaleString()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Liabilities</TableCell>
                </TableRow>
                {liabilitiesData.map((row, index) => (
                  <TableRow key={`liability-${index}`}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Liabilities</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalLiabilities.toLocaleString()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Equity</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Retained Earnings</TableCell>
                  <TableCell align="right">{equity.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Liabilities + Equity</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalLiabilities + equity).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}