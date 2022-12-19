import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import UserContext from "./context/userContext";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <ToastContainer />
      <Navbar user={currentUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies user={currentUser} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/movies/:id" element={<MovieForm />} />
          </Route>
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<LoginForm user={currentUser} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
