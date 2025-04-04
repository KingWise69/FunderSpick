import { useState } from "react";
import { Box, Button, MenuItem, Select, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import * as XLSX from "xlsx";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";


const JournalVoucher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([
    { id: 1, date: "2025-02-20", accountName: "Mugisha Daniel", debit: "1500", credit: "0", narration: "Office Supplies Purchase", action: "edit" },
    { id: 2, date: "2025-02-21", accountName: "Nakato Maria", debit: "0", credit: "800", narration: "Salary Payment", action: "edit" },
  ]);

  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    accountName: "",
    debit: "",
    credit: "",
    narration: "",
  });

  const handleActionChange = (id, newAction) => {
    setRows(rows.map(row => (row.id === id ? { ...row, action: newAction } : row)));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAddEntry = () => {
    setRows([...rows, { id: rows.length + 1, ...newEntry, action: "edit" }]);
    handleClose();
    setNewEntry({ date: "", accountName: "", debit: "", credit: "", narration: "" });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "JournalVoucher");
    XLSX.writeFile(workbook, "JournalVoucher.xlsx");
  };

  const exportToPDF = () => {
    window.print();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "accountName", headerName: "Account Name", flex: 1 },
    { field: "debit", headerName: "Debit Amount", flex: 1 },
    { field: "credit", headerName: "Credit Amount", flex: 1 },
    { field: "narration", headerName: "Narration", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.row.action}
          onChange={(e) => handleActionChange(params.row.id, e.target.value)}
          sx={{ width: "100px", fontSize: "14px" }}
        >
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="JOURNAL VOUCHER" subtitle="Manage your journal transactions" />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Journal Entry
        </Button>

        {/* Excel and PDF Export Buttons */}
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              color: "white",
              mr: 1,
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
          >
            Export Excel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
          >
            PDF
          </Button>
        </Box>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          "& .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>

      {/* Add Entry Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="modal-title" mb={2}>
            Create Journal Entry
          </Typography>
          <TextField fullWidth label="Date" name="date" value={newEntry.date} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Account Name" name="accountName" value={newEntry.accountName} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Debit Amount" name="debit" value={newEntry.debit} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Credit Amount" name="credit" value={newEntry.credit} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Narration" name="narration" value={newEntry.narration} onChange={handleChange} margin="normal" />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddEntry}>
            Add Entry
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default JournalVoucher;
