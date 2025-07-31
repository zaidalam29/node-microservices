const express = require("express");
const app = express();
app.use(express.json());

const USERS = [
  { id: 1, name: "Zaid Alam" },
  { id: 2, name: "Imran Khan" }
];

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.get("/users/:id", (req, res) => {
  const user = USERS.find(u => u.id === parseInt(req.params.id));
  res.json(user || {});
});

app.listen(3001, () => console.log("User service running on port 3001"));
