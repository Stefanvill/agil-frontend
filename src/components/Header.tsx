import { Link, useNavigate } from "react-router";
import { logout } from "../service/authService";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const navigate = useNavigate();

  const { user, loading, setUser } = useAuth();

  const isAdmin = user?.roles.includes("ADMIN") ?? false;
  const isUser = user?.roles.includes("USER") ?? false;
  const hasAccess = isAdmin || isUser;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <h1>Group 1 - WebShop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!loading && (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
}
