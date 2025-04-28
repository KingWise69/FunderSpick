import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Rating,
  Snackbar,
  Alert,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Receipt as ReceiptIcon,
  Discount as DiscountIcon,
  Loyalty as LoyaltyIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Payment as PaymentIcon,
  LocalOffer as LocalOfferIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  History as HistoryIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  PhoneIphone as MobileMoneyIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Product Data
const productData = [
  { 
    id: 1, 
    name: "Fanta", 
    category: "Beverages", 
    subcategory: "Soft Drinks", 
    price: 1500, 
    rating: 4, 
    stock: 50, 
    image: "/assets/fanta.jpg", 
    description: "A popular carbonated soft drink.",
    barcode: "123456789012",
    supplier: "Coca-Cola Uganda"
  },
  { 
    id: 2, 
    name: "Mountain Dew", 
    category: "Beverages", 
    subcategory: "Soft Drinks", 
    price: 1500, 
    rating: 5, 
    stock: 30, 
    image: "/assets/dew.jpg", 
    description: "Citrusy and refreshing soft drink.",
    barcode: "234567890123",
    supplier: "PepsiCo"
  },
  { 
    id: 3, 
    name: "AFIA JUICE Tropical", 
    category: "Beverages", 
    subcategory: "Juices", 
    price: 2000, 
    rating: 4, 
    stock: 20, 
    image: "/assets/afia_tropical.jpg", 
    description: "Tropical fruit juice.",
    barcode: "345678901234",
    supplier: "Mukwano Group"
  },
  { 
    id: 4, 
    name: "Heineken Beer 330ml", 
    category: "Beverages", 
    subcategory: "Alcoholic", 
    price: 5000, 
    rating: 5, 
    stock: 60, 
    image: "/assets/Heineken.png", 
    description: "Premium lager beer.",
    barcode: "456789012345",
    supplier: "Heineken International"
  },
  { 
    id: 5, 
    name: "Bell Lager", 
    category: "Beverages", 
    subcategory: "Alcoholic", 
    price: 4500, 
    rating: 4, 
    stock: 40, 
    image: "/assets/bell.png", 
    description: "Popular beer in Uganda.",
    barcode: "567890123456",
    supplier: "Uganda Breweries"
  },
  
  // Groceries
  { 
    id: 6, 
    name: "Golden Penny Semovita 2kg", 
    category: "Groceries", 
    subcategory: "Flour & Grains", 
    price: 3500, 
    rating: 4, 
    stock: 30, 
    image: "/assets/semo.jpeg", 
    description: "Premium quality semovita.",
    barcode: "678901234567",
    supplier: "Flour Mills of Nigeria"
  },
  { 
    id: 7, 
    name: "Hima Cement 50kg", 
    category: "Groceries", 
    subcategory: "Building Materials", 
    price: 45000, 
    rating: 4, 
    stock: 15, 
    image: "/assets/hima.png", 
    description: "High quality construction cement.",
    barcode: "789012345678",
    supplier: "Hima Cement Ltd"
  },
  
  // Household
  { 
    id: 8, 
    name: "Luxury Toilet Paper (12 rolls)", 
    category: "Household", 
    subcategory: "Bathroom", 
    price: 12000, 
    rating: 5, 
    stock: 25, 
    image: "/assets/1.jpg", 
    description: "Premium quality toilet paper.",
    barcode: "890123456789",
    supplier: "Nice House of Plastics"
  },
  { 
    id: 9, 
    name: "OMO Detergent 5kg", 
    category: "Household", 
    subcategory: "Cleaning", 
    price: 15000, 
    rating: 4, 
    stock: 18, 
    image: "/assets/omo.jpg", 
    description: "Powerful laundry detergent.",
    barcode: "901234567890",
    supplier: "Unilever"
  },
  
  // Electronics
  { 
    id: 10, 
    name: "Samsung Galaxy A14", 
    category: "Electronics", 
    subcategory: "Mobile Phones", 
    price: 850000, 
    rating: 4, 
    stock: 8, 
    image: "/assets/samsung.jpg", 
    description: "Latest smartphone with great features.",
    barcode: "012345678901",
    supplier: "Samsung East Africa"
  },
  { 
    id: 11, 
    name: "Tecno Spark 10", 
    category: "Electronics", 
    subcategory: "Mobile Phones", 
    price: 750000, 
    rating: 4, 
    stock: 12, 
    image: "/assets/spark.jpg", 
    description: "Affordable smartphone with good camera.",
    barcode: "123450987654",
    supplier: "Tecno Mobile"
  },
  
  // Clothing & Accessories
  { 
    id: 12, 
    name: "Men's Casual Shirt", 
    category: "Clothing", 
    subcategory: "Men's Fashion", 
    price: 35000, 
    rating: 4, 
    stock: 20, 
    image: "/assets/casual.jpg", 
    description: "Comfortable cotton shirt for men.",
    barcode: "234561098765",
    supplier: "Textile Uganda Ltd"
  },
  { 
    id: 13, 
    name: "Women's Handbag", 
    category: "Clothing", 
    subcategory: "Women's Fashion", 
    price: 45000, 
    rating: 5, 
    stock: 15, 
    image: "/assets/handbag.jpg", 
    description: "Stylish women's handbag.",
    barcode: "345672109876",
    supplier: "Leather Crafts Uganda"
  },
  
  // Health & Beauty
  { 
    id: 14, 
    name: "Dove Body Wash", 
    category: "Health & Beauty", 
    subcategory: "Personal Care", 
    price: 12000, 
    rating: 4, 
    stock: 25, 
    image: "/assets/dove.jpeg", 
    description: "Moisturizing body wash.",
    barcode: "456783210987",
    supplier: "Unilever"
  },
  { 
    id: 15, 
    name: "Colgate Toothpaste", 
    category: "Health & Beauty", 
    subcategory: "Oral Care", 
    price: 5000, 
    rating: 5, 
    stock: 40, 
    image: "/assets/colgate.jpg", 
    description: "Cavity protection toothpaste.",
    barcode: "567894321098",
    supplier: "Colgate-Palmolive"
  }
  // ... (other products from previous example)
];

