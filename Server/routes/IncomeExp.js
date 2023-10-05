const express = require("express");
const router = express.Router();
const { savings } = require("../db/db");
router.get("/", async (req, res) => {
  try {
    const saving = await savings.find();
    res.json(saving);
  } catch (error) {
    res.status(501).json({ error: "error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { totalIncome, totalExpense } = req.body;
    const saving = await savings.findOne();
    if (saving) {
      saving.amount = saving.amount + totalIncome - totalExpense;
      await saving.save();
    } else {
      const newsaving = totalIncome - totalExpense;
      await savings.create({ amount: newsaving });
    }

    res.json({
      message: "Savings updated successfully",
      saving: saving,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating savings" });
  }
});

module.exports = router;
