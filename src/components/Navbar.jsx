import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");

  alert("Logged Out Successfully");

  navigate("/login");
};
  return (
    <nav className="navbar">

      <h2 className="logo">🍽️ OptiMeal</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/orders">Orders</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">Signup</Link>

        <Link to="/admin">Admin</Link>

        {/*Logout Button */}
        <button onClick={handleLogout}>
  Logout
</button>

      </div>

    </nav>
  );
}

export default Navbar;