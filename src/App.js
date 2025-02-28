import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
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

// New pages for reports, ledger, and vouchers
import IncomeVsExpenses from "./scenes/reports/income-vs-expenses";
import TrialBalance from "./scenes/reports/trial-balance";
import BalanceSheet from "./scenes/reports/balance-sheet";
import AccountBalance from "./scenes/reports/account-balance";
import ProfitAndLoss from "./scenes/reports/profit-and-loss";

import LedgerList from "./scenes/ledger/index";
import LedgerCreate from "./scenes/ledger/create";

import CreditVoucher from "./scenes/vouchers/credit";
import DebitVoucher from "./scenes/vouchers/debit";
import CreateVoucher from "./scenes/vouchers/create";
/*Inventory*/
import Inventory from "./scenes/inventory/overview";
import ProductList from "./scenes/inventory/product-list";
import Barcode from "./scenes/inventory/print-bar-code";
import Stock from "./scenes/inventory/stock";
import Supply from "./scenes/inventory/supplierList";
import Transfer from "./scenes/inventory/transfer";
import CustomerList from "./scenes/inventory/customer";

/*CRM*/
import Leads from "./scenes/CRM/leads";
import Deals from "./scenes/CRM/deals";
import Analytics from "./scenes/CRM/analytics";

/*HRM*/
import List from "./scenes/HRM/list";
import Payroll from "./scenes/HRM/payroll";
import Reports from "./scenes/HRM/reports";
import Timestamp from "./scenes/HRM/timestamp";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
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

              {/*Bills*/}
              <Route path="/bills/manage" element={<ManageBill />} />
              <Route path="/bills/create" element={<CreateBill />} />
              {/*Inventory*/}

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



              {/*CRM*/}
              <Route path="/CRM/leads" element={<Leads />} />
              <Route path="/CRM/deals" element={<Deals />} />
              <Route path="/CRM/analytics" element={<Analytics />} />

              {/*HRM*/}
              <Route path="/HRM/list" element={<List />} />
              <Route path="/HRM/payroll" element={<Payroll />} />
              <Route path="/HRM/reports" element={<Reports />} />
              <Route path="/HRM/timestamp" element={<Timestamp />} />


            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
