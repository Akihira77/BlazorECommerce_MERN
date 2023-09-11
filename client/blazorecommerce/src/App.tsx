import "./App.css";
import Header from "./pages/Header.tsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Header/Login.tsx";
import Register from "./components/Header/Register.tsx";

function App() {
  return (
    <>
      <div className="container-fluid bg-light border">
        <Header />
      </div>
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
