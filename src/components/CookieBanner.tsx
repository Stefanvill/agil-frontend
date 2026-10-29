type CookieBannerProps = {
  onClose: () => void;
};

const CookieBanner = ({ onClose }: CookieBannerProps) => {
  return (
    <section className="cookie-banner" aria-label="Information about cookies">
      <div className="cookie-banner-text">
        <strong>Necessary cookies</strong>
        <p>
          We use a necessary HttpOnly cookie to manage your login and provide
          secure access to protected features. This cookie is required for the
          service to function and does not constitute optional consent.
        </p>
      </div>

      <button
        type="button"
        className="cookie-banner-close"
        onClick={onClose}
        aria-label="Close cookie-information"
      >
        Close
      </button>
    </section>
  );
};

export default CookieBanner;
