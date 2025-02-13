import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the external CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/login">
            Login
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link className="navbar-link" to="/dashboard">
            Dashboard
          </Link>
        </li> */}
        <li className="navbar-item">
          <Link className="navbar-link" to="/search">
            Search
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
