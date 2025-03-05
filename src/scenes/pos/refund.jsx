import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const RefundsAndReturnsPage = () => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [refundRequests, setRefundRequests] = useState([
    {
      id: 1,
      orderId: 'ORD123',
      customerName: 'Joshua Magezi',
      amount: '200,000 UGX',
      reason: 'Damaged product',
      status: 'Pending',
    },
    {
      id: 2,
      orderId: 'ORD124',
      customerName: 'Alice Kato',
      amount: '350,000 UGX',
      reason: 'Wrong size',
      status: 'Completed',
    },
    {
      id: 3,
      orderId: 'ORD125',
      customerName: 'Michael Akullo',
      amount: '150,000 UGX',
      reason: 'Did not like the product',
      status: 'Pending',
    },
    {
      id: 4,
      orderId: 'ORD126',
      customerName: 'Ruth Namazzi',
      amount: '500,000 UGX',
      reason: 'Order mistake',
      status: 'Completed',
    },
    {
      id: 5,
      orderId: 'ORD127',
      customerName: 'John Kiggundu',
      amount: '250,000 UGX',
      reason: 'Late delivery',
      status: 'Pending',
    },
  ]);
  const [newRequest, setNewRequest] = useState({
    orderId: '',
    customerName: '',
    amount: '',
    reason: '',
    status: 'Pending',
  });

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNewRequest = () => {
    setRefundRequests((prevState) => [...prevState, { ...newRequest, id: Date.now() }]);
    setNewRequest({
      orderId: '',
      customerName: '',
      amount: '',
      reason: '',
      status: 'Pending',
    });
    handleCloseRequestDialog();
  };

  const handleEditRequest = (id) => {
    // Logic to edit request based on the id.
  };

  const handleDeleteRequest = (id) => {
    setRefundRequests((prevState) => prevState.filter((request) => request.id !== id));
  };

  return (
    <Box>
      <h1>Refunds & Returns</h1>

      {/* Add New Refund/Return Request Button (Top Right) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="secondary" onClick={handleOpenRequestDialog}>
          Add New Refund/Return Request
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box display="flex" gap={2} mb={3}>
        <Button variant="contained" color="primary">
          Active Requests: {refundRequests.filter((req) => req.status === 'Pending').length}
        </Button>
        <Button variant="contained" color="secondary">
          Completed Requests: {refundRequests.filter((req) => req.status === 'Completed').length}
        </Button>
        <Button variant="contained" color="error">
          Pending Requests: {refundRequests.filter((req) => req.status === 'Pending').length}
        </Button>
      </Box>

      {/* Requests Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refundRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.orderId}</TableCell>
                <TableCell>{request.customerName}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditRequest(request.id)} color="primary">Edit</Button>
                  <Button onClick={() => handleDeleteRequest(request.id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Refund/Return Request Dialog */}
      <Dialog open={openRequestDialog} onClose={handleCloseRequestDialog}>
        <DialogTitle>Add New Refund/Return Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Order ID"
            fullWidth
            value={newRequest.orderId}
            onChange={handleNewRequestChange}
            name="orderId"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Customer Name"
            fullWidth
            value={newRequest.customerName}
            onChange={handleNewRequestChange}
            name="customerName"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={newRequest.amount}
            onChange={handleNewRequestChange}
            name="amount"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Reason"
            fullWidth
            value={newRequest.reason}
            onChange={handleNewRequestChange}
            name="reason"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={newRequest.status}
              onChange={handleNewRequestChange}
              name="status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            <FormHelperText>Refund/Return request status</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRequestDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddNewRequest} color="primary">Add Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RefundsAndReturnsPage;
