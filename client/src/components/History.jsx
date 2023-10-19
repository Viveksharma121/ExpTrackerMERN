import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import Balance from "./Balance";
import IncomeExp from "./IncomeExp";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function History() {
  console.log("his");
  const savings = useSelector((state) => state.savings);
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [balance, setbalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [hasAddedSavingsToday, setHasAddedSavingsToday] = useState(
    localStorage.getItem("hasSavingsToday") === "false"
  );
  let x;
  useEffect(() => {
    fetchTransactions();
    console.log(balance + " b");
    const lastResetDate = localStorage.getItem("lastResetDate");
    console.log(lastResetDate);
    const currentDate = new Date().toLocaleDateString();
    const isoLastResetDate = new Date(lastResetDate).toISOString();
    const isoCurrentDate = new Date(currentDate).toISOString();

    console.log(isoCurrentDate);
    console.log(isoLastResetDate);
    console.log(x + "x");
    console.log(localStorage.getItem("totalBalance") + " total from loc stor");
    console.log(balance + "bbb");
    // if (isoLastResetDate === isoCurrentDate) {
    //   // fetchTransactions();
    //   // console.log(totalIncome + "income " + totalExpense + " expense");
    //   // Addsavings();
    //   setHasAddedSavingsToday(true);
    //   // deleteAllTransactions();
    //   localStorage.setItem("hasSavingsToday", "true");
    //   localStorage.setItem("lastResetDate", currentDate);
    // } // } else if (lastResetDate !== currentDate) {
    //   console.log("yeah");
    //   localStorage.setItem("hasSavingsToday", "false");
    // }
  }, []);

  const fetchTransactions = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://exp-tracker-mern.vercel.app/api/products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      let totalBalance = 0;

      data.forEach((transaction) => {
        const { Amt } = transaction;
        totalBalance += Amt;
      });

      // Calculate 'balance' based on 'totalBalance'
      setbalance(totalBalance);
      console.log(totalBalance + " balance hai ");
      setTransactions(data);
      // Update 'localStorage' with the new 'totalBalance'
      localStorage.setItem("totalBalance", totalBalance);

      // Dispatch an action to update the Redux store with the new 'totalBalance'
      // localStorage.clear("totalBalance");
    } catch (error) {
      console.log(error);
    }
  };

  const clrLocal = () => {
    localStorage.clear("hasSavingsToday");
    // localStorage.clear("savings");
    // localStorage.clear("totalBalance");
    console.log(localStorage.getItem("hasSavingsToday"));
    // localStorage.clear("savings");
    // localStorage.clear
  };
  useEffect(() => {
    calculateTotal();
  }, [transactions]);

  const addTransaction = (text, Amt) => {
    const newTransaction = {
      id: uuidv4(),
      text,
      Amt,
    };
    console.log(balance + " before");
    setbalance((prevBalance) => prevBalance + Amt);
    console.log(balance + " after");
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `https://exp-tracker-mern.vercel.app/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== id
        );
        setTransactions(updatedTransactions);
      } else {
        console.error("Failed to delete the transaction");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function calculateTotal() {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.Amt >= 0) {
        income += Number(transaction.Amt);
      } else {
        expense += Number(transaction.Amt);
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }
  // const deleteAllTransactions = async () => {
  //   try {
  //     console.log("Deleting all transactions...");
  //     const response = await fetch("http://localhost:5000/transactions", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       console.log("All transactions deleted successfully.");
  //     } else {
  //       console.error("Failed to delete transactions.");
  //     }
  //   } catch (error) {
  //     console.error("Error while deleting transactions:", error);
  //   }
  // };

  // const Addsavings = () => {
  //   console.log("Addsavings function called");
  //   const date = new Date();
  //   const hour = date.getHours();
  //   const min = date.getMinutes();

  //   // Check if savings have already been added today
  //   if (!hasAddedSavingsToday) {
  //     // Calculate the new income and expense
  //     const updatedIncome = totalIncome + 300;
  //     const updatedExpense = totalExpense + 10;
  //     const balance = updatedIncome - updatedExpense;

  //     // Dispatch the action to update Redux state
  //     dispatch({ type: "ADD", payload: balance });
  //     console.log("Balance:", balance);

  //     // Update local state to prevent further savings for the day
  //     setHasAddedSavingsToday(true);
  //   }
  // };

  // useEffect(() => {
  //   if (hasAddedSavingsToday) {
  //     const updatedIncome = totalIncome + 300;
  //     const updatedExpense = totalExpense + 10;
  //     const balance = updatedIncome - updatedExpense;

  //     // Dispatch the action to update Redux state
  //     dispatch({ type: "ADD", payload: balance });
  //     console.log(balance);
  //   }
  // }, [hasAddedSavingsToday, totalIncome, totalExpense]);

  // useEffect(() => {
  //   const date = new Date();
  //   const hour = date.getHours();
  //   const min = date.getMinutes();
  //   console.log(`Current time - Hour: ${hour}, Minute: ${min}`);
  //   console.log(`hasAddedSavingsToday: ${hasAddedSavingsToday}`);

  //   if (hour >= 4 && !hasAddedSavingsToday) {
  //     console.log("Updating savings...");
  //     Addsavings();
  //     setHasAddedSavingsToday(true);
  //   }
  // }, []); // Empty dependency array to run the effect only once when the component mounts

  // console.log("Current savings in Redux store:", savings);

  return (
    <div>
      <Balance totalIncome={totalIncome} totalExpense={totalExpense} />
      <IncomeExp totalIncome={totalIncome} totalExpense={totalExpense} />
      <h3>Transaction History</h3>
      {/* <div>History</div> */}
      <div>
        <ul className="list">
          {/* {console.log(transactions)} */}
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <span>{transaction.text}</span>{" "}
              <span className={transaction.Amt >= 0 ? "income" : "expense"}>
                {transaction.Amt >= 0 ? "+" : "-"} ₹{Math.abs(transaction.Amt)}
              </span>
              {/* <button
                className="del-btn"
                onClick={() => deleteTransaction(transaction._id)}
              >
                Delete
              </button> */}
              <button
                className="del-btn"
                onClick={() => deleteTransaction(transaction._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <Transaction onAddTransaction={addTransaction} />
      </div>
      <button onClick={clrLocal}>ll dell</button>
    </div>
  );
}

export default History;
