import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Rating,
  IconButton,
  CardMedia,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// Dummy product data
const initialProductData = [
  { id: 1, name: "Fanta", category: "Soft Drink", price: 1500, rating: 4, stock: 50, image: "/assets/fanta.jpg", description: "A popular carbonated soft drink." },
  { id: 2, name: "Mountain Dew", category: "Soft Drink", price: 1500, rating: 5, stock: 30, image: "/assets/dew.jpg", description: "Citrusy and refreshing soft drink." },
  { id: 3, name: "Coca-Cola", category: "Soft Drink", price: 1500, rating: 3, stock: 45, image: "/assets/coca.jpg", description: "Classic soda with a unique taste." },
  { id: 4, name: "Pepsi", category: "Soft Drink", price: 1500, rating: 4, stock: 25, image: "/assets/pepsi.jpg", description: "Sweet carbonated beverage." },
  { id: 5, name: "AFIA JUICE Tropical", category: "Juice", price: 2000, rating: 4, stock: 20, image: "/assets/afia_tropical.jpg", description: "Tropical fruit juice." },
  { id: 6, name: "Heineken Beer 330ml", category: "Alcoholic Beverage", price: 5000, rating: 5, stock: 60, image: "/assets/heineken.png", description: "Premium lager beer." },
  { id: 7, name: "Bell Lager", category: "Alcoholic Beverage", price: 4500, rating: 4, stock: 40, image: "/assets/bell.png", description: "Popular beer in Uganda." },
  { id: 8, name: "Chocolate Cake", category: "Dessert", price: 3500, rating: 4, stock: 30, image: "/assets/chocolate-cake.jpg", description: "Rich and decadent chocolate cake." },
];

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(initialProductData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rating, setRating] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", rating: 0, stock: "", description: "" });
  const [newCategory, setNewCategory] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handlePriceChange = (e, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleRatingChange = (e, newValue) => setRating(newValue);

  const handleAddToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const handleRemoveFromFavorites = (productId) => {
    setFavorites(favorites.filter((fav) => fav.id !== productId));
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  const handleDialogClose = () => {
    setOpenProductDialog(false);
    setOpenCategoryDialog(false);
    setSelectedProduct(null);
    setNewProduct({ name: "", category: "", price: "", rating: 0, stock: "", description: "" });
    setNewCategory("");
  };

  // Handle form submission for adding a new product
  const handleAddProduct = () => {
    const newProductWithId = {
      ...newProduct,
      id: filteredProducts.length + 1,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };
    setFilteredProducts([...filteredProducts, newProductWithId]);
    handleDialogClose();
  };

  // Handle form submission for adding a new category
  const handleAddCategory = () => {
    if (newCategory && !category.includes(newCategory)) {
      setCategory(newCategory);
    }
    handleDialogClose();
  };

  // Filter products based on category, price, and rating
  const applyFilters = () => {
    const filtered = initialProductData
      .filter((product) => (category ? product.category === category : true))
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .filter((product) => (rating ? product.rating >= rating : true));

    setFilteredProducts(filtered);
  };

  // Sorting products by price or rating
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

  return (
    <Box p={3}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Add Product & Add Category Buttons */}
      <Box mb={3} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple", color: "white" }}
          onClick={() => setOpenProductDialog(true)}
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple", color: "white" }}
          onClick={() => setOpenCategoryDialog(true)}
        >
          Add Category
        </Button>
      </Box>

      {/* Filters */}
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField label="Search" fullWidth variant="outlined" onChange={(e) => applyFilters()} />
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
                {/* Add dynamically from available categories */}
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
            <Rating value={rating} onChange={handleRatingChange} precision={1} />
          </Grid>
        </Grid>
      </Box>

      {/* Sorting */}
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select onChange={handleSort} label="Sort By">
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
            <Card>
              <CardMedia component="img" image={product.image} alt={product.name} sx={{ height: 150, objectFit: "contain", width: "100%" }} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  UGX {product.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Typography>
                <Rating value={product.rating} readOnly sx={{ mt: 2 }} />
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleViewDetails(product)}>
                  View Details
                </Button>
                {favorites.some((fav) => fav.id === product.id) ? (
                  <IconButton onClick={() => handleRemoveFromFavorites(product.id)}>
                    <Favorite color="error" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleAddToFavorites(product)}>
                    <FavoriteBorder />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Details Dialog */}
      <Dialog open={openProductDialog} onClose={handleDialogClose}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <Typography variant="h6">{selectedProduct.name}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Price: UGX {selectedProduct.price.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Out of stock"}
              </Typography>
              <Rating value={selectedProduct.rating} readOnly sx={{ mt: 2 }} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={openProductDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              label="Category"
            >
              <MenuItem value="Soft Drink">Soft Drink</MenuItem>
              <MenuItem value="Juice">Juice</MenuItem>
              <MenuItem value="Alcoholic Beverage">Alcoholic Beverage</MenuItem>
              <MenuItem value="Dessert">Dessert</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddCategory} color="primary">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
