import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

export function Store() {
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <h1>Store</h1>

      <div style={{ marginBottom: "20px" }}>
        <Button onClick={() => setSelectedCategory("all")}>Wszystko</Button>{" "}
        <Button onClick={() => setSelectedCategory("myszki")}>Myszki</Button>{" "}
        <Button onClick={() => setSelectedCategory("klawiatury")}>Klawiatury</Button>{" "}
        <Button onClick={() => setSelectedCategory("monitory")}>Monitory</Button>{" "}
        <Button onClick={() => setSelectedCategory("ram")}>Kosci RAM</Button>{" "}
        <Button onClick={() => setSelectedCategory("cpu")}>Procesory</Button>{" "}
        <Button onClick={() => setSelectedCategory("gpu")}>Karty Graficzne</Button>{" "}
        <Button onClick={() => setSelectedCategory("sluchawki")}>Słuchawki</Button>{" "}
        <Button onClick={() => setSelectedCategory("inne")}>Inne</Button>
      </div>

      <Row md={2} xs={1} lg={4} className="g-3">
        {filteredProducts.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}