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
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  AccountBalance,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Receipt,
  Payment,
  DateRange,
  Today,
  CalendarViewMonth,
  Refresh,
  FilterList,
  Add,
  ShowChart,
  PieChart,
  Assessment,
  AccountBalanceWallet,
  CreditCard,
  Savings,
  RequestQuote,
  MoneyOff
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Mock data generation functions
const generateFinancialData = (timeFilter) => {
  const data = [];
  const today = new Date();
  const periods = {
    daily: 30,
    weekly: 12,
    monthly: 12,
    yearly: 5
  }[timeFilter];

  const multipliers = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365
  }[timeFilter];

  for (let i = periods - 1; i >= 0; i--) {
    const baseDate = new Date(today);
    let dateLabel = '';
    
    if (timeFilter === 'daily') {
      baseDate.setDate(baseDate.getDate() - i);
      dateLabel = baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeFilter === 'weekly') {
      baseDate.setDate(baseDate.getDate() - i * 7);
      dateLabel = `Week ${i + 1}`;
    } else if (timeFilter === 'monthly') {
      baseDate.setMonth(baseDate.getMonth() - i);
      dateLabel = baseDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      baseDate.setFullYear(baseDate.getFullYear() - i);
      dateLabel = baseDate.toLocaleDateString('en-US', { year: 'numeric' });
    }

    const revenue = Math.floor(Math.random() * 10000 * multipliers) + 5000 * multipliers;
    const expenses = Math.floor(Math.random() * 6000 * multipliers) + 3000 * multipliers;
    const profit = revenue - expenses;
    const cashFlow = profit + Math.floor(Math.random() * 2000 * multipliers) - 1000 * multipliers;

    data.push({
      date: dateLabel,
      revenue,
      expenses,
      profit,
      cashFlow,
      accountsReceivable: Math.floor(Math.random() * 8000 * multipliers),
      accountsPayable: Math.floor(Math.random() * 5000 * multipliers)
    });
  }

  return data;
};

const generateAccountBalances = () => {
  return [
    { name: 'Operating Account', balance: 125430.87, type: 'bank' },
    { name: 'Savings Account', balance: 250000.00, type: 'bank' },
    { name: 'Credit Card', balance: -8432.50, type: 'credit' },
    { name: 'Payroll Account', balance: 45320.00, type: 'bank' },
    { name: 'Investment Account', balance: 175000.00, type: 'investment' }
  ];
};

