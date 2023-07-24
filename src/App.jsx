import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/HomePage/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Routh path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
