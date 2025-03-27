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
  Receipt,
  Inventory,
  ArrowBack,
  CheckCircle,
  Close,
  LocalShipping,
  AccountBalance,
  CalendarToday
} from '@mui/icons-material';

// Sample purchase orders data with Ugandan suppliers
const purchaseOrders = [
  {
    id: 'PO-2023-001',
    supplier: 'Wasswa Fresh Produce',
    date: '2023-06-15',
    items: 8,
    total: 4500000,
    status: 'completed',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    dueDate: '2023-06-30'
  },
  {
    id: 'PO-2023-002',
    supplier: 'Namukasa Foods Ltd',
    date: '2023-06-10',
    items: 5,
    total: 3200000,
    status: 'completed',
    paymentStatus: 'partial',
    deliveryStatus: 'delivered',
    dueDate: '2023-06-25'
  },
  {
    id: 'PO-2023-003',
    supplier: 'Kampala Beverage Distributors',
    date: '2023-06-05',
    items: 12,
    total: 7800000,
    status: 'pending',
    paymentStatus: 'unpaid',
    deliveryStatus: 'processing',
    dueDate: '2023-06-20'
  },
  {
    id: 'PO-2023-004',
    supplier: 'Uganda Grain Millers',
    date: '2023-05-28',
    items: 15,
    total: 9200000,
    status: 'completed',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    dueDate: '2023-06-15'
  },
  {
    id: 'PO-2023-005',
    supplier: 'Jinja Dairy Farm',
    date: '2023-05-20',
    items: 6,
    total: 2800000,
    status: 'cancelled',
    paymentStatus: 'unpaid',
    deliveryStatus: 'cancelled',
    dueDate: '2023-06-05'
  }
];

const ListPurchasesPage = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    const matchesDelivery = deliveryFilter === 'all' || order.deliveryStatus === deliveryFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDelivery;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
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
            Purchase Orders
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage your inventory purchases
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          href="/purchases/add"
        >
          New Purchase
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search purchases..."
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
            <InputLabel>Payment</InputLabel>
            <Select
              value={paymentFilter}
              label="Payment"
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <MenuItem value="all">All Payments</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Delivery</InputLabel>
            <Select
              value={deliveryFilter}
              label="Delivery"
              onChange={(e) => setDeliveryFilter(e.target.value)}
            >
              <MenuItem value="all">All Deliveries</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setPaymentFilter('all');
            setDeliveryFilter('all');
          }}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Purchases Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PO Number</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    color={
                      order.status === 'completed' ? 'success' :
                      order.status === 'pending' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    color={
                      order.paymentStatus === 'paid' ? 'success' :
                      order.paymentStatus === 'partial' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.deliveryStatus.charAt(0).toUpperCase() + order.deliveryStatus.slice(1)}
                    color={
                      order.deliveryStatus === 'delivered' ? 'success' :
                      order.deliveryStatus === 'processing' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(order)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Purchase Order Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Purchase Order Details</Typography>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="h6">{selectedOrder.id}</Typography>
                  <Typography variant="subtitle1">{selectedOrder.supplier}</Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2">Date: {selectedOrder.date}</Typography>
                  <Typography variant="body2">Due Date: {selectedOrder.dueDate}</Typography>
                </Box>
              </Box>

              {/* Status Indicators */}
              <Box display="flex" gap={2} mb={3}>
                <Chip
                  label={`Status: ${selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}`}
                  color={
                    selectedOrder.status === 'completed' ? 'success' :
                    selectedOrder.status === 'pending' ? 'warning' : 'error'
                  }
                />
                <Chip
                  label={`Payment: ${selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}`}
                  color={
                    selectedOrder.paymentStatus === 'paid' ? 'success' :
                    selectedOrder.paymentStatus === 'partial' ? 'warning' : 'error'
                  }
                />
                <Chip
                  label={`Delivery: ${selectedOrder.deliveryStatus.charAt(0).toUpperCase() + selectedOrder.deliveryStatus.slice(1)}`}
                  color={
                    selectedOrder.deliveryStatus === 'delivered' ? 'success' :
                    selectedOrder.deliveryStatus === 'processing' ? 'warning' : 'error'
                  }
                />
              </Box>

              {/* Items Table */}
              <Typography variant="h6" gutterBottom>Items Ordered</Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Sample items - in a real app these would come from the order data */}
                    <TableRow>
                      <TableCell>Fresh Tomatoes (1kg)</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>{formatCurrency(5000)}</TableCell>
                      <TableCell>{formatCurrency(100000)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rice (50kg bag)</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>{formatCurrency(150000)}</TableCell>
                      <TableCell>{formatCurrency(750000)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vegetable Oil (5L)</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>{formatCurrency(25000)}</TableCell>
                      <TableCell>{formatCurrency(250000)}</TableCell>
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
                        <TableCell align="right">{formatCurrency(selectedOrder.total * 0.95)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax (5%)</TableCell>
                        <TableCell align="right">{formatCurrency(selectedOrder.total * 0.05)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Total</strong></TableCell>
                        <TableCell align="right"><strong>{formatCurrency(selectedOrder.total)}</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Actions */}
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button variant="outlined" startIcon={<Receipt />}>
                  View Invoice
                </Button>
                <Button variant="outlined" startIcon={<LocalShipping />}>
                  Track Delivery
                </Button>
                <Button variant="outlined" startIcon={<AccountBalance />}>
                  Record Payment
                </Button>
                <Button variant="contained" startIcon={<CheckCircle />}>
                  Mark as Completed
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ListPurchasesPage;