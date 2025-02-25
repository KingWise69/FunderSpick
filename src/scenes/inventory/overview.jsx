import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import PieChart from "../../components/ui/Pie";
import BarChart from "../../components/ui/Bar";
import LineChart from "../../components/ui/Line";




// Mock Data
const mockRecentInvoices = [
  { id: "INV-001", customer: "Emma Epayi", amount: "UGX 500,000", status: "Paid" },
  { id: "INV-002", customer: "Alice Nakato", amount: "UGX 750,000", status: "Pending" },
  { id: "INV-003", customer: "Fleix Matogo", amount: "UGX 950,000", status: "Pending" },
  { id: "INV-004", customer: "Eric Samhog", amount: "UGX 850,000", status: "Pending" },
  { id: "INV-005", customer: "Trishul Patel", amount: "UGX 1,750,000", status: "Paid" },
];

const mockRecentSales = [
  { ref: "S-1001", customer: "Peter Okello", status: "Pending", total: "UGX 1,200,000", paid: "UGX 1,000,000", due: "UGX 200,000", paymentStatus: "Partial" },
  { ref: "S-1002", customer: "Mariam Tumwine", status: "Completed", total: "UGX 850,000", paid: "UGX 850,000", due: "UGX 0", paymentStatus: "Paid" },
  { ref: "S-1003", customer: "Mark Tumwine", status: "Completed", total: "UGX 850,000", paid: "UGX 950,000", due: "UGX 0", paymentStatus: "Paid" },
  { ref: "S-1004", customer: "Mark Simon", status: "Completed", total: "UGX 850,000", paid: "UGX 800,000", due: "UGX 0", paymentStatus: "Paid" },
  { ref: "S-1005", customer: "Eddy Toluluto", status: "Pending", total: "UGX 850,000", paid: "UGX 655,000", due: "UGX 150,000", paymentStatus: "Pending" },
];

const mockStockAlert = [
  { product: "Laptop Dell XPS 13", stock: 3 },
  { product: "iPhone 14 Pro", stock: 1 },
  { product: "Laptop Dell XPS 13", stock: 3 },
  { product: "iPhone 14 Pro", stock: 1 },
  { product: "Laptop Dell XPS 13", stock: 3 },
  { product: "iPhone 14 Pro", stock: 1 },
];

const Badge = ({ label, color }) => (
  <Box
    sx={{
      backgroundColor: color,
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "12px",
      fontSize: "10px",
      fontWeight: "bold",
    }}
  >
    {label}
  </Box>
);

const Table = ({ data, columns }) => (
  <Box sx={{ overflowX: "auto", mt: 2 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key} style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                {col.render ? col.render(row[col.key]) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

const InventoryDashboard = () => {
  return (
    <Box m={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Inventory Dashboard</Typography>
        <Button variant="contained" startIcon={<DownloadOutlinedIcon />}>Download Report</Button>
      </Box>

      {/* Stats */}
      <Box display="flex" justifyContent="space-between" gap={3}>
        <Box p={3} bgcolor="#3f51b5" color="white" borderRadius={2} width="24%">
          <Typography variant="h6">Sales</Typography>
          <Typography variant="h4">UGX 15M</Typography>
        </Box>
        <Box p={3} bgcolor="#f50057" color="white" borderRadius={2} width="24%">
          <Typography variant="h6">Purchases</Typography>
          <Typography variant="h4">UGX 10M</Typography>
        </Box>
        <Box p={3} bgcolor="#17B169" color="white" borderRadius={2} width="24%">
          <Typography variant="h6">Sales Return</Typography>
          <Typography variant="h4">UGX 5M</Typography>
        </Box>
        <Box p={3} bgcolor="#AA0000" color="white" borderRadius={2} width="24%">
          <Typography variant="h6">Purchases Return</Typography>
          <Typography variant="h4">UGX 3M</Typography>
        </Box>
      </Box>

      {/* Charts */}
      <Box display="flex" justifyContent="space-between" gap={3} my={4}>
        <PieChart title="Top Selling Products 2024" />
        <BarChart title="This Week's Top Sales & Purchases" />
      </Box>

      {/* Alerts */}
      <Box display="flex" justifyContent="space-between" gap={3} mt={4}>
        <Box p={3} bgcolor="#ff9800" borderRadius={2} width="48%">
          <Typography variant="h6" fontWeight="bold">Stock Alert</Typography>
          {mockStockAlert.map((item, index) => (
            <Typography key={index}>{item.product} - {item.stock} left</Typography>
          ))}
        </Box>
        <PieChart title="Top 5 Customers - January" />
      </Box>

      {/* Targets and Payments */}
      <Box display="flex" justifyContent="space-between" gap={3} mt={4}>
        <BarChart title="Sales Target (Weekly, Monthly, Yearly)" />
        <LineChart title="Payments Sent & Received (Last 5 Days)" />
        <Box width="30%">
          <Typography variant="h6" fontWeight="bold">Recent Invoices</Typography>
          <Table 
            data={mockRecentInvoices} 
            columns={[{ key: "id", label: "Invoice #" }, { key: "customer", label: "Customer" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status", render: (val) => <Badge label={val} color={val === "Paid" ? "green" : "red"} /> }]} 
          />
        </Box>
      </Box>

      {/* Recent Sales */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold">Recent Sales</Typography>
        <Table 
          data={mockRecentSales} 
          columns={[{ key: "ref", label: "Reference #" }, { key: "customer", label: "Customer" }, { key: "status", label: "Status", render: (val) => <Badge label={val} color={val === "Completed" ? "green" : "red"} /> }, { key: "total", label: "Grand Total" }, { key: "paid", label: "Paid" }, { key: "due", label: "Due" }, { key: "paymentStatus", label: "Payment Status", render: (val) => <Badge label={val} color={val === "Paid" ? "green" : "red"} /> }]} 
        />
      </Box>
    </Box>
  );
};

export default InventoryDashboard;
