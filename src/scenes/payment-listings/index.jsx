import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataPayments } from "../../data/mockData"; // Replace with your actual data
import DeleteIcon from '@mui/icons-material/Delete';

const PaymentListing = () => {
  const [rows, setRows] = useState(mockDataPayments); // Replace mockPaymentData with real data or API call

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "groupName", headerName: "Group Name", width: 200 },
    { field: "account", headerName: "Account", width: 150 },
    { field: "paymentType", headerName: "Payment Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
          startIcon={<DeleteIcon />}
          style={{
            borderRadius: "5px",
            padding: "8px 16px",
            backgroundColor: "#dc3545", // Red color for delete
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px" sx={{ fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Payment Listings
      </Typography>
      
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

export default PaymentListing;
