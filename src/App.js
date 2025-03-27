import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Pos_Sidebar from "./scenes/global/Pos_Sidebar";
import Dashboard from "./scenes/dashboard";
import Payment from "./scenes/payment";
import Listings from "./scenes/payment-listings";
import ManageBill from "./scenes/bills/manage";
import CreateBill from "./scenes/bills/create";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

// Reports
import IncomeVsExpenses from "./scenes/reports/income-vs-expenses";
import TrialBalance from "./scenes/reports/trial-balance";
import BalanceSheet from "./scenes/reports/balance-sheet";
import AccountBalance from "./scenes/reports/account-balance";
import ProfitAndLoss from "./scenes/reports/profit-and-loss";

// Ledger
import LedgerList from "./scenes/ledger/index";
import LedgerCreate from "./scenes/ledger/create";

// Vouchers
import CreditVoucher from "./scenes/vouchers/credit";
import DebitVoucher from "./scenes/vouchers/debit";
import CreateVoucher from "./scenes/vouchers/create";

// Inventory
import Inventory from "./scenes/inventory/overview";
import ProductList from "./scenes/inventory/product-list";
import Barcode from "./scenes/inventory/print-bar-code";
import Stock from "./scenes/inventory/stock";
import Supply from "./scenes/inventory/supplierList";
import Transfer from "./scenes/inventory/transfer";
import CustomerList from "./scenes/inventory/customer";

// CRM
import Leads from "./scenes/CRM/leads";
import Deals from "./scenes/CRM/deals";
import Analytics from "./scenes/CRM/analytics";

// HRM
import List from "./scenes/HRM/list";
import Payroll from "./scenes/HRM/payroll";
import Reports from "./scenes/HRM/reports";
import Timestamp from "./scenes/HRM/timestamp";

// POS
import Pos_Dashboard from "./scenes/pos/dashboard";
import New_Sales from "./scenes/pos/new_sales";
import Favorites from "./scenes/pos/fav";
import Beverages from "./scenes/pos/beverages";
import Dessert from "./scenes/pos/dessert";
import Hold from "./scenes/pos/hold";
import Dis from "./scenes/pos/dis";
import Refund from "./scenes/pos/refund";
import Movement from "./scenes/pos/stock";
import Products from "./scenes/pos/products";
import Manage_Sales from "./scenes/pos/manage";
import Inventory_Manage from "./scenes/pos/inventory";
import Manage_Payments from "./scenes/pos/payments";
import Manage_Customers from "./scenes/pos/customers";
import Manage_Reports from "./scenes/pos/reports";
import Manage_Settings from "./scenes/pos/settings";
import Customer_Group from "./scenes/pos/customer_groups";
import User_Pos from "./scenes/pos/user";
import Roles from "./scenes/pos/roles";
import User_Sales from "./scenes/pos/sales";
import User_Contact from "./scenes/pos/contact";

// User
import New_Sale from "./scenes/user/new_sales";
import Fav from "./scenes/user/fav";
import Beverage from "./scenes/user/beverages";
import Desserts from "./scenes/user/dessert";
import Holds from "./scenes/user/hold";
import Discounted from "./scenes/user/dis";
import Refunds from "./scenes/user/refund";
import Movements from "./scenes/user/stock";
import Product from "./scenes/user/products";
import Manage_Sale from "./scenes/user/manage";
import Inventory_Manages from "./scenes/user/inventory";
import Manage_Payment from "./scenes/user/payments";
import Manage_Customer from "./scenes/user/customers";
import Manage_Report from "./scenes/user/reports";


