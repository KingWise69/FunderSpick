import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVert, Edit, VisibilityOff, Delete, CloudUpload, GetApp, PictureAsPdf } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const SupplierListPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dummy Supplier Data
  const initialSuppliers = [
    { id: 1, name: "Tech Supplies Ltd", contactPerson: "James Kato", mobile: "+256789654321", email: "james.kato@example.com", state: "Kampala", balance: "$1,200" },
    { id: 2, name: "Delhi Hardware", contactPerson: "Rajesh Sharma", mobile: "+91 9876543210", email: "rajesh.sharma@example.com", state: "New Delhi", balance: "$890" },
    { id: 3, name: "Tokyo Electronics", contactPerson: "Yuki Nakamura", mobile: "+81 80-5678-1234", email: "yuki.nakamura@example.com", state: "Tokyo", balance: "$2,500" },
    { id: 4, name: "Bogotá Imports", contactPerson: "María González", mobile: "+57 311 4567890", email: "maria.gonzalez@example.com", state: "Bogotá", balance: "$750" },
    { id: 5, name: "US Trade Co.", contactPerson: "Michael Brown", mobile: "+1 555-987-6543", email: "michael.brown@example.com", state: "California", balance: "$3,000" },
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Handle Open Action Menu
  const handleOpenMenu = (event, supplier) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(supplier);
  };

  // Handle Close Action Menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSupplier(null);
  };

  // Handle Delete
  const handleDelete = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    handleCloseMenu();
  };

  // Handle Hide (Mock action)
  const handleHide = (id) => {
    alert(`Supplier with ID ${id} is now hidden`);
    handleCloseMenu();
  };

  // Handle Edit (Mock action)
  const handleEdit = (id) => {
    alert(`Editing supplier with ID ${id}`);
    handleCloseMenu();
  };

  // Handle Export to PDF (Mock Action)
  const handleDownloadPDF = () => {
    alert("Downloading supplier list as PDF...");
  };

  // Handle Export to Excel (Mock Action)
  const handleDownloadExcel = () => {
    alert("Downloading supplier list as Excel...");
  };

  // Table Columns
  const columns = [
    { field: "name", headerName: "Supplier Name", flex: 1.5 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1.2 },
    { field: "mobile", headerName: "Mobile", flex: 1.2 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleOpenMenu(event, params.row)}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleEdit(selectedSupplier?.id)}>
              <Edit sx={{ marginRight: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => handleHide(selectedSupplier?.id)}>
              <VisibilityOff sx={{ marginRight: 1 }} /> Hide
            </MenuItem>
            <MenuItem onClick={() => handleDelete(selectedSupplier?.id)} sx={{ color: "red" }}>
              <Delete sx={{ marginRight: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Supplier List
      </Typography>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" sx={{ backgroundColor: "purple", color: "white" }}>
          Create Supplier
        </Button>
        <Box display="flex" gap={2}>
          <Button variant="contained" sx={{ backgroundColor: "green", color: "white" }} startIcon={<CloudUpload />}>
            Import
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "red", color: "white" }} startIcon={<PictureAsPdf />} onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "green", color: "white" }} startIcon={<GetApp />} onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </Box>
      </Box>

      {/* Supplier Table */}
      <Box sx={{ height: "60vh" }}>
        <DataGrid
          rows={suppliers}
          columns={columns}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          }}
        />
      </Box>
    </Box>
  );
};

export default SupplierListPage;
