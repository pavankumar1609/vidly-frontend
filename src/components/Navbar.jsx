import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/customers" className="nav-link">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rentals" className="nav-link">
                Rentals
              </NavLink>
            </li>
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
