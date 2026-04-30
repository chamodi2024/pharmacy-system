import { useEffect, useState } from "react";
import { deleteBill, getBills } from "../services/api";

function BillHistory() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBills = async () => {
    setLoading(true);
    try {
      const data = await getBills();
      setBills(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load bills");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleDeleteBill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await deleteBill(id);
      loadBills();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete bill");
      console.error(err);
    }
  };

  const getBillDate = (bill) => {
    const date = bill.createdAt || bill.items?.[0]?.createdAt;
    return date ? new Date(date).toLocaleString() : "Unknown";
  };

  return (
    <div className="page">
      <div className="section-card">
        <div className="page-header" style={{ marginBottom: 18 }}>
          <div>
            <p className="eyebrow" style={{ color: "#0f766e" }}>Sales records</p>
            <h2 className="section-title">Bill History</h2>
          </div>
          <button onClick={loadBills} className="btn btn--secondary" style={{ minWidth: 160 }}>
            Refresh history
          </button>
        </div>

        {error && <div className="alert">{error}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : bills.length === 0 ? (
          <p>No bills found.</p>
        ) : (
          <div className="card-grid">
            {bills.map((bill) => (
              <div key={bill.id} className="bill-card">
                <div className="bill-header">
                  <h5>Patient: {bill.patientName}</h5>
                  <button
                    onClick={() => handleDeleteBill(bill.id)}
                    className="btn btn--danger"
                    aria-label={`Delete bill ${bill.id}`}
                  >
                    Delete
                  </button>
                </div>

                <div className="bill-details">
                  <p><b>Bill ID:</b> {bill.id}</p>
                  <p><b>Date:</b> {getBillDate(bill)}</p>
                  <p><b>Total Amount:</b> Rs. {Number(bill.totalAmount || 0).toFixed(2)}</p>
                </div>

                {bill.items?.length > 0 && (
                  <div className="bill-items">
                    <h6>Items</h6>
                    {bill.items.map((item) => (
                      <div key={item.id} className="bill-item-row">
                        <span>{item.medicine?.name || item.medicineId} x {item.quantity}</span>
                        <span>Rs. {Number(item.price || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BillHistory;
