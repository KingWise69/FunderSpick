import { useState, useEffect } from "react";
import { Box, Typography, useTheme, TextField, Button, Grid, Paper, Divider, IconButton, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices, mockItems } from "../../data/mock";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0.1);
  const [discount, setDiscount] = useState(0);
  const [senderInfo, setSenderInfo] = useState({
    name: "Your Company Name",
    address: "123 Business St, City, Country",
    email: "contact@yourcompany.com",
    phone: "0782033444",
    taxId: "TAX-123456789"
  });
  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    taxId: ""
  });

  useEffect(() => {
    setInvoiceItems(mockItems);
  }, []);

  const filteredItems = invoiceItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItemToInvoice = (item) => {
    const newItem = {
      ...item,
      id: selectedItems.length + 1,
      quantity: 1
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  const removeItemFromInvoice = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id, quantity) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - discount;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Item",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 80,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Unit Price",
      width: 100,
      renderCell: (params) => (
        <Typography>${params.row.cost.toFixed(2)}</Typography>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      renderCell: (params) => (
        <Typography fontWeight="bold">
          ${(params.row.cost * params.row.quantity).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => removeItemFromInvoice(params.row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICE MANAGER" subtitle="Create and manage invoices" />
      
      <Grid container spacing={3}>
        {/* Invoice Form Section */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Invoice Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Invoice Date"
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Sender Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={senderInfo.name}
                  onChange={(e) => setSenderInfo({...senderInfo, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={senderInfo.address}
                  onChange={(e) => setSenderInfo({...senderInfo, address: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={senderInfo.email}
                  onChange={(e) => setSenderInfo({...senderInfo, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={senderInfo.phone}
                  onChange={(e) => setSenderInfo({...senderInfo, phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tax ID"
                  value={senderInfo.taxId}
                  onChange={(e) => setSenderInfo({...senderInfo, taxId: e.target.value})}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Recipient Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={recipientInfo.name}
                  onChange={(e) => setRecipientInfo({...recipientInfo, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={recipientInfo.address}
                  onChange={(e) => setRecipientInfo({...recipientInfo, address: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={recipientInfo.email}
                  onChange={(e) => setRecipientInfo({...recipientInfo, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={recipientInfo.phone}
                  onChange={(e) => setRecipientInfo({...recipientInfo, phone: e.target.value})}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Add Items</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ height: 200, overflow: 'auto', mb: 2 }}>
              {filteredItems.map((item) => (
                <Paper key={item.id} sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    <Typography>UGX
                      {item.cost.toFixed(2)}</Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => addItemToInvoice(item)}
                  >
                    Add
                  </Button>
                </Paper>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Invoice Items</Typography>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={selectedItems}
                columns={columns}
                disableSelectionOnClick
                processRowUpdate={(updatedRow, originalRow) => {
                  updateItemQuantity(updatedRow.id, updatedRow.quantity);
                  return updatedRow;
                }}
                onProcessRowUpdateError={(error) => console.error(error)}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Invoice Preview Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">INVOICE</Typography>
              <Typography variant="h6">#{invoiceNumber}</Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">From:</Typography>
                <Typography>{senderInfo.name}</Typography>
                <Typography>{senderInfo.address}</Typography>
                <Typography>Email: {senderInfo.email}</Typography>
                <Typography>Phone: {senderInfo.phone}</Typography>
                <Typography>Tax ID: {senderInfo.taxId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">To:</Typography>
                <Typography>{recipientInfo.name || "Client Name"}</Typography>
                <Typography>{recipientInfo.address || "Client Address"}</Typography>
                {recipientInfo.email && <Typography>Email: {recipientInfo.email}</Typography>}
                {recipientInfo.phone && <Typography>Phone: {recipientInfo.phone}</Typography>}
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Invoice Date:</Typography>
                <Typography>{invoiceDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Due Date:</Typography>
                <Typography>{dueDate}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <DataGrid
                rows={selectedItems}
                columns={[
                  { field: "name", headerName: "Item", flex: 1 },
                  { field: "quantity", headerName: "Qty", width: 60 },
                  { 
                    field: "cost", 
                    headerName: "Price", 
                    width: 80,
                    renderCell: (params) => `$${params.row.cost.toFixed(2)}`
                  },
                  { 
                    field: "total", 
                    headerName: "Total", 
                    width: 80,
                    renderCell: (params) => `$${(params.row.cost * params.row.quantity).toFixed(2)}`
                  }
                ]}
                hideFooter
                disableSelectionOnClick
                autoHeight
              />
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Typography>Subtotal: UGX{calculateSubtotal().toFixed(2)}</Typography>
              <Typography>Tax ({taxRate * 100}%): UGX{calculateTax().toFixed(2)}</Typography>
              {discount > 0 && <Typography>Discount: UGX{discount.toFixed(2)}</Typography>}
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                Total: UGX{calculateTotal().toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thank you for your business!"
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" color="secondary">
                Save Draft
              </Button>
              <Button variant="contained" color="primary">
                Send Invoice
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Invoices;