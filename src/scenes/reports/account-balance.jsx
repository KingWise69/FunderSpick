import React, { useState } from "react";
import { Box, Typography, Button, IconButton, TextField, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataAccountBalance } from "../../data/mockData"; // Replace with actual data
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AccountBalance = () => {
  const [rows, setRows] = useState(mockDataAccountBalance);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotal = (type) => {
    return rows.reduce((acc, row) => acc + (row[type] || 0), 0);
  };

  const totalBalance = calculateTotal("balance");
  const totalDebit = calculateTotal("debit");
  const totalCredit = calculateTotal("credit");
  const balancePercentage = ((totalDebit - totalCredit) / totalDebit) * 100;

  const columns = [
    { field: "account", headerName: "Account", width: 250 },
    { field: "balance", headerName: "Balance ($)", width: 150 },
    { field: "debit", headerName: "Debit ($)", width: 150 },
    { field: "credit", headerName: "Credit ($)", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => alert(`Viewing ${params.row.account}`)}>
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => alert(`Editing ${params.row.account}`)}>
            <EditIcon color="warning" />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="error"
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px" sx={{ fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Account Balance Overview
      </Typography>

      <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          sx={{
            borderRadius: "5px",
            padding: "8px 16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          Refresh Data
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Account"
          sx={{ marginRight: "10px", width: "300px" }}
        />
        <IconButton onClick={() => setSearchQuery("")} color="primary">
          <SearchIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Total Summary */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f4f4f4",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Total Account Balance
            </Typography>
            <Typography variant="h5" color="secondary">
              ${totalBalance.toFixed(2)}
            </Typography>
          </Box>
        </Grid>

        {/* Debit vs Credit */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f4f4f4",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Debit vs Credit
            </Typography>
            <Typography variant="h5" color="secondary">
              Debit: ${totalDebit.toFixed(2)} | Credit: ${totalCredit.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Net Balance: ${totalDebit - totalCredit}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Balance Difference: {balancePercentage.toFixed(2)}%
            </Typography>
          </Box>
        </Grid>

        {/* Trend Analysis */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f4f4f4",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Trend Analysis
            </Typography>
            <Typography variant="h5" color="secondary">
              <TrendingUpIcon /> Positive Trend
            </Typography>
            <Typography variant="body1" color="textSecondary">
              The trend indicates a positive growth in account balances over the past quarter.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ height: 400, width: "100%", marginTop: "20px", borderRadius: "8px", overflow: "hidden" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            "& .MuiDataGrid-root": {
              borderRadius: "8px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              padding: "10px",
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f1f1f1",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AccountBalance;
