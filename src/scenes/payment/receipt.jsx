import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SalesReceipt.css';

const SalesReceiptApp = () => {
  // Main application state
  const [receipts, setReceipts] = useState([]);
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Kampala Enterprises', email: 'accounts@kampalaent.com', phone: '+256 752 123456', address: 'Plot 12, Kampala Road' },
    { id: '2', name: 'Nile Distributors', email: 'info@niledist.com', phone: '+256 702 987654', address: 'Ntinda Complex, Block B' }
  ]);
  
  const [products, setProducts] = useState([
    { id: '1', name: 'Office Chair', description: 'Executive leather chair', price: 250000, taxable: true, category: 'Furniture' },
    { id: '2', name: 'Desk', description: 'Mahogany executive desk', price: 850000, taxable: true, category: 'Furniture' },
    { id: '3', name: 'Consulting Hour', description: 'Business consulting services', price: 150000, taxable: false, category: 'Services' }
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', name: 'Cash', account: 'Undeposited Funds' },
    { id: '2', name: 'Mobile Money', account: 'Mobile Money Receivables' },
    { id: '3', name: 'Bank Transfer', account: 'Undeposited Funds' },
    { id: '4', name: 'Credit Card', account: 'Credit Card Receivables' }
  ]);

  // Current receipt being edited
  const [currentReceipt, setCurrentReceipt] = useState({
    id: '',
    receiptNumber: '',
    date: new Date().toISOString().split('T')[0],
    customer: '',
    paymentMethod: '1',
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    amountPaid: 0,
    changeDue: 0,
    notes: '',
    status: 'pending',
    deposited: false
  });

  // UI state
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'preview', 'deposit'
  const [searchTerm, setSearchTerm] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Uganda Business Solutions Ltd',
    address: 'Plot 45, Commercial Plaza, Kampala',
    email: 'sales@ubs.co.ug',
    phone: '+256 414 123456',
    taxId: 'TIN-123456789',
    logo: ''
  });

  // Generate receipt number
  const generateReceiptNumber = () => {
    const prefix = 'SR-';
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const count = receipts.filter(r => r.date.includes(new Date().getFullYear() + '-' + month)).length + 1;
    return `${prefix}${year}${month}-${count.toString().padStart(3, '0')}`;
  };

  // Calculate totals when items change
  useEffect(() => {
    const subtotal = currentReceipt.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxableAmount = currentReceipt.items.reduce((sum, item) => 
      item.taxable ? sum + (item.price * item.quantity) : sum, 0);
    const tax = taxableAmount * 0.18; // 18% VAT for Uganda
    const total = subtotal + tax - currentReceipt.discount;
    const changeDue = currentReceipt.amountPaid - total > 0 ? currentReceipt.amountPaid - total : 0;
    
    setCurrentReceipt(prev => ({
      ...prev,
      subtotal,
      tax,
      total,
      changeDue
    }));
  }, [currentReceipt.items, currentReceipt.discount, currentReceipt.amountPaid]);

  // Format UGX currency
  const formatUGX = (amount) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Create new receipt
  const handleNewReceipt = () => {
    setCurrentReceipt({
      id: uuidv4(),
      receiptNumber: generateReceiptNumber(),
      date: new Date().toISOString().split('T')[0],
      customer: '',
      paymentMethod: '1',
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      amountPaid: 0,
      changeDue: 0,
      notes: '',
      status: 'pending',
      deposited: false
    });
    setViewMode('form');
  };

  // Add item to receipt
  const handleAddItem = () => {
    setCurrentReceipt(prev => ({
      ...prev,
      items: [...prev.items, {
        id: uuidv4(),
        product: '',
        description: '',
        quantity: 1,
        price: 0,
        taxable: false
      }]
    }));
  };

  // Update item in receipt
  const handleUpdateItem = (id, field, value) => {
    setCurrentReceipt(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Remove item from receipt
  const handleRemoveItem = (id) => {
    setCurrentReceipt(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Select product for item
  const handleSelectProduct = (itemId, productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleUpdateItem(itemId, 'product', product.name);
      handleUpdateItem(itemId, 'description', product.description);
      handleUpdateItem(itemId, 'price', product.price);
      handleUpdateItem(itemId, 'taxable', product.taxable);
    }
  };

  // Save receipt
  const handleSaveReceipt = () => {
    const receiptToSave = {
      ...currentReceipt,
      status: 'completed',
      deposited: currentReceipt.paymentMethod !== '1' && currentReceipt.paymentMethod !== '3' // Not Cash or Bank Transfer
    };

    setReceipts(prev => [...prev, receiptToSave]);
    setViewMode('list');
  };

  // Mark receipt as deposited
  const handleMarkAsDeposited = (id) => {
    setReceipts(prev => 
      prev.map(receipt => 
        receipt.id === id ? { ...receipt, deposited: true } : receipt
      )
    );
  };

  // Filter receipts
  const filteredReceipts = receipts.filter(receipt => 
    receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (receipt.customer && customers.find(c => c.id === receipt.customer)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  // Get undeposited funds receipts
  const undepositedReceipts = receipts.filter(receipt => 
    !receipt.deposited && (receipt.paymentMethod === '1' || receipt.paymentMethod === '3')
  );

  // Get customer name by ID
  const getCustomerName = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Walk-in Customer';
  };

  // Get payment method by ID
  const getPaymentMethod = (id) => {
    const method = paymentMethods.find(p => p.id === id);
    return method ? method.name : 'Unknown';
  };

  return (
    <div className="sales-receipt-app">
      <header className="app-header">
        <h1>Sales Receipts</h1>
        <div className="company-info">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.address}</p>
          <p>TIN: {companyInfo.taxId}</p>
        </div>
      </header>

      <div className="app-container">
        {viewMode === 'list' && (
          <div className="receipt-list">
            <div className="toolbar">
              <div className="button-group">
                <button className="btn-primary" onClick={handleNewReceipt}>
                  <i className="fas fa-plus"></i> New Receipt
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setViewMode('deposit')}
                  disabled={undepositedReceipts.length === 0}
                >
                  <i className="fas fa-piggy-bank"></i> Record Deposit
                </button>
              </div>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>

            <div className="receipt-table">
              <table>
                <thead>
                  <tr>
                    <th>Receipt #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount (UGX)</th>
                    <th>Payment Method</th>
                    <th>Deposited</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts.length > 0 ? (
                    filteredReceipts.map(receipt => (
                      <tr key={receipt.id}>
                        <td>{receipt.receiptNumber}</td>
                        <td>{receipt.date}</td>
                        <td>{getCustomerName(receipt.customer)}</td>
                        <td>{formatUGX(receipt.total)}</td>
                        <td>{getPaymentMethod(receipt.paymentMethod)}</td>
                        <td>
                          {receipt.deposited ? (
                            <i className="fas fa-check-circle deposited-yes"></i>
                          ) : (
                            <i className="fas fa-times-circle deposited-no"></i>
                          )}
                        </td>
                        <td>
                          <button 
                            className="btn-view"
                            onClick={() => {
                              setCurrentReceipt(receipt);
                              setViewMode('preview');
                            }}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {!receipt.deposited && (receipt.paymentMethod === '1' || receipt.paymentMethod === '3') && (
                            <button 
                              className="btn-deposit"
                              onClick={() => handleMarkAsDeposited(receipt.id)}
                            >
                              <i className="fas fa-piggy-bank"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-receipts">
                        No receipts found. Create your first sales receipt!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'form' && (
          <div className="receipt-form">
            <div className="form-header">
              <h2>
                New Sales Receipt
                <span className="receipt-number">{currentReceipt.receiptNumber}</span>
              </h2>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setViewMode('list')}>
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleSaveReceipt}
                  disabled={currentReceipt.items.length === 0 || currentReceipt.amountPaid < currentReceipt.total}
                >
                  Save Receipt
                </button>
                <button 
                  className="btn-preview"
                  onClick={() => setViewMode('preview')}
                >
                  Preview
                </button>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-section customer-info">
                <h3>Customer Information</h3>
                <div className="form-group">
                  <label>Customer (Optional)</label>
                  <select
                    value={currentReceipt.customer}
                    onChange={(e) => setCurrentReceipt({...currentReceipt, customer: e.target.value})}
                  >
                    <option value="">Select Customer or Walk-in</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                {currentReceipt.customer && (
                  <div className="customer-details">
                    <p>{customers.find(c => c.id === currentReceipt.customer)?.address}</p>
                    <p>{customers.find(c => c.id === currentReceipt.customer)?.phone}</p>
                  </div>
                )}
              </div>

              <div className="form-section payment-info">
                <h3>Payment Information</h3>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={currentReceipt.date}
                    onChange={(e) => setCurrentReceipt({...currentReceipt, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={currentReceipt.paymentMethod}
                    onChange={(e) => setCurrentReceipt({...currentReceipt, paymentMethod: e.target.value})}
                  >
                    {paymentMethods.map(method => (
                      <option key={method.id} value={method.id}>
                        {method.name} ({method.account})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount Paid (UGX)</label>
                  <input
                    type="number"
                    min="0"
                    value={currentReceipt.amountPaid}
                    onChange={(e) => setCurrentReceipt({
                      ...currentReceipt,
                      amountPaid: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                {currentReceipt.changeDue > 0 && (
                  <div className="change-due">
                    <span>Change Due:</span>
                    <span>{formatUGX(currentReceipt.changeDue)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-section items-section">
              <h3>Items Sold</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product/Service</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Rate (UGX)</th>
                    <th>VAT</th>
                    <th>Amount (UGX)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentReceipt.items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <select
                          value={products.find(p => p.name === item.product)?.id || ''}
                          onChange={(e) => handleSelectProduct(item.id, e.target.value)}
                        >
                          <option value="">Select Product</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={item.price}
                          onChange={(e) => handleUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={item.taxable}
                          onChange={(e) => handleUpdateItem(item.id, 'taxable', e.target.checked)}
                        />
                        {item.taxable && <span>18%</span>}
                      </td>
                      <td>{formatUGX(item.price * item.quantity)}</td>
                      <td>
                        <button 
                          className="btn-icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-add-item" onClick={handleAddItem}>
                <i className="fas fa-plus"></i> Add Item
              </button>
            </div>

            <div className="form-grid">
              <div className="form-section notes-section">
                <h3>Notes</h3>
                <textarea
                  placeholder="Additional notes for this receipt"
                  value={currentReceipt.notes}
                  onChange={(e) => setCurrentReceipt({...currentReceipt, notes: e.target.value})}
                />
              </div>

              <div className="form-section totals-section">
                <h3>Receipt Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatUGX(currentReceipt.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>VAT (18%):</span>
                  <span>{formatUGX(currentReceipt.tax)}</span>
                </div>
                <div className="summary-row">
                  <label>Discount (UGX):</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={currentReceipt.discount}
                    onChange={(e) => setCurrentReceipt({
                      ...currentReceipt,
                      discount: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatUGX(currentReceipt.total)}</span>
                </div>
                <div className="summary-row">
                  <span>Amount Paid:</span>
                  <span>{formatUGX(currentReceipt.amountPaid)}</span>
                </div>
                {currentReceipt.changeDue > 0 && (
                  <div className="summary-row">
                    <span>Change Due:</span>
                    <span>{formatUGX(currentReceipt.changeDue)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="receipt-preview">
            <div className="preview-actions">
              <button className="btn-secondary" onClick={() => setViewMode('list')}>
                Back to List
              </button>
              {currentReceipt.status === 'pending' && (
                <button 
                  className="btn-edit"
                  onClick={() => setViewMode('form')}
                >
                  Edit Receipt
                </button>
              )}
              <button className="btn-primary">
                <i className="fas fa-envelope"></i> Email Receipt
              </button>
              <button className="btn-secondary">
                <i className="fas fa-print"></i> Print
              </button>
              <button className="btn-secondary">
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>

            <div className="receipt-document">
              <div className="receipt-header">
                <div className="company-logo">
                  {companyInfo.logo ? (
                    <img src={companyInfo.logo} alt="Company Logo" />
                  ) : (
                    <h2>{companyInfo.name}</h2>
                  )}
                </div>
                <div className="receipt-title">
                  <h1>SALES RECEIPT</h1>
                  <div className="receipt-meta">
                    <div className="meta-row">
                      <span>Receipt #:</span>
                      <span>{currentReceipt.receiptNumber}</span>
                    </div>
                    <div className="meta-row">
                      <span>Date:</span>
                      <span>{currentReceipt.date}</span>
                    </div>
                    <div className="meta-row">
                      <span>Payment Method:</span>
                      <span>{getPaymentMethod(currentReceipt.paymentMethod)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="receipt-parties">
                <div className="company-info">
                  <h3>{companyInfo.name}</h3>
                  <p>{companyInfo.address}</p>
                  <p>{companyInfo.phone} | {companyInfo.email}</p>
                  <p>TIN: {companyInfo.taxId}</p>
                </div>
                <div className="customer-info">
                  <h3>Customer:</h3>
                  {currentReceipt.customer ? (
                    <>
                      <h4>{getCustomerName(currentReceipt.customer)}</h4>
                      <p>{customers.find(c => c.id === currentReceipt.customer)?.address}</p>
                      <p>{customers.find(c => c.id === currentReceipt.customer)?.phone}</p>
                    </>
                  ) : (
                    <p>Walk-in Customer</p>
                  )}
                </div>
              </div>

              <div className="receipt-items">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>VAT</th>
                      <th>Amount (UGX)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReceipt.items.length > 0 ? (
                      currentReceipt.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>{formatUGX(item.price)}</td>
                          <td>{item.taxable ? '18%' : '--'}</td>
                          <td>{formatUGX(item.price * item.quantity)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-items">No items added</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="receipt-totals">
                <div className="totals-grid">
                  <div className="notes-section">
                    <h4>Notes</h4>
                    <p>{currentReceipt.notes || 'Thank you for your business!'}</p>
                    <div className="payment-received">
                      <h4>Payment Received</h4>
                      <p>Amount: {formatUGX(currentReceipt.amountPaid)}</p>
                      {currentReceipt.changeDue > 0 && (
                        <p>Change: {formatUGX(currentReceipt.changeDue)}</p>
                      )}
                    </div>
                  </div>
                  <div className="amounts-section">
                    <div className="amount-row">
                      <span>Subtotal:</span>
                      <span>{formatUGX(currentReceipt.subtotal)}</span>
                    </div>
                    <div className="amount-row">
                      <span>VAT (18%):</span>
                      <span>{formatUGX(currentReceipt.tax)}</span>
                    </div>
                    {currentReceipt.discount > 0 && (
                      <div className="amount-row">
                        <span>Discount:</span>
                        <span>-{formatUGX(currentReceipt.discount)}</span>
                      </div>
                    )}
                    <div className="amount-row total">
                      <span>Total:</span>
                      <span>{formatUGX(currentReceipt.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="receipt-footer">
                <div className="footer-message">
                  <p>Goods sold are not returnable except for defective items reported within 7 days</p>
                </div>
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <p>Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'deposit' && (
          <div className="deposit-form">
            <div className="form-header">
              <h2>Record Bank Deposit</h2>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setViewMode('list')}>
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    undepositedReceipts.forEach(receipt => handleMarkAsDeposited(receipt.id));
                    setViewMode('list');
                  }}
                >
                  Save Deposit
                </button>
              </div>
            </div>

            <div className="deposit-summary">
              <h3>Undeposited Funds</h3>
              <div className="summary-card">
                <div className="summary-row">
                  <span>Total Receipts:</span>
                  <span>{undepositedReceipts.length}</span>
                </div>
                <div className="summary-row">
                  <span>Total Amount:</span>
                  <span>
                    {formatUGX(undepositedReceipts.reduce((sum, receipt) => sum + receipt.total, 0))}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Deposit Date:</span>
                  <span>{new Date().toISOString().split('T')[0]}</span>
                </div>
              </div>
            </div>

            <div className="deposit-receipts">
              <h3>Receipts to Deposit</h3>
              <table>
                <thead>
                  <tr>
                    <th>Receipt #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Payment Method</th>
                    <th>Amount (UGX)</th>
                  </tr>
                </thead>
                <tbody>
                  {undepositedReceipts.length > 0 ? (
                    undepositedReceipts.map(receipt => (
                      <tr key={receipt.id}>
                        <td>{receipt.receiptNumber}</td>
                        <td>{receipt.date}</td>
                        <td>{getCustomerName(receipt.customer)}</td>
                        <td>{getPaymentMethod(receipt.paymentMethod)}</td>
                        <td>{formatUGX(receipt.total)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-receipts">
                        No undeposited receipts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReceiptApp;