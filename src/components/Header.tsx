import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Grupp 1 - WebShop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
