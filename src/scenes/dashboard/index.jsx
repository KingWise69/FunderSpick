import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  useTheme
} from '@mui/material';
import {
  ShoppingCart,
  PointOfSale,
  Receipt,
  Payment,
  TrendingUp,
  Inventory,
  People,
  DateRange,
  Today,
  CalendarViewWeek,
  CalendarViewMonth,
  Refresh,
  FilterList,
  Add
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Product images (in a real app, these would be imported or fetched from a server)
const productImages = {
  'Fanta': '/assets/fanta.jpg',
  'Luxury Toilet Paper Carton': '/assets/1.jpg',
  'Eggs': '/assets/eggs.jpg',
  'Tropical Heat Tea Masala': '/assets/masala.jpg',
  'American Ginseng Coffee': '/assets/ginseng.jpg'
};

const POSDashboard = () => {
  const theme = useTheme();
  const [timeFilter, setTimeFilter] = useState('daily');
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [chartFilter, setChartFilter] = useState('sales');

  // Generate mock data based on time filter
  useEffect(() => {
    const generateSalesData = () => {
      const data = [];
      const today = new Date();
      const days = timeFilter === 'daily' ? 30 : timeFilter === 'weekly' ? 12 : timeFilter === 'monthly' ? 12 : 5;
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        if (timeFilter === 'daily') {
          date.setDate(date.getDate() - i);
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            sales: Math.floor(Math.random() * 10000) + 2000,
            returns: Math.floor(Math.random() * 1000),
            customers: Math.floor(Math.random() * 50) + 20,
          });
        } else if (timeFilter === 'weekly') {
          date.setDate(date.getDate() - i * 7);
          data.push({
            date: `Week ${i + 1}`,
            sales: Math.floor(Math.random() * 50000) + 10000,
            returns: Math.floor(Math.random() * 5000),
            customers: Math.floor(Math.random() * 200) + 100,
          });
        } else if (timeFilter === 'monthly') {
          date.setMonth(date.getMonth() - i);
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            sales: Math.floor(Math.random() * 200000) + 50000,
            returns: Math.floor(Math.random() * 20000),
            customers: Math.floor(Math.random() * 800) + 500,
          });
        } else { // yearly
          date.setFullYear(date.getFullYear() - i);
          data.push({
            date: date.toLocaleDateString('en-US', { year: 'numeric' }),
            sales: Math.floor(Math.random() * 1000000) + 500000,
            returns: Math.floor(Math.random() * 100000),
            customers: Math.floor(Math.random() * 3000) + 2000,
          });
        }
      }
      return data;
    };

    const generateTopProducts = () => {
      const products = [
        { name: 'Fanta', category: 'Beverages' },
        { name: 'Luxury Toilet Paper Carton', category: 'Household' },
        { name: 'Eggs', category: 'Groceries' },
        { name: 'Tropical Heat Tea Masala', category: 'Beverages' },
        { name: 'American Ginseng Coffee', category: 'Beverages' }
      ];
      
      return products.map((product, index) => ({
        id: index + 1,
        name: product.name,
        category: product.category,
        sales: Math.floor(Math.random() * 500) + 100,
        revenue: Math.floor(Math.random() * 10000) + 2000,
        rating: (Math.random() * 2 + 3).toFixed(1),
        image: productImages[product.name]
      }));
    };

    const generateRecentTransactions = () => {
      const statuses = ['Completed', 'Pending', 'Refunded'];
      const methods = ['Cash', 'Credit Card', 'Mobile Payment'];
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        customer: `Customer ${i + 1}`,
        amount: (Math.random() * 500 + 50).toFixed(2),
        items: Math.floor(Math.random() * 10) + 1,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        method: methods[Math.floor(Math.random() * methods.length)]
      }));
    };

    const generateInventoryAlerts = () => {
      const products = [
        { name: 'Fanta', category: 'Beverages', threshold: 50 },
        { name: 'Luxury Toilet Paper Carton', category: 'Household', threshold: 20 },
        { name: 'Eggs', category: 'Groceries', threshold: 100 },
        { name: 'Tropical Heat Tea Masala', category: 'Beverages', threshold: 30 },
        { name: 'American Ginseng Coffee', category: 'Beverages', threshold: 40 }
      ];
      
      return products.map(product => ({
        ...product,
        id: products.indexOf(product) + 1,
        currentStock: Math.floor(Math.random() * product.threshold),
        image: productImages[product.name]
      })).filter(item => item.currentStock < item.threshold * 0.3); // Only show items below 30% of threshold
    };

    setSalesData(generateSalesData());
    setTopProducts(generateTopProducts());
    setRecentTransactions(generateRecentTransactions());
    setInventoryAlerts(generateInventoryAlerts());
  }, [timeFilter]);

  // Calculate summary metrics based on time filter
  const calculateSummary = () => {
    const baseAmount = {
      daily: 1000,
      weekly: 7000,
      monthly: 30000,
      yearly: 360000
    }[timeFilter];

    return {
      totalSales: (baseAmount * (1 + Math.random() * 0.5)).toFixed(2),
      totalPurchases: (baseAmount * 0.7 * (1 + Math.random() * 0.3)).toFixed(2),
      purchaseDue: (baseAmount * 0.1 * (1 + Math.random() * 0.5)).toFixed(2),
      invoiceDue: (baseAmount * 0.15 * (1 + Math.random() * 0.5)).toFixed(2),
      expenses: (baseAmount * 0.3 * (1 + Math.random() * 0.2)).toFixed(2)
    };
  };

  const summary = calculateSummary();

  // Columns for recent transactions table
  const transactionColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customer', headerName: 'Customer', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'items', headerName: 'Items', width: 100 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === 'Completed' ? '#4caf50' :
                          params.value === 'Pending' ? '#2196f3' :
                          '#f44336',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem'
          }}
        >
          {params.value}
        </Box>
      )
    },
    { field: 'method', headerName: 'Method', width: 130 }
  ];

  return (
    <Box m="20px">
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h3" fontWeight="bold">
          Point of Sale Dashboard
        </Typography>
      </Box>

      {/* Time Filter */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" gap={1}>
          <Button
            variant={timeFilter === 'daily' ? 'contained' : 'outlined'}
            startIcon={<Today />}
            onClick={() => setTimeFilter('daily')}
          >
            Daily
          </Button>
          <Button
            variant={timeFilter === 'weekly' ? 'contained' : 'outlined'}
            startIcon={<CalendarViewWeek />}
            onClick={() => setTimeFilter('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={timeFilter === 'monthly' ? 'contained' : 'outlined'}
            startIcon={<CalendarViewMonth />}
            onClick={() => setTimeFilter('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={timeFilter === 'yearly' ? 'contained' : 'outlined'}
            startIcon={<DateRange />}
            onClick={() => setTimeFilter('yearly')}
          >
            Yearly
          </Button>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Button variant="outlined" startIcon={<FilterList />}>
            Filters
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.totalSales}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +{Math.floor(Math.random() * 15) + 5}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Purchases
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.totalPurchases}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +{Math.floor(Math.random() * 10) + 3}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Purchase Due
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.purchaseDue}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="body2" color="#f44336">
                  +{Math.floor(Math.random() * 8) + 2}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Invoice Due
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.invoiceDue}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +{Math.floor(Math.random() * 20) + 5}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Expenses
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.expenses}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="body2" color="#f44336">
                  +{Math.floor(Math.random() * 5) + 1}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} mb={3}>
        {/* Sales Trend Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Sales Trend ({timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)} View)</Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>View</InputLabel>
                <Select
                  value={chartFilter}
                  label="View"
                  onChange={(e) => setChartFilter(e.target.value)}
                >
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="customers">Customers</MenuItem>
                  <MenuItem value="returns">Returns</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {chartFilter === 'sales' && (
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#2196f3"
                      activeDot={{ r: 8 }}
                      name="Sales ($)"
                    />
                  )}
                  {chartFilter === 'customers' && (
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#4caf50"
                      name="Customers"
                    />
                  )}
                  {chartFilter === 'returns' && (
                    <Line
                      type="monotone"
                      dataKey="returns"
                      stroke="#f44336"
                      name="Returns ($)"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Quick Actions</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<PointOfSale />} 
                  sx={{ mb: 1 }}
                  href="/pos/new_sales"
                >
                  New Sale
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<ShoppingCart />} 
                  sx={{ mb: 1 }}
                  href="/pos/new_order"
                >
                  New Order
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<Receipt />} 
                  sx={{ mb: 1 }}
                  href="/payment-listings"
                >
                  Invoices
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<Payment />} 
                  sx={{ mb: 1 }}
                  href="/payment-listings"
                >
                  Payments
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<Inventory />}
                  href="/pos/inventory"
                >
                  Inventory
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<People />}
                  href="/pos/customers"
                >
                  Customers
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Transactions</Typography>
              <Button 
                size="small" 
                startIcon={<Add />}
                href="/pos/new_order"
              >
                New Sale
              </Button>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={recentTransactions}
                columns={transactionColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
          </Card>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Top Selling Products */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={2}>Top Selling Products</Typography>
            {topProducts.map((product) => (
              <Box key={product.id} mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ 
                      width: 50, 
                      height: 50, 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }} 
                  />
                  <Box flexGrow={1}>
                    <Typography fontWeight="bold">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.category}</Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography fontWeight="bold">{product.sales} units</Typography>
                    <Typography variant="body2">${product.revenue.toLocaleString()}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 1 }} />
              </Box>
            ))}
          </Card>

          {/* Inventory Alerts */}
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Inventory Alerts</Typography>
            {inventoryAlerts.length > 0 ? (
              inventoryAlerts.map((item) => (
                <Box key={item.id} mb={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: 50, 
                        height: 50, 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }} 
                    />
                    <Box flexGrow={1}>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{item.category}</Typography>
                    </Box>
                    <Typography color="#f44336">
                      {item.currentStock} / {item.threshold}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button size="small" variant="outlined" href="/pos/inventory">Reorder</Button>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))
            ) : (
              <Typography color="textSecondary">No inventory alerts</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSDashboard;