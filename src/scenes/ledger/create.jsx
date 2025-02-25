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
          {Object.keys(newEntry).map((key) => (
            <input
              key={key}
              type={key === "amount" ? "number" : "text"}
              value={newEntry[key]}
              onChange={(e) => setNewEntry({ ...newEntry, [key]: e.target.value })}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              style={inputStyle}
            />
          ))}
          <button onClick={handleCreate} style={buttonStyle("#28a745")}>Add</button>
          <button onClick={() => setShowForm(false)} style={buttonStyle("#dc3545", "10px")}>
            Cancel
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            {Object.keys(newEntry).map((key) => (
              <th key={key} style={tableHeaderCellStyle}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
            <th style={tableHeaderCellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              {Object.keys(newEntry).map((key) => (
                <td key={key} style={tableCellStyle}>{entry[key]}</td>
              ))}
              <td style={tableCellStyle}>
                <select onChange={(e) => handleAction(entry.id, e.target.value)} style={selectStyle}>
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

const buttonStyle = (bgColor, marginLeft = "0") => ({
  padding: "10px 20px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  marginLeft,
});

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
