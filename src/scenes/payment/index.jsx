import React from 'react';
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
  Divider,
  Grid,
  styled
} from '@mui/material';

// Styled components
const InvoiceContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: 'auto',
  border: '1px solid #e0e0e0'
}));

const HeaderSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px'
});

const CompanyDetails = styled(Box)({
  flex: 1
});

const InvoiceDetails = styled(Box)({
  flex: 1,
  textAlign: 'right'
});

const UgandanInvoice = () => {
  // Sample Ugandan business data
  const company = {
    name: "FunderSpick",
    address: "Plot 24, Nkrumah Road, Kampala",
    city: "Kampala",
    phone: "+256 752 123 456",
    email: "sales@kampaladistributors.ug",
    tin: "TIN123456789",
    vrn: "VRN987654321",
    businessRegNo: "80010012345678",
    efrris: "EFRIS-2023-123456"
  };

  const client = {
    name: "Nakumatt Uganda Limited",
    address: "Plot 45, Kampala Road",
    city: "Kampala",
    phone: "+256 414 123 456",
    tin: "TIN987654321"
  };

  const invoice = {
    number: "INV-2023-0456",
    date: "15/11/2023",
    dueDate: "30/11/2023",
    paymentTerms: "Net 15 Days",
    currency: "UGX"
  };

  const items = [
    {
      id: 1,
      description: "Tropical Royale 500ml (Crate of 24)",
      quantity: 5,
      unitPrice: 48000,
      taxRate: 18,
      discount: 0
    },
    {
      id: 2,
      description: "Nile Special 500ml (Crate of 24)",
      quantity: 8,
      unitPrice: 52000,
      taxRate: 18,
      discount: 5
    },
    {
      id: 3,
      description: "Delivery Charges",
      quantity: 1,
      unitPrice: 25000,
      taxRate: 0,
      discount: 0
    }
  ];

  // Calculations
  const calculateItemTotal = (item) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (item.taxRate / 100);
    return {
      subtotal,
      discountAmount,
      taxableAmount,
      taxAmount,
      total: taxableAmount + taxAmount
    };
  };

  const invoiceTotals = items.reduce((acc, item) => {
    const itemCalc = calculateItemTotal(item);
    return {
      subtotal: acc.subtotal + itemCalc.subtotal,
      discount: acc.discount + itemCalc.discountAmount,
      taxable: acc.taxable + itemCalc.taxableAmount,
      tax: acc.tax + itemCalc.taxAmount,
      total: acc.total + itemCalc.total
    };
  }, { subtotal: 0, discount: 0, taxable: 0, tax: 0, total: 0 });

  return (
    <InvoiceContainer elevation={3}>
      {/* Header */}
      <HeaderSection>
        <CompanyDetails>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {company.name}
          </Typography>
          <Typography>{company.address}</Typography>
          <Typography>{company.city}</Typography>
          <Typography>Phone: {company.phone}</Typography>
          <Typography>Email: {company.email}</Typography>
          <Typography mt={2}>TIN: {company.tin}</Typography>
          <Typography>VRN: {company.vrn}</Typography>
          <Typography>Business Reg No: {company.businessRegNo}</Typography>
          <Typography>EFRRIS: {company.efrris}</Typography>
        </CompanyDetails>

        <InvoiceDetails>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            TAX INVOICE
          </Typography>
          <Typography variant="h6" gutterBottom>
            Invoice #: {invoice.number}
          </Typography>
          <Typography>Date: {invoice.date}</Typography>
          <Typography>Due Date: {invoice.dueDate}</Typography>
          <Typography>Payment Terms: {invoice.paymentTerms}</Typography>
          <Typography mt={2} variant="h6">
            BILL TO:
          </Typography>
          <Typography fontWeight="bold">{client.name}</Typography>
          <Typography>{client.address}</Typography>
          <Typography>{client.city}</Typography>
          <Typography>Phone: {client.phone}</Typography>
          <Typography>TIN: {client.tin}</Typography>
        </InvoiceDetails>
      </HeaderSection>

      <Divider sx={{ my: 3 }} />

      {/* Invoice Items Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="right"><strong>Qty</strong></TableCell>
              <TableCell align="right"><strong>Unit Price (UGX)</strong></TableCell>
              <TableCell align="right"><strong>Discount (%)</strong></TableCell>
              <TableCell align="right"><strong>Tax Rate (%)</strong></TableCell>
              <TableCell align="right"><strong>Amount (UGX)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => {
              const itemCalc = calculateItemTotal(item);
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell align="right">{item.discount}%</TableCell>
                  <TableCell align="right">{item.taxRate}%</TableCell>
                  <TableCell align="right">{itemCalc.total.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <Grid container justifyContent="flex-end" mt={3}>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Subtotal</strong></TableCell>
                  <TableCell align="right">{invoiceTotals.subtotal.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Discount</strong></TableCell>
                  <TableCell align="right">({invoiceTotals.discount.toLocaleString()})</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Taxable Amount</strong></TableCell>
                  <TableCell align="right">{invoiceTotals.taxable.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>VAT (18%)</strong></TableCell>
                  <TableCell align="right">{invoiceTotals.tax.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell><strong>TOTAL DUE</strong></TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      UGX {invoiceTotals.total.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Payment Information */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          PAYMENT INFORMATION
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography><strong>Bank Name:</strong> Stanbic Bank Uganda</Typography>
            <Typography><strong>Account Name:</strong> Kampala Distributors Ltd</Typography>
            <Typography><strong>Account Number:</strong> 9030001234567</Typography>
            <Typography><strong>Branch:</strong> Kampala Road</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Mobile Money:</strong></Typography>
            <Typography><strong>Name:</strong> Kampala Distributors</Typography>
            <Typography><strong>Number:</strong> 0752 123 456 (MTN)</Typography>
            <Typography><strong>Note:</strong> Use invoice # as reference</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Terms and Conditions */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          TERMS & CONDITIONS
        </Typography>
        <Typography variant="body2">
          1. Payment is due within {invoice.paymentTerms} from invoice date.
        </Typography>
        <Typography variant="body2">
          2. Late payments are subject to a 2% monthly interest charge.
        </Typography>
        <Typography variant="body2">
          3. Goods remain property of {company.name} until full payment is received.
        </Typography>
        <Typography variant="body2">
          4. EFRIS compliant invoice - {company.efrris}
        </Typography>
      </Box>

      {/* Footer */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" fontStyle="italic">
          Thank you for your business! For any inquiries, please contact {company.email} or call {company.phone}
        </Typography>
        
      </Box>
    </InvoiceContainer>
  );
};

export default UgandanInvoice;