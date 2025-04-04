import { Box, Button, MenuItem, Select, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const CreditVoucher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([
    { id: 1, date: "2025-02-20", accountName: "Mugisha Daniel", particular: "Payment Received", warehouse: "Kampala Branch", mode: "Bank Transfer", chequeNo: "123456", amount: "1500" },
    { id: 2, date: "2025-02-21", accountName: "Nakato Maria", particular: "Customer Deposit", warehouse: "Jinja Warehouse", mode: "Cash", chequeNo: "234567", amount: "800" },
    { id: 3, date: "2025-02-22", accountName: "Kato Emmanuel", particular: "Loan Repayment", warehouse: "Mbarara Branch", mode: "Mobile Money", chequeNo: "345678", amount: "2000" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [newCredit, setNewCredit] = useState({
    date: "",
    accountName: "",
    particular: "",
    warehouse: "",
    mode: "",
    chequeNo: "",
    amount: "",
  });

  const handleActionChange = (id, newAction) => {
    if (newAction === "delete") {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Credit Vouchers");
    XLSX.writeFile(wb, "credit_vouchers.xlsx");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleAddCredit = () => {
    setRows([...rows, { id: rows.length + 1, ...newCredit }]);
    setNewCredit({ date: "", accountName: "", particular: "", warehouse: "", mode: "", chequeNo: "", amount: "" });
    setOpenModal(false);
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
        <Select
          value=""
          onChange={(e) => handleActionChange(params.row.id, e.target.value)}
          sx={{ width: "100px", fontSize: "14px" }}
          displayEmpty
        >
          <MenuItem disabled value="">
            Actions
          </MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CREDIT VOUCHER" subtitle="Manage your credit transactions" />
      
      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Create Credit
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleExportExcel} 
          startIcon={<DownloadIcon />}
        >
          Export Excel
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handlePrintPDF} 
          startIcon={<PictureAsPdfIcon />}
        >
          Export PDF
        </Button>
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

      {/* Modal for adding new credit */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
          <Typography variant="h6" mb={2}>
            Add Credit Entry
          </Typography>
          <TextField
            label="Date"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.date}
            onChange={(e) => setNewCredit({ ...newCredit, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Account Name"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.accountName}
            onChange={(e) => setNewCredit({ ...newCredit, accountName: e.target.value })}
          />
          <TextField
            label="Particular"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.particular}
            onChange={(e) => setNewCredit({ ...newCredit, particular: e.target.value })}
          />
          <TextField
            label="Warehouse"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.warehouse}
            onChange={(e) => setNewCredit({ ...newCredit, warehouse: e.target.value })}
          />
          <TextField
            label="Mode"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.mode}
            onChange={(e) => setNewCredit({ ...newCredit, mode: e.target.value })}
          />
          <TextField
            label="Cheque No."
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.chequeNo}
            onChange={(e) => setNewCredit({ ...newCredit, chequeNo: e.target.value })}
          />
          <TextField
            label="Amount"
            fullWidth
            sx={{ mb: 2 }}
            value={newCredit.amount}
            onChange={(e) => setNewCredit({ ...newCredit, amount: e.target.value })}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddCredit}>
            Add Credit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreditVoucher;
