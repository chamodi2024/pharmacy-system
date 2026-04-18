import { useEffect, useState } from "react";
import { getBills, deleteBill } from "../services/api";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    setLoading(true);
    try {
      const data = await getBills();
      setBills(data || []);
      setError("");
    } catch (err) {
      setError("Failed to load bills");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    
    try {
      await deleteBill(id);
      loadBills();
    } catch (err) {
      setError("Failed to delete bill");
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="section-card">
        <h2 className="section-title">📋 Bill History</h2>
        {error && <div className="alert">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : bills.length === 0 ? (
          <p>No bills found</p>
        ) : (
          <div className="card-grid">
            {bills.map((b) => (
              <div key={b.id} className="bill-card">
                <div className="bill-header">
                  <h5>Patient: {b.patientName}</h5>
                  <button 
                    onClick={() => handleDeleteBill(b.id)}
                    className="btn btn--danger"
                  >
                    🗑️
                  </button>
                </div>
                <div className="bill-details">
                  <p><b>Bill ID:</b> {b.id}</p>
                  <p><b>Date:</b> {new Date(b.createdAt).toLocaleDateString()}</p>
                  <p><b>Total Amount:</b> <span className="billing-amount">Rs. {b.totalAmount}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto"
  },
  title: {
    marginBottom: "20px",
    color: "#333"
  },
  error: {
    background: "#fee",
    color: "#c33",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px"
  },
  billList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "15px"
  },
  billCard: {
    background: "white",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  billHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px"
  },
  billDetails: {
    fontSize: "14px"
  },
  amount: {
    color: "#27ae60",
    fontWeight: "bold",
    fontSize: "16px"
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "5px 10px"
  }
};

export default BillHistory;