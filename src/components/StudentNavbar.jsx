import { Link } from "react-router-dom";

function StudentNavbar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#0b72ff",
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>

      <Link to="/weekly-menu" style={{ color: "white" }}>
        Weekly Menu
      </Link>

      <Link to="/history" style={{ color: "white" }}>
        Meal History
      </Link>

      <Link to="/profile" style={{ color: "white" }}>
        Profile
      </Link>

      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default StudentNavbar;