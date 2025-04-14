import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Box, Button, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Chip, MenuItem 
} from '@mui/material';
import { QrCode as QrCodeIcon, Receipt as ReceiptIcon, Payment as PaymentIcon, Add as AddIcon } from '@mui/icons-material';

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
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    id: '',
    customer: '',
    amount: 0,
    dueDate: '',
    status: 'unpaid',
    efrisInvoice: '',
    tin: ''
  });

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
    const invoiceId = newInvoice.id || `AR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    setReceivables([...receivables, {
      ...newInvoice,
      id: invoiceId,
      amount: Number(newInvoice.amount)
    }]);
    
    setNewInvoice({
      id: '',
      customer: '',
      amount: 0,
      dueDate: '',
      status: 'unpaid',
      efrisInvoice: '',
      tin: ''
    });
    setOpenAddDialog(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Accounts Receivable
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
            label="Customer Name"
            name="customer"
            value={newInvoice.customer}
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
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            value={newInvoice.status}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="partially_paid">Partially Paid</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitNewInvoice} color="primary">Add Invoice</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountsReceivable;