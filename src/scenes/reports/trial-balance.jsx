import React, { useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTrialBalance } from "../../data/mockData"; // Replace with actual data
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';

const TrialBalance = () => {
  const [rows, setRows] = useState(mockDataTrialBalance);
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

  const columns = [
    { field: "account", headerName: "Account", width: 250 },
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
        Trial Balance Statement
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

export default TrialBalance;
