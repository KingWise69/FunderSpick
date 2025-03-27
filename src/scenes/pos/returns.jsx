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
} from "@mui/material";
import { Restore, Visibility, Edit, Delete } from "@mui/icons-material";

// Dummy Data for Purchase Returns
const purchaseReturns = [
  { id: 1, supplier: "Tech Solutions Ltd", date: "2025-03-12", reason: "Defective Products", status: "Approved" },
  { id: 2, supplier: "Global Supplies", date: "2025-03-08", reason: "Wrong Shipment", status: "Pending" },
  { id: 3, supplier: "NextGen Parts", date: "2025-03-02", reason: "Overcharged", status: "Rejected" },
];

const ListPurchaseReturns = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">List of Purchase Returns</Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseReturns.map((returnItem) => (
              <TableRow key={returnItem.id}>
                <TableCell>{returnItem.supplier}</TableCell>
                <TableCell>{returnItem.date}</TableCell>
                <TableCell>{returnItem.reason}</TableCell>
                <TableCell>
                  <Chip label={returnItem.status} color={returnItem.status === "Approved" ? "success" : returnItem.status === "Pending" ? "warning" : "error"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListPurchaseReturns;
