import React, { useState } from "react";
import { Box, Button, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPayments } from "../../data/mockData";
import Header from "../../components/Header";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PayPalIcon from '@mui/icons-material/Payment';
import VisaIcon from '@mui/icons-material/AccountBalance';

const Payment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paymentMethod, setPaymentMethod] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "amount", headerName: "Amount", width: 150, editable: true },
    { field: "date", headerName: "Date", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true },
  ];

  return (
    <Box m="20px">
      <Header title="Sales" subtitle="Manage your payments and transactions" />
      <Grid container spacing={3}>
        {/* Payment Methods Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: "8px",
              border: `1px solid ${colors.grey[300]}`,
              padding: "20px",
              backgroundColor: colors.white,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" color={colors.primary[500]}>
              Payment Methods
            </Typography>
            <Box mt={2}>
              <Button variant="contained" sx={{ backgroundColor: colors.primary[500], marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <CreditCardOutlinedIcon sx={{ marginRight: "8px" }} />
                Credit/Debit Card
              </Button>
            </Box>
            <Box mt={1}>
              <Button variant="contained" sx={{ backgroundColor: colors.primary[500], marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <AccountBalanceWalletOutlinedIcon sx={{ marginRight: "8px" }} />
                Wallet Payment
              </Button>
            </Box>
            <Box mt={1}>
              <Button variant="contained" sx={{ backgroundColor: colors.primary[500], marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <PayPalIcon sx={{ marginRight: "8px" }} />
                PayPal
              </Button>
            </Box>
            <Box mt={1}>
              <Button variant="contained" sx={{ backgroundColor: colors.primary[500], display: "flex", alignItems: "center" }}>
                <VisaIcon sx={{ marginRight: "8px" }} />
                Visa
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Payment Form Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: "8px",
              border: `1px solid ${colors.grey[300]}`,
              padding: "20px",
              backgroundColor: colors.white,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" color={colors.primary[500]}>
              Make a Payment
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                id="payment-method"
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="creditCard">Credit/Debit Card</MenuItem>
                <MenuItem value="wallet">Wallet</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="visa">Visa</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              margin="normal"
              type="number"
              InputProps={{
                startAdornment: (
                  <Typography sx={{ marginLeft: "8px" }}>$</Typography>
                ),
              }}
            />
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Pay Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Transaction History Section */}
      <Box mt={4}>
        <Typography variant="h6" color={colors.primary[500]}>
          Transaction History
        </Typography>
        <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={mockDataPayments} // Mock data for payment transactions
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