const generateRecentTransactions = () => {
  const categories = ['Revenue', 'Expense', 'Transfer', 'Investment'];
  const statuses = ['Cleared', 'Pending', 'Reconciled'];
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    description: `Transaction ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    amount: (Math.random() * 5000 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
    account: `Account ${Math.floor(Math.random() * 5) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
};

const generateBudgetData = () => {
  return [
    { name: 'Revenue', actual: 125000, budget: 120000 },
    { name: 'COGS', actual: 45000, budget: 40000 },
    { name: 'Payroll', actual: 35000, budget: 38000 },
    { name: 'Marketing', actual: 12000, budget: 15000 },
    { name: 'Operations', actual: 18000, budget: 20000 },
    { name: 'R&D', actual: 8000, budget: 10000 }
  ];
};

const FinancialDashboard = () => {
  const theme = useTheme();
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [financialData, setFinancialData] = useState([]);
  const [accountBalances, setAccountBalances] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [chartView, setChartView] = useState('profit');
  const [activeTab, setActiveTab] = useState('overview');

  // Generate mock data based on time filter
  useEffect(() => {
    setFinancialData(generateFinancialData(timeFilter));
    setAccountBalances(generateAccountBalances());
    setRecentTransactions(generateRecentTransactions());
    setBudgetData(generateBudgetData());
  }, [timeFilter]);

  // Calculate summary metrics
  const calculateSummary = () => {
    const latest = financialData[financialData.length - 1] || {};
    const previous = financialData[financialData.length - 2] || {};
    
    return {
      totalAssets: accountBalances.reduce((sum, acc) => sum + Math.max(0, acc.balance), 0),
      totalLiabilities: accountBalances.reduce((sum, acc) => sum + Math.min(0, acc.balance), 0),
      netWorth: accountBalances.reduce((sum, acc) => sum + acc.balance, 0),
      revenue: latest.revenue || 0,
      revenueChange: latest.revenue && previous.revenue 
        ? ((latest.revenue - previous.revenue) / previous.revenue * 100).toFixed(1)
        : 0,
      expenses: latest.expenses || 0,
      expensesChange: latest.expenses && previous.expenses
        ? ((latest.expenses - previous.expenses) / previous.expenses * 100).toFixed(1)
        : 0,
      profit: latest.profit || 0,
      profitChange: latest.profit && previous.profit
        ? ((latest.profit - previous.profit) / previous.profit * 100).toFixed(1)
        : 0,
      cashFlow: latest.cashFlow || 0,
      cashFlowChange: latest.cashFlow && previous.cashFlow
        ? ((latest.cashFlow - previous.cashFlow) / previous.cashFlow * 100).toFixed(1)
        : 0
    };
  };

  const summary = calculateSummary();

  // Columns for recent transactions table
  const transactionColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120,
      renderCell: (params) => (
        <Typography color={params.value >= 0 ? theme.palette.success.main : theme.palette.error.main}>
          ${Math.abs(params.value).toLocaleString()}
        </Typography>
      )
    },
    { field: 'account', headerName: 'Account', width: 120 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'Cleared' ? 'success' :
            params.value === 'Pending' ? 'warning' : 'info'
          }
        />
      )
    }
  ];

  // Data for pie charts
  const expenseCategories = [
    { name: 'Payroll', value: 35000 },
    { name: 'Marketing', value: 12000 },
    { name: 'Operations', value: 18000 },
    { name: 'R&D', value: 8000 },
    { name: 'Other', value: 5000 }
  ];

  const revenueCategories = [
    { name: 'Product Sales', value: 85000 },
    { name: 'Services', value: 25000 },
    { name: 'Subscriptions', value: 15000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Box m="20px">
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h3" fontWeight="bold">
          Financial Management Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Overview of your company's financial health
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
            startIcon={<DateRange />}
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

      {/* Navigation Tabs */}
      <Box mb={3}>
        <Paper sx={{ display: 'flex', overflow: 'auto' }}>
          <Button 
            variant={activeTab === 'overview' ? 'contained' : 'text'} 
            onClick={() => setActiveTab('overview')}
            startIcon={<Assessment />}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'cashflow' ? 'contained' : 'text'} 
            onClick={() => setActiveTab('cashflow')}
            startIcon={<ShowChart />}
          >
            Cash Flow
          </Button>
          <Button 
            variant={activeTab === 'profitability' ? 'contained' : 'text'} 
            onClick={() => setActiveTab('profitability')}
            startIcon={<AttachMoney />}
          >
            Profitability
          </Button>
          <Button 
            variant={activeTab === 'balances' ? 'contained' : 'text'} 
            onClick={() => setActiveTab('balances')}
            startIcon={<AccountBalance />}
          >
            Balances
          </Button>
          <Button 
            variant={activeTab === 'budget' ? 'contained' : 'text'} 
            onClick={() => setActiveTab('budget')}
            startIcon={<PieChart />}
          >
            Budget
          </Button>
        </Paper>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Net Worth</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.netWorth.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {summary.netWorth >= 0 ? (
                  <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
                )}
                <Typography variant="body2" color={summary.netWorth >= 0 ? '#4caf50' : '#f44336'}>
                  {summary.netWorth >= 0 ? '+' : ''}
                  {((summary.netWorth - accountBalances.reduce((sum, acc) => sum + acc.balance * 0.9, 0)) / 
                    Math.abs(accountBalances.reduce((sum, acc) => sum + acc.balance * 0.9, 0)) * 100).toFixed(1)}% from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AttachMoney color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Revenue</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.revenue.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {summary.revenueChange >= 0 ? (
                  <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
                )}
                <Typography variant="body2" color={summary.revenueChange >= 0 ? '#4caf50' : '#f44336'}>
                  {summary.revenueChange >= 0 ? '+' : ''}{summary.revenueChange}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <MoneyOff color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Expenses</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.expenses.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {summary.expensesChange <= 0 ? (
                  <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
                )}
                <Typography variant="body2" color={summary.expensesChange <= 0 ? '#4caf50' : '#f44336'}>
                  {summary.expensesChange >= 0 ? '+' : ''}{summary.expensesChange}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <RequestQuote color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Profit</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color={summary.profit >= 0 ? 'inherit' : 'error'}>
                UGX{Math.abs(summary.profit).toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {summary.profitChange >= 0 ? (
                  <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
                )}
                <Typography variant="body2" color={summary.profitChange >= 0 ? '#4caf50' : '#f44336'}>
                  {summary.profitChange >= 0 ? '+' : ''}{summary.profitChange}% from last {timeFilter}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Financial Trends Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Financial Trends ({timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)} View)
              </Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>View</InputLabel>
                <Select
                  value={chartView}
                  label="View"
                  onChange={(e) => setChartView(e.target.value)}
                >
                  <MenuItem value="profit">Profit</MenuItem>
                  <MenuItem value="revenue">Revenue</MenuItem>
                  <MenuItem value="expenses">Expenses</MenuItem>
                  <MenuItem value="cashFlow">Cash Flow</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, chartView.charAt(0).toUpperCase() + chartView.slice(1)]}
                  />
                  <Legend />
                  {chartView === 'profit' && (
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke={theme.palette.primary.main}
                      activeDot={{ r: 8 }}
                      name="Profit (UGX)"
                    />
                  )}
                  {chartView === 'revenue' && (
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4caf50"
                      name="Revenue (UGX)"
                    />
                  )}
                  {chartView === 'expenses' && (
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#f44336"
                      name="Expenses (UGX)"
                    />
                  )}
                  {chartView === 'cashFlow' && (
                    <Line
                      type="monotone"
                      dataKey="cashFlow"
                      stroke="#ff9800"
                      name="Cash Flow (UGX)"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Account Balances */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>Account Balances</Typography>
            <Box mb={3}>
              {accountBalances.map((account) => (
                <Box key={account.name} mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      {account.type === 'bank' && <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />}
                      {account.type === 'credit' && <CreditCard color="error" sx={{ mr: 1 }} />}
                      {account.type === 'investment' && <Savings color="success" sx={{ mr: 1 }} />}
                      <Typography fontWeight="bold">{account.name}</Typography>
                    </Box>
                    <Typography color={account.balance >= 0 ? 'inherit' : 'error'}>
                      UGX{Math.abs(account.balance).toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </Box>
            <Box>
              <Typography variant="subtitle1" mb={1}>Quick Summary</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Assets</TableCell>
                      <TableCell align="right">UGX{summary.totalAssets.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Liabilities</TableCell>
                      <TableCell align="right">(UGX{Math.abs(summary.totalLiabilities).toLocaleString()})</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Net Worth</strong></TableCell>
                      <TableCell align="right">
                        <strong>UGX{summary.netWorth.toLocaleString()}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3} mt={0}>
        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Transactions</Typography>
              <Button 
                size="small" 
                startIcon={<Add />}
                href="/transactions/new"
              >
                Add Transaction
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

        {/* Financial Ratios and Budget */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={2}>Budget vs Actual</Typography>
            <Box height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`]}
                  />
                  <Legend />
                  <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                  <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>

          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Financial Ratios</Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Current Ratio</TableCell>
                    <TableCell align="right">{(summary.totalAssets / Math.abs(summary.totalLiabilities)).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Profit Margin</TableCell>
                    <TableCell align="right">{(summary.profit / summary.revenue * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Operating Margin</TableCell>
                    <TableCell align="right">{((summary.profit + 15000) / summary.revenue * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ROI</TableCell>
                    <TableCell align="right">{(summary.profit / summary.netWorth * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Financial Charts */}
      <Grid container spacing={3} mt={0}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Expense Breakdown</Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Revenue Breakdown</Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={revenueCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialDashboard;