import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./savings.css";

function Savings() {
  console.log("h");
  useEffect(() => {
    fetchSavings();
  }, []);
  const [data, setdata] = useState(0);
  const fetchSavings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios({
          method: "GET",
          url: "https://exp-tracker-mern.vercel.app/api/save",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const Savingsdata = response.data.savings.saving;
        setdata(Savingsdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("savings " + savings);
  const [amount, setAmount] = useState();
  const [increase, setIncrease] = useState();
  const [transaction, settransaction] = useState([]);

  const dispatch = useDispatch();
  const MAX_TRANSACTIONS = 3;
  const IncSavings = async () => {
    settransaction([
      `Credited ${increase} rupees`,
      ...transaction.slice(0, MAX_TRANSACTIONS - 1),
    ]);
    setAmount(0);
    setIncrease(0);
    try {
      const token = localStorage.getItem("token");
      // const userId=getId
      const response = await fetch(
        "https://exp-tracker-mern.vercel.app/api/save/dec",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ saving: +increase }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    setIncrease(e.target.value);
  };

  const removeSavings = async () => {
    settransaction([
      `Debited ${amount} rupees`,
      ...transaction.slice(0, MAX_TRANSACTIONS - 1),
    ]);
    setIncrease(0);
    setAmount(0);
    try {
      const token = localStorage.getItem("token");
      // const userId=getId
      const response = await fetch(
        "https://exp-tracker-mern.vercel.app/api/save/dec",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ saving: amount < 0 ? +amount : -amount }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(...transaction);
    dispatch({ type: "DEC", payload: amount });
  };

  return (
    <div className="container">
      <div className="title-div">
        <h2>Savings Page</h2>
      </div>

      <div className="center-container">
        <div className="amount-container">
          <span className="savings-amount"> ₹{data}</span>
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul className="list">
          {transaction.map((transactionItem, index) => {
            const isIncrease = transactionItem.includes("Credited");
            const listItemClass = isIncrease ? "plus" : "minus";

            return (
              <li key={index} className={listItemClass}>
                <span>{transactionItem}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <input
        className="input"
        type="number"
        value={amount}
        onChange={handleChange}
        placeholder="Amt u wanna delete"
      />
      <br />
      <button className="savings-btn" onClick={removeSavings}>
        Dec saving
      </button>
      <button className="savings-btn" onClick={IncSavings}>
        Inc saving
      </button>

      <br />

      <button>Go Back</button>
    </div>
  );
}

export default Savings;
