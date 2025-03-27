import React, { useState, useEffect } from "react";
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
  Chip,
  Divider,
  Paper,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Avatar
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Add,
  Category,
  ExpandMore,
  ExpandLess,
  Search,
  FilterList,
  Sort
} from "@mui/icons-material";

// Category structure with subcategories
const categoryStructure = {
  "Beverages": ["Soft Drinks", "Juices", "Alcoholic", "Energy Drinks"],
  "Groceries": ["Flour & Grains", "Cooking Oil", "Rice & Pasta"],
  "Household": ["Cleaning", "Bathroom", "Kitchen"],
  "Electronics": ["Mobile Phones", "Laptops", "Accessories"],
  "Health & Beauty": ["Personal Care", "Hair Care", "Makeup"]
};

// Enhanced product data with categories and subcategories
const initialProductData = [
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
    barcode: "123456789"
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
    barcode: "987654321"
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
    barcode: "456123789"
  },
  { 
    id: 4, 
    name: "Heineken Beer 330ml", 
    category: "Beverages", 
    subcategory: "Alcoholic", 
    price: 5000, 
    rating: 5, 
    stock: 60, 
    image: "/assets/heineken.png", 
    description: "Premium lager beer.",
    barcode: "789123456"
  },
  { 
    id: 5, 
    name: "Golden Penny Semovita 2kg", 
    category: "Groceries", 
    subcategory: "Flour & Grains", 
    price: 3500, 
    rating: 4, 
    stock: 30, 
    image: "/assets/semo.jpeg", 
    description: "Premium quality semovita.",
    barcode: "321654987"
  },
  { 
    id: 6, 
    name: "OMO Detergent 5kg", 
    category: "Household", 
    subcategory: "Cleaning", 
    price: 15000, 
    rating: 4, 
    stock: 18, 
    image: "/assets/omo.jpg", 
    description: "Powerful laundry detergent.",
    barcode: "654987321"
  },
  { 
    id: 7, 
    name: "Tecno Spark 10", 
    category: "Electronics", 
    subcategory: "Mobile Phones", 
    price: 750000, 
    rating: 4, 
    stock: 12, 
    image: "/assets/spark.jpeg", 
    description: "Affordable smartphone with good camera.",
    barcode: "147258369"
  },
  { 
    id: 8, 
    name: "Dove Body Wash", 
    category: "Health & Beauty", 
    subcategory: "Personal Care", 
    price: 12000, 
    rating: 4, 
    stock: 25, 
    image: "/assets/dove.jpeg", 
    description: "Moisturizing body wash.",
    barcode: "369258147"
  },
  { 
    id: 9, 
    name: "Hima Cement 50kg", 
    category: "Groceries", 
    subcategory: "Building Materials", 
    price: 45000, 
    rating: 4, 
    stock: 58, 
    image: "/assets/hima.png", 
    description: "High quality construction cement.",
    barcode: "192087321"
  },
];

