
type CookieBannerProps = {
  onClose: () => void;
};

const CookieBanner = ({ onClose }: CookieBannerProps) => {
  return (
    <section className="cookie-banner" aria-label="Information om cookies">
      <div className="cookie-banner-text">
        <strong>Nödvändiga cookies</strong>
        <p>
          Vi använder en nödvändig HttpOnly-cookie för att hantera din
          inloggning och ge säker åtkomst till skyddade funktioner.
          Cookien behövs för att tjänsten ska fungera och är inte ett
          frivilligt samtycke.
        </p>
      </div>

      <button
        type="button"
        className="cookie-banner-close"
        onClick={onClose}
        aria-label="Stäng cookie-informationen"
      >
        Stäng
      </button>
    </section>
  );
};

export default CookieBanner;
