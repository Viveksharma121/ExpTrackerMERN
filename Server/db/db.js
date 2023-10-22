const mongoose = require("mongoose");

const db = async () => {
  try {
    //connect mongo
    mongoose.set("strictQuery", false);
    mongoose

      .connect(
        "mongodb+srv://vivekksharma369:2n0ueCrilfVTtust@cluster0.jmgm8et.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          bufferCommands: false,
        }
      )
      .then(() => {
        console.log("Db connected");
      })
      .catch((error) => {
        console.error("Failed to connect db" + error);
      });
  } catch (error) {
    console.log("DB Connection failed" + error);
  }
};
const transactionSchema = new mongoose.Schema({
  text: String,
  Amt: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
});

const IncomeSchema = new mongoose.Schema({
  Income: Number,
});
const ExpSchema = new mongoose.Schema({
  Expense: Number,
});

const BalanceSchema = new mongoose.Schema({
  Balance: Number,
});

const SavingsSchema = new mongoose.Schema({
  saving: Number,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const SavingSchema = new mongoose.Schema({
  saving: Number,
  date: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const IncomeSch = mongoose.model("Income", IncomeSchema);
const Exp = mongoose.model("Expense", ExpSchema);
const Balance = mongoose.model("Balance", BalanceSchema);
const savings = mongoose.model("Saving", SavingsSchema);
const Users = mongoose.model("UserData", UserSchema);
const SavingsSch = mongoose.model("Savings", SavingSchema);

module.exports = {
  db,
  Transaction,
  IncomeSch,
  Balance,
  Exp,
  savings,
  Users,
  SavingsSch,
};
