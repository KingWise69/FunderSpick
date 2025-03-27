import { useState } from "react";
import { ProSidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CakeIcon from "@mui/icons-material/Cake";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReplayIcon from "@mui/icons-material/Replay";
import TimelineIcon from "@mui/icons-material/Timeline";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorageIcon from "@mui/icons-material/Storage";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
  >
    <Typography>
      <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
        {title}
      </Link>
    </Typography>
  </MenuItem>
);

const POSSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={<MenuOutlinedIcon />}>
            {!isCollapsed && <Typography variant="h3">POS</Typography>}
          </MenuItem>

          <SubMenu title="Point Of Sale (POS)" icon={<ShoppingCartOutlinedIcon />}>
            <SubMenu title="New Sales" icon={<BusinessCenterOutlinedIcon />}>
              <Item title="New Sales" to="/pos/new_sales" icon={<BusinessCenterOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Favourite" to="/pos/fav" icon={<StarBorderIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Dessert" to="/pos/dessert" icon={<CakeIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Beverages" to="/pos/beverages" icon={<LocalCafeIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Stock Movement" to="/pos/stock" icon={<SyncAltIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Hold Orders" to="/pos/hold" icon={<PauseCircleOutlineIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Discounts & Promotions" to="/pos/dis" icon={<LocalOfferIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Refunds & Returns" to="/pos/refund" icon={<ReplayIcon />} selected={selected} setSelected={setSelected} />
            </SubMenu>

            <Item title="Manage Sales" to="/pos/manage" icon={<TimelineIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Products" to="/pos/products" icon={<InventoryIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Inventory" to="/pos/inventory" icon={<StorageIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Payments" to="/pos/payments" icon={<PaymentIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Customers" to="/pos/customers" icon={<PeopleOutlineIcon />} selected={selected} setSelected={setSelected} />
            
          </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default POSSidebar;
