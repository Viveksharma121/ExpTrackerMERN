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
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, Amt } = req.body;
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

    // transaction amount>=0 means income
    if (transaction.Amt >= 0) {
      //income from income schema
      let income = await IncomeSch.findOne();
      //update income
      income.Income += transaction.Amt;
      await income.save();
      //update balance
      balanceRecord.Balance += transaction.Amt;
      await balanceRecord.save();
      //debugging
      console.log(balanceRecord.Balance);
      console.log(income.Income + "income");
    } else {
      //expense
      let expense = await Exp.findOne();
      //update exp
      expense.Expense += Math.abs(transaction.Amt);
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
