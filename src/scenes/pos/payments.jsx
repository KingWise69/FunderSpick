import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, 
  DialogContent, DialogActions, Snackbar, Alert, TextField, RadioGroup, 
  FormControlLabel, Radio, InputAdornment, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { CreditCard, AccountBalance, Money, CheckCircle, Lock } from '@mui/icons-material';

const PaymentsPage = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmPayment = () => {
    const newTransaction = {
      id: paymentHistory.length + 1,
      amount: totalAmount,
      method: paymentMethod,
      date: new Date().toLocaleString(),
    };
    setPaymentHistory([...paymentHistory, newTransaction]);
    setOpenConfirmationDialog(false);
    setOpenSuccessDialog(true);
  };

  const handleSuccessClose = () => {
    setOpenSuccessDialog(false);
    setSnackbarMessage("Payment successful!");
    setOpenSnackbar(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Payment Information
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia component="img" image={item.image} alt={item.name} sx={{ height: 150, objectFit: "contain" }} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">UGX {item.price}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body1">Subtotal: UGX {item.price * item.quantity}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" color="primary" mt={3}>
        Total Amount: UGX {totalAmount}
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={2}>
        Select Payment Method
      </Typography>

      <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ mb: 3 }}>
        <FormControlLabel value="credit" control={<Radio />} label="Credit/Debit Card" />
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile Money" />
        <FormControlLabel value="bank" control={<Radio />} label="Bank Transfer" />
      </RadioGroup>

      {paymentMethod === "credit" && (
        <Box>
          <TextField fullWidth label="Card Number" variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><CreditCard /></InputAdornment>) }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>) }} />
        </Box>
      )}

      {paymentMethod === "mobile" && (
        <Box>
          <Select fullWidth value={paymentDetails.provider || ""} onChange={(e) => setPaymentDetails({ ...paymentDetails, provider: e.target.value })} displayEmpty>
            <MenuItem value="">Select Mobile Provider</MenuItem>
            <MenuItem value="Airtel">Airtel</MenuItem>
            <MenuItem value="MTN">MTN</MenuItem>
            <MenuItem value="Lyca">Lyca</MenuItem>
          </Select>
          <TextField fullWidth label="Mobile Number" variant="outlined" margin="normal" />
          <TextField fullWidth label="PIN" type="password" variant="outlined" margin="normal" />
        </Box>
      )}

      {paymentMethod === "bank" && (
        <Box>
          <TextField fullWidth label="Bank Name" variant="outlined" margin="normal" />
          <TextField fullWidth label="Account Number" variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><AccountBalance /></InputAdornment>) }} />
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={() => setOpenConfirmationDialog(true)} sx={{ mt: 3, backgroundColor: '#4caf50' }}>Proceed to Payment</Button>

      <Dialog open={openConfirmationDialog} onClose={() => setOpenConfirmationDialog(false)}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography>Do you confirm the payment of UGX {totalAmount}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmationDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmPayment} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={handleSuccessClose}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <CheckCircle sx={{ color: "green", fontSize: 40, mr: 1 }} />
            Payment Successful!
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>Your transaction of UGX {totalAmount} was completed successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" mt={4} gutterBottom>Payment History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount (UGX)</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentsPage;
