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
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Dummy product data
const productData = [
  { id: 1, name: "Fanta", category: "Soft Drink", price: 1500, rating: 4, stock: 50, image: "/assets/fanta.jpg", description: "A popular carbonated soft drink." },
  { id: 2, name: "Mountain Dew", category: "Soft Drink", price: 1500, rating: 5, stock: 30, image: "/assets/dew.jpg", description: "Citrusy and refreshing soft drink." },
  { id: 3, name: "Coca-Cola", category: "Soft Drink", price: 1500, rating: 3, stock: 45, image: "/assets/coca.jpg", description: "Classic soda with a unique taste." },
  { id: 4, name: "Pepsi", category: "Soft Drink", price: 1500, rating: 4, stock: 25, image: "/assets/pepsi.jpg", description: "Sweet carbonated beverage." },
  { id: 5, name: "AFIA JUICE Tropical", category: "Juice", price: 2000, rating: 4, stock: 20, image: "/assets/afia_tropical.jpg", description: "Tropical fruit juice." },
  { id: 6, name: "Heineken Beer 330ml", category: "Alcoholic Beverage", price: 5000, rating: 5, stock: 60, image: "/assets/Heineken.png", description: "Premium lager beer." },
  { id: 7, name: "Bell Lager", category: "Alcoholic Beverage", price: 4500, rating: 4, stock: 40, image: "/assets/bell.png", description: "Popular beer in Uganda." },
  { id: 8, name: "Chocolate Cake", category: "Dessert", price: 3500, rating: 4, stock: 30, image: "/assets/cake.jpg", description: "Rich and decadent chocolate cake." },
];

const SalesPage = () => {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rating, setRating] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openCartDialog, setOpenCartDialog] = useState(false);

  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  useEffect(() => {
    applyFilters();
  }, [category, minPrice, maxPrice, rating, searchText]);

  const handleCategoryChange = (e) => setCategory(e.target.value);

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
    // Navigate to payments page
    navigate('/pos/payments', { state: { cartItems: cart } }); // Pass cart items to payments page
  };

  const applyFilters = () => {
    const filtered = productData
      .filter((product) => (category ? product.category === category : true))
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

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={handleCategoryChange} label="Category">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Soft Drink">Soft Drink</MenuItem>
                <MenuItem value="Juice">Juice</MenuItem>
                <MenuItem value="Alcoholic Beverage">Alcoholic Beverage</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="body1">Price Range</Typography>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              valueLabelFormat={(value) => `UGX ${value}`}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
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
        {filteredProducts.map((product) => (
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
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                <Typography variant="body1" color="textPrimary">
                  UGX {product.price}
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
        ))}
      </Grid>

      {/* Cart Dialog */}
      <Dialog open={openCartDialog} onClose={() => setOpenCartDialog(false)}>
        <DialogTitle>Shopping Cart</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Total Amount: UGX {totalCartAmount}</Typography>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">{item.name} x {item.quantity}</Typography>
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
          <Button onClick={handleProceedToCheckout} color="primary">
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
