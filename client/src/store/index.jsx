import { createStore } from "redux";
const saving = parseInt(localStorage.getItem("savings")) || 0;
console.log(typeof saving);
console.log("c");
const reducerFn = (state = { savings: saving }, action) => {
  if (action.type === "ADD") {
    console.log("call");
    const newSavings = Number(state.savings) + Number(action.payload.balance);
    localStorage.setItem("savings", newSavings);

    // localStorage.clear("savings");
    console.log(localStorage);
    return { savings: newSavings };
  }
  if (action.type === "INC") {
    const newSavings = Number(state.savings) + Number(action.payload);
    localStorage.setItem("savings", newSavings);
    return { savings: newSavings };
  }
  if (action.type === "DEC") {
    const newSavings =
      Number(state.savings) - Number(action.payload) > 0
        ? Number(state.savings - action.payload)
        : 0;
    localStorage.setItem("savings", newSavings);
    return { savings: newSavings };
  }
  return state;
};

const store = createStore(reducerFn);
export default store;