// Login
import Login from "./scenes/login/SignUp";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'normal'
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "normal") {
      navigate("/user/new_sales");
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render Sidebar or Pos_Sidebar based on user role */}
          {userRole === "admin" && <Sidebar isSidebar={isSidebar} />}
          {userRole === "normal" && <Pos_Sidebar isSidebar={isSidebar} />}

          <main className="content">
            {/* Render Topbar only if user is logged in */}
            {userRole && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              {/* Default route to Login */}
              <Route path="/" element={<Login onLogin={handleLogin} />} />

              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payment-listings" element={<Listings />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />

              {/* Reports */}
              <Route path="/reports/income-vs-expenses" element={<IncomeVsExpenses />} />
              <Route path="/reports/trial-balance" element={<TrialBalance />} />
              <Route path="/reports/balance-sheet" element={<BalanceSheet />} />
              <Route path="/reports/account-balance" element={<AccountBalance />} />
              <Route path="/reports/profit-and-loss" element={<ProfitAndLoss />} />

              {/* Bills */}
              <Route path="/bills/manage" element={<ManageBill />} />
              <Route path="/bills/create" element={<CreateBill />} />

              {/* Inventory */}
              <Route path="/inventory/overview" element={<Inventory />} />
              <Route path="/inventory/product-list" element={<ProductList />} />
              <Route path="/inventory/print-bar-code" element={<Barcode />} />
              <Route path="/inventory/stock" element={<Stock />} />
              <Route path="/inventory/supplierList" element={<Supply />} />
              <Route path="/inventory/transfer" element={<Transfer />} />
              <Route path="/inventory/customer" element={<CustomerList />} />

              {/* Ledger */}
              <Route path="/ledger/list" element={<LedgerList />} />
              <Route path="/ledger/create" element={<LedgerCreate />} />

              {/* Vouchers */}
              <Route path="/vouchers/credit" element={<CreditVoucher />} />
              <Route path="/vouchers/debit" element={<DebitVoucher />} />
              <Route path="/vouchers/create" element={<CreateVoucher />} />

              {/* CRM */}
              <Route path="/CRM/leads" element={<Leads />} />
              <Route path="/CRM/deals" element={<Deals />} />
              <Route path="/CRM/analytics" element={<Analytics />} />

              {/* HRM */}
              <Route path="/HRM/list" element={<List />} />
              <Route path="/HRM/payroll" element={<Payroll />} />
              <Route path="/HRM/reports" element={<Reports />} />
              <Route path="/HRM/timestamp" element={<Timestamp />} />

              {/* POS */}
              <Route path="/pos/dashboard" element={<Pos_Dashboard />} />
              <Route path="/pos/new_sales" element={<New_Sales />} />
              <Route path="/pos/fav" element={<Favorites />} />
              <Route path="/pos/beverages" element={<Beverages />} />
              <Route path="/pos/dessert" element={<Dessert />} />
              <Route path="/pos/hold" element={<Hold />} />
              <Route path="/pos/dis" element={<Dis />} />
              <Route path="/pos/refund" element={<Refund />} />
              <Route path="/pos/stock" element={<Movement />} />
              <Route path="/pos/products" element={<Products />} />
              <Route path="/pos/manage" element={<Manage_Sales />} />
              <Route path="/pos/inventory" element={<Inventory_Manage />} />
              <Route path="/pos/payments" element={<Manage_Payments />} />
              <Route path="/pos/customers" element={<Manage_Customers />} />
              <Route path="/pos/reports" element={<Manage_Reports />} />
              <Route path="/pos/settings" element={<Manage_Settings />} />
              <Route path="/pos/customer_groups" element={<Customer_Group />} />
              <Route path="/pos/user" element={<User_Pos />} />
              <Route path="/pos/roles" element={<Roles />} />
              <Route path="/pos/sales" element={<User_Sales />} />
              <Route path="/pos/contact" element={<User_Contact />} />

              {/* User Routes */}
              <Route path="/user/new_sales" element={<New_Sale />} />
              <Route path="/user/fav" element={<Fav />} />
              <Route path="/user/beverages" element={<Beverage />} />
              <Route path="/user/dessert" element={<Desserts />} />
              <Route path="/user/hold" element={<Holds />} />
              <Route path="/user/dis" element={<Discounted />} />
              <Route path="/user/refund" element={<Refunds />} />
              <Route path="/user/stock" element={<Movements />} />
              <Route path="/user/products" element={<Product />} />
              <Route path="/user/manage" element={<Manage_Sale />} />
              <Route path="/user/inventory" element={<Inventory_Manages />} />
              <Route path="/user/payments" element={<Manage_Payment />} />
              <Route path="/user/customers" element={<Manage_Customer />} />
              <Route path="/user/reports" element={<Manage_Report />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;