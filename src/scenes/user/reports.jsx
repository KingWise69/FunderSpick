import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CardActions, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileExcelIcon from '@mui/icons-material/InsertDriveFile';
import FilePdfIcon from '@mui/icons-material/PictureAsPdf';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ExcelExport, PDFExport } from './Export'; // Assuming export components
import { LineChart, BarChart, PieChart, Line, Bar, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 

const ReportsPage = () => {
  const [reportsData, setReportsData] = useState([
    { id: 1, name: 'Sales Report', totalSales: 50000, totalLeads: 300, dateRange: 'Jan 2025' },
    { id: 2, name: 'Customer Report', totalCustomers: 1200, newCustomers: 200, dateRange: 'Feb 2025' },
    { id: 3, name: 'Lead Report', totalLeads: 600, closedLeads: 150, dateRange: 'Mar 2025' },
    { id: 4, name: 'Product Report', totalProducts: 150, soldProducts: 80, dateRange: 'Apr 2025' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [newReport, setNewReport] = useState({ name: '', totalSales: 0, totalLeads: 0, dateRange: '' });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleAddReport = () => {
    setReportsData([...reportsData, { id: reportsData.length + 1, ...newReport }]);
    setOpenDialog(false);
    setNewReport({ name: '', totalSales: 0, totalLeads: 0, dateRange: '' });
  };

  const handleDeleteReport = (id) => {
    setReportsData(reportsData.filter((report) => report.id !== id));
  };

  const handleReportEdit = (id) => {
    const reportToEdit = reportsData.find((report) => report.id === id);
    setNewReport(reportToEdit);
    setOpenDialog(true);
  };

  const filteredReports = reportsData.filter(
    (report) => report.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'All' || report.dateRange === filter)
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reports Overview</Typography>
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            color="success"
            startIcon={<FileExcelIcon />}
            sx={{ mr: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
          >
            Excel
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<FilePdfIcon />}
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
          >
            PDF
          </Button>
        </Box>
      </Box>

      {/* Filter Section */}
      <Box display="flex" mb={2} justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <TextField
          label="Search Report"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: '200px', mr: 2 }}
        />
        <Select value={filter} onChange={handleFilterChange} sx={{ minWidth: '200px' }}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Jan 2025">Jan 2025</MenuItem>
          <MenuItem value="Feb 2025">Feb 2025</MenuItem>
          <MenuItem value="Mar 2025">Mar 2025</MenuItem>
          <MenuItem value="Apr 2025">Apr 2025</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: '#7c4dff', '&:hover': { backgroundColor: '#5e35b1' } }}
        >
          Add Report
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">Total Sales</Typography>
              <Typography variant="h6">$500,000</Typography>
            </CardContent>
            <CardActions>
              <IconButton sx={{ color: 'white' }}>
                <BarChartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f44336', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">Total Leads</Typography>
              <Typography variant="h6">1,500</Typography>
            </CardContent>
            <CardActions>
              <IconButton sx={{ color: 'white' }}>
                <PieChartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">Total Customers</Typography>
              <Typography variant="h6">2,500</Typography>
            </CardContent>
            <CardActions>
              <IconButton sx={{ color: 'white' }}>
                <BarChartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#9c27b0', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">New Customers</Typography>
              <Typography variant="h6">300</Typography>
            </CardContent>
            <CardActions>
              <IconButton sx={{ color: 'white' }}>
                <PieChartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Report Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Name</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Total Leads</TableCell>
              <TableCell>Date Range</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.totalSales}</TableCell>
                <TableCell>{report.totalLeads}</TableCell>
                <TableCell>{report.dateRange}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteReport(report.id)} sx={{ color: '#d32f2f' }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleReportEdit(report.id)} sx={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={Math.ceil(reportsData.length / 10)} variant="outlined" color="primary" />
      </Box>

      {/* Add/Edit Report Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Report Name"
            variant="outlined"
            fullWidth
            value={newReport.name}
            onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Total Sales"
            variant="outlined"
            fullWidth
            type="number"
            value={newReport.totalSales}
            onChange={(e) => setNewReport({ ...newReport, totalSales: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Total Leads"
            variant="outlined"
            fullWidth
            type="number"
            value={newReport.totalLeads}
            onChange={(e) => setNewReport({ ...newReport, totalLeads: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date Range"
            variant="outlined"
            fullWidth
            value={newReport.dateRange}
            onChange={(e) => setNewReport({ ...newReport, dateRange: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddReport} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportsPage;
