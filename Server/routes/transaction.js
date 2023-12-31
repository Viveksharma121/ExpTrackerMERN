const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Transaction, IncomeSch, Exp, Balance } = require("../db/db");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret123");
    const userId = decodedToken.id;

    const transactions = await Transaction.find({ userId });
    res.json(transactions);
    console.log(transactions + " hh");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" + error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, Amt } = req.body;
    console.log(Amt);
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret123");
    console.log(decodedToken.id + "d");
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ message: " Unauthorised" });
    }
    const userId = decodedToken.id;
    // const token = req.headers.authorization?.split(" ")[1];
    // const decodedToken = jwt.verify(token, "secret123");
    // if (!decodedToken || !decodedToken.id) {
    // res.status(500).json({ message: " no token" });
    // }
    // const userId = decodedToken.id;
    //transaction schema
    const transaction = new Transaction({
      text,
      Amt,
      userId,
    });

    //balance schema
    let balanceRecord = await Balance.findOne();
    console.log(transaction.Amt);
    // transaction amount>=0 means income
    if (transaction.Amt >= 0) {
      //income from income schema
      let income = await IncomeSch.findOne();
      //update income
      if (!income) {
        // Create a new income document if it doesn't exist
        income = new IncomeSch({ Income: transaction.Amt });
      } else {
        // Update income
        income.Income += transaction.Amt;
      }
      await income.save();
      //update balance
      if (!balanceRecord) {
        balanceRecord = new Balance({ Balance: transaction.Amt });
      } else balanceRecord.Balance += transaction.Amt;
      await balanceRecord.save();
      //debugging
      console.log(balanceRecord.Balance);
      console.log(income.Income + "income");
    } else {
      //expense
      transaction.Amt = -Math.abs(transaction.Amt);
      let expense = await Exp.findOne();
      //update exp
      if (!expense) {
        // Create a new income document if it doesn't exist
        expense = new Exp({ Expense: transaction.Amt });
      } else {
        // Update income
        expense.Expense += transaction.Amt;
      }
      await expense.save();
      //update balance
      balanceRecord.Balance -= Math.abs(transaction.Amt);
      await balanceRecord.save();
      //debugging
      console.log(balanceRecord.Balance);
      console.log(expense.Expense + "Exp");
    }
    //if all good save transaction
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const filter = { _id: objectId };
    const result = await Transaction.deleteOne(filter);
    res.json(result);
    // console.log(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// router.delete("/transactions", async (req, res) => {

// });

module.exports = router;
