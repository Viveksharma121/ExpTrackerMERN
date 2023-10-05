import React from "react";

function IncomeExp({ totalIncome, totalExpense }) {
  const totalExp = -1 * totalExpense;
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{totalIncome}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₹{totalExp}</p>
      </div>
    </div>
  );
}

export default IncomeExp;
