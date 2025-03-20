import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileExcelIcon from '@mui/icons-material/InsertDriveFile'; 
import FilePdfIcon from '@mui/icons-material/PictureAsPdf'; 
import { ExcelExport, PDFExport } from './Export'; 

const CustomerGroupsPage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'VIP Customers', description: 'High-value customers', status: 'Active' },
    { id: 2, name: 'Regular Customers', description: 'Frequent buyers', status: 'Inactive' },
    { id: 3, name: 'New Customers', description: 'Customers who joined recently', status: 'Active' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', status: 'Active' });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleAddGroup = () => {
    setGroups([...groups, { id: groups.length + 1, ...newGroup }]);
    setOpenDialog(false);
    setNewGroup({ name: '', description: '', status: 'Active' });
  };

  const handleDeleteGroup = (id) => setGroups(groups.filter((group) => group.id !== id));

  const handleGroupEdit = (id) => {
    // Add group editing functionality here
  };

  const filteredGroups = groups.filter(
    (group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
               (filter === "All" || group.status === filter)
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Customer Groups Management</Typography>
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
          label="Search Group" 
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
          Add Group
        </Button>
      </Box>

      {/* Customer Groups Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>{group.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleGroupEdit(group.id)} sx={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteGroup(group.id)} sx={{ color: '#d32f2f' }}>
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
        <Pagination count={Math.ceil(groups.length / 10)} variant="outlined" color="primary" />
      </Box>

      {/* Add/Edit Group Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Select
            label="Status"
            value={newGroup.status}
            onChange={(e) => setNewGroup({ ...newGroup, status: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddGroup} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerGroupsPage;
