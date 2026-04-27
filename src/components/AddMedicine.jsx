import api from "../services/api";

function App() {

  const addMedicine = async () => {
    try {
      await api.post("/medicines", {
        name: "Panadol",
        price: 5,
        quantity: 100
      });
      alert("Saved");
    } catch (err) {
      console.error(err);
    }
  };

return (
<div>
<h1>Pharmacy System</h1>

<button onClick={addMedicine}>
Add Medicine
</button>

</div>
);
}

export default App;