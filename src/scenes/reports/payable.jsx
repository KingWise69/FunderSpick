import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip, MenuItem
} from '@mui/material';
import { Receipt as ReceiptIcon, CheckCircle as CheckCircleIcon, Add as AddIcon } from '@mui/icons-material';

const AccountsPayable = () => {
  const [payables, setPayables] = useState([
    {
      id: 'AP-2023-001',
      vendor: 'Uganda Breweries',
      amount: 3200000,
      dueDate: '2023-12-10',
      status: 'pending',
      efrisInvoice: 'EFRIS-202311-654321',
      tin: 'TIN654321987'
    },
    {
      id: 'AP-2023-002',
      vendor: 'Mukwano Industries',
      amount: 1750000,
      dueDate: '2023-12-05',
      status: 'paid',
      efrisInvoice: 'EFRIS-202311-321654',
      tin: 'TIN321654987'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    id: '',
    vendor: '',
    amount: 0,
    dueDate: '',
    status: 'pending',
    efrisInvoice: '',
    tin: ''
  });

  const handlePayment = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  };

  const approvePayment = () => {
    setPayables(payables.map(item =>
      item.id === selectedInvoice.id ? { ...item, status: 'paid' } : item
    ));
    setOpenDialog(false);
  };

  const handleAddInvoice = () => {
    setOpenAddDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitNewInvoice = () => {
    // Generate a new ID if not provided
    const invoiceId = newInvoice.id || `AP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    setPayables([...payables, {
      ...newInvoice,
      id: invoiceId,
      amount: Number(newInvoice.amount)
    }]);
    
    setNewInvoice({
      id: '',
      vendor: '',
      amount: 0,
      dueDate: '',
      status: 'pending',
      efrisInvoice: '',
      tin: ''
    });
    setOpenAddDialog(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Accounts Payable
      </Typography>

      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddInvoice}
        >
          Add Invoice
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>TIN</TableCell>
              <TableCell>Amount (UGX)</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>EFRIS Invoice</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payables.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.vendor}</TableCell>
                <TableCell>{invoice.tin}</TableCell>
                <TableCell>{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    icon={<ReceiptIcon />}
                    label={invoice.efrisInvoice}
                    onClick={() =>
                      window.open(`https://efris.ura.go.ug/verify?invoice=${invoice.efrisInvoice}`, '_blank')
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={invoice.status}
                    color={invoice.status === 'paid' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handlePayment(invoice)}
                    disabled={invoice.status === 'paid'}
                  >
                    {invoice.status === 'paid' ? 'Paid' : 'Approve Payment'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Approval Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Approve Payment for {selectedInvoice?.efrisInvoice}</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography>Vendor: {selectedInvoice?.vendor}</Typography>
            <Typography>Amount Due: UGX {selectedInvoice?.amount.toLocaleString()}</Typography>
            <Typography>Due Date: {selectedInvoice?.dueDate}</Typography>
          </Box>
          <TextField
            fullWidth
            label="Payment Method"
            select
            margin="normal"
          >
            <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
            <MenuItem value="mobile_money">Mobile Money</MenuItem>
            <MenuItem value="cheque">Cheque</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Payment Reference"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={approvePayment} color="primary">Confirm Payment</Button>
        </DialogActions>
      </Dialog>

      {/* Add Invoice Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Invoice ID (optional)"
            name="id"
            value={newInvoice.id}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Vendor Name"
            name="vendor"
            value={newInvoice.vendor}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="TIN"
            name="tin"
            value={newInvoice.tin}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Amount (UGX)"
            name="amount"
            type="number"
            value={newInvoice.amount}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={newInvoice.dueDate}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="EFRIS Invoice Number"
            name="efrisInvoice"
            value={newInvoice.efrisInvoice}
            onChange={handleInputChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitNewInvoice} color="primary">Add Invoice</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountsPayable;