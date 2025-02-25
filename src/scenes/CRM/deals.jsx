import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useTheme } from "@mui/material";

// Initial Deals Data
const initialDeals = [
  {
    id: 1,
    createdDate: "2024-02-20",
    dealName: "Software Licensing",
    phase: "Active",
    dealAmount: "$50,000",
    tags: "Tech",
    expectedEndDate: "2024-06-01",
    owner: "Alice Smith",
    phoneNumber: "+256 123 456 789",
    chances: "80%",
    status: "Open",
  },
  {
    id: 2,
    createdDate: "2024-02-18",
    dealName: "Infrastructure Upgrade",
    phase: "Planned",
    dealAmount: "$150,000",
    tags: "Enterprise",
    expectedEndDate: "2024-09-10",
    owner: "Bob Williams",
    phoneNumber: "+256 987 654 321",
    chances: "60%",
    status: "Lost",
  },
  {
    id: 3,
    createdDate: "2024-02-15",
    dealName: "Cloud Migration",
    phase: "Completed",
    dealAmount: "$200,000",
    tags: "Cloud",
    expectedEndDate: "2024-03-05",
    owner: "David Johnson",
    phoneNumber: "+256 555 123 789",
    chances: "90%",
    status: "Won",
  },
];

// Status Button Colors
const phaseColors = {
  Active: "gold",
  Planned: "blue",
  Completed: "green",
};

const statusColors = {
  Won: "green",
  Open: "orange",
  Lost: "red",
};

// Summary Data
const getSummaryData = (deals) => [
  { label: "Total Deals", value: deals.length, icon: <AttachMoneyIcon /> },
  {
    label: "Total Companies",
    value: new Set(deals.map((deal) => deal.owner)).size,
    icon: <BusinessIcon />,
  },
  {
    label: "Won Deals",
    value: deals.filter((deal) => deal.status === "Won").length,
    icon: <CheckCircleIcon />,
  },
  {
    label: "Lost Deals",
    value: deals.filter((deal) => deal.status === "Lost").length,
    icon: <CancelIcon />,
  },
];

const DealsPage = () => {
  const theme = useTheme();
  const [deals, setDeals] = useState(initialDeals);
  const [openAddDeal, setOpenAddDeal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedDealId, setSelectedDealId] = useState(null);
  const [newDeal, setNewDeal] = useState({
    dealName: "",
    phase: "Active",
    dealAmount: "",
    tags: "",
    expectedEndDate: "",
    owner: "",
    phoneNumber: "",
    chances: "",
    status: "Open",
  });

  // Handle Add Deal
  const handleAddDeal = () => {
    const newEntry = {
      id: deals.length + 1,
      createdDate: new Date().toISOString().split("T")[0],
      ...newDeal,
    };
    setDeals([...deals, newEntry]);
    setOpenAddDeal(false);
    setNewDeal({
      dealName: "",
      phase: "Active",
      dealAmount: "",
      tags: "",
      expectedEndDate: "",
      owner: "",
      phoneNumber: "",
      chances: "",
      status: "Open",
    });
  };

  // Handle Action Click (Hide, Edit, Delete)
  const handleActionClick = (event, id) => {
    setMenuAnchor(event.currentTarget);
    setSelectedDealId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedDealId(null);
  };

  const handleDeleteDeal = () => {
    setDeals(deals.filter((deal) => deal.id !== selectedDealId));
    handleMenuClose();
  };

  // Table Columns
  const columns = [
    { field: "createdDate", headerName: "Created Date", flex: 1 },
    { field: "dealName", headerName: "Deal Name", flex: 1.5 },
    {
      field: "phase",
      headerName: "Phase",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: phaseColors[params.value],
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: phaseColors[params.value] },
          }}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "dealAmount", headerName: "Deal Amount", flex: 1 },
    { field: "tags", headerName: "Tags", flex: 1 },
    { field: "expectedEndDate", headerName: "Expected End Date", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "chances", headerName: "Chances", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: statusColors[params.value],
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: statusColors[params.value] },
          }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleActionClick(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Deals Management
      </Typography>

      {/* Summary Cards */}
      <Box display="flex" gap={2} mt={3}>
        {getSummaryData(deals).map((card, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F9F6EE",
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            {card.icon}
            <Typography variant="h5" fontWeight="bold">
              {card.value}
            </Typography>
            <Typography variant="subtitle2">{card.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Add Deal Button */}
      <Box mt={4} textAlign="right">
        <Button variant="contained" sx={{ backgroundColor: "purple", color: "white" }} startIcon={<AddIcon />} onClick={() => setOpenAddDeal(true)}>
          Add Deal
        </Button>
      </Box>

      {/* Deals Table */}
      <Box mt={4} sx={{ height: "60vh" }}>
        <DataGrid rows={deals} columns={columns} pageSize={5} />
      </Box>

      {/* Action Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Hide</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteDeal}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default DealsPage;
