import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { AccountBalanceWallet, GridOn, PictureAsPdf, Print } from '@mui/icons-material';

// Sample account data
const accounts = [
  { id: 1, name: 'Stanbic Bank', balance: 5000000, currency: 'UGX' },
  { id: 2, name: 'Centenary Bank', balance: 3000000, currency: 'UGX' },
  { id: 3, name: 'Cash', balance: 1000000, currency: 'UGX' },
];

const accountTransactions = [
  { id: 1, account: 'Stanbic Bank', date: '2023-10-01', description: 'Deposit', amount: 1500000 },
  { id: 2, account: 'Stanbic Bank', date: '2023-10-02', description: 'Withdrawal', amount: -500000 },
  { id: 3, account: 'Centenary Bank', date: '2023-10-03', description: 'Transfer', amount: 200000 },
];

export default function AccountBalancePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Account Balances</Typography>
      
      {/* Account Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {accounts.map((account) => (
          <Grid item xs={12} sm={6} md={4} key={account.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{account.name}</Typography>
                <Typography variant="h4">{account.balance.toLocaleString()} {account.currency}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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

      {/* Recent Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Account Transactions</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount (UGX)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountTransactions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.account}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right" sx={{ color: row.amount > 0 ? '#4CAF50' : '#F44336' }}>
                      {row.amount.toLocaleString()}
                    </TableCell>
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