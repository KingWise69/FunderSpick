import React from "react";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const bills = [
  { id: 1, vendor: "Vendor 1", billDate: "2024-02-20", dueDate: "2024-03-05", orderNumber: "ORD001", status: "Paid" },
  { id: 2, vendor: "Vendor 2", billDate: "2024-02-22", dueDate: "2024-03-10", orderNumber: "ORD002", status: "Send" },
  { id: 3, vendor: "Vendor 3", billDate: "2024-02-25", dueDate: "2024-03-15", orderNumber: "ORD003", status: "Draft" },
];

const getStatusButton = (status) => {
  const colors = {
    Paid: "success",
    Send: "secondary",
    Draft: "error",
  };
  return <Button variant="contained" color={colors[status]}>{status}</Button>;
};

const ManageBill = () => {
  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vendor Number</TableCell>
              <TableCell>Bill Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.vendor}</TableCell>
                <TableCell>{bill.billDate}</TableCell>
                <TableCell>{bill.dueDate}</TableCell>
                <TableCell>{bill.orderNumber}</TableCell>
                <TableCell>{getStatusButton(bill.status)}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageBill;
