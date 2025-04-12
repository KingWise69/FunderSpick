import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme } from "@mui/material/styles";

// Initial Employee Data with Categories and Sub-categories
const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+256 123 456 789",
    designation: "Developer",
    category: "Tech",
    subCategory: "Frontend",
    joiningDate: "2024-02-15",
    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Tumuwebazi Williams",
    email: "bob@example.com",
    phone: "+256 987 654 321",
    designation: "Finance",
    category: "Finance",
    subCategory: "Accounting",
    joiningDate: "2023-09-10",
    status: "Inactive",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Queen Victoria",
    email: "Queen@example.com",
    phone: "+256 987 654 321",
    designation: "Banking",
    category: "Finance",
    subCategory: "Loans",
    joiningDate: "2024-09-10",
    status: "Suspended",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Bob Tulemeka",
    email: "bobtu@example.com",
    phone: "+256 782 654 321",
    designation: "Marketing",
    category: "Sales",
    subCategory: "Digital",
    joiningDate: "2024-09-11",
    status: "Fired",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Garvin Tulemeka",
    email: "bobtu@example.com",
    phone: "+256 782 654 321",
    designation: "Marketing",
    category: "Sales",
    subCategory: "Branding",
    joiningDate: "2024-09-11",
    status: "Warning",
  },
];

const statusColors = {
  Active: "green",
  Inactive: "blue",
  Suspended: "orange",
  Fired: "red",
  Warning: "grey",
  "New Joiner": "purple",
};

const EmployeeList = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    category: "",
    subCategory: "",
    joiningDate: "",
    status: "Active",
  });

  const filteredEmployees = employees.filter((employee) => {
    return (
      (searchCategory ? employee.category.includes(searchCategory) : true) &&
      (searchSubCategory ? employee.subCategory.includes(searchSubCategory) : true)
    );
  });

  const handleAddEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setOpenAddDialog(false);
    setNewEmployee({
      employeeId: "",
      name: "",
      email: "",
      phone: "",
      designation: "",
      category: "",
      subCategory: "",
      joiningDate: "",
      status: "Active",
    });
  };

  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone Number", flex: 1.2 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subCategory", headerName: "Sub-category", flex: 1 },
    { field: "joiningDate", headerName: "Joining Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: statusColors[params.value],
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: statusColors[params.value] },
          }}
        >
          {params.value}
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold">
        Employee Management
      </Typography>

      {/* Search Filters */}
      <Box display="flex" gap={2} mt={3}>
        <TextField
          label="Search by Category"
          variant="outlined"
          fullWidth
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <TextField
          label="Search by Sub-category"
          variant="outlined"
          fullWidth
          value={searchSubCategory}
          onChange={(e) => setSearchSubCategory(e.target.value)}
        />
      </Box>

      {/* Button Cards */}
      <Box display="flex" gap={2} mt={3}>
        {[ 
          { label: "Total Employees", value: filteredEmployees.length, icon: <PersonIcon />, color: "#E0E0E0" },
          { label: "Active", value: filteredEmployees.filter((e) => e.status === "Active").length, icon: <CheckCircleIcon />, color: "#E0E0E0" },
          { label: "Inactive", value: filteredEmployees.filter((e) => e.status === "Inactive").length, icon: <CancelIcon />, color: "#E0E0E0" },
          { label: "New Joiners", value: filteredEmployees.filter((e) => e.status === "New Joiner").length, icon: <PersonAddIcon />, color: "#E0E0E0" },
        ].map((card, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F9F6EE",
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              boxShadow: "none",
            }}
          >
            <Box sx={{ color: "black" }}>{card.icon}</Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "black" }}>
              {card.value}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "black" }}>
              {card.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Add Employee Button */}
      <Box mt={4} textAlign="right">
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple", color: "white" }}
          startIcon={<PersonAddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Employee
        </Button>
      </Box>

      {/* Employee Table */}
      <Box mt={4}>
        <DataGrid rows={filteredEmployees} columns={columns} pageSize={5} autoHeight />
      </Box>

      {/* Add Employee Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {["employeeId", "name", "email", "phone", "designation", "category", "subCategory", "joiningDate"].map((field) => (
            <TextField
              key={field}
              label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
              fullWidth
              margin="dense"
              value={newEmployee[field]}
              onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
            />
          ))}
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newEmployee.status}
              onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEmployee} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
