import "./navBar.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navBar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { IconContext } from "react-icons/lib";
import { LoginContext } from "../Context/LoginContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Navbar() {
  // all useStates
  const [click, setClick] = useState(false);
  const [login, setLogIn] = useState();
  const [myName, setMyName] = useState(user?.name || users?.name);

// data from localStorage and context api
  const users = JSON.parse(localStorage.getItem("user"));
  const { user, userName } = useContext(LoginContext);
  const navigate = useNavigate();
  
  // handle click functions
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // user name checker
  useEffect(() => {
    setMyName(userName ? userName : users?.name);
  }, [users?.name, userName]);

  // set user info
  useEffect(() => {
    setLogIn(user);
  }, [user]);


  //  user logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/",window.scrollTo(0,0));
    setLogIn(!user);
  };
  const submit = () => {
    confirmAlert({
      message: "Are you sure to log out?",
      confirmLabel: "Yes",
      cancelLabel: "Cancel",
      onConfirm: handleLogout,
      onCancel: setLogIn(user),
    });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "orange" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <h2>
                <span>T</span>RAVEL
                <span className="together">GETHER</span>
              </h2>
              <SiYourtraveldottv className="navbar-icon" size={28} />
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  About Us
                </NavLink>
              </li>
              {login ? (
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                    style={{ textTransform: "capitalize" }}
                  >
                    {myName}
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {!login && (
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    <span>Register</span>
                  </NavLink>
                </li>
              )}
              {login ? (
                <li className="nav-item nav-links">
                  <span
                    onClick={() => {
                      submit(), closeMobileMenu();
                    }}
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={"my-create-btn"}
                    onClick={closeMobileMenu}
                  >
                    Create Review
                  </Link>
                </li>
              )}
              {login && (
                <li className="nav-item">
                  <Link
                    to="/createReview"
                    className={"my-create-btn"}
                    onClick={closeMobileMenu}
                  >
                    Create Review
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
