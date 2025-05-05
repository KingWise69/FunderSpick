import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './SalesReceipt.css';

// Mock Data
const mockItems = [
  { id: '1001', name: 'T-Shirt', price: 24.99, category: 'Clothing', taxRate: 0.08 },
  { id: '1002', name: 'Jeans', price: 59.99, category: 'Clothing', taxRate: 0.08 },
  { id: '1003', name: 'Sneakers', price: 89.99, category: 'Footwear', taxRate: 0.08 },
  { id: '1004', name: 'Backpack', price: 49.99, category: 'Accessories', taxRate: 0.08 },
  { id: '1005', name: 'Smartphone', price: 699.99, category: 'Electronics', taxRate: 0.10 },
  { id: '1006', name: 'Laptop', price: 1299.99, category: 'Electronics', taxRate: 0.10 },
  { id: '1007', name: 'Headphones', price: 149.99, category: 'Electronics', taxRate: 0.10 },
  { id: '1008', name: 'Coffee Mug', price: 12.99, category: 'Home', taxRate: 0.06 },
];

const paymentMethods = [
  { id: 'cash', name: 'Cash' },
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'check', name: 'Check' },
  { id: 'gift', name: 'Gift Card' },
  { id: 'mobile', name: 'Mobile Payment' },
];

const companyInfo = {
  name: 'Retail Pro Solutions',
  address: '123 Commerce Street, Business City, BC 10001',
  phone: '(555) 123-4567',
  email: 'sales@retailpro.com',
  website: 'www.retailpro.com',
  taxId: 'TAX-987654321',
  receiptFooter: 'Thank you for your business! Returns accepted within 30 days with receipt.',
};

