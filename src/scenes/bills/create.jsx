import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";

const CreateBill = () => {
  const [billData, setBillData] = useState({
    vendorNumber: "",
    billDate: "",
    dueDate: "",
    orderNumber: "",
    status: "Draft",
  });

  const statuses = ["Paid", "Send", "Draft"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bill Created:", billData);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Create Bill</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Vendor Number" name="vendorNumber" value={billData.vendorNumber} onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="date" label="Bill Date" name="billDate" value={billData.billDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField fullWidth margin="normal" type="date" label="Due Date" name="dueDate" value={billData.dueDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField fullWidth margin="normal" label="Order Number" name="orderNumber" value={billData.orderNumber} onChange={handleChange} required />
        <TextField fullWidth margin="normal" select label="Status" name="status" value={billData.status} onChange={handleChange} required>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>Create Bill</Button>
      </form>
    </Box>
  );
};

export default CreateBill;