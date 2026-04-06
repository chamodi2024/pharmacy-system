import { useEffect, useState } from "react";
import axios from "axios";

export default function Medicines() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/medicine")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Medicines</h2>
      {data.map(m => (
        <div key={m.id}>
          {m.name} - Rs.{m.price}
        </div>
      ))}
    </div>
  );
}