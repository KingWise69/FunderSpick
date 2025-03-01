import { useState } from "react";
import { ProSidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TimelineIcon from "@mui/icons-material/Timeline";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportIcon from "@mui/icons-material/Report";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={<MenuOutlinedIcon />}> 
            {!isCollapsed && <Typography variant="h3">ADMIN</Typography>}
          </MenuItem>

          <Item title="Welcome " to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

          <SubMenu title="Financial Management" icon={<AccountBalanceOutlinedIcon />}>
            <SubMenu title="Sales" icon={<MonetizationOnOutlinedIcon />}>

            
              
              
              <SubMenu title="Voucher" icon={<LocalOfferOutlinedIcon />}>
              <Item title="Credit Voucher" to="/vouchers/credit" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Debit Voucher" to="/vouchers/debit" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Create Voucher" to="/vouchers/create" icon={<InventoryOutlinedIcon />} selected={selected} setSelected={setSelected} />
              
            </SubMenu>
              <Item title="Payment listing" to="/team" icon={<DescriptionOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Invoice" to="/payment-listings" icon={<DescriptionOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Create Payment" to="/payment" icon={<CreditCardOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>

           
            <SubMenu title="Ledger List" icon={<MenuBookOutlinedIcon />}>
              <Item title="Ledger List" to="/ledger/list" icon={<MenuBookOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Create Ledger" to="/ledger/create" icon={<CreateOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>
            <SubMenu title="Bills" icon={<ReceiptLongOutlinedIcon />}>
              <Item title="Manage Bill" to="/bills/manage" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Create Bill" to="/bills/create" icon={<CreateOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>
            <SubMenu title="Reports" icon={<AssessmentOutlinedIcon />}>
              <Item title="Income vs Expenses" to="/reports/income-vs-expenses" icon={<PaymentIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Trial Balance" to="/reports/trial-balance" icon={<BalanceOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Balance Sheet" to="/reports/balance-sheet" icon={<AccountBalanceOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>
          </SubMenu>

          <SubMenu title="Inventory Management" icon={<InventoryOutlinedIcon />}>
            <Item title="Overview" to="/inventory/overview" icon={<BookOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Product List" to="/inventory/product-list" icon={<InventoryOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Print Barcode" to="/inventory/print-bar-code" icon={<InventoryOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <SubMenu title="Stock Movement" icon={<BusinessCenterOutlinedIcon />}>
              <Item title="Supplier List" to="/inventory/supplierList" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Customer List" to="/inventory/customer" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Transfer List" to="/inventory/transfer" icon={<InventoryOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Stock Movement" to="/inventory/stock" icon={<BusinessCenterOutlinedIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>
          </SubMenu>

          <SubMenu title="CRM (Customer Relation Management)" icon={<PeopleAltOutlinedIcon />}>
          
            <Item title="Leads" to="/crm/leads" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Deals" to="/crm/deals" icon={<BusinessCenterOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Analytics" to="/crm/analytics" icon={<TimelineIcon />} selected={selected} setSelected={setSelected} />
          </SubMenu>

          <SubMenu title="Human Resource Management" icon={<WorkOutlineIcon />}>
            <Item title="Employee List/Record" to="/HRM/list" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Employee Timestamp" to="/HRM/timestamp" icon={<TimelineIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Payroll" to="/HRM/payroll" icon={<PaymentIcon />} selected={selected} setSelected={setSelected} />
            <Item title="HR Reports" to="/HRM/reports" icon={<ReportIcon />} selected={selected} setSelected={setSelected} />
          </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;