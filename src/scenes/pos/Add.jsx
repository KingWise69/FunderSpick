import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Autocomplete,
  Divider,
  useTheme,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Add,
  Remove,
  Search,
  Inventory,
  LocalShipping,
  AccountBalance,
  CheckCircle,
  ArrowBack,
  CalendarToday
} from '@mui/icons-material';

const AddPurchasePage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30');
  const [notes, setNotes] = useState('');
  
  // Sample items data
  const [items, setItems] = useState([
    { id: 1, product: 'Fresh Tomatoes (1kg)', quantity: 0, price: 5000, total: 0 },
    { id: 2, product: 'Rice (50kg bag)', quantity: 0, price: 150000, total: 0 },
    { id: 3, product: 'Vegetable Oil (5L)', quantity: 0, price: 25000, total: 0 },
    { id: 4, product: 'Sugar (1kg)', quantity: 0, price: 3500, total: 0 },
    { id: 5, product: 'Salt (1kg)', quantity: 0, price: 2000, total: 0 }
  ]);

  // Sample suppliers
  const suppliers = [
    'Wasswa Fresh Produce',
    'Namukasa Foods Ltd',
    'Kampala Beverage Distributors',
    'Uganda Grain Millers',
    'Jinja Dairy Farm'
  ];

  const handleQuantityChange = (id, value) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const quantity = parseInt(value) || 0;
        return {
          ...item,
          quantity,
          total: quantity * item.price
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const steps = ['Supplier & Details', 'Add Items', 'Review & Submit'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Create Purchase Order
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Add new inventory purchases
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          href="/purchases"
        >
          Back to Purchases
        </Button>
      </Box>

      {/* Stepper */}
      <Box mb={3}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step 1: Supplier & Details */}
      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Supplier Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={suppliers}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier"
                      required
                      fullWidth
                    />
                  )}
                  value={supplier}
                  onChange={(event, newValue) => {
                    setSupplier(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Delivery Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Payment Terms (days)"
                  type="number"
                  fullWidth
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  multiline
                  rows={3}
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Add Items */}
      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Add Items to Purchase Order</Typography>
            <Box mb={3}>
              <TextField
                variant="outlined"
                placeholder="Search products..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 400 }}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Unit Price (UGX)</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total (UGX)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Inventory sx={{ mr: 1 }} />
                          {item.product}
                        </Box>
                      </TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          sx={{ width: 100 }}
                          InputProps={{
                            inputProps: { min: 0 }
                          }}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Submit */}
      {activeStep === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Supplier</Typography>
                    <Typography>{supplier || 'Not selected'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Delivery Date</Typography>
                    <Typography>{deliveryDate || 'Not specified'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Payment Terms</Typography>
                    <Typography>{paymentTerms} days</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Notes</Typography>
                    <Typography>{notes || 'No notes'}</Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>Items</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.filter(item => item.quantity > 0).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell>{formatCurrency(item.price)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Order Total</Typography>
                <Box mb={2}>
                  <Typography>Subtotal: {formatCurrency(calculateSubtotal())}</Typography>
                  <Typography>Tax (5%): {formatCurrency(calculateTax())}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Total: {formatCurrency(calculateTotal())}</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<CheckCircle />}
                >
                  Submit Purchase Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AddPurchasePage;