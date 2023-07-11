import "./navbar.scss";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);

    return () => (window.onscroll = null);
  };

  const handleNav = () => {
    setIsScrolled(!isScrolled);
    setMenuOpen(!menuOpen);
  };

  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div
          className={menuOpen ? "hamburger active" : "hamburger"}
          onClick={handleNav}
        >
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </div>
        <div className="user">
          {user && <div className="name">{user.username} </div>}
          {user ? (
            <span onClick={handleLogout}>SIGN OUT</span>
          ) : (
            <Link
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "inherit",
              }}
              to="/login"
            >
              <span>SIGN IN</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
