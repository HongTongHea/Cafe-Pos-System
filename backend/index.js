require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Authentication: login and logout only
app.use("/api/auth", require("./routes/auth"));

// User management: Admin-only account management
app.use("/api/users", require("./routes/users"));

// Products
app.use("/api/products", require("./routes/products"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cafe POS API is running",
  });
});

if (!process.env.JWT_SECRET) {
  console.error("WARNING: JWT_SECRET is missing!");
} else {
  console.log("JWT_SECRET configured");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
