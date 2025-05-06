import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge
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
  MoneyOff,
  Description,
  Money,
  LocalAtm,
  Schedule,
  DoneAll,
  Warning,
  Error
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
    const cogs = Math.floor(revenue * 0.4 * (0.9 + Math.random() * 0.2)); // Cost of goods sold
    const expenses = Math.floor(Math.random() * 6000 * multipliers) + 3000 * multipliers;
    const profit = revenue - expenses - cogs;
    const cashFlow = profit + Math.floor(Math.random() * 2000 * multipliers) - 1000 * multipliers;

    data.push({
      date: dateLabel,
      revenue,
      cogs,
      grossProfit: revenue - cogs,
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

const generateInvoicesOwed = () => {
  const statuses = ['Paid', 'Overdue', 'Pending'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `INV-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    amount: (Math.random() * 5000 + 1000).toFixed(2),
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    daysOverdue: Math.floor(Math.random() * 30)
  }));
};

const generateBillsToPay = () => {
  const statuses = ['Paid', 'Overdue', 'Pending'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: `BILL-${2000 + i}`,
    vendor: `Vendor ${i + 1}`,
    amount: (Math.random() * 3000 + 500).toFixed(2),
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    daysUntilDue: Math.floor(Math.random() * 30)
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
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [financialData, setFinancialData] = useState([]);
  const [accountBalances, setAccountBalances] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [invoicesOwed, setInvoicesOwed] = useState([]);
  const [billsToPay, setBillsToPay] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [chartView, setChartView] = useState('profit');
  const [activeTab, setActiveTab] = useState('overview');

  // Generate mock data based on time filter
  useEffect(() => {
    setFinancialData(generateFinancialData(timeFilter));
    setAccountBalances(generateAccountBalances());
    setRecentTransactions(generateRecentTransactions());
    setInvoicesOwed(generateInvoicesOwed());
    setBillsToPay(generateBillsToPay());
    setBudgetData(generateBudgetData());
  }, [timeFilter]);

  // Calculate summary metrics
  const calculateSummary = () => {
    const latest = financialData[financialData.length - 1] || {};
    const previous = financialData[financialData.length - 2] || {};
    
    const totalInvoicesOwed = invoicesOwed
      .filter(inv => inv.status !== 'Paid')
      .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
      
    const totalBillsToPay = billsToPay
      .filter(bill => bill.status !== 'Paid')
      .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
    
    return {
      totalAssets: accountBalances.reduce((sum, acc) => sum + Math.max(0, acc.balance), 0),
      totalLiabilities: accountBalances.reduce((sum, acc) => sum + Math.min(0, acc.balance), 0),
      netWorth: accountBalances.reduce((sum, acc) => sum + acc.balance, 0),
      revenue: latest.revenue || 0,
      revenueChange: latest.revenue && previous.revenue 
        ? ((latest.revenue - previous.revenue) / previous.revenue * 100).toFixed(1)
        : 0,
      cogs: latest.cogs || 0,
      cogsChange: latest.cogs && previous.cogs
        ? ((latest.cogs - previous.cogs) / previous.cogs * 100).toFixed(1)
        : 0,
      grossProfit: latest.grossProfit || 0,
      grossProfitChange: latest.grossProfit && previous.grossProfit
        ? ((latest.grossProfit - previous.grossProfit) / previous.grossProfit * 100).toFixed(1)
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
        : 0,
      accountsReceivable: latest.accountsReceivable || 0,
      accountsPayable: latest.accountsPayable || 0,
      totalInvoicesOwed,
      totalBillsToPay,
      overdueInvoices: invoicesOwed.filter(inv => inv.status === 'Overdue').length,
      overdueBills: billsToPay.filter(bill => bill.status === 'Overdue').length
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

  // Columns for invoices owed
  const invoiceColumns = [
    { field: 'id', headerName: 'Invoice #', width: 100 },
    { field: 'customer', headerName: 'Customer', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 120,
      renderCell: (params) => (
        <Typography fontWeight="bold">
          ${params.value}
        </Typography>
      )
    },
    { field: 'dueDate', headerName: 'Due Date', width: 120 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'Paid' ? 'success' :
            params.value === 'Overdue' ? 'error' : 'warning'
          }
        />
      )
    },
    { field: 'daysOverdue', headerName: 'Days', width: 80,
      renderCell: (params) => (
        params.row.status === 'Overdue' ? (
          <Typography color="error">
            {params.value}d
          </Typography>
        ) : null
      )
    }
  ];

  // Columns for bills to pay
  const billsColumns = [
    { field: 'id', headerName: 'Bill #', width: 100 },
    { field: 'vendor', headerName: 'Vendor', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 120,
      renderCell: (params) => (
        <Typography fontWeight="bold" color="error">
          ${params.value}
        </Typography>
      )
    },
    { field: 'dueDate', headerName: 'Due Date', width: 120 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'Paid' ? 'success' :
            params.value === 'Overdue' ? 'error' : 'warning'
          }
        />
      )
    },
    { field: 'daysUntilDue', headerName: 'Due In', width: 80,
      renderCell: (params) => (
        params.row.status === 'Pending' ? (
          <Typography color={params.value <= 7 ? 'error' : 'inherit'}>
            {params.value}d
          </Typography>
        ) : null
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

      {/* Summary Cards - Top Row */}
      <Grid container spacing={3} mb={3}>
        {/* Net Worth */}
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

        {/* Revenue */}
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

        {/* Gross Profit */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <RequestQuote color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Gross Profit</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color={summary.grossProfit >= 0 ? 'inherit' : 'error'}>
                UGX{Math.abs(summary.grossProfit).toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {summary.grossProfitChange >= 0 ? (
                  <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
                )}
                <Typography variant="body2" color={summary.grossProfitChange >= 0 ? '#4caf50' : '#f44336'}>
                  {summary.grossProfitChange >= 0 ? '+' : ''}{summary.grossProfitChange}% from last {timeFilter}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                Margin: {(summary.grossProfit / summary.revenue * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Net Profit */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <RequestQuote color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Net Profit</Typography>
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
              <Typography variant="caption" color="textSecondary">
                Margin: {(summary.profit / summary.revenue * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Cards - Second Row */}
      <Grid container spacing={3} mb={3}>
        {/* Invoices Owed */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Description color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Invoices Owed</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.totalInvoicesOwed.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Box display="flex" alignItems="center" mr={2}>
                  <Error color="error" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="error">
                    {summary.overdueInvoices} overdue
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Schedule color="warning" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="textSecondary">
                    {invoicesOwed.filter(inv => inv.status === 'Pending').length} pending
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bills to Pay */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Payment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Bills to Pay</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="error">
                UGX{summary.totalBillsToPay.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Box display="flex" alignItems="center" mr={2}>
                  <Error color="error" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="error">
                    {summary.overdueBills} overdue
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Schedule color="warning" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="textSecondary">
                    {billsToPay.filter(bill => bill.status === 'Pending').length} pending
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Accounts Receivable */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <LocalAtm color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Accounts Receivable</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                UGX{summary.accountsReceivable.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary">
                  {summary.totalInvoicesOwed > 0 ? (
                    <span>{Math.round(summary.totalInvoicesOwed / summary.accountsReceivable * 100)}% from open invoices</span>
                  ) : 'No open invoices'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Accounts Payable */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <MoneyOff color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="textSecondary">Accounts Payable</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="error">
                UGX{summary.accountsPayable.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary">
                  {summary.totalBillsToPay > 0 ? (
                    <span>{Math.round(summary.totalBillsToPay / summary.accountsPayable * 100)}% from open bills</span>
                  ) : 'No open bills'}
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
                  <MenuItem value="profit">Net Profit</MenuItem>
                  <MenuItem value="grossProfit">Gross Profit</MenuItem>
                  <MenuItem value="revenue">Revenue</MenuItem>
                  <MenuItem value="cogs">COGS</MenuItem>
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
                    formatter={(value) => [`$${value.toLocaleString()}`, chartView === 'cogs' ? 'COGS' : chartView.charAt(0).toUpperCase() + chartView.slice(1)]}
                  />
                  <Legend />
                  {chartView === 'profit' && (
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke={theme.palette.primary.main}
                      activeDot={{ r: 8 }}
                      name="Net Profit (UGX)"
                    />
                  )}
                  {chartView === 'grossProfit' && (
                    <Line
                      type="monotone"
                      dataKey="grossProfit"
                      stroke="#4caf50"
                      name="Gross Profit (UGX)"
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
                  {chartView === 'cogs' && (
                    <Line
                      type="monotone"
                      dataKey="cogs"
                      stroke="#f44336"
                      name="COGS (UGX)"
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
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Recent Transactions</Typography>
              <Button 
                size="small" 
                startIcon={<Add />}
                href="/pos/new_sales"
              >
                Add Transaction
              </Button>
            </Box>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={recentTransactions}
                columns={transactionColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
          </Card>
        </Grid>

        {/* Invoices Owed */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Invoices Owed</Typography>
              <Button 
                size="small" 
                startIcon={<Add />}
                href="/payment"
              >
                Create Invoice
              </Button>
            </Box>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={invoicesOwed}
                columns={invoiceColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
          </Card>
        </Grid>

        {/* Bills to Pay */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Bills to Pay</Typography>
              <Button 
                size="small" 
                startIcon={<Add />}
                href="/bills/manage"
              >
                Add Bill
              </Button>
            </Box>
            <Box sx={{ height: 300 }}>
              <DataGrid
                rows={billsToPay}
                columns={billsColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Budget vs Actual */}
      <Grid container spacing={3} mt={0}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Budget vs Actual</Typography>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
                  <Legend />
                  <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                  <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialDashboard;