import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Shop</h1>

      <nav className="header-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
    </header>
  );
}

export default Header;
