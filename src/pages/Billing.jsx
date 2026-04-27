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
      const message = err?.response?.data?.message || err?.message || "Failed to load medicines";
      setError(message);
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
    const currentItem = { ...updatedItems[index] };

    if (field === "quantity") {
      const quantity = parseInt(value, 10);
      currentItem.quantity = Number.isNaN(quantity) ? "" : quantity;
    } else {
      currentItem[field] = value;
    }

    if (field === "medicineId") {
      const selectedMed = medicines.find(m => m.id === parseInt(value, 10));
      if (selectedMed) {
        currentItem.price = Number(selectedMed.price);
      } else {
        currentItem.price = 0;
      }
    }

    updatedItems[index] = currentItem;
    setItems(updatedItems);
  };

  const getTotalAmount = () => {
    return items
      .reduce((total, item) => total + (Number(item.price) * Number(item.quantity || 0)), 0)
      .toFixed(2);
  };

  const handleCreateBill = async () => {
    setError("");
    setSuccess("");

    if (!patientName.trim()) {
      setError("Patient name is required");
      return;
    }

    const preparedItems = items.map(item => ({
      medicineId: Number(item.medicineId),
      quantity: Number(item.quantity)
    }));

    if (preparedItems.some(item => !Number.isInteger(item.medicineId) || item.medicineId <= 0)) {
      setError("Please select medicine for all items");
      return;
    }

    if (preparedItems.some(item => !Number.isInteger(item.quantity) || item.quantity < 1)) {
      setError("Please enter a valid quantity for all medicines");
      return;
    }

    const totalAmount = parseFloat(getTotalAmount());
    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      setError("Total amount is invalid");
      return;
    }

    const billData = {
      patientName: patientName.trim(),
      items: preparedItems,
      totalAmount
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
      setError(err?.response?.data?.message || "Failed to create bill");
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

export default Billing;