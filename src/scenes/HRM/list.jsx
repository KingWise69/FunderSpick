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
  Chip,
  OutlinedInput,
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

// Extract unique categories, sub-categories, and statuses for filters
const allCategories = [...new Set(initialEmployees.map(emp => emp.category))];
const allSubCategories = [...new Set(initialEmployees.map(emp => emp.subCategory))];
const allStatuses = [...new Set(initialEmployees.map(emp => emp.status))];

const EmployeeList = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
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
    // Text search across multiple fields
    const matchesSearch = searchTerm === "" || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(employee.category);

    // Sub-category filter
    const matchesSubCategory = selectedSubCategories.length === 0 || 
      selectedSubCategories.includes(employee.subCategory);

    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || 
      selectedStatuses.includes(employee.status);

    return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
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
            backgroundColor: statusColors[params.value] || "grey",
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: statusColors[params.value] || "grey" },
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
      <Box display="flex" flexDirection="column" gap={2} mt={3}>
        {/* General Search */}
        <TextField
          label="Search Employees"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Row */}
        <Box display="flex" gap={2} flexWrap="wrap">
          {/* Category Filter */}
          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {allCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sub-category Filter */}
          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Sub-categories</InputLabel>
            <Select
              multiple
              value={selectedSubCategories}
              onChange={(e) => setSelectedSubCategories(e.target.value)}
              input={<OutlinedInput label="Sub-categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {allSubCategories.map((subCategory) => (
                <MenuItem key={subCategory} value={subCategory}>
                  {subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filter */}
          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              multiple
              value={selectedStatuses}
              onChange={(e) => setSelectedStatuses(e.target.value)}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={value} 
                      sx={{ 
                        backgroundColor: statusColors[value] || 'grey',
                        color: 'white'
                      }} 
                    />
                  ))}
                </Box>
              )}
            >
              {allStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  <Box sx={{ 
                    width: 14, 
                    height: 14, 
                    backgroundColor: statusColors[status] || 'grey',
                    mr: 1,
                    borderRadius: '3px'
                  }} />
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
        <DataGrid 
          rows={filteredEmployees} 
          columns={columns} 
          pageSize={5} 
          autoHeight 
          rowsPerPageOptions={[5, 10, 20]}
        />
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
              {allStatuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
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