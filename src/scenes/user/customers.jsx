import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, Grid, Card, CardContent, CardActions, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileExcelIcon from '@mui/icons-material/InsertDriveFile'; 
import FilePdfIcon from '@mui/icons-material/PictureAsPdf'; 
import { ExcelExport, PDFExport } from './Export'; 

const CustomerPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Kato Paul', email: 'kato.paul@gmail.com', phone: '+256701234567', status: 'Active' },
    { id: 2, name: 'Nakato Amina', email: 'nakato.amina@yahoo.com', phone: '+256702345678', status: 'Inactive' },
    { id: 3, name: 'Ochieng David', email: 'ochieng.david@gmail.com', phone: '+256703456789', status: 'Active' },
    { id: 4, name: 'Nabukenya Sandra', email: 'nabukenya.sandra@hotmail.com', phone: '+256704567890', status: 'Active' },
    { id: 5, name: 'Mugisha Jonathan', email: 'mugisha.jonathan@outlook.com', phone: '+256705678901', status: 'Inactive' },
    { id: 6, name: 'Kizza Ivan', email: 'kizza.ivan@gmail.com', phone: '+256706789012', status: 'Active' },
    { id: 7, name: 'Tukahirwa Naomi', email: 'tukahirwa.naomi@live.com', phone: '+256707890123', status: 'Inactive' },
    { id: 8, name: 'Bukenya Isaac', email: 'bukenya.isaac@yahoo.com', phone: '+256708901234', status: 'Active' },
    { id: 9, name: 'Ssebuuma Grace', email: 'ssebuuma.grace@gmail.com', phone: '+256709012345', status: 'Active' },
    { id: 10, name: 'Nakitende Diana', email: 'nakitende.diana@hotmail.com', phone: '+256710123456', status: 'Inactive' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', status: 'Active' });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleAddCustomer = () => {
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
    setOpenDialog(false);
    setNewCustomer({ name: '', email: '', phone: '', status: 'Active' });
  };

  const handleDeleteCustomer = (id) => setCustomers(customers.filter((customer) => customer.id !== id));

  const handleCustomerEdit = (id) => {
    // Add customer editing functionality here
  };

  const filteredCustomers = customers.filter(
    (customer) => customer.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
                  (filter === "All" || customer.status === filter)
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Customer Management</Typography>
        <Box display="flex" alignItems="center">
          {/* Excel Export Button */}
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<FileExcelIcon />} 
            sx={{ mr: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
          >
            Excel
          </Button>

          {/* PDF Export Button */}
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<FilePdfIcon />} 
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
          >
            PDF
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Box display="flex" mb={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <TextField 
          label="Search Customer" 
          variant="outlined" 
          value={searchTerm} 
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: '200px', mr: 2 }} 
        />
        <Select value={filter} onChange={handleFilterChange} sx={{ minWidth: '200px' }}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenDialog(true)} 
          sx={{ backgroundColor: '#7c4dff', '&:hover': { backgroundColor: '#5e35b1' } }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Customer Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleCustomerEdit(customer.id)} sx={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCustomer(customer.id)} sx={{ color: '#d32f2f' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={Math.ceil(customers.length / 10)} variant="outlined" color="primary" />
      </Box>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Select
            label="Status"
            value={newCustomer.status}
            onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddCustomer} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerPage;
