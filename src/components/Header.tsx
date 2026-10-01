import { Link, useLocation } from "react-router-dom";
import { hasRole } from "../service/authService";

export function Header() {
  useLocation();

  const isAdmin = hasRole("ADMIN");
  const isUser = hasRole("USER");
  const hasAccess = isAdmin || isUser;

  return (
    <header className="header">
      <h1>Grupp 1 - WebShop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {hasAccess && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/logout">Logout</Link>

            {isAdmin && <Link to="/admin">Admin</Link>}
          </>
        )}

        {!hasAccess && <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
}
