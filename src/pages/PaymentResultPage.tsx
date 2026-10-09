import { useNavigate, useLocation } from "react-router";

export function PaymentResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentSuccessful = location.state?.success;
  const paymentMethod = location.state?.paymentMethod;
  const customerInfo = location.state?.customerInfo;

  return (
    <div
      className={`payment-result-page ${
        paymentSuccessful ? "payment-success" : "payment-failed"
      }`}
    >
      {paymentSuccessful ? (
        <>
          <h1>Payment Successful!</h1>

          <p>Your payment has been processed.</p>

          <button
            className="payment-button"
            onClick={() =>
              navigate("/order-confirmation", {
                state: { paymentMethod, customerInfo },
              })
            }
          >
            View Order Confirmation
          </button>
        </>
      ) : (
        <>
          <h1>Payment Failed</h1>

          <p>Something went wrong with the payment.</p>

          <button
            className="payment-button payment-button-failed"
            onClick={() => navigate("/payment", { state: { customerInfo } })}
          >
            Please try again
          </button>
        </>
      )}
    </div>
  );
}
