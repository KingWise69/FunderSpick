import React, { useState } from 'react';
import { format } from 'date-fns';

const SalesReceipt = () => {
  // Sales receipt state
  const [receipt, setReceipt] = useState({
    receiptNumber: 'SR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date(),
    customer: null,
    paymentMethod: 'Cash',
    checkNumber: '',
    depositTo: 'Undeposited Funds',
    items: [
      {
        id: 1,
        product: '',
        description: '',
        quantity: 1,
        rate: 0,
        tax: 0.18, // 18% VAT
      }
    ],
    emailOptions: {
      send: false,
      email: '',
      subject: 'Your Sales Receipt from Our Business',
      message: 'Thank you for your purchase! Attached is your sales receipt.'
    },
    customPaymentTypes: ['Cash', 'Check', 'Credit Card', 'Mobile Money']
  });

  // Sample customer data
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Acme Corp', email: 'accounts@acme.com' }
  ]);

  // Sample products
  const [products] = useState([
    { id: 1, name: 'Web Design', description: 'Professional website design', price: 500000 },
    { id: 2, name: 'Consulting', description: 'Business consulting hour', price: 150000 },
    { id: 3, name: 'Software License', description: 'Annual software subscription', price: 1200000 }
  ]);

  // Sample deposit accounts
  const [depositAccounts] = useState([
    'Undeposited Funds',
    'Stanbic Bank - 123456789',
    'Centenary Bank - 987654321',
    'Mobile Money - 0712345678'
  ]);

  // Calculate totals
  const calculateSubtotal = () => {
    return receipt.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTax = () => {
    return receipt.items.reduce((sum, item) => sum + (item.quantity * item.rate * item.tax), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Format currency (UGX)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle item changes
  const handleItemChange = (id, field, value) => {
    setReceipt(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Handle product selection
  const handleProductSelect = (id, productId) => {
    const selectedProduct = products.find(p => p.id === parseInt(productId));
    if (selectedProduct) {
      handleItemChange(id, 'product', selectedProduct.name);
      handleItemChange(id, 'description', selectedProduct.description);
      handleItemChange(id, 'rate', selectedProduct.price);
    }
  };

  // Add new item
  const addItem = () => {
    setReceipt(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: prev.items.length + 1,
          product: '',
          description: '',
          quantity: 1,
          rate: 0,
          tax: 0.18,
        }
      ]
    }));
  };

  // Remove item
  const removeItem = (id) => {
    if (receipt.items.length > 1) {
      setReceipt(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  // Add new payment method
  const addPaymentMethod = () => {
    const newMethod = prompt('Enter new payment method:');
    if (newMethod && !receipt.customPaymentTypes.includes(newMethod)) {
      setReceipt(prev => ({
        ...prev,
        customPaymentTypes: [...prev.customPaymentTypes, newMethod]
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (action) => {
    // In a real app, this would save to your backend
    console.log('Sales Receipt:', receipt);
    
    if (action === 'saveAndSend') {
      console.log('Emailing receipt to:', receipt.customer?.email || receipt.emailOptions.email);
      alert(`Receipt ${receipt.receiptNumber} saved and emailed successfully!`);
    } else {
      alert(`Receipt ${receipt.receiptNumber} saved successfully!`);
    }
  };

  return (
    <div className="sales-receipt-container" style={styles.container}>
      <h1 style={styles.header}>Create Sales Receipt</h1>
      
      {/* Basic Information */}
      <div style={styles.section}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Receipt #</label>
            <input 
              type="text" 
              value={receipt.receiptNumber}
              onChange={(e) => setReceipt({...receipt, receiptNumber: e.target.value})}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input 
              type="date" 
              value={format(receipt.date, 'yyyy-MM-dd')}
              onChange={(e) => setReceipt({...receipt, date: new Date(e.target.value)})}
              style={styles.input}
            />
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={{...styles.formGroup, flex: 2}}>
            <label style={styles.label}>Customer (Optional)</label>
            <select
              value={receipt.customer?.id || ''}
              onChange={(e) => {
                const selectedCustomer = customers.find(c => c.id === parseInt(e.target.value));
                setReceipt({
                  ...receipt, 
                  customer: selectedCustomer || null,
                  emailOptions: {
                    ...receipt.emailOptions,
                    email: selectedCustomer?.email || ''
                  }
                });
              }}
              style={styles.input}
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {!receipt.customer && (
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 2}}>
              <label style={styles.label}>Customer Email (Optional)</label>
              <input 
                type="email" 
                value={receipt.emailOptions.email}
                onChange={(e) => setReceipt({
                  ...receipt,
                  emailOptions: {...receipt.emailOptions, email: e.target.value}
                })}
                style={styles.input}
                placeholder="Enter email if you want to send receipt"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Payment Information</h2>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method</label>
            <div style={{display: 'flex'}}>
              <select
                value={receipt.paymentMethod}
                onChange={(e) => setReceipt({...receipt, paymentMethod: e.target.value})}
                style={styles.input}
              >
                {receipt.customPaymentTypes.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <button 
                onClick={addPaymentMethod}
                style={styles.addMethodButton}
              >
                Add New
              </button>
            </div>
          </div>
          
          {receipt.paymentMethod === 'Check' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Check Number</label>
              <input 
                type="text" 
                value={receipt.checkNumber}
                onChange={(e) => setReceipt({...receipt, checkNumber: e.target.value})}
                style={styles.input}
              />
            </div>
          )}
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Deposit To</label>
            <select
              value={receipt.depositTo}
              onChange={(e) => setReceipt({...receipt, depositTo: e.target.value})}
              style={styles.input}
            >
              {depositAccounts.map(account => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>
            <p style={styles.helpText}>
              {receipt.depositTo === 'Undeposited Funds' 
                ? 'Use "Undeposited Funds" to group payments for later deposit'
                : 'Payment will be recorded directly in this account'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Products/Services */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Products/Services</h2>
        <table style={styles.itemsTable}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Product/Service</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Qty</th>
              <th style={styles.tableHeader}>Rate (UGX)</th>
              <th style={styles.tableHeader}>Tax</th>
              <th style={styles.tableHeader}>Amount (UGX)</th>
              <th style={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item) => (
              <tr key={item.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <select
                    value={products.find(p => p.name === item.product)?.id || ''}
                    onChange={(e) => handleProductSelect(item.id, e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </td>
                <td style={styles.tableCell}>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    style={styles.input}
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    style={styles.input}
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    type="number"
                    min="0"
                    value={item.rate}
                    onChange={(e) => handleItemChange(item.id, 'rate', parseInt(e.target.value) || 0)}
                    style={styles.input}
                  />
                </td>
                <td style={styles.tableCell}>
                  <select
                    value={item.tax}
                    onChange={(e) => handleItemChange(item.id, 'tax', parseFloat(e.target.value))}
                    style={styles.input}
                  >
                    <option value="0">0%</option>
                    <option value="0.18">18% VAT</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  {formatCurrency(item.quantity * item.rate * (1 + item.tax))}
                </td>
                <td style={styles.tableCell}>
                  <button 
                    onClick={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} style={styles.addButton}>
          + Add Item
        </button>
      </div>
      
      {/* Totals */}
      <div style={styles.totalsSection}>
        <div style={styles.totalsWrapper}>
          <div style={styles.totalsRow}>
            <span style={styles.totalsLabel}>Subtotal:</span>
            <span style={styles.totalsValue}>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div style={styles.totalsRow}>
            <span style={styles.totalsLabel}>Tax (18%):</span>
            <span style={styles.totalsValue}>{formatCurrency(calculateTax())}</span>
          </div>
          <div style={{ ...styles.totalsRow, ...styles.totalRow }}>
            <span style={styles.totalsLabel}>Total:</span>
            <span style={styles.totalsValue}>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>
      
      {/* Email Options */}
      {(receipt.customer || receipt.emailOptions.email) && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Email Options</h2>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={receipt.emailOptions.send}
                  onChange={(e) => setReceipt({
                    ...receipt,
                    emailOptions: {...receipt.emailOptions, send: e.target.checked}
                  })}
                  style={{marginRight: '10px'}}
                />
                Send receipt to customer
              </label>
            </div>
          </div>
          
          {receipt.emailOptions.send && (
            <>
              <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1}}>
                  <label style={styles.label}>Email Subject</label>
                  <input
                    type="text"
                    value={receipt.emailOptions.subject}
                    onChange={(e) => setReceipt({
                      ...receipt,
                      emailOptions: {...receipt.emailOptions, subject: e.target.value}
                    })}
                    style={styles.input}
                  />
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1}}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    value={receipt.emailOptions.message}
                    onChange={(e) => setReceipt({
                      ...receipt,
                      emailOptions: {...receipt.emailOptions, message: e.target.value}
                    })}
                    style={{...styles.input, height: '80px'}}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Actions */}
      <div style={styles.actionsSection}>
        <button 
          onClick={() => handleSubmit('save')}
          style={styles.saveButton}
        >
          Save
        </button>
        {(receipt.customer || receipt.emailOptions.email) && (
          <button 
            onClick={() => handleSubmit('saveAndSend')}
            style={styles.saveAndSendButton}
          >
            Save and Send
          </button>
        )}
        <button style={styles.clearButton}>Clear</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  header: {
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: '18px',
    marginBottom: '15px',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
  },
  formGroup: {
    flex: 1,
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  helpText: {
    margin: '5px 0 0',
    fontSize: '12px',
    color: '#666',
  },
  addMethodButton: {
    background: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '0 4px 4px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    marginLeft: '-1px',
  },
  itemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '15px',
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    padding: '10px',
    verticalAlign: 'middle',
  },
  removeButton: {
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: '25px',
  },
  addButton: {
    background: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  totalsSection: {
    marginBottom: '30px',
    textAlign: 'right',
  },
  totalsWrapper: {
    display: 'inline-block',
    width: '300px',
  },
  totalsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  totalsLabel: {
    fontWeight: 'bold',
  },
  totalsValue: {
    minWidth: '120px',
    textAlign: 'right',
  },
  totalRow: {
    borderTop: '1px solid #333',
    paddingTop: '10px',
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  actionsSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  saveButton: {
    background: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveAndSendButton: {
    background: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  clearButton: {
    background: '#f8f9fa',
    color: '#333',
    border: '1px solid #ddd',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default SalesReceipt;