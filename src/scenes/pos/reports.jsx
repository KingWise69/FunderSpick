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
  Chip,
  Avatar,
  Collapse,
  Tooltip as MuiTooltip
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
  Refresh,
  AttachMoney,
  CreditCard,
  PhoneAndroid,
  AccountBalance,
  ExpandMore,
  ExpandLess,
  Info
} from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data (in a real app, this would come from your API/database)
const sampleData = {
  products: {
    1: { id: 1, name: 'Fanta 500ml', category: 'Beverages', price: 1500, cost: 600, image: '/assets/fanta.jpg' },
    2: { id: 2, name: 'Heineken Beer', category: 'Alcohol', price: 5000, cost: 3000, image: '/assets/Heineken.png' },
    3: { id: 3, name: 'Chicken Pizza', category: 'Food', price: 5000, cost: 2500, image: '/assets/pizza.jpeg' },
    4: { id: 4, name: 'Veggie Burger', category: 'Food', price: 4000, cost: 2400, image: '/assets/veggie.jpg' },
    5: { id: 5, name: 'Mineral Water', category: 'Beverages', price: 2000, cost: 1000, image: '/assets/water.jpg' }
  },
  employees: {
    1: { id: 1, name: 'Moses Ikuntabam', position: 'Manager', image: '/assets/moses.jpg' },
    2: { id: 2, name: 'Jane Tumulinda', position: 'Cashier', image: '/assets/jane.jpg' },
    3: { id: 3, name: 'Ivan Semakula', position: 'Waiter', image: '/assets/ivan.jpg' }
  },
  sales: [
    { 
      id: 1, 
      date: '2025-06-01', 
      time: '14:30', 
      employeeId: 1, 
      total: 1250000, 
      items: [
        { productId: 2, quantity: 3, price: 5000 },
        { productId: 3, quantity: 2, price: 5000 },
        { productId: 5, quantity: 4, price: 2000 }
      ],
      paymentType: 'Cash',
      discount: 0
    },
     { 
      id: 1, 
      date: '2025-06-01', 
      time: '12:30', 
      employeeId: 2, 
      total: 1350000, 
      items: [
        { productId: 2, quantity: 3, price: 5000 },
        { productId: 3, quantity: 2, price: 5000 },
        { productId: 5, quantity: 4, price: 2000 }
      ],
      paymentType: 'Mobile Money',
      discount: 0
    },
    // More sales data...
  ]
};

// Generate more detailed reports data based on sample data
const generateReportData = () => {
  // Product performance with more details
  const productPerformance = Object.values(sampleData.products).map(product => {
    const salesForProduct = sampleData.sales.flatMap(sale => 
      sale.items.filter(item => item.productId === product.id)
    );
    const totalSold = salesForProduct.reduce((sum, item) => sum + item.quantity, 0);
    const revenue = salesForProduct.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const cost = salesForProduct.reduce((sum, item) => sum + (item.quantity * product.cost), 0);
    const profit = revenue - cost;
    
    return {
      ...product,
      sold: totalSold,
      revenue,
      cost,
      profit,
      profitMargin: revenue > 0 ? (profit / revenue) * 100 : 0
    };
  });

  // Employee performance with product details
  const employeePerformance = Object.values(sampleData.employees).map(employee => {
    const employeeSales = sampleData.sales.filter(sale => sale.employeeId === employee.id);
    const totalSales = employeeSales.reduce((sum, sale) => sum + sale.total, 0);
    const transactions = employeeSales.length;
    
    // Get product details for each employee
    const productsSold = {};
    employeeSales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productsSold[item.productId]) {
          productsSold[item.productId] = {
            ...sampleData.products[item.productId],
            quantity: 0,
            revenue: 0
          };
        }
        productsSold[item.productId].quantity += item.quantity;
        productsSold[item.productId].revenue += item.quantity * item.price;
      });
    });
    
    return {
      ...employee,
      sales: totalSales,
      transactions,
      avgTicket: transactions > 0 ? totalSales / transactions : 0,
      productsSold: Object.values(productsSold)
    };
  });

  // Sales data grouped by date
  const salesByDate = sampleData.sales.reduce((acc, sale) => {
    const date = sale.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        sales: 0,
        transactions: 0,
        refunds: 0,
        itemsSold: 0
      };
    }
    acc[date].sales += sale.total;
    acc[date].transactions += 1;
    acc[date].itemsSold += sale.items.reduce((sum, item) => sum + item.quantity, 0);
    return acc;
  }, {});

  const salesData = Object.values(salesByDate);

  // Payment types
  const paymentTypes = sampleData.sales.reduce((acc, sale) => {
    const type = sale.paymentType;
    if (!acc[type]) {
      acc[type] = { name: type, value: 0, amount: 0 };
    }
    acc[type].value += 1;
    acc[type].amount += sale.total;
    return acc;
  }, {});

  // Calculate percentages
  const totalTransactions = sampleData.sales.length;
  const totalAmount = sampleData.sales.reduce((sum, sale) => sum + sale.total, 0);
  Object.values(paymentTypes).forEach(pt => {
    pt.percentage = (pt.value / totalTransactions) * 100;
    pt.amountPercentage = (pt.amount / totalAmount) * 100;
  });

  return {
    salesData,
    productPerformance,
    employeePerformance,
    paymentTypes: Object.values(paymentTypes),
    totalSales: totalAmount,
    totalTransactions
  };
};

const reportData = generateReportData();

// Payment type icons
const paymentIcons = {
  Cash: <AttachMoney />,
  'Credit Card': <CreditCard />,
  'Mobile Money': <PhoneAndroid />,
  'Bank Transfer': <AccountBalance />
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportsPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState('week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [filteredData, setFilteredData] = useState(reportData);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const applyFilters = () => {
    let filteredSales = [...reportData.salesData];
    let filteredProducts = [...reportData.productPerformance];
    let filteredEmployees = [...reportData.employeePerformance];
    let filteredPayments = [...reportData.paymentTypes];

    // Apply employee filter if not 'all'
    if (employeeFilter !== 'all') {
      const empId = parseInt(employeeFilter);
      filteredEmployees = filteredEmployees.filter(emp => emp.id === empId);
      
      // Filter sales data for this employee
      filteredSales = filteredSales.filter(sale => {
        const salesForDate = sampleData.sales.filter(
          s => s.date === sale.date && s.employeeId === empId
        );
        return salesForDate.length > 0;
      });
    }

    // Apply category filter if not 'all'
    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply date range filter if custom dates are selected
    if (dateRange === 'custom' && startDate && endDate) {
      filteredSales = filteredSales.filter(sale => 
        sale.date >= startDate && sale.date <= endDate
      );
    }

    // Recalculate totals based on filtered data
    const totalFilteredSales = filteredSales.reduce((sum, sale) => sum + sale.sales, 0);
    const totalFilteredTransactions = filteredSales.reduce((sum, sale) => sum + sale.transactions, 0);

    setFilteredData({
      salesData: filteredSales,
      productPerformance: filteredProducts,
      employeePerformance: filteredEmployees,
      paymentTypes: filteredPayments,
      totalSales: totalFilteredSales,
      totalTransactions: totalFilteredTransactions
    });
  };

  const resetFilters = () => {
    setDateRange('week');
    setStartDate('');
    setEndDate('');
    setEmployeeFilter('all');
    setCategoryFilter('all');
    setFilteredData(reportData);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const toggleEmployeeExpand = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">POS Reports Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<GridOnIcon sx={{ color: '#4CAF50' }} />}
            sx={{ color: '#4CAF50', borderColor: '#4CAF50' }}
          >
            Export Excel
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<PictureAsPdfIcon sx={{ color: '#f44336' }} />}
            sx={{ color: '#f44336', borderColor: '#f44336' }}
          >
            Export PDF
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Print sx={{ color: '#2196F3' }} />}
            sx={{ color: '#2196F3', borderColor: '#2196F3' }}
          >
            Print Report
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterList sx={{ mr: 1 }} /> Report Filters
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            {/* Date Range Filter */}
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
            
            {/* Custom Date Range Fields */}
            {dateRange === 'custom' && (
              <>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
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
            
            {/* Employee Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  label="Employee"
                >
                  <MenuItem value="all">All Employees</MenuItem>
                  {Object.values(sampleData.employees).map(employee => (
                    <MenuItem key={employee.id} value={employee.id.toString()}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Category Filter */}
            <Grid item xs={12} md={2}>
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
            
            {/* Action Buttons */}
            <Grid item xs={12} md={3} sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<FilterList />}
                onClick={applyFilters}
                sx={{ height: '56px' }}
              >
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Refresh />}
                onClick={resetFilters}
                sx={{ height: '56px' }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          
          {/* Filter Summary */}
          <Box sx={{ mt: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>Current Filters:</strong> 
              {dateRange !== 'custom' ? ` ${dateRange}` : ` ${startDate} to ${endDate}`}
              {employeeFilter !== 'all' ? ` | Employee: ${sampleData.employees[employeeFilter]?.name || ''}` : ''}
              {categoryFilter !== 'all' ? ` | Category: ${categoryFilter}` : ''}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sales
                <MuiTooltip title="Total revenue from all transactions">
                  <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                </MuiTooltip>
              </Typography>
              <Typography variant="h4">
                {formatCurrency(filteredData.totalSales)}
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
                <MuiTooltip title="Total number of completed sales">
                  <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                </MuiTooltip>
              </Typography>
              <Typography variant="h4">{filteredData.totalTransactions}</Typography>
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
                <MuiTooltip title="Average amount per transaction">
                  <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                </MuiTooltip>
              </Typography>
              <Typography variant="h4">
                {formatCurrency(filteredData.totalTransactions > 0 
                  ? filteredData.totalSales / filteredData.totalTransactions 
                  : 0
                )}
              </Typography>
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
                Items Sold
                <MuiTooltip title="Total quantity of all products sold">
                  <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                </MuiTooltip>
              </Typography>
              <Typography variant="h4">
                {filteredData.salesData.reduce((sum, sale) => sum + sale.itemsSold, 0)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" color="#4caf50">
                  +5.2% from last period
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
            <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
              <Tab label="Sales Summary" icon={<Receipt />} iconPosition="start" />
              <Tab label="Product Performance" icon={<Inventory />} iconPosition="start" />
              <Tab label="Employee Sales" icon={<People />} iconPosition="start" />
              <Tab label="Payment Methods" icon={<LocalAtm />} iconPosition="start" />
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
                <Typography variant="h6" gutterBottom>
                  Sales Trend
                  <MuiTooltip title="Daily sales performance over time">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'Sales') return [formatCurrency(value), name];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                      <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Sales by Hour
                  <MuiTooltip title="Peak business hours analysis">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { hour: '10 AM', sales: 120000, transactions: 8 },
                      { hour: '12 PM', sales: 450000, transactions: 22 },
                      { hour: '2 PM', sales: 320000, transactions: 18 },
                      { hour: '4 PM', sales: 280000, transactions: 15 },
                      { hour: '6 PM', sales: 510000, transactions: 28 },
                      { hour: '8 PM', sales: 390000, transactions: 21 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'Sales') return [formatCurrency(value), name];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                      <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Detailed Sales Report
                  <MuiTooltip title="Daily breakdown of sales metrics">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Sales</TableCell>
                        <TableCell align="right">Transactions</TableCell>
                        <TableCell align="right">Items Sold</TableCell>
                        <TableCell align="right">Avg. Items per Sale</TableCell>
                        <TableCell align="right">Avg. Ticket</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.salesData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell align="right">{formatCurrency(row.sales)}</TableCell>
                          <TableCell align="right">{row.transactions}</TableCell>
                          <TableCell align="right">{row.itemsSold}</TableCell>
                          <TableCell align="right">
                            {(row.itemsSold / row.transactions).toFixed(1)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(row.sales / row.transactions)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredData.salesData.length > 1 && (
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right">
                            <strong>{formatCurrency(filteredData.totalSales)}</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>{filteredData.totalTransactions}</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {filteredData.salesData.reduce((sum, sale) => sum + sale.itemsSold, 0)}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {(
                                filteredData.salesData.reduce((sum, sale) => sum + sale.itemsSold, 0) / 
                                filteredData.totalTransactions
                              ).toFixed(1)}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatCurrency(filteredData.totalSales / filteredData.totalTransactions)}
                            </strong>
                          </TableCell>
                        </TableRow>
                      )}
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
                <Typography variant="h6" gutterBottom>
                  Product Performance
                  <MuiTooltip title="Detailed performance metrics for each product">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <Box sx={{ height: 400 }}>
                  <DataGrid
                    rows={filteredData.productPerformance}
                    columns={[
                      { 
                        field: 'name', 
                        headerName: 'Product', 
                        width: 200,
                        renderCell: (params) => (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={params.row.image} 
                              alt={params.row.name}
                              sx={{ width: 30, height: 30, mr: 2 }}
                            />
                            {params.row.name}
                          </Box>
                        )
                      },
                      { field: 'category', headerName: 'Category', width: 120 },
                      { 
                        field: 'price', 
                        headerName: 'Price', 
                        width: 120,
                        valueFormatter: (params) => formatCurrency(params.value)
                      },
                      { 
                        field: 'sold', 
                        headerName: 'Qty Sold', 
                        width: 100,
                        renderCell: (params) => (
                          <Box sx={{ fontWeight: 'bold' }}>{params.value}</Box>
                        )
                      },
                      { 
                        field: 'revenue', 
                        headerName: 'Revenue', 
                        width: 150, 
                        valueFormatter: (params) => formatCurrency(params.value)
                      },
                      { 
                        field: 'profit', 
                        headerName: 'Profit', 
                        width: 150, 
                        valueFormatter: (params) => formatCurrency(params.value)
                      },
                      { 
                        field: 'profitMargin', 
                        headerName: 'Margin', 
                        width: 100,
                        valueFormatter: (params) => formatPercentage(params.value),
                        renderCell: (params) => (
                          <Chip 
                            label={formatPercentage(params.value)} 
                            size="small" 
                            color={params.value > 30 ? 'success' : params.value > 20 ? 'warning' : 'error'}
                            variant="outlined"
                          />
                        )
                      },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Sales by Category
                  <MuiTooltip title="Revenue distribution across product categories">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
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
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value}% (${formatCurrency(value * filteredData.totalSales / 100)})`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Product Sales Details
                  <MuiTooltip title="Detailed breakdown of product sales">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Qty Sold</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Cost of Goods</TableCell>
                        <TableCell align="right">Profit</TableCell>
                        <TableCell align="right">Profit Margin</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.productPerformance.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={product.image} 
                                alt={product.name}
                                sx={{ width: 30, height: 30, mr: 2 }}
                              />
                              {product.name}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.cost)}</TableCell>
                          <TableCell align="right">{product.sold}</TableCell>
                          <TableCell align="right">{formatCurrency(product.revenue)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.cost * product.sold)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.profit)}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={formatPercentage(product.profitMargin)} 
                              size="small" 
                              color={product.profitMargin > 30 ? 'success' : product.profitMargin > 20 ? 'warning' : 'error'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredData.productPerformance.length > 1 && (
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">
                            <strong>
                              {filteredData.productPerformance.reduce((sum, p) => sum + p.sold, 0)}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatCurrency(
                                filteredData.productPerformance.reduce((sum, p) => sum + p.revenue, 0)
                              )}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatCurrency(
                                filteredData.productPerformance.reduce((sum, p) => sum + (p.cost * p.sold), 0)
                              )}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatCurrency(
                                filteredData.productPerformance.reduce((sum, p) => sum + p.profit, 0)
                              )}
                            </strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatPercentage(
                                (filteredData.productPerformance.reduce((sum, p) => sum + p.profit, 0) /
                                filteredData.productPerformance.reduce((sum, p) => sum + p.revenue, 0) )* 100
                              )}
                            </strong>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}

          {/* Employee Sales Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Employee Sales Performance
                  <MuiTooltip title="Detailed sales metrics for each employee">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell align="right">Position</TableCell>
                        <TableCell align="right">Total Sales</TableCell>
                        <TableCell align="right">Transactions</TableCell>
                        <TableCell align="right">Avg. Ticket</TableCell>
                        <TableCell align="right">% of Total Sales</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.employeePerformance.map((employee) => (
                        <React.Fragment key={employee.id}>
                          <TableRow>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  src={employee.image} 
                                  alt={employee.name}
                                  sx={{ width: 30, height: 30, mr: 2 }}
                                />
                                {employee.name}
                              </Box>
                            </TableCell>
                            <TableCell align="right">{employee.position}</TableCell>
                            <TableCell align="right">{formatCurrency(employee.sales)}</TableCell>
                            <TableCell align="right">{employee.transactions}</TableCell>
                            <TableCell align="right">
                              {formatCurrency(employee.avgTicket)}
                            </TableCell>
                            <TableCell align="right">
                              {formatPercentage(
                                (employee.sales / filteredData.totalSales) * 100
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton 
                                onClick={() => toggleEmployeeExpand(employee.id)}
                                size="small"
                              >
                                {expandedEmployee === employee.id ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={7} sx={{ p: 0 }}>
                              <Collapse in={expandedEmployee === employee.id} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                                  <Typography variant="subtitle1" gutterBottom>
                                    Products Sold by {employee.name}
                                  </Typography>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Revenue</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {employee.productsSold.map((product) => (
                                        <TableRow key={product.id}>
                                          <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Avatar 
                                                src={product.image} 
                                                alt={product.name}
                                                sx={{ width: 30, height: 30, mr: 2 }}
                                              />
                                              {product.name}
                                            </Box>
                                          </TableCell>
                                          <TableCell align="right">{product.category}</TableCell>
                                          <TableCell align="right">
                                            {formatCurrency(product.price)}
                                          </TableCell>
                                          <TableCell align="right">{product.quantity}</TableCell>
                                          <TableCell align="right">
                                            {formatCurrency(product.revenue)}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                      <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                        <TableCell colSpan={3}><strong>Total</strong></TableCell>
                                        <TableCell align="right">
                                          <strong>
                                            {employee.productsSold.reduce((sum, p) => sum + p.quantity, 0)}
                                          </strong>
                                        </TableCell>
                                        <TableCell align="right">
                                          <strong>
                                            {formatCurrency(
                                              employee.productsSold.reduce((sum, p) => sum + p.revenue, 0)
                                            )}
                                          </strong>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                      {filteredData.employeePerformance.length > 1 && (
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>Total</strong></TableCell>
                          <TableCell align="right"></TableCell>
                          <TableCell align="right">
                            <strong>{formatCurrency(filteredData.totalSales)}</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>{filteredData.totalTransactions}</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>
                              {formatCurrency(filteredData.totalSales / filteredData.totalTransactions)}
                            </strong>
                          </TableCell>
                          <TableCell align="right"><strong>100%</strong></TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Sales Distribution by Employee
                  <MuiTooltip title="Percentage of total sales by each employee">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={filteredData.employeePerformance.map(emp => ({
                          ...emp,
                          value: (emp.sales / filteredData.totalSales) * 100
                        }))}
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
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value.toFixed(1)}% (${formatCurrency(props.payload.sales)})`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Employee Sales Trend
                  <MuiTooltip title="Comparison of employee performance over time">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { date: 'Mon', 'Moses Ikuntabam': 120000, 'Jane Tumulinda': 180000, 'Ivan Semakula': 90000 },
                        { date: 'Tue', 'Moses Ikuntabam': 150000, 'Jane Tumulinda': 200000, 'Ivan Semakula': 110000 },
                        { date: 'Wed', 'Moses Ikuntabam': 180000, 'Jane Tumulinda': 220000, 'Ivan Semakula': 130000 },
                        { date: 'Thu', 'Moses Ikuntabam': 200000, 'Jane Tumulinda': 250000, 'Ivan Semakula': 150000 },
                        { date: 'Fri', 'Moses Ikuntabam': 250000, 'Jane Tumulinda': 300000, 'Ivan Semakula': 180000 },
                        { date: 'Sat', 'Moses Ikuntabam': 300000, 'Jane Tumulinda': 350000, 'Ivan Semakula': 200000 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Sales']} />
                      <Legend />
                      <Bar dataKey="Moses Ikuntabam" fill="#8884d8" />
                      <Bar dataKey="Jane Tumulinda" fill="#82ca9d" />
                      <Bar dataKey="Ivan Semakula" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Payment Method Distribution
                  <MuiTooltip title="Percentage of transactions by payment method">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
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
                        dataKey="percentage"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {filteredData.paymentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value.toFixed(1)}% (${props.payload.value} transactions)`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Payment Amount Distribution
                  <MuiTooltip title="Percentage of total sales amount by payment method">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
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
                        dataKey="amountPercentage"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {filteredData.paymentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value.toFixed(1)}% (${formatCurrency(props.payload.amount)})`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Payment Method Details
                  <MuiTooltip title="Detailed breakdown of payment methods used">
                    <Info sx={{ fontSize: 16, ml: 1, color: 'action.active' }} />
                  </MuiTooltip>
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Transactions</TableCell>
                        <TableCell align="right">% of Transactions</TableCell>
                        <TableCell align="right">Total Amount</TableCell>
                        <TableCell align="right">% of Total Sales</TableCell>
                        <TableCell align="right">Avg. Transaction</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.paymentTypes.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {paymentIcons[row.name]}
                              <Box sx={{ ml: 1 }}>{row.name}</Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                          <TableCell align="right">{formatPercentage(row.percentage)}</TableCell>
                          <TableCell align="right">{formatCurrency(row.amount)}</TableCell>
                          <TableCell align="right">{formatPercentage(row.amountPercentage)}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(row.amount / row.value)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell><strong>Total</strong></TableCell>
                        <TableCell align="right">
                          <strong>{filteredData.totalTransactions}</strong>
                        </TableCell>
                        <TableCell align="right"><strong>100%</strong></TableCell>
                        <TableCell align="right">
                          <strong>{formatCurrency(filteredData.totalSales)}</strong>
                        </TableCell>
                        <TableCell align="right"><strong>100%</strong></TableCell>
                        <TableCell align="right">
                          <strong>
                            {formatCurrency(filteredData.totalSales / filteredData.totalTransactions)}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;