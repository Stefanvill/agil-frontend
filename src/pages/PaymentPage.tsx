import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const customerInfo = location.state?.customerInfo;

  return (
    <div className="payment-page">
      <h1>Payment</h1>

      <h2>Select Payment Method</h2>

      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>

        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="swish"
            checked={paymentMethod === "swish"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Swish
        </label>

        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="klarna"
            checked={paymentMethod === "klarna"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Klarna
        </label>
      </div>

      <div className="payment-buttons">
        <button
          className="payment-button"
          disabled={!paymentMethod}
          onClick={() =>
            navigate("/payment-result", {
              state: {
                success: true,
                paymentMethod,
                customerInfo,
              },
            })
          }
        >
          Pay
        </button>

        <button
          className="payment-button payment-button-failed"
          disabled={!paymentMethod}
          onClick={() =>
            navigate("/payment-result", {
              state: {
                success: false,
                paymentMethod,
                customerInfo,
              },
            })
          }
        >
          Test Failed Payment
        </button>
      </div>
    </div>
  );
}
