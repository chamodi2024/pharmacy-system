import { useState, useEffect } from "react";
import { createBill, getMedicines } from "../services/api";

function Billing() {
  const [patientName, setPatientName] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [items, setItems] = useState([{ medicineId: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await getMedicines();
      setMedicines(data || []);
    } catch (err) {
      console.error("Failed to load medicines", err);
    }
  };

  const handleAddMedicine = () => {
    setItems([...items, { medicineId: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveMedicine = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    
    if (field === "medicineId") {
      const selectedMed = medicines.find(m => m.id === parseInt(value));
      if (selectedMed) {
        updatedItems[index].price = selectedMed.price;
      }
    }
    
    setItems(updatedItems);
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCreateBill = async () => {
    if (!patientName.trim()) {
      setError("Patient name is required");
      return;
    }

    if (items.some(item => !item.medicineId)) {
      setError("Please select medicine for all items");
      return;
    }

    const billData = {
      patientName,
      items: items.map(item => ({
        medicineId: parseInt(item.medicineId),
        quantity: parseInt(item.quantity)
      })),
      totalAmount: parseFloat(getTotalAmount())
    };

    setLoading(true);
    try {
      await createBill(billData);
      setSuccess("Bill created successfully!");
      setPatientName("");
      setItems([{ medicineId: "", quantity: 1, price: 0 }]);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to create bill");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="section-card">
        <h2 className="section-title">💳 Billing</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-stack">
          <div className="form-field">
            <label>Patient Name *</label>
            <input
              placeholder="Enter patient name"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="input-field"
            />
          </div>

          <h4>Add Medicines</h4>

          {items.map((item, index) => (
            <div key={index} className="billing-item">
              <select
                value={item.medicineId}
                onChange={(e) => handleItemChange(index, "medicineId", e.target.value)}
                className="input-field billing-select"
              >
                <option value="">Select Medicine</option>
                {medicines.map(med => (
                  <option key={med.id} value={med.id}>
                    {med.name} - Rs. {med.price}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                className="input-field qty-input"
                placeholder="Qty"
              />

              <span className="billing-price">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </span>

              {items.length > 1 && (
                <button
                  onClick={() => handleRemoveMedicine(index)}
                  className="btn btn--danger billing-remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button onClick={handleAddMedicine} className="btn btn--secondary">
            + Add Medicine
          </button>

          <div className="billing-total">
            <h4>Total Amount: <span className="billing-amount">Rs. {getTotalAmount()}</span></h4>
          </div>

          <button 
            onClick={handleCreateBill} 
            disabled={loading}
            className="btn btn--primary full-width"
          >
            {loading ? "Creating Bill..." : "Create Bill"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  title: {
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  formGroup: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    boxSizing: "border-box"
  },
  itemRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    alignItems: "center"
  },
  select: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  quantityInput: {
    width: "80px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  priceSpan: {
    minWidth: "100px",
    textAlign: "right",
    fontWeight: "bold"
  },
  removeBtn: {
    padding: "5px 10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer"
  },
  addBtn: {
    padding: "10px 15px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },
  totalContainer: {
    marginTop: "20px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "5px",
    textAlign: "right"
  },
  totalAmount: {
    color: "#27ae60",
    fontSize: "20px"
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px"
  },
  error: {
    background: "#fee",
    color: "#c33",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px"
  },
  success: {
    background: "#efe",
    color: "#3c3",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px"
  }
};

export default Billing;