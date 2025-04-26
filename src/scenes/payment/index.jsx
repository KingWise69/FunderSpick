import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InvoiceApp.css';

const InvoiceApp = () => {
  // State for managing invoices, customers, and products
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com', address: '123 Main St, Anytown, USA' },
    { id: '2', name: 'Globex Inc', email: 'accounts@globex.com', address: '456 Oak Ave, Somewhere, USA' }
  ]);
  const [products, setProducts] = useState([
    { id: '1', name: 'Web Design', description: 'Custom website design', price: 1200, taxable: true },
    { id: '2', name: 'SEO Service', description: 'Search engine optimization', price: 800, taxable: true },
    { id: '3', name: 'Consulting', description: 'Business consulting hour', price: 150, taxable: false }
  ]);
  
  // State for the current invoice being edited
  const [currentInvoice, setCurrentInvoice] = useState({
    id: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    customer: '',
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    notes: '',
    terms: 'Payment due within 30 days',
    status: 'draft',
    paid: false
  });
  
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'preview'
  const [searchTerm, setSearchTerm] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Your Company',
    address: '123 Business Rd, City, State ZIP',
    email: 'billing@yourcompany.com',
    phone: '(555) 123-4567',
    logo: ''
  });

  // Calculate invoice totals whenever items change
  useEffect(() => {
    const subtotal = currentInvoice.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxableAmount = currentInvoice.items.reduce((sum, item) => 
      item.taxable ? sum + (item.price * item.quantity) : sum, 0);
    const tax = taxableAmount * 0.08; // Assuming 8% tax rate
    const total = subtotal + tax + currentInvoice.shipping - currentInvoice.discount;
    
    setCurrentInvoice(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }));
  }, [currentInvoice.items, currentInvoice.shipping, currentInvoice.discount]);

  // Generate a new invoice number
  const generateInvoiceNumber = () => {
    const prefix = 'INV-';
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const count = invoices.filter(inv => inv.date.includes(new Date().getFullYear() + '-' + month)).length + 1;
    return `${prefix}${year}${month}-${count.toString().padStart(3, '0')}`;
  };

  // Handle creating a new invoice
  const handleNewInvoice = () => {
    setCurrentInvoice({
      id: uuidv4(),
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      customer: '',
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      shipping: 0,
      total: 0,
      notes: '',
      terms: 'Payment due within 30 days',
      status: 'draft',
      paid: false
    });
    setViewMode('form');
  };

  // Handle editing an existing invoice
  const handleEditInvoice = (invoice) => {
    setCurrentInvoice(invoice);
    setViewMode('form');
  };

  // Handle saving an invoice
  const handleSaveInvoice = () => {
    if (currentInvoice.id) {
      // Update existing invoice
      setInvoices(prev => 
        prev.map(inv => inv.id === currentInvoice.id ? currentInvoice : inv)
      );
    } else {
      // Add new invoice
      setInvoices(prev => [...prev, currentInvoice]);
    }
    setViewMode('list');
  };

  // Handle deleting an invoice
  const handleDeleteInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  // Handle adding a new item to the invoice
  const handleAddItem = () => {
    setCurrentInvoice(prev => ({
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

  // Handle updating an item in the invoice
  const handleUpdateItem = (id, field, value) => {
    setCurrentInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Handle removing an item from the invoice
  const handleRemoveItem = (id) => {
    setCurrentInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Handle selecting a product for an item
  const handleSelectProduct = (itemId, productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleUpdateItem(itemId, 'product', product.name);
      handleUpdateItem(itemId, 'description', product.description);
      handleUpdateItem(itemId, 'price', product.price);
      handleUpdateItem(itemId, 'taxable', product.taxable);
    }
  };

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (invoice.customer && customers.find(c => c.id === invoice.customer)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get customer name by ID
  const getCustomerName = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Unknown Customer';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'UGX' }).format(amount);
  };

  return (
    <div className="invoice-app">
      <header className="app-header">
        <h1>Invoice Management</h1>
        <div className="company-info">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.address}</p>
          <p>{companyInfo.email} | {companyInfo.phone}</p>
        </div>
      </header>

      <div className="app-container">
        {viewMode === 'list' && (
          <div className="invoice-list">
            <div className="toolbar">
              <button className="btn-primary" onClick={handleNewInvoice}>
                <i className="fas fa-plus"></i> New Invoice
              </button>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>

            <div className="invoice-table">
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map(invoice => (
                      <tr key={invoice.id}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.date}</td>
                        <td>{getCustomerName(invoice.customer)}</td>
                        <td>{formatCurrency(invoice.total)}</td>
                        <td>
                          <span className={`status-badge ${invoice.status}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditInvoice(invoice)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button 
                            className="btn-view"
                            onClick={() => {
                              setCurrentInvoice(invoice);
                              setViewMode('preview');
                            }}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-invoices">
                        No invoices found. Create your first invoice!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'form' && (
          <div className="invoice-form">
            <div className="form-header">
              <h2>
                {currentInvoice.id ? 'Edit Invoice' : 'Create New Invoice'}
                <span className="invoice-number">{currentInvoice.invoiceNumber}</span>
              </h2>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setViewMode('list')}>
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleSaveInvoice}
                  disabled={!currentInvoice.customer || currentInvoice.items.length === 0}
                >
                  Save Invoice
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
                <h3>Bill To</h3>
                <select
                  value={currentInvoice.customer}
                  onChange={(e) => setCurrentInvoice({...currentInvoice, customer: e.target.value})}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                {currentInvoice.customer && (
                  <div className="customer-details">
                    <p>{customers.find(c => c.id === currentInvoice.customer)?.address}</p>
                    <p>{customers.find(c => c.id === currentInvoice.customer)?.email}</p>
                  </div>
                )}
              </div>

              <div className="form-section invoice-info">
                <h3>Invoice Details</h3>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={currentInvoice.date}
                    onChange={(e) => setCurrentInvoice({...currentInvoice, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={currentInvoice.dueDate}
                    onChange={(e) => setCurrentInvoice({...currentInvoice, dueDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={currentInvoice.status}
                    onChange={(e) => setCurrentInvoice({...currentInvoice, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section items-section">
              <h3>Items</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Taxable</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoice.items.map(item => (
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
                          step="0.01"
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
                      </td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
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
                <h3>Notes & Terms</h3>
                <textarea
                  placeholder="Notes to customer"
                  value={currentInvoice.notes}
                  onChange={(e) => setCurrentInvoice({...currentInvoice, notes: e.target.value})}
                />
                <textarea
                  placeholder="Terms and conditions"
                  value={currentInvoice.terms}
                  onChange={(e) => setCurrentInvoice({...currentInvoice, terms: e.target.value})}
                />
              </div>

              <div className="form-section totals-section">
                <h3>Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(currentInvoice.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%):</span>
                  <span>{formatCurrency(currentInvoice.tax)}</span>
                </div>
                <div className="summary-row">
                  <label>Discount:</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentInvoice.discount}
                    onChange={(e) => setCurrentInvoice({
                      ...currentInvoice,
                      discount: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div className="summary-row">
                  <label>Shipping:</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentInvoice.shipping}
                    onChange={(e) => setCurrentInvoice({
                      ...currentInvoice,
                      shipping: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatCurrency(currentInvoice.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="invoice-preview">
            <div className="preview-actions">
              <button className="btn-secondary" onClick={() => setViewMode('list')}>
                Back to List
              </button>
              {currentInvoice.status === 'draft' && (
                <button 
                  className="btn-edit"
                  onClick={() => setViewMode('form')}
                >
                  Edit Invoice
                </button>
              )}
              <button className="btn-primary">
                <i className="fas fa-envelope"></i> Send
              </button>
              <button className="btn-secondary">
                <i className="fas fa-print"></i> Print
              </button>
              <button className="btn-secondary">
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>

            <div className="invoice-document">
              <div className="invoice-header">
                <div className="company-logo">
                  {companyInfo.logo ? (
                    <img src={companyInfo.logo} alt="Company Logo" />
                  ) : (
                    <h2>{companyInfo.name}</h2>
                  )}
                </div>
                <div className="invoice-title">
                  <h1>INVOICE</h1>
                  <div className="invoice-meta">
                    <div className="meta-row">
                      <span>Invoice #:</span>
                      <span>{currentInvoice.invoiceNumber}</span>
                    </div>
                    <div className="meta-row">
                      <span>Date:</span>
                      <span>{currentInvoice.date}</span>
                    </div>
                    <div className="meta-row">
                      <span>Due Date:</span>
                      <span>{currentInvoice.dueDate}</span>
                    </div>
                    <div className="meta-row">
                      <span>Status:</span>
                      <span className={`status-badge ${currentInvoice.status}`}>
                        {currentInvoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="invoice-parties">
                <div className="company-info">
                  <h3>{companyInfo.name}</h3>
                  <p>{companyInfo.address}</p>
                  <p>{companyInfo.email}</p>
                  <p>{companyInfo.phone}</p>
                </div>
                <div className="customer-info">
                  <h3>Bill To:</h3>
                  {currentInvoice.customer ? (
                    <>
                      <h4>{getCustomerName(currentInvoice.customer)}</h4>
                      <p>{customers.find(c => c.id === currentInvoice.customer)?.address}</p>
                      <p>{customers.find(c => c.id === currentInvoice.customer)?.email}</p>
                    </>
                  ) : (
                    <p>No customer selected</p>
                  )}
                </div>
              </div>

              <div className="invoice-items">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInvoice.items.length > 0 ? (
                      currentInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-items">No items added</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="invoice-totals">
                <div className="totals-grid">
                  <div className="notes-section">
                    <h4>Notes</h4>
                    <p>{currentInvoice.notes || 'No notes provided'}</p>
                    <h4>Terms</h4>
                    <p>{currentInvoice.terms}</p>
                  </div>
                  <div className="amounts-section">
                    <div className="amount-row">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(currentInvoice.subtotal)}</span>
                    </div>
                    <div className="amount-row">
                      <span>Tax:</span>
                      <span>{formatCurrency(currentInvoice.tax)}</span>
                    </div>
                    {currentInvoice.discount > 0 && (
                      <div className="amount-row">
                        <span>Discount:</span>
                        <span>-{formatCurrency(currentInvoice.discount)}</span>
                      </div>
                    )}
                    {currentInvoice.shipping > 0 && (
                      <div className="amount-row">
                        <span>Shipping:</span>
                        <span>{formatCurrency(currentInvoice.shipping)}</span>
                      </div>
                    )}
                    <div className="amount-row total">
                      <span>Total:</span>
                      <span>{formatCurrency(currentInvoice.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="invoice-footer">
                <p>Thank you for your business!</p>
                <div className="payment-options">
                  <h4>Payment Options</h4>
                  <p>Bank Transfer | Credit Card | PayPal</p>
                  <p>Make checks payable to: {companyInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceApp;