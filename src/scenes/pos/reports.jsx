import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Chip
} from '@mui/material';
import {
  Receipt,
  LocalAtm,
  People,
  Inventory,
  TrendingUp,
  Category,
  DateRange,
  Download,
  Print,
  Email,
  Search,
  FilterList,
  Refresh
} from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample report data
const salesData = [
  { date: '2023-06-01', sales: 1250000, transactions: 84, avgTicket: 14880, refunds: 120000 },
  { date: '2023-06-02', sales: 980000, transactions: 72, avgTicket: 13611, refunds: 45000 },
  { date: '2023-06-03', sales: 1540000, transactions: 95, avgTicket: 16210, refunds: 75000 },
  { date: '2023-06-04', sales: 1120000, transactions: 68, avgTicket: 16470, refunds: 30000 },
  { date: '2023-06-05', sales: 870000, transactions: 59, avgTicket: 14745, refunds: 25000 },
];

const productPerformance = [
  { id: 1, name: 'Fanta 500ml', category: 'Beverages', sold: 125, revenue: 187500, profit: 75000 },
  { id: 2, name: 'Heineken Beer', category: 'Alcohol', sold: 89, revenue: 445000, profit: 178000 },
  { id: 3, name: 'Chicken Pizza', category: 'Food', sold: 76, revenue: 380000, profit: 190000 },
  { id: 4, name: 'Veggie Burger', category: 'Food', sold: 64, revenue: 256000, profit: 102400 },
  { id: 5, name: 'Mineral Water', category: 'Beverages', sold: 53, revenue: 106000, profit: 53000 },
];

const employeePerformance = [
  { id: 1, name: 'John Doe', sales: 785000, transactions: 52, avgTicket: 15096 },
  { id: 2, name: 'Jane Smith', sales: 920000, transactions: 61, avgTicket: 15081 },
  { id: 3, name: 'Mike Johnson', sales: 680000, transactions: 47, avgTicket: 14468 },
];

