import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Savings from "./components/Savings";
import Reg from "./components/loginReg/Reg";
import Login from "./components/loginReg/login";

function App() {
  console.log("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/" element={<Login />} />
        </Routes>
        <Savingbutton />
      </BrowserRouter>
    </>
  );
}

function Savingbutton() {
  const location = useLocation();
  if (location.pathname === "/savings") {
    return null;
  }
  return (
    <Link to="/savings">
      <button> Go to Savings</button>
    </Link>
  );
}

export default App;
