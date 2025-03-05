import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AddCircle, Cancel, CheckCircle } from "@mui/icons-material";

// Dummy data for discounts and promotions
const discountsData = [
  { id: 1, code: "DISC10", description: "10% off on all items", amount: "10%", startDate: "2025-03-01", endDate: "2025-03-31", status: "Active" },
  { id: 2, code: "DISC15", description: "15% off for new customers", amount: "15%", startDate: "2025-03-10", endDate: "2025-03-20", status: "Inactive" },
];

const promotionsData = [
  { id: 1, code: "PROMO50", description: "Buy 1, Get 1 Free", startDate: "2025-03-01", endDate: "2025-03-15", status: "Active" },
  { id: 2, code: "PROMO20", description: "20% off on selected products", startDate: "2025-03-05", endDate: "2025-03-25", status: "Inactive" },
];

const DiscountsAndPromotionsPage = () => {
  const [discounts, setDiscounts] = useState(discountsData);
  const [promotions, setPromotions] = useState(promotionsData);
  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const handleNewDiscountChange = (event) => {
    setNewDiscount({ ...newDiscount, [event.target.name]: event.target.value });
  };

  const handleNewPromotionChange = (event) => {
    setNewPromotion({ ...newPromotion, [event.target.name]: event.target.value });
  };

  const handleAddNewDiscount = () => {
    setDiscounts([
      ...discounts,
      { id: discounts.length + 1, ...newDiscount },
    ]);
    setOpenDiscountDialog(false);
    setNewDiscount({ code: "", description: "", amount: "", startDate: "", endDate: "", status: "Active" });
  };

  const handleAddNewPromotion = () => {
    setPromotions([
      ...promotions,
      { id: promotions.length + 1, ...newPromotion },
    ]);
    setOpenPromotionDialog(false);
    setNewPromotion({ code: "", description: "", startDate: "", endDate: "", status: "Active" });
  };

  const handleActivateDiscount = (id) => {
    setDiscounts(discounts.map(discount =>
      discount.id === id ? { ...discount, status: "Active" } : discount
    ));
  };

  const handleActivatePromotion = (id) => {
    setPromotions(promotions.map(promo =>
      promo.id === id ? { ...promo, status: "Active" } : promo
    ));
  };

  const handleDeactivateDiscount = (id) => {
    setDiscounts(discounts.map(discount =>
      discount.id === id ? { ...discount, status: "Inactive" } : discount
    ));
  };

  const handleDeactivatePromotion = (id) => {
    setPromotions(promotions.map(promo =>
      promo.id === id ? { ...promo, status: "Inactive" } : promo
    ));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Discounts & Promotions</Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "purple",
              "&:hover": { backgroundColor: "darkviolet" },
            }}
            startIcon={<AddCircle />}
            onClick={() => setOpenDiscountDialog(true)}
          >
            Add Discount
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "purple",
              "&:hover": { backgroundColor: "darkviolet" },
              ml: 2,
            }}
            startIcon={<AddCircle />}
            onClick={() => setOpenPromotionDialog(true)}
          >
            Add Promotion
          </Button>
        </Box>
      </Box>

      {/* Discounts Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>Discounts</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell>{discount.code}</TableCell>
                <TableCell>{discount.description}</TableCell>
                <TableCell>{discount.amount}</TableCell>
                <TableCell>{discount.startDate}</TableCell>
                <TableCell>{discount.endDate}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: discount.status === "Active" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {discount.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {discount.status === "Inactive" ? (
                    <IconButton color="success" onClick={() => handleActivateDiscount(discount.id)}>
                      <CheckCircle />
                    </IconButton>
                  ) : (
                    <IconButton color="error" onClick={() => handleDeactivateDiscount(discount.id)}>
                      <Cancel />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Promotions Table */}
      <Typography variant="h6">Promotions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell>{promo.code}</TableCell>
                <TableCell>{promo.description}</TableCell>
                <TableCell>{promo.startDate}</TableCell>
                <TableCell>{promo.endDate}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: promo.status === "Active" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {promo.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {promo.status === "Inactive" ? (
                    <IconButton color="success" onClick={() => handleActivatePromotion(promo.id)}>
                      <CheckCircle />
                    </IconButton>
                  ) : (
                    <IconButton color="error" onClick={() => handleDeactivatePromotion(promo.id)}>
                      <Cancel />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Discount Dialog */}
      <Dialog open={openDiscountDialog} onClose={() => setOpenDiscountDialog(false)}>
        <DialogTitle>Add New Discount</DialogTitle>
        <DialogContent>
          <TextField
            label="Discount Code"
            fullWidth
            value={newDiscount.code}
            onChange={handleNewDiscountChange}
            name="code"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newDiscount.description}
            onChange={handleNewDiscountChange}
            name="description"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Discount Amount"
            fullWidth
            value={newDiscount.amount}
            onChange={handleNewDiscountChange}
            name="amount"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={newDiscount.startDate}
            onChange={handleNewDiscountChange}
            name="startDate"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={newDiscount.endDate}
            onChange={handleNewDiscountChange}
            name="endDate"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={newDiscount.status}
              onChange={handleNewDiscountChange}
              name="status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDiscountDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewDiscount} color="primary">
            Add Discount
          </Button>
        </DialogActions>
      </Dialog>

      {/* Promotion Dialog */}
      <Dialog open={openPromotionDialog} onClose={() => setOpenPromotionDialog(false)}>
        <DialogTitle>Add New Promotion</DialogTitle>
        <DialogContent>
          <TextField
            label="Promotion Code"
            fullWidth
            value={newPromotion.code}
            onChange={handleNewPromotionChange}
            name="code"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newPromotion.description}
            onChange={handleNewPromotionChange}
            name="description"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={newPromotion.startDate}
            onChange={handleNewPromotionChange}
            name="startDate"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={newPromotion.endDate}
            onChange={handleNewPromotionChange}
            name="endDate"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={newPromotion.status}
              onChange={handleNewPromotionChange}
              name="status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromotionDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewPromotion} color="primary">
            Add Promotion
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DiscountsAndPromotionsPage;
