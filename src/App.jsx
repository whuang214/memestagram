import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Feed from "./pages/FeedPage/Feed";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  console.log("user->", user);

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  // if there is no user than only render the following routes
  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage onSignupOrLogin={handleSignupOrLogin} />}
        />
        {/* Redirect if user is not logged in */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<Feed user={user} />} />
    </Routes>
  );
}
