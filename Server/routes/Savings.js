const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SavingsSch } = require("../db/db");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret123");
    const userId = decodedToken.id;
    const savings = await SavingsSch.findOne({ userId: userId });
    res.status(200).json({ savings });
  } catch (error) {
    res.json({ error: "oopssiii" });
  }
});

router.post("/save", async (req, res) => {
  try {
    let { saving } = req.body;
    console.log(saving + "ji i m");
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret123");
    if (!decodedToken || !decodedToken.id) {
      return res.status(500).json({ message: "Unauthoried" });
    }
    const userId = decodedToken.id;
    const lastBalance = await SavingsSch.findOne(
      { userId: userId },
      {},
      { sort: { date: -1 } }
    );
    const currDate = new Date().toDateString();
    // const fakeDate = new Date("2023-10-20");
    // const currDate = fakeDate.toDateString();

    if (lastBalance && currDate !== lastBalance.date.toDateString()) {
      saving += lastBalance.saving;
      lastBalance.saving = saving;
      console.log(lastBalance.saving + "db");
      lastBalance.date = new Date();
      //   const newBalance = new SavingsSch({
      //     saving: saving,
      //     date: new Date(),
      //   });
      await lastBalance.save();
      res.status(200).json({ message: " Done" });
    } else if (lastBalance === null) {
      const newBalance = new SavingsSch({
        saving: saving,
        date: new Date(),
        userId,
      });
      await newBalance.save();
      res.status(200).json({ message: " saved new balance " });
    } else {
      res.status(500).json({ message: "failed bc" });
    }
    // const newBalance = new SavingsSch({
    //   saving: saving,
    // });
  } catch (error) {
    console.log(error);
    res.json({ error: "oopssiii" });
  }
});

router.put("/dec", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret123");
    if (!decodedToken || !decodedToken.id) {
      return res.status(500).json({ message: "Unauthoried" });
    }
    const userId = decodedToken.id;
    const lastBalance = await SavingsSch.findOne(
      { userId: userId },
      {},
      { sort: { date: -1 } }
    );
    let saving = req.body.saving;
    saving += lastBalance.saving;
    const updatedBalance = await SavingsSch.findOneAndUpdate(
      { userId: userId },
      { $set: { saving: saving } },
      { new: true }
    );
    res.json(updatedBalance);
  } catch (error) {
    res.status(501).json(error);
  }
});

module.exports = router;
