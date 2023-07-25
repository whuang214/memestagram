import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Home from "./pages/HomePage/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import userService from "./utils/userService";

export default function App() {
  const [userObj, setUserObj] = useState(userService.getUser());
  console.log("userObj->", userObj);

  function handleSignupOrLogin() {
    setUserObj(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUserObj(null);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Home user={userObj} onLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage onSignupOrLogin={handleSignupOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage onSignupOrLogin={handleSignupOrLogin} />}
      />
    </Routes>
  );
}
