import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("myszki"); 

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim() || !price || Number(price) <= 0 || !img.trim()) {
    alert("Wypełnij wszystkie pola poprawnie!");
    return;
  }

    try {
      const res = await fetch("http://localhost:8081/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          price: Number(price),
          img,
          category, 
        }),
      });

      const data = await res.json();

      if (data.Status) {
        alert("Dodano produkt!");
        window.location.reload(); 
      } else {
        alert(data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />

        <input
          placeholder="Cena"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control mb-2"
        />

        <input
          placeholder="URL obrazka"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="form-control mb-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control mb-2"
        >
          <option value="myszki">Myszki</option>
          <option value="klawiatury">Klawiatury</option>
          <option value="monitory">Monitory</option>
          <option value="ram">Kosci RAM</option>
          <option value="cpu">Procesory</option>
          <option value="gpu">Karty Graficzne</option>
          <option value="sluchawki">Słuchawki</option>
          <option value="inne">Inne</option>
        </select>

        <button className="btn btn-primary">Dodaj produkt</button>
      </form>
    </div>
  );
}