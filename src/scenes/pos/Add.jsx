import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const suppliers = ["Tech Solutions Ltd", "Global Supplies", "Enterprise Goods", "NextGen Parts"];

const AddPurchase = () => {
  const [purchase, setPurchase] = useState({
    supplier: "",
    item: "",
    quantity: 1,
    totalCost: "",
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("New Purchase:", purchase);
    alert("Purchase Added Successfully!");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">Add New Purchase</Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Supplier</InputLabel>
          <Select name="supplier" value={purchase.supplier} onChange={handleChange}>
            {suppliers.map((supplier, index) => (
              <MenuItem key={index} value={supplier}>{supplier}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Item"
          name="item"
          value={purchase.item}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Quantity"
          name="quantity"
          value={purchase.quantity}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Total Cost ($)"
          name="totalCost"
          value={purchase.totalCost}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select name="paymentMethod" value={purchase.paymentMethod} onChange={handleChange}>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Purchase
        </Button>
      </Paper>
    </Box>
  );
};

export default AddPurchase;
