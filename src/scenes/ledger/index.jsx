import { useState } from "react";
import { ledgerEntries } from "../../data/mockData";

const LedgerList = () => {
  const [entries, setEntries] = useState(ledgerEntries);
  const [newEntry, setNewEntry] = useState({
    date: "",
    name: "",
    referenceNumber: "",
    ledgerType: "",
    ledgerGroup: "",
    mode: "",
    amount: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleAction = (id, action) => {
    if (action === "Delete") {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleCreate = () => {
    if (newEntry.name && newEntry.referenceNumber && newEntry.amount) {
      setEntries([...entries, { ...newEntry, id: Date.now() }]);
      setNewEntry({ date: "", name: "", referenceNumber: "", ledgerType: "", ledgerGroup: "", mode: "", amount: "" });
      setShowForm(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>Ledger Entries</h2>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Create Ledger
      </button>

      {showForm && (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px" }}>
          <h3 style={{ color: "#007bff" }}>New Ledger Entry</h3>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            placeholder="Date"
            style={inputStyle}
          />
          <input
            type="text"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            placeholder="Name"
            style={inputStyle}
          />
          <input
            type="text"
            value={newEntry.referenceNumber}
            onChange={(e) => setNewEntry({ ...newEntry, referenceNumber: e.target.value })}
            placeholder="Reference No."
            style={inputStyle}
          />
          <input
            type="text"
            value={newEntry.ledgerType}
            onChange={(e) => setNewEntry({ ...newEntry, ledgerType: e.target.value })}
            placeholder="Ledger Type"
            style={inputStyle}
          />
          <input
            type="text"
            value={newEntry.ledgerGroup}
            onChange={(e) => setNewEntry({ ...newEntry, ledgerGroup: e.target.value })}
            placeholder="Ledger Group"
            style={inputStyle}
          />
          <input
            type="text"
            value={newEntry.mode}
            onChange={(e) => setNewEntry({ ...newEntry, mode: e.target.value })}
            placeholder="Mode"
            style={inputStyle}
          />
          <input
            type="number"
            value={newEntry.amount}
            onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
            placeholder="Amount ($)"
            style={inputStyle}
          />
          <button
            onClick={handleCreate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add
          </button>
          <button
            onClick={() => setShowForm(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            <th style={tableHeaderCellStyle}>Date</th>
            <th style={tableHeaderCellStyle}>Name</th>
            <th style={tableHeaderCellStyle}>Reference No.</th>
            <th style={tableHeaderCellStyle}>Ledger Type</th>
            <th style={tableHeaderCellStyle}>Ledger Group</th>
            <th style={tableHeaderCellStyle}>Mode</th>
            <th style={tableHeaderCellStyle}>Amount ($)</th>
            <th style={tableHeaderCellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td style={tableCellStyle}>{entry.date}</td>
              <td style={tableCellStyle}>{entry.name}</td>
              <td style={tableCellStyle}>{entry.referenceNumber}</td>
              <td style={tableCellStyle}>{entry.ledgerType}</td>
              <td style={tableCellStyle}>{entry.ledgerGroup}</td>
              <td style={tableCellStyle}>{entry.mode}</td>
              <td style={tableCellStyle}>{entry.amount}</td>
              <td style={tableCellStyle}>
                <select
                  onChange={(e) => handleAction(entry.id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select</option>
                  <option value="Delete">Delete</option>
                  <option value="Edit">Edit</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const inputStyle = {
  padding: "8px",
  margin: "10px 0",
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const tableHeaderCellStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  backgroundColor: "#f8f9fa",
  cursor: "pointer",
};

export default LedgerList;
