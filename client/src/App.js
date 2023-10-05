import "./App.css";
import Savings from "./components/Savings";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Main from "./components/Main";
import Reg from "./components/loginReg/Reg";
import Login from "./components/loginReg/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Savingbutton />
      </BrowserRouter>
    </>
  );
}

function Savingbutton(params) {
  const location = useLocation();
  if (location.pathname === "/savings") {
    return null;
  }
  return (
    <Link to="/savings">
      <button>Savings</button>
    </Link>
  );
}

export default App;