const SalesReceiptApp = () => {
  // State
  const [receipts, setReceipts] = useState([]);
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentReceipt, setCurrentReceipt] = useState({
    id: uuidv4(),
    number: `R-${Math.floor(10000 + Math.random() * 90000)}`,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    customer: {
      name: '',
      email: '',
      phone: '',
    },
    items: [],
    payment: {
      method: 'credit',
      amount: 0,
      changeDue: 0,
    },
    tax: 0,
    subtotal: 0,
    total: 0,
    cashier: 'John Doe', // Would normally come from auth system
    notes: '',
  });
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'preview'
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate receipt totals
  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = items.reduce((sum, item) => sum + (item.price * item.quantity * item.taxRate), 0);
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  // Add item to receipt
  const addItemToReceipt = (item) => {
    const existingItem = currentReceipt.items.find(i => i.id === item.id);
    
    if (existingItem) {
      const updatedItems = currentReceipt.items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setCurrentReceipt({
        ...currentReceipt,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      });
    } else {
      const newItem = { ...item, quantity: 1 };
      const updatedItems = [...currentReceipt.items, newItem];
      setCurrentReceipt({
        ...currentReceipt,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      });
    }
  };

  // Remove item from receipt
  const removeItemFromReceipt = (itemId) => {
    const updatedItems = currentReceipt.items.filter(item => item.id !== itemId);
    setCurrentReceipt({
      ...currentReceipt,
      items: updatedItems,
      ...calculateTotals(updatedItems),
    });
  };

  // Update item quantity
  const updateItemQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    
    const updatedItems = currentReceipt.items.map(item =>
      item.id === itemId ? { ...item, quantity: parseInt(quantity) } : item
    );
    
    setCurrentReceipt({
      ...currentReceipt,
      items: updatedItems,
      ...calculateTotals(updatedItems),
    });
  };

  // Handle payment amount change
  const handlePaymentAmountChange = (amount) => {
    const paymentAmount = parseFloat(amount) || 0;
    const changeDue = paymentAmount - currentReceipt.total;
    
    setCurrentReceipt({
      ...currentReceipt,
      payment: {
        ...currentReceipt.payment,
        amount: paymentAmount,
        changeDue: changeDue > 0 ? changeDue : 0,
      },
    });
  };

  // Save receipt
  const saveReceipt = () => {
    const newReceipt = {
      ...currentReceipt,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
    };
    
    setReceipts([...receipts, newReceipt]);
    resetReceipt();
    setViewMode('list');
  };

  // Reset receipt
  const resetReceipt = () => {
    setCurrentReceipt({
      id: uuidv4(),
      number: `R-${Math.floor(10000 + Math.random() * 90000)}`,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
      customer: {
        name: '',
        email: '',
        phone: '',
      },
      items: [],
      payment: {
        method: 'credit',
        amount: 0,
        changeDue: 0,
      },
      tax: 0,
      subtotal: 0,
      total: 0,
      cashier: 'John Doe',
      notes: '',
    });
  };

  // View receipt
  const viewReceipt = (receipt) => {
    setCurrentReceipt(receipt);
    setViewMode('preview');
  };

  // Render components based on view mode
  const renderListView = () => (
    <div className="sales-receipt-app">
      <div className="app-header">
        <h1>Sales Receipts</h1>
        <div className="company-info">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.address}</p>
        </div>
      </div>

      <div className="toolbar">
        <button 
          className="btn-primary" 
          onClick={() => setViewMode('form')}
        >
          New Receipt
        </button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search receipts..." 
          />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="receipt-table">
        {receipts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map(receipt => (
                <tr key={receipt.id}>
                  <td>{receipt.number}</td>
                  <td>{receipt.date}</td>
                  <td>{receipt.customer.name || 'Walk-in'}</td>
                  <td>{receipt.items.length}</td>
                  <td>${receipt.total.toFixed(2)}</td>
                  <td>{receipt.payment.method}</td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => viewReceipt(receipt)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-receipts">
            <p>No receipts found. Create your first receipt!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="sales-receipt-app">
      <div className="app-header">
        <h1>New Sales Receipt</h1>
        <div className="company-info">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.address}</p>
        </div>
      </div>

      <div className="receipt-form">
        <div className="form-header">
          <h2>
            Receipt
            <span className="receipt-number">{currentReceipt.number}</span>
          </h2>
          <div className="form-actions">
            <button 
              className="btn-secondary"
              onClick={() => {
                resetReceipt();
                setViewMode('list');
              }}
            >
              Cancel
            </button>
            <button 
              className="btn-preview"
              onClick={() => setViewMode('preview')}
            >
              Preview
            </button>
            <button 
              className="btn-primary"
              onClick={saveReceipt}
              disabled={currentReceipt.items.length === 0}
            >
              Complete Sale
            </button>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-group">
              <label>Customer Name</label>
              <input 
                type="text" 
                value={currentReceipt.customer.name}
                onChange={(e) => setCurrentReceipt({
                  ...currentReceipt,
                  customer: {
                    ...currentReceipt.customer,
                    name: e.target.value,
                  },
                })}
                placeholder="Walk-in customer"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={currentReceipt.customer.email}
                onChange={(e) => setCurrentReceipt({
                  ...currentReceipt,
                  customer: {
                    ...currentReceipt.customer,
                    email: e.target.value,
                  },
                })}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                value={currentReceipt.customer.phone}
                onChange={(e) => setCurrentReceipt({
                  ...currentReceipt,
                  customer: {
                    ...currentReceipt.customer,
                    phone: e.target.value,
                  },
                })}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Information</h3>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                value={currentReceipt.payment.method}
                onChange={(e) => setCurrentReceipt({
                  ...currentReceipt,
                  payment: {
                    ...currentReceipt.payment,
                    method: e.target.value,
                  },
                })}
              >
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Amount Received</label>
              <input 
                type="number" 
                min="0"
                step="0.01"
                value={currentReceipt.payment.amount || ''}
                onChange={(e) => handlePaymentAmountChange(e.target.value)}
              />
            </div>
            {currentReceipt.payment.changeDue > 0 && (
              <div className="change-due">
                <span>Change Due:</span>
                <span>${currentReceipt.payment.changeDue.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Add Items</h3>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card" onClick={() => addItemToReceipt(item)}>
                <div className="item-name">{item.name}</div>
                <div className="item-price">UGX{item.price.toFixed(2)}</div>
                <div className="item-category">{item.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="items-section">
          <h3>Items on Receipt</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReceipt.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>UGX{item.price.toFixed(2)}</td>
                  <td>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.id, e.target.value)}
                    />
                  </td>
                  <td>{(item.taxRate * 100).toFixed(0)}%</td>
                  <td>UGX{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      className="btn-icon"
                      onClick={() => removeItemFromReceipt(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="summary-section">
          <div className="summary-row">
            <label>Subtotal:</label>
            <span>UGX{currentReceipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <label>Tax:</label>
            <span>UGX{currentReceipt.tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <label>Total:</label>
            <span>UGX{currentReceipt.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea 
            value={currentReceipt.notes}
            onChange={(e) => setCurrentReceipt({
              ...currentReceipt,
              notes: e.target.value,
            })}
            placeholder="Additional notes..."
          />
        </div>
      </div>
    </div>
  );

  const renderPreviewView = () => (
    <div className="sales-receipt-app">
      <div className="preview-actions">
        <button 
          className="btn-secondary"
          onClick={() => setViewMode(viewMode === 'preview' && currentReceipt.items.length > 0 ? 'form' : 'list')}
        >
          Back
        </button>
        <button 
          className="btn-primary"
          onClick={() => window.print()}
        >
          Print Receipt
        </button>
      </div>

      <div className="receipt-document">
        <div className="receipt-header">
          <div>
            <h2>{companyInfo.name}</h2>
            <p>{companyInfo.address}</p>
            <p>Phone: {companyInfo.phone}</p>
            <p>Email: {companyInfo.email}</p>
          </div>
          <div className="receipt-header-info">
            <h3>SALES RECEIPT</h3>
            <p>Receipt #: {currentReceipt.number}</p>
            <p>Date: {currentReceipt.date}</p>
            <p>Time: {currentReceipt.time}</p>
            <p>Cashier: {currentReceipt.cashier}</p>
          </div>
        </div>

        <div className="receipt-details">
          <div>
            <h4>Sold To:</h4>
            <p>{currentReceipt.customer.name || 'Walk-in Customer'}</p>
            {currentReceipt.customer.email && <p>Email: {currentReceipt.customer.email}</p>}
            {currentReceipt.customer.phone && <p>Phone: {currentReceipt.customer.phone}</p>}
          </div>
          <div>
            <h4>Payment Method:</h4>
            <p>{paymentMethods.find(m => m.id === currentReceipt.payment.method)?.name}</p>
            {currentReceipt.payment.amount > 0 && (
              <>
                <p>Amount Paid: ${currentReceipt.payment.amount.toFixed(2)}</p>
                {currentReceipt.payment.changeDue > 0 && (
                  <p>Change Due: ${currentReceipt.payment.changeDue.toFixed(2)}</p>
                )}
              </>
            )}
          </div>
        </div>

        <table className="items-preview-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentReceipt.items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{(item.taxRate * 100).toFixed(0)}%</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${currentReceipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${currentReceipt.tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${currentReceipt.total.toFixed(2)}</span>
          </div>
        </div>

        {currentReceipt.notes && (
          <div className="receipt-notes">
            <h4>Notes:</h4>
            <p>{currentReceipt.notes}</p>
          </div>
        )}

        <div className="receipt-footer">
          <p>{companyInfo.receiptFooter}</p>
          <p>{companyInfo.website}</p>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <>
      {viewMode === 'list' && renderListView()}
      {viewMode === 'form' && renderFormView()}
      {viewMode === 'preview' && renderPreviewView()}
    </>
  );
};

export default SalesReceiptApp;