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
      <h1>Grupp 1 - WebShop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {hasAccess && (
          <>
            <Link to="/products">Products</Link>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>

            {isAdmin && <Link to="/admin">Admin</Link>}
          </>
        )}

        {!hasAccess && <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
}
