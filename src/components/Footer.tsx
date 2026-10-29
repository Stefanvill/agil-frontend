
type FooterProps = {
  onCookieInfoClick: () => void;
};

const Footer = ({ onCookieInfoClick }: FooterProps) => {
  return (
    <footer className="footer">
      <p>© 2026 Group 1 - WebShop. All rights reserved.</p>
      <button
        type="button"
        className="cookie-info-link"
        onClick={onCookieInfoClick}
      >
        Information about cookies
      </button>
    </footer>
  );
};

export default Footer;
