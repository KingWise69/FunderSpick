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
  IconButton,
  Badge,
  Avatar,
  useTheme
} from '@mui/material';
import {
  ShoppingCart,
  PointOfSale,
  Receipt,
  Payment,
  AttachMoney,
  TrendingUp,
  Inventory,
  People,
  Settings,
  Notifications,
  Menu as MenuIcon,
  Search,
  FilterList,
  Refresh,
  DateRange,
  Today,
  CalendarViewWeek,
  CalendarViewMonth,
  Star,
  Add,
  MoreVert
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { tokens } from '../../theme';

const POSDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timeFilter, setTimeFilter] = useState('daily');
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data generation
  useEffect(() => {
    // Generate sales data for last 30 days
    const generateSalesData = () => {
      const data = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          sales: Math.floor(Math.random() * 10000) + 2000,
          returns: Math.floor(Math.random() * 1000),
          customers: Math.floor(Math.random() * 50) + 20,
        });
      }
      return data;
    };

    // Generate top products
    const generateTopProducts = () => {
      const categories = ['Electronics', 'Clothing', 'Groceries', 'Home Goods', 'Toys'];
      return categories.map((category, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        category,
        sales: Math.floor(Math.random() * 500) + 100,
        revenue: Math.floor(Math.random() * 10000) + 2000,
        rating: (Math.random() * 2 + 3).toFixed(1)
      }));
    };

    // Generate recent transactions
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

    // Generate inventory alerts
    const generateInventoryAlerts = () => {
      return Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        product: `Product ${i + 1}`,
        currentStock: Math.floor(Math.random() * 10),
        threshold: 15,
        category: ['Electronics', 'Clothing', 'Groceries'][Math.floor(Math.random() * 3)]
      })).filter(item => item.currentStock < item.threshold);
    };

    setSalesData(generateSalesData());
    setTopProducts(generateTopProducts());
    setRecentTransactions(generateRecentTransactions());
    setInventoryAlerts(generateInventoryAlerts());
  }, []);

  // Calculate summary metrics based on time filter
  const calculateSummary = () => {
    const multiplier = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    }[timeFilter];

    return {
      totalSales: (salesData.reduce((sum, day) => sum + day.sales, 0) / 30 * multiplier).toFixed(2),
      totalPurchases: (salesData.reduce((sum, day) => sum + day.sales * 0.6, 0) / 30 * multiplier).toFixed(2),
      purchaseDue: (Math.random() * 5000 + 1000).toFixed(2),
      invoiceDue: (Math.random() * 8000 + 2000).toFixed(2),
      expenses: (salesData.reduce((sum, day) => sum + day.sales * 0.3, 0) / 30 * multiplier).toFixed(2)
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
            backgroundColor: params.value === 'Completed' ? colors.greenAccent[500] :
                          params.value === 'Pending' ? colors.blueAccent[500] :
                          colors.redAccent[500],
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h3" fontWeight="bold">
          Point of Sale Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <Avatar sx={{ backgroundColor: colors.blueAccent[500] }}>OP</Avatar>
        </Box>
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
          <Button variant="outlined" startIcon={<Refresh />}>
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
          <Card sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.totalSales}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: colors.greenAccent[500], mr: 1 }} />
                <Typography variant="body2" color={colors.greenAccent[500]}>
                  +12% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Purchases
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.totalPurchases}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: colors.greenAccent[500], mr: 1 }} />
                <Typography variant="body2" color={colors.greenAccent[500]}>
                  +8% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Purchase Due
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.purchaseDue}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: colors.redAccent[500], mr: 1 }} />
                <Typography variant="body2" color={colors.redAccent[500]}>
                  +5% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Invoice Due
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.invoiceDue}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: colors.greenAccent[500], mr: 1 }} />
                <Typography variant="body2" color={colors.greenAccent[500]}>
                  +15% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Expenses
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.expenses}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ color: colors.redAccent[500], mr: 1 }} />
                <Typography variant="body2" color={colors.redAccent[500]}>
                  +3% from last {timeFilter}
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
              <Typography variant="h6">Sales Trend (Last 30 Days)</Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>View</InputLabel>
                <Select
                  value="sales"
                  label="View"
                  onChange={() => {}}
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
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[700]} />
                  <XAxis dataKey="date" stroke={colors.grey[100]} />
                  <YAxis stroke={colors.grey[100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke={colors.blueAccent[500]}
                    activeDot={{ r: 8 }}
                    name="Sales ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke={colors.greenAccent[500]}
                    name="Customers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Top Products Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Top Selling Products</Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts.slice(0, 5)}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[700]} />
                  <XAxis type="number" stroke={colors.grey[100]} />
                  <YAxis dataKey="name" type="category" width={80} stroke={colors.grey[100]} />
                  <Tooltip />
                  <Bar dataKey="sales" fill={colors.blueAccent[500]} name="Sales (units)" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
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
              <Button size="small" startIcon={<Add />}>New Sale</Button>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={recentTransactions}
                columns={transactionColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  '& .MuiDataGrid-root': {
                    border: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: 'none',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: 'none',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: colors.primary[400],
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[700],
                  },
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Inventory Alerts */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={2}>Inventory Alerts</Typography>
            {inventoryAlerts.length > 0 ? (
              inventoryAlerts.map((item) => (
                <Box key={item.id} mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">{item.product}</Typography>
                    <Typography color={colors.redAccent[500]}>
                      {item.currentStock} / {item.threshold}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">{item.category}</Typography>
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button size="small" variant="outlined">Reorder</Button>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))
            ) : (
              <Typography color="textSecondary">No inventory alerts</Typography>
            )}
          </Card>

          {/* Quick Actions */}
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Quick Actions</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<PointOfSale />} sx={{ mb: 1 }}>
                  New Sale
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<ShoppingCart />} sx={{ mb: 1 }}>
                  New Order
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<Receipt />} sx={{ mb: 1 }}>
                  Invoices
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<Payment />} sx={{ mb: 1 }}>
                  Payments
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<Inventory />}>
                  Inventory
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<People />}>
                  Customers
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSDashboard;