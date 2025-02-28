import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddIcon from "@mui/icons-material/Add";

const designations = ["Finance", "Developer", "HR", "Marketing", "Sales"];

const initialSalaries = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "+256 123 456 789",
    designation: "Finance",
    dateJoined: "2023-06-15",
    salary: "$5,000",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Bob Williams",
    email: "bob@example.com",
    phoneNumber: "+256 987 654 321",
    designation: "Developer",
    dateJoined: "2022-08-10",
    salary: "$6,500",
  },
];

const EmployeeSalaryPage = () => {
  const [salaries, setSalaries] = useState(initialSalaries);
  const [newSalary, setNewSalary] = useState({
    employeeId: "",
    name: "",
    email: "",
    phoneNumber: "",
    designation: "Finance",
    dateJoined: "",
    salary: "",
  });

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSalaryId, setSelectedSalaryId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAddSalaryOpen = () => {
    setOpen(true);
  };

  const handleAddSalaryClose = () => {
    setOpen(false);
  };

  const handleAddSalary = () => {
    const newEntry = {
      id: salaries.length + 1,
      ...newSalary,
    };
    setSalaries([...salaries, newEntry]);
    setNewSalary({
      employeeId: "",
      name: "",
      email: "",
      phoneNumber: "",
      designation: "Finance",
      dateJoined: "",
      salary: "",
    });
    handleAddSalaryClose();
  };

  const handleActionClick = (event, id) => {
    setMenuAnchor(event.currentTarget);
    setSelectedSalaryId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSalaryId(null);
  };

  const handleDeleteSalary = () => {
    setSalaries(salaries.filter((salary) => salary.id !== selectedSalaryId));
    handleMenuClose();
  };

  const handleGeneratePayslip = (id) => {
    alert(`Payslip generated for Employee ID: ${id}`);
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 }, 
    { field: "dateJoined", headerName: "Date Joined", flex: 1 },
    { field: "salary", headerName: "Salary", flex: 1 },
    {
      field: "payslip",
      headerName: "Payslip",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ReceiptIcon />}
          onClick={() => handleGeneratePayslip(params.row.employeeId)}
          fullWidth
        >
          Generate Slip
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleActionClick(event, params.row.id)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Employee Salary Management
      </Typography>

      {/* Add Salary Button */}
      <Box mt={3} textAlign="right">
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple", color: "white" }}
          startIcon={<AddIcon />}
          onClick={handleAddSalaryOpen}
        >
          Add Salary
        </Button>
      </Box>

      {/* Employee Salary Table */}
      <Box mt={4} sx={{ height: "60vh" }}>
        <DataGrid rows={salaries} columns={columns} pageSize={5} />
      </Box>

      {/* Action Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Hide</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteSalary}>Delete</MenuItem>
      </Menu>

      {/* Add Salary Dialog */}
      <Dialog open={open} onClose={handleAddSalaryClose}>
        <DialogTitle>Add Salary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Employee ID"
            fullWidth
            variant="outlined"
            value={newSalary.employeeId}
            onChange={(e) => setNewSalary({ ...newSalary, employeeId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newSalary.name}
            onChange={(e) => setNewSalary({ ...newSalary, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={newSalary.email}
            onChange={(e) => setNewSalary({ ...newSalary, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={newSalary.phoneNumber}
            onChange={(e) => setNewSalary({ ...newSalary, phoneNumber: e.target.value })}
          />
          <TextField
            select
            label="Designation"
            margin="dense"
            fullWidth
            variant="outlined"
            value={newSalary.designation}
            onChange={(e) => setNewSalary({ ...newSalary, designation: e.target.value })}
          >
            {designations.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Date Joined"
            fullWidth
            variant="outlined"
            type="date"
            value={newSalary.dateJoined}
            onChange={(e) => setNewSalary({ ...newSalary, dateJoined: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            fullWidth
            variant="outlined"
            value={newSalary.salary}
            onChange={(e) => setNewSalary({ ...newSalary, salary: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSalaryClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSalary} color="primary">
            Add Salary
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeSalaryPage;
