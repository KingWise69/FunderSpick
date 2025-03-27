import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Delete, AddShoppingCart } from "@mui/icons-material";

// Dummy Data for Purchases
const purchaseData = [
  { id: 1, supplier: "Tech Solutions Ltd", date: "2025-03-01", amount: "$2,500", status: "Completed" },
  { id: 2, supplier: "Global Supplies", date: "2025-03-10", amount: "$1,200", status: "Pending" },
  { id: 3, supplier: "Enterprise Goods", date: "2025-02-28", amount: "$5,000", status: "Completed" },
  { id: 4, supplier: "NextGen Parts", date: "2025-03-05", amount: "$800", status: "Canceled" },
];

const ListPurchases = () => {
  const [purchases, setPurchases] = useState(purchaseData);

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">List of Purchases</Typography>
      <Button variant="contained" color="primary" startIcon={<AddShoppingCart />} sx={{ mt: 2 }}>
        Add Purchase
      </Button>

      {/* Purchases Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>{purchase.date}</TableCell>
                <TableCell>{purchase.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={purchase.status}
                    color={
                      purchase.status === "Completed" ? "success"
                        : purchase.status === "Pending" ? "warning"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton><Visibility color="primary" /></IconButton>
                  <IconButton><Edit color="warning" /></IconButton>
                  <IconButton><Delete color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListPurchases;
