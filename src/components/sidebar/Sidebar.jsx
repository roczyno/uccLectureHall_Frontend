import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={menuOpen ? "sidebar active" : "sidebar"}>
      <ul>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/"
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/calc"
          >
            CALC
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/nlt"
          >
            NLt
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/lt"
          >
            LT
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/swlt"
          >
            SWLT
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            className="link"
            to="/code"
          >
            CODE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
