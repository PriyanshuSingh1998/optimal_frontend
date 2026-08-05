import { Link } from "react-router-dom";

function AdminNavbar() {

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
        background: "#222",
        color: "white",
      }}
    >
      <Link to="/admin" style={{ color: "white" }}>
        Dashboard
      </Link>

      <Link to="/admin/menu" style={{ color: "white" }}>
        Weekly Menu
      </Link>

      <Link to="/admin/students" style={{ color: "white" }}>
        Students
      </Link>

      <Link to="/admin/profile" style={{ color: "white" }}>
        Profile
      </Link>

      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;