// Payment Methods
const paymentMethods = [
  { 
    id: 1, 
    name: "MTN Mobile Money", 
    type: "mobile_money", 
    icon: <MobileMoneyIcon />,
    image: '/assets/mtn.jpg',
    fields: ["Phone Number", "Transaction ID"]
  },
  { 
    id: 2, 
    name: "Airtel Money", 
    type: "mobile_money", 
    icon: <MobileMoneyIcon />,
    image: '/assets/airtel.jpg',
    fields: ["Phone Number", "Transaction ID"]
  },
  { 
    id: 3, 
    name: "Lyca Mobile Money", 
    type: "mobile_money", 
    icon: <MobileMoneyIcon />,
    image: '/assets/lyca.png',
    fields: ["Phone Number", "Transaction ID"]
  },
  // ... (other payment methods from previous example)
];

// Discount Offers
const discountOffers = [
  { id: 1, name: "Weekend Special", discount: 10, code: "WEEKEND10" },
  { id: 2, name: "Bulk Purchase", discount: 15, code: "BULK15" },
  { id: 3, name: "New Customer", discount: 20, code: "NEW20" },
];

const SalesPage = () => {
  // State Management
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rating, setRating] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [barcodeInput, setBarcodeInput] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);

  const navigate = useNavigate();

  // Filter Products
  useEffect(() => {
    applyFilters();
  }, [category, subcategory, minPrice, maxPrice, rating, searchText]);

  const applyFilters = () => {
    const filtered = productData
      .filter((product) => (category ? product.category === category : true))
      .filter((product) => (subcategory ? product.subcategory === subcategory : true))
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .filter((product) => (rating ? product.rating >= rating : true))
      .filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));

    setFilteredProducts(filtered);
  };

  // Category Map
const categoryMap = {
  Beverages: ["Soft Drinks", "Juices", "Water"],
  Snacks: ["Chips", "Biscuits", "Nuts"],
  Dairy: ["Milk", "Cheese", "Yogurt"],
  Bakery: ["Bread", "Cakes", "Pastries"],
  // Add more categories if you have
};

