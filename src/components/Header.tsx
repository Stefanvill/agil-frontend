import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasRole, logout } from "../service/authService";

export function Header() {
  useLocation();
  const navigate = useNavigate();

  const isAdmin = hasRole("ADMIN");
  const isUser = hasRole("USER");
  const hasAccess = isAdmin || isUser;

  const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <header className="header">
      <h1>Group 1 - WebShop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {hasAccess && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/logout" onClick={handleLogout}>
              Logout
            </Link>

            {isAdmin && <Link to="/admin">Admin</Link>}
          </>
        )}

        {!hasAccess && <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
}
