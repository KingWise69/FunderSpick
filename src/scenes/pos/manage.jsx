import React, { useState } from 'react';
import {
  Box, Grid, Typography, Button, Card, CardContent,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, MenuItem, Select
} from '@mui/material';
import { SaveAlt, FilterList, PictureAsPdf, GetApp } from '@mui/icons-material';

const ManageSalesPage = () => {
  const [salesData, setSalesData] = useState([
    { id: 1, date: '2025-03-01', orderId: 'ORD123', customer: 'John Doe', product: 'Laptop', quantity: 1, total: 1200, status: 'Completed' },
    { id: 2, date: '2025-03-02', orderId: 'ORD124', customer: 'Jane Smith', product: 'Phone', quantity: 2, total: 1000, status: 'Pending' },
    { id: 3, date: '2025-03-03', orderId: 'ORD125', customer: 'Samuel Lee', product: 'Tablet', quantity: 1, total: 500, status: 'Completed' },
    { id: 4, date: '2025-03-04', orderId: 'ORD126', customer: 'Lisa Johnson', product: 'Headphones', quantity: 3, total: 450, status: 'Completed' },
  ]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleFilterDialogOpen = () => setOpenFilterDialog(true);
  const handleFilterDialogClose = () => setOpenFilterDialog(false);

  const handleStatusChange = (event) => setFilterStatus(event.target.value);

  const filteredSalesData = salesData.filter((sale) =>
    filterStatus === 'All' || sale.status === filterStatus
  );

  const handleExport = (format) => {
    console.log(`Exporting data as ${format}`);
    // Implement export logic for CSV or PDF here
  };

  const handlePageChange = (event, newPage) => setPage(newPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Sales
      </Typography>

      {/* Sales Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">UGX 3150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Sales</Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <Box sx={{ marginY: 2 }}>
        <Button variant="contained" onClick={handleFilterDialogOpen} startIcon={<FilterList />}>
          Filter Sales
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleExport('CSV')}
          startIcon={<GetApp />}
          sx={{ marginLeft: 2, backgroundColor: '#4CAF50', color: 'white' }}
        >
          Export as Excel
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleExport('PDF')}
          startIcon={<PictureAsPdf />}
          sx={{ marginLeft: 2, backgroundColor: '#f44336', color: 'white' }}
        >
          Export as PDF
        </Button>
      </Box>

      {/* Sales Table */}
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.orderId}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>{sale.total}</TableCell>
                <TableCell>{sale.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredSalesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
      />

      {/* Filter Dialog */}
      <Dialog open={openFilterDialog} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter Sales</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose}>Cancel</Button>
          <Button onClick={handleFilterDialogClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSalesPage;
