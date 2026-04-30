import { useEffect, useState } from "react";
import { getMedicines, addMedicine, deleteMedicine } from "../services/api";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    setLoading(true);
    try {
      const list = await getMedicines();
      setMedicines(list);
      setMessage("");
    } catch (err) {
      setMessage("Unable to load medicine inventory.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name || !price || !quantity) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await addMedicine({ name, price: Number(price), quantity: Number(quantity) });
      setName("");
      setPrice("");
      setQuantity("");
      setMessage("Medicine added successfully.");
      loadMedicines();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Unable to add medicine.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    setLoading(true);
    try {
      await deleteMedicine(id);
      setMessage("Medicine deleted.");
      loadMedicines();
    } catch (err) {
      setMessage("Unable to delete medicine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="section-card">
        <div className="page-header">
          <div>
            <p className="eyebrow" style={{ color: "#0f766e" }}>Inventory control</p>
            <h2 className="section-title">Admin Panel</h2>
            <p>Add, review, and remove medicine records from one tidy workspace.</p>
          </div>
        </div>
        {message && <div className="success-message">{message}</div>}
        <div className="form-stack">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Medicine Name"
            className="input-field"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="input-field"
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
            className="input-field"
          />
          <button onClick={handleAdd} className="btn btn--primary" disabled={loading}>
            {loading ? "Saving..." : "Add Medicine"}
          </button>
        </div>

        <div className="inventory-panel">
          <h3>Inventory</h3>
          {medicines.length === 0 ? (
            <p>No medicines found.</p>
          ) : (
            <div className="card-grid">
              {medicines.map((item) => (
                <div key={item.id} className="product-card">
                  <h4>{item.name}</h4>
                  <p>Price: Rs. {Number(item.price).toFixed(2)}</p>
                  <p>Qty: {item.quantity}</p>
                  <button className="btn btn--danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
