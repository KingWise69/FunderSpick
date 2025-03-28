import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Balance, GridOn, PictureAsPdf, Print } from '@mui/icons-material';

// Sample trial balance data
const trialBalance = [
  { account: 'Cash', debit: 8000000, credit: 0 },
  { account: 'Accounts Receivable', debit: 2000000, credit: 0 },
  { account: 'Inventory', debit: 5000000, credit: 0 },
  { account: 'Accounts Payable', debit: 0, credit: 3000000 },
  { account: 'Loans Payable', debit: 0, credit: 6000000 },
  { account: 'Equity', debit: 0, credit: 6000000 },
];

export default function TrialBalancePage() {
  const totalDebits = trialBalance.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = trialBalance.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebits === totalCredits;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Trial Balance</Typography>
      
      {/* Balance Validation Card */}
      <Card sx={{ mb: 3, bgcolor: isBalanced ? '#4CAF50' : '#F44336', color: 'white' }}>
        <CardContent>
          <Typography variant="h6">Trial Balance Status</Typography>
          <Typography variant="h4">
            {isBalanced ? 'Balanced' : 'Not Balanced'}
          </Typography>
          <Typography>
            Total Debits: UGX {totalDebits.toLocaleString()} | 
            Total Credits: UGX {totalCredits.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

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

      {/* Trial Balance Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Trial Balance Details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account</TableCell>
                  <TableCell align="right">Debit (UGX)</TableCell>
                  <TableCell align="right">Credit (UGX)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trialBalance.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.account}</TableCell>
                    <TableCell align="right">{row.debit.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.credit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ fontWeight: 'bold' }}>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">{totalDebits.toLocaleString()}</TableCell>
                  <TableCell align="right">{totalCredits.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}