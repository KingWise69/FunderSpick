import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Divider
} from "@mui/material";
import { Print, Download, CheckCircle } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

const Receipt = ({ receiptData, onClose }) => {
  const receiptRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const downloadReceipt = () => {
    // In a real app, you would generate a PDF here
    alert("In a real app, this would download a PDF receipt");
  };

  if (!receiptData) {
    return (
      <Box p={3}>
        <Typography variant="h6">No receipt data available</Typography>
      </Box>
    );
  }

  const formatPaymentMethod = (method) => {
    switch(method) {
      case 'credit': return 'Credit/Debit Card';
      case 'mobile': return 'Mobile Money';
      case 'bank': return 'Bank Transfer';
      default: return method;
    }
  };

  return (
    <Box>
      <Box ref={receiptRef} sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={2}>
          <CheckCircle sx={{ color: "green", fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Payment Receipt
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Transaction ID: {receiptData.id}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Transaction Details */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Transaction Details
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">
              <strong>Date:</strong> {receiptData.date}
            </Typography>
            <Typography variant="body1">
              <strong>Payment Method:</strong> {formatPaymentMethod(receiptData.method)}
            </Typography>
          </Box>
        </Box>

        {/* Items Table */}
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ddd', mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Item</strong></TableCell>
                <TableCell align="right"><strong>Price (UGX)</strong></TableCell>
                <TableCell align="center"><strong>Qty</strong></TableCell>
                <TableCell align="right"><strong>Subtotal</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receiptData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.price.toLocaleString()}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{(item.price * item.quantity).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6">
              <strong>Total:</strong> UGX {receiptData.amount.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (Including all applicable taxes)
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Footer */}
        <Box textAlign="center" mt={3}>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Thank you for your purchase!
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" mt={1}>
            For any inquiries, please contact support@example.com
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        <Button
          variant="contained"
          startIcon={<Print />}
          onClick={handlePrint}
          sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
        >
          Print Receipt
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={downloadReceipt}
        >
          Download PDF
        </Button>
        {onClose && (
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Receipt;