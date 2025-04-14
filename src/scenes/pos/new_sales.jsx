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
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

// Updated product data with expanded categories and subcategories
const productData = [
  // Beverages
  { 
    id: 1, 
    name: "Fanta", 
    category: "Beverages", 
    subcategory: "Soft Drinks", 
    price: 1500, 
    rating: 4, 
    stock: 50, 
    image: "/assets/fanta.jpg", 
    description: "A popular carbonated soft drink." 
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
    description: "Citrusy and refreshing soft drink." 
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
    description: "Tropical fruit juice." 
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
    description: "Premium lager beer." 
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
    description: "Popular beer in Uganda." 
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
    description: "Premium quality semovita." 
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
    description: "High quality construction cement." 
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
    description: "Premium quality toilet paper." 
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
    description: "Powerful laundry detergent." 
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
    description: "Latest smartphone with great features." 
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
    description: "Affordable smartphone with good camera." 
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
    description: "Comfortable cotton shirt for men." 
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
    description: "Handbag." 
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
    description: "Moisturizing body wash." 
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
    description: "Cavity protection toothpaste." 
  }
];

// Category and subcategory mapping
const categoryMap = {
  "Beverages": ["Soft Drinks", "Juices", "Alcoholic", "Energy Drinks", "Water"],
  "Groceries": ["Flour & Grains", "Cooking Oil", "Rice & Pasta", "Building Materials", "Canned Goods"],
  "Household": ["Cleaning", "Bathroom", "Kitchen", "Laundry", "Storage"],
  
  "Clothing": ["Men's Fashion", "Women's Fashion", "Kids", "Jewelry", "Watches"],
  "Health & Beauty": ["Personal Care", "Oral Care", "Hair Care", "Makeup", "Fragrances"],
  "Electronics": ["Mobile Phones", "Laptops", "TVs", "Audio", "Accessories"],
};

const SalesPage = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [category, subcategory, minPrice, maxPrice, rating, searchText]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => setSubcategory(e.target.value);

  const handlePriceChange = (e, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleRatingChange = (e, newValue) => setRating(newValue);

  const handleSearch = (e) => setSearchText(e.target.value);

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
    setSnackbarMessage("Product added to cart!");
    setOpenSnackbar(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setSnackbarMessage("Proceeding to checkout...");
    setOpenSnackbar(true);
    navigate('/pos/payments', { state: { cartItems: cart } });
  };

  const applyFilters = () => {
    const filtered = productData
      .filter((product) => (category ? product.category === category : true))
      .filter((product) => (subcategory ? product.subcategory === subcategory : true))
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .filter((product) => (rating ? product.rating >= rating : true))
      .filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));

    setFilteredProducts(filtered);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...filteredProducts];
    if (sortValue === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "ratingAsc") {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === "ratingDesc") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setFilteredProducts(sortedProducts);
  };

  const totalCartAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box p={3}>
      {/* Header and Title */}
      <Typography variant="h4" gutterBottom>
        New Sales
      </Typography>

      {/* Cart Icon */}
      <IconButton
        color="primary"
        onClick={() => setOpenCartDialog(true)}
        sx={{ position: "absolute", top: 120, right: 33 }}
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Filters Section */}
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Search"
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
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
            <Typography variant="body1">Rating</Typography>
            <Rating
              value={rating}
              onChange={handleRatingChange}
              precision={1}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Sorting Section */}
      <Box mb={3}>
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

      {/* Product Grid */}
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.category} &gt; {product.subcategory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                  <Typography variant="body1" color="textPrimary">
                    UGX {product.price.toLocaleString()}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
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
      <Dialog open={openCartDialog} onClose={() => setOpenCartDialog(false)}>
        <DialogTitle>Shopping Cart</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Total Amount: UGX {totalCartAmount.toLocaleString()}</Typography>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body1">{item.name} x {item.quantity}</Typography>
                    <Typography variant="body2">UGX {(item.price * item.quantity).toLocaleString()}</Typography>
                  </Box>
                  <IconButton onClick={() => handleRemoveFromCart(item.id)} color="secondary">
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCartDialog(false)} color="secondary">
            Close
          </Button>
          <Button 
            onClick={handleProceedToCheckout} 
            color="primary"
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SalesPage;