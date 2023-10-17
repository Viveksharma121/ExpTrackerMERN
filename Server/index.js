const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
require("dotenv").config();
const { Transaction } = require("./db/db");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

const pro_route = require("./routes/transaction");
const savings_route = require("./routes/IncomeExp");
const user_route = require("./routes/Auth");
const allsavings = require("./routes/Savings");
const { error } = require("console");

// Routes
app.use("/api/products", pro_route);
app.use("/api/savings", savings_route);
app.use("/api/savings", user_route);
app.use("/api/save", allsavings);
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect" + error);
  });
app.get("/", (req, res) => {
  res.json("Hello hi ");
});
app.delete("/transactions", async (req, res) => {
  try {
    const result = await Transaction.deleteMany({});
    console.log(result + "ha log");

    res.status(200).json(result + "Deleted all");
  } catch (error) {
    res.status(500).json({ error: "Deletion error" });
  }
});
