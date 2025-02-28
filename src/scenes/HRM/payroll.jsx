import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const payrollCategories = {
  Additions: [
    { id: 1, name: "Kwame Mensah", category: "Performance Bonus", amount: "UGX 500,000" },
    { id: 2, name: "Rohan Patel", category: "Housing Allowance", amount: "INR 20,000" },
    { id: 3, name: "John Smith", category: "Transport Allowance", amount: "USD 150" },
    { id: 4, name: "Adeola Chukwu", category: "Health Bonus", amount: "NGN 50,000" },
  ],
  Overtime: [
    { id: 1, name: "Mukasa Daniel", category: "Weekday Overtime", amount: "UGX 20,000/hr" },
    { id: 2, name: "Priya Sharma", category: "Weekend Overtime", amount: "INR 1,500/hr" },
    { id: 3, name: "James Johnson", category: "Holiday Overtime", amount: "USD 30/hr" },
    { id: 4, name: "Chinwe Okoro", category: "Emergency OT", amount: "NGN 5,000/hr" },
  ],
  Deductions: [
    { id: 1, name: "Nsubuga Fred", category: "Tax", amount: "UGX 200,000" },
    { id: 2, name: "Anjali Verma", category: "Loan Repayment", amount: "INR 5,000" },
    { id: 3, name: "Michael Brown", category: "Pension", amount: "USD 100" },
    { id: 4, name: "Tunde Adeyemi", category: "Union Fees", amount: "NGN 3,000" },
  ],
};

const PayrollItemsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(payrollCategories);
  const [openForm, setOpenForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "", amount: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddClick = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setNewItem({ name: "", category: "", amount: "" });
  };

  const handleSaveItem = () => {
    if (!selectedCategory) return;
    const updatedData = {
      ...data,
      [selectedCategory]: [
        ...data[selectedCategory],
        { id: data[selectedCategory].length + 1, ...newItem },
      ],
    };
    setData(updatedData);
    handleCloseForm();
  };

  const handleActionMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleDeleteItem = () => {
    if (!selectedCategory || !selectedRow) return;
    setData({
      ...data,
      [selectedCategory]: data[selectedCategory].filter((item) => item.id !== selectedRow.id),
    });
    handleActionMenuClose();
  };

  const handleHideItem = () => {
    console.log("Hiding:", selectedRow);
    handleActionMenuClose();
  };

  const handleEditItem = () => {
    console.log("Editing:", selectedRow);
    handleActionMenuClose();
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "amount", headerName: "Default/Unit Amount", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleActionMenuOpen(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleActionMenuClose}
          >
            <MuiMenuItem onClick={handleHideItem}>Hide</MuiMenuItem>
            <MuiMenuItem onClick={handleEditItem}>Edit</MuiMenuItem>
            <MuiMenuItem onClick={handleDeleteItem} sx={{ color: "red" }}>
              Delete
            </MuiMenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Payroll Items Management
      </Typography>

      {/* Button Cards */}
      <Grid container spacing={2} mt={3}>
        {["Additions", "Overtime", "Deductions"].map((category) => (
          <Grid item xs={4} key={category}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedCategory === category ? "#D1C4E9" : "#F3F4F6",
                "&:hover": { backgroundColor: "#D1C4E9" },
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <Typography variant="h6" fontWeight="bold">
                {category}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Button (Top Right) */}
      {selectedCategory && (
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            sx={{ backgroundColor: "purple", color: "white" }}
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add {selectedCategory}
          </Button>
        </Box>
      )}

      {/* Data Table */}
      {selectedCategory && (
        <Box mt={4} sx={{ height: "50vh" }}>
          <Typography variant="h6" mb={2}>
            {selectedCategory} List
          </Typography>
          <DataGrid rows={data[selectedCategory]} columns={columns} pageSize={5} />
        </Box>
      )}

      {/* Add Item Form (Dialog) */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add {selectedCategory}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            margin="normal"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <TextField
            fullWidth
            label="Default/Unit Amount"
            variant="outlined"
            margin="normal"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveItem} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollItemsPage;
