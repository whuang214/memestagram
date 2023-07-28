import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Feed from "./pages/FeedPage/Feed";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  // console.log("user->", user);

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

  // if there is a user than render the following routes
  return (
    <Routes>
      <Route
        path="/"
        element={<Feed currentUser={user} onLogout={handleLogout} />}
      />
      <Route path="/user">
        <Route path=":username" element={<ProfilePage currentUser={user} />} />
      </Route>
      <Route path="/*" element={<h1>Error: 404 Not Found</h1>} />
    </Routes>
  );
}
