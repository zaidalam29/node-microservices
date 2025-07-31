const express = require("express");
const app = express();
app.use(express.json());

const PRODUCTS = [
  { id: 1, name: "Phone", ownerId: 1 },
  { id: 2, name: "Laptop", ownerId: 2 }
];

app.get("/products", (req, res) => {
  res.json(PRODUCTS);
});

app.get("/products/:id", (req, res) => {
  const product = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  res.json(product || {});
});

app.listen(3002, () => console.log("Product service running on port 3002"));