const paymentTypes = [
  { name: 'Cash', value: 45, color: '#4CAF50' },
  { name: 'Credit Card', value: 35, color: '#2196F3' },
  { name: 'Mobile Money', value: 15, color: '#FF9800' },
  { name: 'Bank Transfer', value: 5, color: '#9E9E9E' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportsPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredData, setFilteredData] = useState({
    salesData,
    productPerformance,
    employeePerformance,
    paymentTypes
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const applyFilters = () => {
    // Filter logic based on selected filters
    let filteredSales = [...salesData];
    let filteredProducts = [...productPerformance];
    let filteredEmployees = [...employeePerformance];
    let filteredPayments = [...paymentTypes];

    // Apply employee filter if not 'all'
    if (employeeFilter !== 'all') {
      filteredEmployees = filteredEmployees.filter(emp => emp.id === parseInt(employeeFilter));
    }

    // Apply category filter if not 'all'
    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === categoryFilter
      );
    }

    // Apply date range filter if custom dates are selected
    if (dateRange === 'custom' && startDate && endDate) {
      filteredSales = filteredSales.filter(sale => 
        sale.date >= startDate && sale.date <= endDate
      );
    }

    setFilteredData({
      salesData: filteredSales,
      productPerformance: filteredProducts,
      employeePerformance: filteredEmployees,
      paymentTypes: filteredPayments
    });
  };

  const resetFilters = () => {
    setDateRange('today');
    setStartDate('');
    setEndDate('');
    setEmployeeFilter('all');
    setCategoryFilter('all');
    setFilteredData({
      salesData,
      productPerformance,
      employeePerformance,
      paymentTypes
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Reports Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<GridOnIcon sx={{ color: '#4CAF50' }} />}
            sx={{ color: '#4CAF50', borderColor: '#4CAF50' }}
          >
            Excel
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<PictureAsPdfIcon sx={{ color: '#f44336' }} />}
            sx={{ color: '#f44336', borderColor: '#f44336' }}
          >
            PDF
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Print sx={{ color: '#2196F3' }} />}
            sx={{ color: '#2196F3', borderColor: '#2196F3' }}
          >
            Print
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Email sx={{ color: '#FFD700' }} />}
            sx={{ color: '#FFD700', borderColor: '#FFD700' }}
          >
            Email
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  label="Date Range"
                  startAdornment={
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {dateRange === 'custom' && (
              <>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  label="Employee"
                >
                  <MenuItem value="all">All Employees</MenuItem>
                  <MenuItem value="1">John Doe</MenuItem>
                  <MenuItem value="2">Jane Smith</MenuItem>
                  <MenuItem value="3">Mike Johnson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="beverages">Beverages</MenuItem>
                  <MenuItem value="alcohol">Alcohol</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<FilterList />}
                sx={{ height: '56px' }}
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Refresh />}
                sx={{ height: '56px' }}
                onClick={resetFilters}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4">
                {formatCurrency(5780000)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +12.5% from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Transactions
              </Typography>
              <Typography variant="h4">378</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +8.3% from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Avg. Ticket
              </Typography>
              <Typography variant="h4">{formatCurrency(15291)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +3.9% from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Refunds
              </Typography>
              <Typography variant="h4">{formatCurrency(275000)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="body2" color="#f44336">
                  +2.1% from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Reports Area */}
      <Card>
        <CardHeader
          title={
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Sales Summary" icon={<Receipt />} iconPosition="start" />
              <Tab label="Product Performance" icon={<Inventory />} iconPosition="start" />
              <Tab label="Employee Sales" icon={<People />} iconPosition="start" />
              <Tab label="Payment Types" icon={<LocalAtm />} iconPosition="start" />
              <Tab label="Inventory Reports" icon={<Category />} iconPosition="start" />
            </Tabs>
          }
          sx={{
            '.MuiCardHeader-content': {
              width: '100%'
            }
          }}
        />
        <Divider />
        <CardContent>
          {/* Sales Summary Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>Daily Sales Trend</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Sales']} />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                      <Bar dataKey="refunds" fill="#ff6b6b" name="Refunds" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Sales by Hour</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { hour: '10 AM', sales: 120000 },
                      { hour: '12 PM', sales: 450000 },
                      { hour: '2 PM', sales: 320000 },
                      { hour: '4 PM', sales: 280000 },
                      { hour: '6 PM', sales: 510000 },
                      { hour: '8 PM', sales: 390000 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Sales']} />
                      <Bar dataKey="sales" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Sales Details</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Sales</TableCell>
                        <TableCell align="right">Transactions</TableCell>
                        <TableCell align="right">Avg. Ticket</TableCell>
                        <TableCell align="right">Refunds</TableCell>
                        <TableCell align="right">Net Sales</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.salesData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell align="right">{formatCurrency(row.sales)}</TableCell>
                          <TableCell align="right">{row.transactions}</TableCell>
                          <TableCell align="right">{formatCurrency(row.avgTicket)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.refunds)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.sales - row.refunds)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}

          {/* Product Performance Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Top Selling Products</Typography>
                <Box sx={{ height: 400 }}>
                  <DataGrid
                    rows={filteredData.productPerformance}
                    columns={[
                      { field: 'name', headerName: 'Product', width: 200 },
                      { field: 'category', headerName: 'Category', width: 150 },
                      { field: 'sold', headerName: 'Qty Sold', width: 120 },
                      { field: 'revenue', headerName: 'Revenue', width: 150, valueFormatter: (params) => formatCurrency(params.value) },
                      { field: 'profit', headerName: 'Profit', width: 150, valueFormatter: (params) => formatCurrency(params.value) },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Sales by Category</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Food', value: 45 },
                          { name: 'Beverages', value: 30 },
                          { name: 'Alcohol', value: 20 },
                          { name: 'Other', value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Employee Sales Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>Employee Performance</Typography>
                <Box sx={{ height: 400 }}>
                  <DataGrid
                    rows={filteredData.employeePerformance}
                    columns={[
                      { field: 'name', headerName: 'Employee', width: 200 },
                      { field: 'sales', headerName: 'Total Sales', width: 150, valueFormatter: (params) => formatCurrency(params.value) },
                      { field: 'transactions', headerName: 'Transactions', width: 120 },
                      { field: 'avgTicket', headerName: 'Avg. Ticket', width: 150, valueFormatter: (params) => formatCurrency(params.value) },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Sales Distribution</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={filteredData.employeePerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="sales"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Sales']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Payment Types Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Payment Methods</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={filteredData.paymentTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {filteredData.paymentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Payment Details</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment Type</TableCell>
                        <TableCell align="right">Transactions</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.paymentTypes.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="right">{Math.round(row.value * 3.78)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.value * 57800)}</TableCell>
                          <TableCell align="right">{row.value}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}

          {/* Inventory Reports Tab */}
          {activeTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Low Stock Items</Typography>
                <Box sx={{ height: 400 }}>
                  <DataGrid
                    rows={[
                      { id: 1, name: 'Heineken Beer', current: 3, min: 10, category: 'Alcohol' },
                      { id: 2, name: 'Veggie Burger', current: 5, min: 15, category: 'Food' },
                      { id: 3, name: 'Mineral Water', current: 8, min: 20, category: 'Beverages' },
                      { id: 4, name: 'Chicken Wings', current: 7, min: 15, category: 'Food' },
                    ]}
                    columns={[
                      { field: 'name', headerName: 'Product', width: 200 },
                      { field: 'category', headerName: 'Category', width: 150 },
                      { field: 'current', headerName: 'Current Stock', width: 150 },
                      { field: 'min', headerName: 'Min Required', width: 150 },
                      { 
                        field: 'status', 
                        headerName: 'Status', 
                        width: 150,
                        renderCell: (params) => (
                          <Chip 
                            label="Low Stock" 
                            color="error" 
                            size="small" 
                          />
                        )
                      },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Stock Movement</Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Fanta', received: 120, sold: 115 },
                        { name: 'Heineken', received: 80, sold: 89 },
                        { name: 'Pizza', received: 50, sold: 45 },
                        { name: 'Burger', received: 60, sold: 58 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="received" fill="#8884d8" name="Received" />
                      <Bar dataKey="sold" fill="#82ca9d" name="Sold" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;