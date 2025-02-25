import { Box, Button, MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";

const CreditVoucher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([
    { id: 1, date: "2025-02-20", accountName: "Mugisha Daniel", particular: "Payment Received", warehouse: "Kampala Branch", mode: "Bank Transfer", chequeNo: "123456", amount: "1500", action: "edit" },
    { id: 2, date: "2025-02-21", accountName: "Nakato Maria", particular: "Customer Deposit", warehouse: "Jinja Warehouse", mode: "Cash", chequeNo: "234567", amount: "800", action: "edit" },
    { id: 3, date: "2025-02-22", accountName: "Kato Emmanuel", particular: "Loan Repayment", warehouse: "Mbarara Branch", mode: "Mobile Money", chequeNo: "345678", amount: "2000", action: "edit" },
    { id: 4, date: "2025-02-23", accountName: "Nabirye Stella", particular: "Investment Returns", warehouse: "Gulu Office", mode: "Cheque", chequeNo: "456789", amount: "5000", action: "edit" },
    { id: 5, date: "2025-02-24", accountName: "Okello James", particular: "Service Payment", warehouse: "Arua Warehouse", mode: "Cash", chequeNo: "567890", amount: "700", action: "edit" },
    { id: 6, date: "2025-02-25", accountName: "Mutebi Brian", particular: "Dividend Received", warehouse: "Mbale Branch", mode: "Mobile Money", chequeNo: "678901", amount: "1200", action: "edit" },
    { id: 7, date: "2025-02-26", accountName: "Atwine Grace", particular: "Rent Payment", warehouse: "Fort Portal Office", mode: "Bank Transfer", chequeNo: "789012", amount: "3000", action: "edit" },
    { id: 8, date: "2025-02-27", accountName: "Ssekyewa Samuel", particular: "Consultation Fees", warehouse: "Masaka Warehouse", mode: "Cheque", chequeNo: "890123", amount: "650", action: "edit" },
    { id: 9, date: "2025-02-28", accountName: "Achan Rebecca", particular: "Sponsorship Funds", warehouse: "Lira Branch", mode: "Cash", chequeNo: "901234", amount: "5000", action: "edit" },
    { id: 10, date: "2025-03-01", accountName: "Kiggundu Mark", particular: "Business Grant", warehouse: "Hoima Office", mode: "Mobile Money", chequeNo: "012345", amount: "3500", action: "edit" },
  ]);

  const handleActionChange = (id, newAction) => {
    setRows(rows.map(row => (row.id === id ? { ...row, action: newAction } : row)));
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
      <Header title="CREDIT VOUCHER" subtitle="Manage your credit transactions" />
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Create Credit
      </Button>
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
    </Box>
  );
};

export default CreditVoucher;