const ProductsPage = () => {
  // State management
  const [products, setProducts] = useState(initialProductData);
  const [filteredProducts, setFilteredProducts] = useState(initialProductData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    category: "", 
    subcategory: "", 
    price: "", 
    rating: 0, 
    stock: "", 
    description: "",
    barcode: ""
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: []
  });
  const [newSubcategory, setNewSubcategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...products];
    
    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Subcategory filter
    if (subcategory) {
      filtered = filtered.filter(product => product.subcategory === subcategory);
    }
    
    // Price filter
    filtered = filtered.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    
    // Rating filter
    if (rating > 0) {
      filtered = filtered.filter(product => product.rating >= rating);
    }
    
    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.barcode.includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, category, subcategory, minPrice, maxPrice, rating, searchTerm]);

  // Toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Handle adding to favorites
  const handleAddToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Handle removing from favorites
  const handleRemoveFromFavorites = (productId) => {
    setFavorites(favorites.filter((fav) => fav.id !== productId));
  };

  // View product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  // Close all dialogs
  const handleDialogClose = () => {
    setOpenProductDialog(false);
    setOpenCategoryDialog(false);
    setSelectedProduct(null);
    setNewProduct({ 
      name: "", 
      category: "", 
      subcategory: "", 
      price: "", 
      rating: 0, 
      stock: "", 
      description: "",
      barcode: ""
    });
    setNewCategory({
      name: "",
      subcategories: []
    });
    setNewSubcategory("");
  };

  // Add a new product
  const handleAddProduct = () => {
    const newProductWithId = {
      ...newProduct,
      id: products.length + 1,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      rating: Number(newProduct.rating)
    };
    setProducts([...products, newProductWithId]);
    handleDialogClose();
  };

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.name && !categoryStructure[newCategory.name]) {
      categoryStructure[newCategory.name] = newCategory.subcategories;
      
      // If adding subcategories to an existing category
      if (newCategory.subcategories.length > 0) {
        categoryStructure[newCategory.name] = [
          ...(categoryStructure[newCategory.name] || []),
          ...newCategory.subcategories
        ];
      }
    }
    handleDialogClose();
  };

  // Add a subcategory to the current new category
  const handleAddSubcategory = () => {
    if (newSubcategory) {
      setNewCategory(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, newSubcategory]
      }));
      setNewSubcategory("");
    }
  };

  // Remove a subcategory from the current new category
  const handleRemoveSubcategory = (subcat) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter(s => s !== subcat)
    }));
  };

  // Handle sorting
  const handleSort = (sortValue) => {
    let sortedProducts = [...filteredProducts];
    switch (sortValue) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "ratingAsc":
        sortedProducts.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingDesc":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Page Title and Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Product Inventory</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenProductDialog(true)}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Add Product
          </Button>
          <Button
            variant="contained"
            startIcon={<Category />}
            onClick={() => setOpenCategoryDialog(true)}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Manage Categories
          </Button>
        </Box>
      </Box>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="All Products" />
        <Tab label={
          <Badge badgeContent={favorites.length} color="error">
            Favorites
          </Badge>
        } />
        <Tab label="Low Stock" />
      </Tabs>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {Object.keys(categoryStructure).map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                label="Subcategory"
                disabled={!category}
              >
                <MenuItem value="">All Subcategories</MenuItem>
                {category && categoryStructure[category]?.map((subcat) => (
                  <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body2" gutterBottom>Price Range (UGX)</Typography>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={(e, newValue) => {
                setMinPrice(newValue[0]);
                setMaxPrice(newValue[1]);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
              valueLabelFormat={(value) => value.toLocaleString()}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">UGX {minPrice.toLocaleString()}</Typography>
              <Typography variant="caption">UGX {maxPrice.toLocaleString()}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body2" gutterBottom>Minimum Rating</Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                defaultValue=""
                onChange={(e) => handleSort(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
                <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
                <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
                <MenuItem value="ratingAsc">Rating (Low to High)</MenuItem>
                <MenuItem value="ratingDesc">Rating (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Category Navigation Sidebar and Product Grid */}
      <Grid container spacing={3}>
        {/* Category Navigation Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
            {Object.entries(categoryStructure).map(([categoryName, subcategories]) => (
              <Box key={categoryName} sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    cursor: 'pointer',
                    backgroundColor: expandedCategories[categoryName] ? '#f5f5f5' : 'transparent',
                    borderRadius: 1
                  }}
                  onClick={() => toggleCategory(categoryName)}
                >
                  {expandedCategories[categoryName] ? <ExpandLess /> : <ExpandMore />}
                  <Typography sx={{ ml: 1 }}>{categoryName}</Typography>
                  <Chip label={subcategories.length} size="small" sx={{ ml: 'auto' }} />
                </Box>
                {expandedCategories[categoryName] && (
                  <Box sx={{ pl: 4, mt: 1 }}>
                    {subcategories.map(subcat => (
                      <Typography
                        key={subcat}
                        variant="body2"
                        sx={{
                          p: 1,
                          mb: 0.5,
                          borderRadius: 1,
                          cursor: 'pointer',
                          backgroundColor: subcategory === subcat ? '#e3f2fd' : 'transparent',
                          '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                        onClick={() => setSubcategory(subcat)}
                      >
                        {subcat}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 140, objectFit: 'contain', p: 1 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>{product.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>{product.rating}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {product.category} › {product.subcategory}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {product.description.length > 50 
                          ? `${product.description.substring(0, 50)}...` 
                          : product.description}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
                        UGX {product.price.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: product.stock > 10 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Button 
                        size="small" 
                        onClick={() => handleViewDetails(product)}
                      >
                        Details
                      </Button>
                      {favorites.some((fav) => fav.id === product.id) ? (
                        <IconButton 
                          size="small" 
                          onClick={() => handleRemoveFromFavorites(product.id)}
                          color="error"
                        >
                          <Favorite />
                        </IconButton>
                      ) : (
                        <IconButton 
                          size="small" 
                          onClick={() => handleAddToFavorites(product)}
                        >
                          <FavoriteBorder />
                        </IconButton>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6">No products found matching your criteria</Typography>
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setCategory("");
                      setSubcategory("");
                      setSearchTerm("");
                      setRating(0);
                      setMinPrice(0);
                      setMaxPrice(100000);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Product Details Dialog */}
      <Dialog 
        open={openProductDialog && selectedProduct} 
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={selectedProduct.image}
                  alt={selectedProduct.name}
                  sx={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{selectedProduct.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={selectedProduct.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>{selectedProduct.rating}/5</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  <strong>Category:</strong> {selectedProduct.category} › {selectedProduct.subcategory}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  UGX {selectedProduct.price.toLocaleString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Stock:</strong> {selectedProduct.stock} units
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Barcode:</strong> {selectedProduct.barcode}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  <strong>Description:</strong> {selectedProduct.description}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button 
            variant="contained" 
            onClick={handleDialogClose}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Edit Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Product Dialog */}
      <Dialog 
        open={openProductDialog && !selectedProduct} 
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value, subcategory: ""})}
                  label="Category"
                >
                  {Object.keys(categoryStructure).map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={newProduct.subcategory}
                  onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
                  label="Subcategory"
                  disabled={!newProduct.category}
                >
                  {newProduct.category && categoryStructure[newProduct.category]?.map((subcat) => (
                    <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (UGX)"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Barcode/ID"
                value={newProduct.barcode}
                onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Product Rating</Typography>
              <Rating
                value={newProduct.rating}
                onChange={(e, newValue) => setNewProduct({...newProduct, rating: newValue})}
                precision={0.5}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddProduct}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Save Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Categories Dialog */}
      <Dialog 
        open={openCategoryDialog} 
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Manage Categories</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Add New Category</Typography>
              <TextField
                fullWidth
                label="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>Subcategories</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Subcategory"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                />
                <Button 
                  variant="contained" 
                  onClick={handleAddSubcategory}
                  disabled={!newSubcategory}
                >
                  Add
                </Button>
              </Box>
              {newCategory.subcategories.length > 0 && (
                <Paper sx={{ p: 2, mb: 2 }}>
                  {newCategory.subcategories.map((subcat, index) => (
                    <Chip
                      key={index}
                      label={subcat}
                      onDelete={() => handleRemoveSubcategory(subcat)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Paper>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Existing Categories</Typography>
              {Object.entries(categoryStructure).map(([category, subcategories]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{category}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {subcategories.map((subcat, idx) => (
                      <Chip key={idx} label={subcat} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddCategory}
            disabled={!newCategory.name}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Save Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;