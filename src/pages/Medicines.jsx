import { useEffect, useState } from "react";
import axios from "axios";

export default function Medicines() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/medicine")
      .then(res => setData(res.data))
      .catch(() => {
        // temporary dummy data if backend not ready
        setData([
          { id: 1, name: "Paracetamol", price: 100 },
          { id: 2, name: "Aspirin", price: 150 },
          { id: 3, name: "Vitamin C", price: 200 }
        ]);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Medicines</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {data.map(m => (
          <div key={m.id} style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <h3>{m.name}</h3>
            <p>Price: Rs.{m.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}