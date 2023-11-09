import React, { useState } from "react";

function Transaction({ onAddTransaction }) {
  const [text, settext] = useState("");
  const [Amt, setAmt] = useState(0);
  const handleTextChange = (e) => {
    settext(e.target.value);
    console.log(text);
  };
  const handleAmtChange = (e) => {
    setAmt(parseFloat(e.target.value));
  };
  const AddTransaction = async (e) => {
    e.preventDefault();

    if (Amt !== "") {
      // console.log(Amt);

      try {
        const token = localStorage.getItem("token");
        // const userId=getId
        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text, Amt }),
        });

        const data = await response.json();
        console.log(data);
        onAddTransaction(data.text, parseFloat(data.Amt));
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
