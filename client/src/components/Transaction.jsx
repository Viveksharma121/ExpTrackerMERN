import React from "react";
import { useState } from "react";

function Transaction({ onAddTransaction }) {
  console.log("final");
  const [text, settext] = useState("");
  const [Amt, setAmt] = useState("");
  const handleTextChange = (e) => {
    settext(e.target.value);
    console.log(text);
  };
  const handleAmtChange = (e) => {
    setAmt(e.target.value);
  };
  const AddTransaction = async (e) => {
    e.preventDefault();

    if (Amt !== "") {
      try {
        const token = localStorage.getItem("token");
        // const userId=getId
        const response = await fetch(
          "https://exp-tracker-mern.vercel.app/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text, Amt }),
          }
        );

        const data = await response.json();
        onAddTransaction(data.text, data.Amt);
        settext("");
        setAmt("");
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please enter amount");
    }
  };

  return (
    <div>
      <label htmlFor="text" className="text">
        <h3>ADD NEW TRANSACTION</h3>
      </label>
      <br />
      <label htmlFor="text" className="text">
        Description:
      </label>
      <input
        type="text"
        id="text"
        placeholder="Enter text here...."
        value={text}
        onChange={handleTextChange}
      ></input>

      <label htmlFor="amount" className="Amt">
        Amount:
      </label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount here...."
        value={Amt}
        onChange={handleAmtChange}
      ></input>
      <br />
      <button className="button-33" onClick={AddTransaction}>
        ADD Transaction
      </button>
    </div>
  );
}

export default Transaction;
