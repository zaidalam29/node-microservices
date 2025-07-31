const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await axios.get("http://localhost:3001/users");
    res.json(users.data);
  } catch (err) {
    res.status(500).json({ error: "User Service Down" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await axios.get("http://localhost:3002/products");
    res.json(products.data);
  } catch (err) {
    res.status(500).json({ error: "Product Service Down" });
  }
});

// Composite route - product with user info
app.get("/products-with-user", async (req, res) => {
  try {
    const products = await axios.get("http://localhost:3002/products");
    const users = await axios.get("http://localhost:3001/users");

    const result = products.data.map(prod => ({
      ...prod,
      owner: users.data.find(u => u.id === prod.ownerId)
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Services not responding" });
  }
});

app.listen(3000, () => console.log("API Gateway running on port 3000"));
