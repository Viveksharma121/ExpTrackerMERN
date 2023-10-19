const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const bcrypt = require("bcryptjs");
const { Users } = require("../Server/db/db");
const jwt = require("jsonwebtoken");
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

// Routes
app.use("/api/products", pro_route);
app.use("/api/savings", savings_route);
app.use("/api/user", user_route);
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
  res.json("Hello hi namaste");
});
// app.post("/reg", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const salt = 10;
//     const hashedPass = await bcrypt.hash(password, salt);

//     const newUser = Users({
//       username,
//       email,
//       password: hashedPass,
//     });
//     await newUser.save();

//     res.status(201).json({ message: "User created succesfully " });
//   } catch (error) {
//     console.log(error + "error");
//     res.status(500).json({ message: error });
//   }
// });
app.delete("/transactions", async (req, res) => {
  try {
    const result = await Transaction.deleteMany({});
    console.log(result + "ha log");

    res.status(200).json(result + "Deleted all");
  } catch (error) {
    res.status(500).json({ error: "Deletion error" });
  }
});
