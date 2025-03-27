import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Refresh,
  Visibility,
  AssignmentReturn,
  CheckCircle,
  Close,
  LocalShipping,
  AccountBalance
} from '@mui/icons-material';

// Sample return orders data
const returnOrders = [
  {
    id: 'PR-2023-001',
    originalPO: 'PO-2023-004',
    supplier: 'Uganda Grain Millers',
    date: '2023-06-18',
    items: 2,
    total: 1200000,
    status: 'completed',
    reason: 'Damaged goods',
    creditStatus: 'issued'
  },
  {
    id: 'PR-2023-002',
    originalPO: 'PO-2023-002',
    supplier: 'Namukasa Foods Ltd',
    date: '2023-06-12',
    items: 1,
    total: 600000,
    status: 'pending',
    reason: 'Wrong items delivered',
    creditStatus: 'pending'
  },
  {
    id: 'PR-2023-003',
    originalPO: 'PO-2023-001',
    supplier: 'Wasswa Fresh Produce',
    date: '2023-06-05',
    items: 3,
    total: 900000,
    status: 'cancelled',
    reason: 'Customer error',
    creditStatus: 'none'
  }
];

const ListPurchaseReturnsPage = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [creditFilter, setCreditFilter] = useState('all');
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredReturns = returnOrders.filter(returnOrder => {
    const matchesSearch = returnOrder.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnOrder.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnOrder.originalPO.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || returnOrder.status === statusFilter;
    const matchesCredit = creditFilter === 'all' || returnOrder.creditStatus === creditFilter;
    
    return matchesSearch && matchesStatus && matchesCredit;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };

  const handleViewDetails = (returnOrder) => {
    setSelectedReturn(returnOrder);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Purchase Returns
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage returned items to suppliers
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          href="/purchases/returns/add"
        >
          New Return
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search returns..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 400 }}
        />
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Credit</InputLabel>
            <Select
              value={creditFilter}
              label="Credit"
              onChange={(e) => setCreditFilter(e.target.value)}
            >
              <MenuItem value="all">All Credits</MenuItem>
              <MenuItem value="issued">Issued</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setCreditFilter('all');
          }}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Returns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Return #</TableCell>
              <TableCell>Original PO</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReturns.map((returnOrder) => (
              <TableRow key={returnOrder.id}>
                <TableCell>{returnOrder.id}</TableCell>
                <TableCell>{returnOrder.originalPO}</TableCell>
                <TableCell>{returnOrder.supplier}</TableCell>
                <TableCell>{returnOrder.date}</TableCell>
                <TableCell>{returnOrder.items}</TableCell>
                <TableCell>{formatCurrency(returnOrder.total)}</TableCell>
                <TableCell>
                  <Chip
                    label={returnOrder.status.charAt(0).toUpperCase() + returnOrder.status.slice(1)}
                    color={
                      returnOrder.status === 'completed' ? 'success' :
                      returnOrder.status === 'pending' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={returnOrder.creditStatus.charAt(0).toUpperCase() + returnOrder.creditStatus.slice(1)}
                    color={
                      returnOrder.creditStatus === 'issued' ? 'success' :
                      returnOrder.creditStatus === 'pending' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(returnOrder)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Return Order Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Return Order Details</Typography>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReturn && (
            <Box>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="h6">{selectedReturn.id}</Typography>
                  <Typography variant="subtitle1">Original PO: {selectedReturn.originalPO}</Typography>
                  <Typography variant="subtitle1">Supplier: {selectedReturn.supplier}</Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2">Date: {selectedReturn.date}</Typography>
                  <Typography variant="body2">Reason: {selectedReturn.reason}</Typography>
                </Box>
              </Box>

              {/* Status Indicators */}
              <Box display="flex" gap={2} mb={3}>
                <Chip
                  label={`Status: ${selectedReturn.status.charAt(0).toUpperCase() + selectedReturn.status.slice(1)}`}
                  color={
                    selectedReturn.status === 'completed' ? 'success' :
                    selectedReturn.status === 'pending' ? 'warning' : 'error'
                  }
                />
                <Chip
                  label={`Credit: ${selectedReturn.creditStatus.charAt(0).toUpperCase() + selectedReturn.creditStatus.slice(1)}`}
                  color={
                    selectedReturn.creditStatus === 'issued' ? 'success' :
                    selectedReturn.creditStatus === 'pending' ? 'warning' : 'default'
                  }
                />
              </Box>

              {/* Items Table */}
              <Typography variant="h6" gutterBottom>Returned Items</Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Sample items - in a real app these would come from the return data */}
                    <TableRow>
                      <TableCell>Rice (50kg bag)</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>{formatCurrency(150000)}</TableCell>
                      <TableCell>{formatCurrency(150000)}</TableCell>
                      <TableCell>Damaged packaging</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vegetable Oil (5L)</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>{formatCurrency(25000)}</TableCell>
                      <TableCell>{formatCurrency(50000)}</TableCell>
                      <TableCell>Leaking containers</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Summary */}
              <Box display="flex" justifyContent="flex-end">
                <TableContainer component={Paper} variant="outlined" sx={{ width: 300 }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Subtotal</TableCell>
                        <TableCell align="right">{formatCurrency(selectedReturn.total)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax Refund</TableCell>
                        <TableCell align="right">{formatCurrency(selectedReturn.total * 0.05)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Total Refund</strong></TableCell>
                        <TableCell align="right"><strong>{formatCurrency(selectedReturn.total * 1.05)}</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Actions */}
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button variant="outlined" startIcon={<AssignmentReturn />}>
                  View Return Form
                </Button>
                {selectedReturn.creditStatus === 'pending' && (
                  <Button variant="contained" color="success" startIcon={<CheckCircle />}> Issue Credit </Button> )} <Button variant="contained" color="error" startIcon={<Close />}> Cancel Return </Button> </Box> </Box> )} </DialogContent> <DialogActions> <Button onClick={handleCloseDialog} color="primary"> Close </Button> </DialogActions> </Dialog> </Box> ); };

export default ListPurchaseReturnsPage;