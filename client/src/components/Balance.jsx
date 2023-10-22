// import axios from "axios";
// import React from "react";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function Balance({ totalIncome, totalExpense }) {
//   const [hasAddedSavingsToday, setHasAddedSavingsToday] = useState(
//     localStorage.getItem("hasSavingsToday") === "false"
//   );
//   // const savings = useSelector((state) => state.savings);
//   // const dispatch = useDispatch();
//   const s = totalIncome + totalExpense;
//   // const Addsavings = () => {
//   //   const date = new Date();
//   //   const hour = date.getHours();
//   //   const min = date.getMinutes();
//   //   totalExpense = 10;
//   //   totalIncome = 30;
//   //   if (hour === 5 && min === 28) {
//   //     dispatch({ type: "INC", payload: { totalIncome, totalExpense } });
//   //   }
//   // };
//   // useEffect(() => {
//   //   const now = new Date();
//   //   const targetTime = new Date(now);
//   //   targetTime.setHours(5, 24, 0, 0); // Set the target time to 5:20 AM today

//   //   const timeUntilFiveTwenty = targetTime - now;

//   //   // Check if it's already past 5:20 AM today
//   //   if (timeUntilFiveTwenty <= 0) {
//   //     console.log("It's already past 5:20 AM today.");
//   //     console.log(totalExpense + " " + totalIncome);
//   //   } else {
//   //     console.log(
//   //       "Time until 5:20 AM today:",
//   //       timeUntilFiveTwenty / (60 * 1000),
//   //       "minutes"
//   //     );
//   //   }

//   //   const intervalId = setInterval(Addsavings, timeUntilFiveTwenty);
//   //   return () => clearInterval(intervalId);
//   // }, []);
//   useEffect(() => {
//     // console.log(balance + " b");
//     // const lastResetDate = localStorage.getItem("lastResetDate");
//     if (hasAddedSavingsToday == false && s > 0) {
//       Addsavings(s);
//     }
//     console.log(hasAddedSavingsToday);
//   }, [totalIncome, s]);

//   const Addsavings = async (s) => {
//     console.log("Addsavings function called" + s);
//     try {
//       // const balance = totalIncome + totalExpense;
//       const token = localStorage.getItem("token");
//       if (token) {
//         const response = await axios({
//           method: "post",
//           url: "https://exp-tracker-mern.vercel.app/api/save/save",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           data: {
//             saving: s,
//           },
//         });
//         const data = response.data;
//         if (data) {
//           localStorage.setItem("hasSavingsToday", "true");
//           setHasAddedSavingsToday(true);
//         }
//       } else {
//         console.log("token laaa pahele");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h4> Balance </h4>
//         <h2>
//           ₹
//           {totalIncome + totalExpense >= 0
//             ? (totalIncome + totalExpense).toFixed(2)
//             : (totalIncome + totalExpense).toFixed(2)}{" "}
//           {totalIncome + totalExpense < 0 && (
//             <>
//               <br />
//               <span>Your expenses are more. Focus on savings.</span>
//             </>
//           )}
//         </h2>
//         <button onClick={Addsavings}>but</button>
//       </div>
//     </div>
//   );
// }

// export default Balance;
