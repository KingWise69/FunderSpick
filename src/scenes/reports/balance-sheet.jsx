import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataBalanceSheet } from "../../data/mockData"; // Replace with actual data
import RefreshIcon from '@mui/icons-material/Refresh';

const BalanceSheet = () => {
  const [rows, setRows] = useState(mockDataBalanceSheet); // Replace mockDataBalanceSheet with real data or API call

  const columns = [
    { field: "account", headerName: "Account", width: 200 },
    { field: "asset", headerName: "Assets ($)", width: 150 },
    { field: "liability", headerName: "Liabilities ($)", width: 150 },
    { field: "equity", headerName: "Equity ($)", width: 150 },
    { field: "total", headerName: "Total ($)", width: 150 },
  ];

  return (
    <Box m="20px" sx={{ fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Balance Sheet
      </Typography>
      
      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          sx={{
            borderRadius: "5px",
            padding: "8px 16px",
            fontWeight: "bold",
            backgroundColor: "#007bff", // Blue background
            color: "#fff",
          }}
        >
          Refresh Data
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%", marginTop: "20px", borderRadius: "8px", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            "& .MuiDataGrid-root": {
              borderRadius: "8px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#007bff", // Blue background for header
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              padding: "10px",
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f1f1f1", // Hover effect for rows
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default BalanceSheet;