// Handlers

const handleSearch = (e) => {
  setSearchText(e.target.value);
};

const handleCategoryChange = (e) => {
  const selectedCategory = e.target.value;
  setCategory(selectedCategory);
  setSubcategory(""); // Reset subcategory when category changes
};

const handleSubcategoryChange = (e) => {
  setSubcategory(e.target.value);
};

const handlePriceChange = (event, newValue) => {
  setMinPrice(newValue[0]);
  setMaxPrice(newValue[1]);
};

const handleSort = (e) => {
  const sortBy = e.target.value;
  let sortedProducts = [...filteredProducts];

  if (sortBy === "price_low_high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_high_low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating_high_low") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  setFilteredProducts(sortedProducts);
};

const handleTabChange = (event, newValue) => {
  setActiveTab(newValue);
};

const handleRemoveDiscount = () => {
  setAppliedDiscount(null);
  setDiscountCode("");
  setSnackbarMessage("Discount removed.");
  setOpenSnackbar(true);
};

const handleApplyDiscount = () => {
  const discount = discountOffers.find((offer) => offer.code === discountCode.toUpperCase());
  if (discount) {
    setAppliedDiscount(discount);
    setSnackbarMessage(`Discount '${discount.name}' applied!`);
    setOpenSnackbar(true);
  } else {
    setSnackbarMessage("Invalid discount code.");
    setOpenSnackbar(true);
  }
};


  // Cart Management
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSnackbarMessage(`${product.name} added to cart!`);
    setOpenSnackbar(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Payment Processing
  const handleCompleteSale = () => {
    const transaction = {
      id: `TXN-${Date.now()}`,
      date: new Date(),
      items: [...cart],
      customer: customerDetails,
      paymentMethod: selectedPaymentMethod,
      paymentDetails: paymentDetails,
      subtotal: subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: totalAmount,
      status: 'completed'
    };

    setPaymentHistory([transaction, ...paymentHistory]);
    setCurrentReceipt(transaction);
    setReceiptModalOpen(true);
    
    // Reset system
    setCart([]);
    setAppliedDiscount(null);
    setCustomerDetails({ name: "", phone: "", email: "" });
    setSelectedPaymentMethod(null);
    setPaymentDetails({});
    setActiveStep(0);
    setOpenCartDialog(false);
    
    setSnackbarMessage("Payment processed successfully!");
    setOpenSnackbar(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    const details = {};
    method.fields.forEach(field => {
      details[field] = '';
    });
    setPaymentDetails(details);
  };

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [field]: value
    });
  };

  // Barcode Handling
  const handleBarcodeScan = (e) => {
    if (e.key === "Enter" && barcodeInput) {
      const product = productData.find(
        (item) => item.barcode === barcodeInput
      );
      if (product) {
        handleAddToCart(product);
        setBarcodeInput("");
      } else {
        setSnackbarMessage("Product not found with this barcode");
        setOpenSnackbar(true);
      }
    }
  };

  // Receipt Generation
  const renderReceipt = (transaction) => (
    <Box sx={{ p: 3, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }} id="receipt">
      {/* Receipt Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>BUSINESS NAME</Typography>
        <Typography variant="body2">123 Business Street, Kampala</Typography>
        <Typography variant="body2">Tel: +256 123 456 789</Typography>
        <Typography variant="body2">Tax ID: 123456789</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" fontWeight="bold">SALES RECEIPT</Typography>
        <Typography variant="caption">{format(new Date(transaction.date), 'PPPpp')}</Typography>
        <Typography variant="body2">Receipt #: {transaction.id}</Typography>
      </Box>
      
      {/* Customer Info */}
      {transaction.customer.name && (
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight="bold">Customer:</Typography>
          <Typography>{transaction.customer.name}</Typography>
          {transaction.customer.phone && <Typography>Phone: {transaction.customer.phone}</Typography>}
          {transaction.customer.email && <Typography>Email: {transaction.customer.email}</Typography>}
        </Box>
      )}
      
      <Divider sx={{ my: 1 }} />
      
      {/* Items Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaction.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price.toLocaleString()}</TableCell>
                <TableCell align="right">{(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Divider sx={{ my: 1 }} />
      
      {/* Totals */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography>Subtotal: UGX {transaction.subtotal.toLocaleString()}</Typography>
        {transaction.discount > 0 && (
          <Typography>Discount: -UGX {transaction.discount.toLocaleString()}</Typography>
        )}
        <Typography>Tax (18%): UGX {transaction.tax.toLocaleString()}</Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
          Total: UGX {transaction.total.toLocaleString()}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      {/* Payment Info */}
      <Box>
        <Typography fontWeight="bold">Payment Method:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {transaction.paymentMethod.image ? (
            <img 
              src={transaction.paymentMethod.image} 
              alt={transaction.paymentMethod.name}
              style={{ height: 20 }}
            />
          ) : (
            React.cloneElement(transaction.paymentMethod.icon, { fontSize: 'small' })
          )}
          <Typography>{transaction.paymentMethod.name}</Typography>
        </Box>
        
        {Object.entries(transaction.paymentDetails).map(([field, value]) => (
          <Typography key={field} variant="body2">
            {field}: {value}
          </Typography>
        ))}
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2">Thank you for your business!</Typography>
        <Typography variant="caption" display="block">Terms & Conditions Apply</Typography>
        <Typography variant="caption" display="block">Returns accepted within 7 days with receipt</Typography>
      </Box>
    </Box>
  );

  // Calculations
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.discount) / 100 : 0;
  const taxAmount = subtotal * 0.18;
  const totalAmount = subtotal - discountAmount + taxAmount;

  return (
    <Box p={3}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          POS Sales Terminal
        </Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Current Staff">
            <Chip
              avatar={<Avatar><PersonIcon /></Avatar>}
              label="Staff: Emma Nabunya"
              variant="outlined"
            />
          </Tooltip>
          
          <Tooltip title="Register Status">
            <Chip
              label="Register: Open"
              color="success"
              variant="outlined"
            />
          </Tooltip>
          
          <IconButton
            color="primary"
            onClick={() => setOpenCartDialog(true)}
            sx={{ position: "relative" }}
          >
            <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {/* Barcode Scanner */}
      <Box mb={3}>
        <TextField
          fullWidth
          label="Scan Barcode"
          variant="outlined"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          onKeyPress={handleBarcodeScan}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      {/* Quick Categories */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Quick Categories
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {Object.keys(categoryMap).map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setCategory(cat)}
              color={category === cat ? "primary" : "default"}
              icon={<CategoryIcon />}
            />
          ))}
        </Box>
      </Box>

      {/* Filters Section */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FilterListIcon />
          <Typography variant="h6">Filters</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Search Products"
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={handleCategoryChange} label="Category">
                <MenuItem value="">All Categories</MenuItem>
                {Object.keys(categoryMap).map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select 
                value={subcategory} 
                onChange={handleSubcategoryChange} 
                label="Subcategory"
                disabled={!category}
              >
                <MenuItem value="">All Subcategories</MenuItem>
                {category && categoryMap[category]?.map((subcat) => (
                  <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Price Range (UGX)</Typography>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
              valueLabelFormat={(value) => `${value.toLocaleString()}`}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <SortIcon />
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select onChange={handleSort} defaultValue="">
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                  <MenuItem value="ratingAsc">Rating: Low to High</MenuItem>
                  <MenuItem value="ratingDesc">Rating: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
                {product.stock <= 10 && (
                  <Chip
                    label={`Low Stock: ${product.stock}`}
                    color="warning"
                    size="small"
                    sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                  />
                )}
                
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 200, objectFit: "contain", p: 1 }}
                />
                
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.category} &gt; {product.subcategory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" color="textPrimary" fontWeight="bold">
                      UGX {product.price.toLocaleString()}
                    </Typography>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                  </Box>
                  
                  <Typography variant="caption" color="textSecondary">
                    Barcode: {product.barcode}
                  </Typography>
                </CardContent>
                
                <Button
                  variant="contained"
                  color="primary"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                  sx={{ mt: "auto" }}
                  startIcon={<AddIcon />}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No products found matching your criteria
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Cart Dialog */}
      <Dialog 
        open={openCartDialog} 
        onClose={() => setOpenCartDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <ShoppingCartIcon />
              <span>Shopping Cart</span>
            </Box>
            <IconButton onClick={() => setOpenCartDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Cart Items</StepLabel>
            </Step>
            <Step>
              <StepLabel>Customer Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>
          
          {activeStep === 0 && (
            <>
              <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Cart Items" icon={<ShoppingCartIcon />} />
                <Tab label="Discounts" icon={<DiscountIcon />} />
              </Tabs>
              
              {activeTab === 0 ? (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.length > 0 ? (
                          cart.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Box display="flex" alignItems="center" gap={2}>
                                  <Avatar src={item.image} variant="square" />
                                  <Box>
                                    <Typography>{item.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                      {item.category}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                UGX {item.price.toLocaleString()}
                              </TableCell>
                              <TableCell align="center">
                                <Box display="flex" alignItems="center" justifyContent="center">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                  <Typography mx={1}>{item.quantity}</Typography>
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                  >
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                UGX {(item.price * item.quantity).toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              <Typography variant="body1" color="textSecondary">
                                Your cart is empty
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography>Subtotal:</Typography>
                    <Typography fontWeight="bold">UGX {subtotal.toLocaleString()}</Typography>
                  </Box>
                  
                  {appliedDiscount && (
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography>Discount ({appliedDiscount.name}):</Typography>
                        <Chip 
                          label={`${appliedDiscount.discount}%`} 
                          size="small" 
                          color="success" 
                          onDelete={handleRemoveDiscount}
                        />
                      </Box>
                      <Typography fontWeight="bold" color="error">
                        -UGX {discountAmount.toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography>Tax (18%):</Typography>
                    <Typography fontWeight="bold">UGX {taxAmount.toLocaleString()}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h5" fontWeight="bold">
                      UGX {totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Available Discounts
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {discountOffers.map((offer) => (
                      <Grid item xs={12} sm={6} md={4} key={offer.id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box display="flex" justifyContent="space-between">
                              <Typography fontWeight="bold">{offer.name}</Typography>
                              <Chip 
                                label={`${offer.discount}% OFF`} 
                                color="success" 
                                size="small"
                              />
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                              Code: {offer.code}
                            </Typography>
                            <Button
                              size="small"
                              fullWidth
                              sx={{ mt: 1 }}
                              onClick={() => {
                                setDiscountCode(offer.code);
                                setAppliedDiscount(offer);
                              }}
                              disabled={appliedDiscount?.id === offer.id}
                            >
                              {appliedDiscount?.id === offer.id ? "Applied" : "Apply"}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box display="flex" gap={1}>
                    <TextField
                      label="Enter Discount Code"
                      fullWidth
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button 
                      variant="contained" 
                      onClick={handleApplyDiscount}
                      disabled={!discountCode}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          )}
          
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Customer Name"
                    fullWidth
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address"
                    fullWidth
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                  />
                </Grid>
              </Grid>
              
              <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
                * Customer information is optional but recommended for receipts and loyalty programs
              </Typography>
            </Box>
          )}
          
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Select Payment Method
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {paymentMethods.map((method) => (
                  <Grid item xs={6} sm={4} key={method.id}>
                    <Button
                      variant={selectedPaymentMethod?.id === method.id ? "contained" : "outlined"}
                      fullWidth
                      sx={{ p: 2, height: "100%" }}
                      onClick={() => handlePaymentMethodSelect(method)}
                    >
                      <Box display="flex" flexDirection="column" alignItems="center">
                        {method.image ? (
                          <img 
                            src={method.image} 
                            alt={method.name}
                            style={{ height: 30, marginBottom: 8 }}
                          />
                        ) : React.cloneElement(method.icon, { sx: { fontSize: 30, mb: 1 } })}
                        <Typography>{method.name}</Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
              
              {selectedPaymentMethod && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedPaymentMethod.name} Details
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {selectedPaymentMethod.fields.map((field) => (
                      <Grid item xs={12} sm={6} key={field}>
                        <TextField
                          label={field}
                          fullWidth
                          value={paymentDetails[field] || ''}
                          onChange={(e) => handlePaymentDetailChange(field, e.target.value)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell align="right">UGX {subtotal.toLocaleString()}</TableCell>
                    </TableRow>
                    {appliedDiscount && (
                      <TableRow>
                        <TableCell>Discount ({appliedDiscount.name})</TableCell>
                        <TableCell align="right" sx={{ color: "error.main" }}>
                          -UGX {discountAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>Tax (18%)</TableCell>
                      <TableCell align="right">UGX {taxAmount.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell align="right"><strong>UGX {totalAmount.toLocaleString()}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
          <Box>
            {activeStep > 0 && (
              <Button 
                onClick={() => setActiveStep(activeStep - 1)}
                variant="outlined"
              >
                Back
              </Button>
            )}
          </Box>
          
          <Box display="flex" gap={2}>
            {activeStep < 2 ? (
              <Button 
                onClick={() => setActiveStep(activeStep + 1)}
                variant="contained"
                disabled={cart.length === 0}
              >
                {activeStep === 0 ? "Proceed to Checkout" : "Continue to Payment"}
              </Button>
            ) : (
              <Button 
                onClick={handleCompleteSale}
                variant="contained"
                color="success"
                startIcon={<ReceiptIcon />}
                disabled={!selectedPaymentMethod || 
                  Object.values(paymentDetails).some(val => !val)}
              >
                Complete Sale
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      {/* Receipt Modal */}
      <Modal
        open={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 2, maxWidth: 500, width: '100%' }}>
          {currentReceipt && renderReceipt(currentReceipt)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={() => setReceiptModalOpen(false)}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              sx={{ ml: 2 }}
              startIcon={<PrintIcon />}
              onClick={() => {
                const receiptElement = document.getElementById('receipt');
                if (receiptElement) {
                  const printWindow = window.open('', '', 'width=600,height=600');
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Receipt #${currentReceipt.id}</title>
                        <style>
                          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                          table { width: 100%; border-collapse: collapse; }
                          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                          .text-center { text-align: center; }
                          .text-right { text-align: right; }
                        </style>
                      </head>
                      <body>
                        ${receiptElement.innerHTML}
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
                }
              }}
            >
              Print Receipt
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Payment History Modal */}
      <Modal
        open={paymentHistoryOpen}
        onClose={() => setPaymentHistoryOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 2, width: '100%', maxWidth: 800, maxHeight: '80vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Payment History
          </Typography>
          
          <List>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((transaction) => (
                <ListItem 
                  key={transaction.id} 
                  secondaryAction={
                    <Button 
                      size="small" 
                      onClick={() => {
                        setCurrentReceipt(transaction);
                        setReceiptModalOpen(true);
                      }}
                    >
                      View Receipt
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    {transaction.paymentMethod.image ? (
                      <img 
                        src={transaction.paymentMethod.image} 
                        alt={transaction.paymentMethod.name}
                        style={{ height: 30 }}
                      />
                    ) : React.cloneElement(transaction.paymentMethod.icon, { sx: { fontSize: 30 } })}
                  </ListItemAvatar>
                  <ListItemText
                    primary={`#${transaction.id} - UGX ${transaction.total.toLocaleString()}`}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          {format(new Date(transaction.date), 'PPPpp')}
                        </Typography>
                        <Typography component="span" display="block">
                          {transaction.paymentMethod.name} • {transaction.customer.name || 'Walk-in Customer'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ p: 2 }}>No payment history available</Typography>
            )}
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={() => setPaymentHistoryOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Payment History Button */}
      <Button
        variant="contained"
        startIcon={<HistoryIcon />}
        
          onClick={() => setPaymentHistoryOpen(true)}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Payment History
        </Button>
  
        {/* Snackbar for notifications */}
        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={3000} 
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            severity="success" 
            onClose={() => setOpenSnackbar(false)}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
  export default SalesPage;