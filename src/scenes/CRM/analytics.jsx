import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Dummy Data
const recentDeals = [
  { id: 1, dealName: "Cloud Services", stage: "Completed", dealValue: "$50,000", owner: "Alice", closedDate: "2024-02-10" },
  { id: 2, dealName: "AI Integration", stage: "Planned", dealValue: "$30,000", owner: "Bob", closedDate: "2024-02-15" },
  { id: 3, dealName: "Software Upgrade", stage: "Active", dealValue: "$40,000", owner: "Charlie", closedDate: "2024-02-20" },
];

const recentLeads = [
  { id: 1, leadName: "Juan Pérez", companyName: "Tech Spain", stage: "Completed", createdDate: "2024-02-21", owner: "Carlos" },
  { id: 2, leadName: "James Smith", companyName: "UK Solutions", stage: "Lost", createdDate: "2024-02-22", owner: "Olivia" },
  { id: 3, leadName: "Yassine Benali", companyName: "Algeria Innovations", stage: "Not Connected", createdDate: "2024-02-23", owner: "Ahmed" },
  { id: 4, leadName: "John Doe", companyName: "US Digital", stage: "Closed", createdDate: "2024-02-24", owner: "Emma" },
  { id: 5, leadName: "Kato Joseph", companyName: "Uganda Tech", stage: "Active", createdDate: "2024-02-25", owner: "Joshua" },
];

const statusColors = {
  Completed: "green",
  Closed: "red",
  Lost: "darkred",
  "Not Connected": "purple",
};

const recentCompanies = [
  { id: 1, companyName: "Tech Spain", email: "contact@techspain.com", phone: "+34 111 222 333", createdAt: "2024-02-19" },
  { id: 2, companyName: "UK Solutions", email: "info@uksolutions.co.uk", phone: "+44 555 666 777", createdAt: "2024-02-20" },
  { id: 3, companyName: "Algeria Innovations", email: "hello@algeriainnov.com", phone: "+213 888 999 000", createdAt: "2024-02-21" },
  { id: 4, companyName: "US Digital", email: "support@usdigital.com", phone: "+1 123 456 7890", createdAt: "2024-02-22" },
  { id: 5, companyName: "Uganda Tech", email: "info@ugandatech.ug", phone: "+256 777 888 999", createdAt: "2024-02-23" },
];

const pieChartData = [
  { name: "Organic", value: 40 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 20 },
  { name: "Email Campaign", value: 15 },
];

const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold">
        Analytics Dashboard
      </Typography>

      {/* Recent Deals & Leads by Source */}
      <Box display="flex" gap={2} mt={3}>
        <Box flex={1} component={Paper} p={2}>
          <Typography variant="h6" fontWeight="bold">
            Recent Deals
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Deal Name</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Deal Value</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Closed Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>{deal.dealName}</TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell>{deal.dealValue}</TableCell>
                    <TableCell>{deal.owner}</TableCell>
                    <TableCell>{deal.closedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box flex={1} component={Paper} p={2}>
          <Typography variant="h6" fontWeight="bold">
            Leads by Source
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Recent Leads & Recently Created Companies */}
      <Box display="flex" gap={2} mt={3}>
        <Box flex={1} component={Paper} p={2}>
          <Typography variant="h6" fontWeight="bold">
            Recent Leads
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lead Name</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.leadName}</TableCell>
                    <TableCell>{lead.companyName}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: statusColors[lead.stage], color: "white" }}
                      >
                        {lead.stage}
                      </Button>
                    </TableCell>
                    <TableCell>{lead.createdDate}</TableCell>
                    <TableCell>{lead.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box flex={1} component={Paper} p={2}>
          <Typography variant="h6" fontWeight="bold">
            Recently Created Companies
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
