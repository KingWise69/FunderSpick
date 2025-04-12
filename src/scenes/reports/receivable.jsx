import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Box, Button, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Chip, MenuItem 
} from '@mui/material';
import { QrCode as QrCodeIcon, Receipt as ReceiptIcon, Payment as PaymentIcon } from '@mui/icons-material';

const AccountsReceivable = () => {
  const [receivables, setReceivables] = useState([
    {
      id: 'AR-2023-001',
      customer: 'Nakumatt Uganda',
      amount: 4500000,
      dueDate: '2023-12-15',
      status: 'unpaid',
      efrisInvoice: 'EFRIS-202311-876543',
      tin: 'TIN987654321'
    },
    {
      id: 'AR-2023-002',
      customer: 'Cafe Javas',
      amount: 1200000,
      dueDate: '2023-12-20',
      status: 'partially_paid',
      efrisInvoice: 'EFRIS-202311-123456',
      tin: 'TIN123456789'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handlePayment = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  };

  const markAsPaid = () => {
    setReceivables(receivables.map(item => 
      item.id === selectedInvoice.id ? { ...item, status: 'paid' } : item
    ));
    setOpenDialog(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Accounts Receivable
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>TIN</TableCell>
              <TableCell>Amount (UGX)</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>EFRIS Invoice</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivables.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.tin}</TableCell>
                <TableCell>{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Chip 
                    icon={<ReceiptIcon />} 
                    label={invoice.efrisInvoice} 
                    onClick={() => window.open(`https://efris.ura.go.ug/verify?invoice=${invoice.efrisInvoice}`)}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={invoice.status.replace('_', ' ')} 
                    color={
                      invoice.status === 'paid' ? 'success' : 
                      invoice.status === 'partially_paid' ? 'warning' : 'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    startIcon={<PaymentIcon />}
                    onClick={() => handlePayment(invoice)}
                  >
                    Record Payment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Record Payment for {selectedInvoice?.efrisInvoice}</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography>Customer: {selectedInvoice?.customer}</Typography>
            <Typography>Amount Due: UGX {selectedInvoice?.amount.toLocaleString()}</Typography>
          </Box>
          <TextField
            fullWidth
            label="Amount Received"
            type="number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Payment Method"
            select
            margin="normal"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="mobile_money">Mobile Money</MenuItem>
            <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
          </TextField>
          <Box textAlign="center" mt={2}>
            <QrCodeIcon style={{ fontSize: 80 }} />
            <Typography variant="caption">Scan to verify with URA EFRIS</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={markAsPaid} color="primary">Confirm Payment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountsReceivable;
