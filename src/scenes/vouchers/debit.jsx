import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import * as XLSX from "xlsx";

const DebitVoucher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([
    { id: 1, date: "2025-02-20", accountName: "John Doe", particular: "Office Supplies", warehouse: "Main Warehouse", mode: "Bank Transfer", chequeNo: "123456", amount: "500" },
    { id: 2, date: "2025-02-21", accountName: "Mugisha Daniel", particular: "Transport Reimbursement", warehouse: "Kampala Branch", mode: "Cash", chequeNo: "234567", amount: "200" },
    { id: 3, date: "2025-02-22", accountName: "Nakato Maria", particular: "Laptop Purchase", warehouse: "Jinja Warehouse", mode: "Bank Transfer", chequeNo: "345678", amount: "1200" },
  ]);

  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: "", accountName: "", particular: "", warehouse: "", mode: "", chequeNo: "", amount: "" });

  const handleAddEntry = () => {
    setRows([...rows, { id: rows.length + 1, ...newEntry }]);
    setOpen(false);
    setNewEntry({ date: "", accountName: "", particular: "", warehouse: "", mode: "", chequeNo: "", amount: "" });
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Debit Vouchers");
    XLSX.writeFile(workbook, "debit_vouchers.xlsx");
  };

  const printPDF = () => {
    window.print();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "accountName", headerName: "Account Name", flex: 1 },
    { field: "particular", headerName: "Particular", flex: 1 },
    { field: "warehouse", headerName: "Warehouse", flex: 1 },
    { field: "mode", headerName: "Mode", flex: 1 },
    { field: "chequeNo", headerName: "Cheque No.", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Select value="" onChange={(e) => e.target.value === "delete" ? handleDelete(params.row.id) : null} sx={{ width: "100px", fontSize: "14px" }}>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DEBIT VOUCHER" subtitle="Manage your debit transactions" />

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Create Debit
        </Button>
        <Button variant="contained" color="success" startIcon={<FileDownloadIcon />} onClick={exportToExcel}>
          Export Excel
        </Button>
        <Button variant="contained" color="error" startIcon={<PictureAsPdfIcon />} onClick={printPDF}>
          Export PDF
        </Button>
      </Box>

      <Box height="75vh" sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
        "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
        "& .MuiButton-text": { color: `${colors.grey[100]} !important` },
      }}>
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

      {/* Modal for Adding Debit Entry */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Debit Entry</DialogTitle>
        <DialogContent>
          <TextField label="Date" fullWidth margin="dense" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} />
          <TextField label="Account Name" fullWidth margin="dense" value={newEntry.accountName} onChange={(e) => setNewEntry({ ...newEntry, accountName: e.target.value })} />
          <TextField label="Particular" fullWidth margin="dense" value={newEntry.particular} onChange={(e) => setNewEntry({ ...newEntry, particular: e.target.value })} />
          <TextField label="Warehouse" fullWidth margin="dense" value={newEntry.warehouse} onChange={(e) => setNewEntry({ ...newEntry, warehouse: e.target.value })} />
          <TextField label="Mode" fullWidth margin="dense" value={newEntry.mode} onChange={(e) => setNewEntry({ ...newEntry, mode: e.target.value })} />
          <TextField label="Cheque No." fullWidth margin="dense" value={newEntry.chequeNo} onChange={(e) => setNewEntry({ ...newEntry, chequeNo: e.target.value })} />
          <TextField label="Amount" fullWidth margin="dense" value={newEntry.amount} onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEntry} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DebitVoucher;
