import { useNavigate, useLocation } from "react-router";
import { mockOrder, mockTotal } from "../data/mockData";

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentMethod = location.state?.paymentMethod;
  const customerInfo = location.state?.customerInfo;

  const paymentMethodLabels: Record<string, string> = {
    card: "Card",
    swish: "Swish",
    klarna: "Klarna",
  };

  const paymentMethodLabel =
    paymentMethodLabels[paymentMethod] ?? "Not specified";

  const orderCreated = new Date().toLocaleString("en-SE", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="order-confirmation-page">
      <h1>Thank you for your order!</h1>

      <p>
        Your order is confirmed and the payment has been processed! You will
        receive a confirmation email at <strong>{customerInfo?.email}</strong>.
      </p>

      <div className="confirmation-section">
        <h2>Order Information</h2>

        <p>
          <strong>Order Number:</strong> {mockOrder.orderId}
        </p>

        <p>
          <strong>Order Created:</strong> {orderCreated}
        </p>

        <p>
          <strong>Payment Method:</strong> {paymentMethodLabel}
        </p>
      </div>

      <div className="confirmation-section">
        <h2>Shipping to</h2>

        <p>
          {customerInfo?.name}
          <br />
          {customerInfo?.address}
        </p>
      </div>

      <div className="confirmation-section">
        <h2>Your Order</h2>

        <div className="order-summary">
          <div className="order-item order-header">
            <strong>
              {mockOrder.items.length === 1 ? "Product" : "Products"}
            </strong>
            <strong>Quantity</strong>
            <strong>Price</strong>
          </div>

          {mockOrder.items.map((item) => (
            <div className="order-item" key={item.name}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.price * item.quantity} kr</span>
            </div>
          ))}

          <div className="order-total">
            <strong>Total</strong>
            <strong>{mockTotal} kr</strong>
          </div>
        </div>
      </div>

      <button className="payment-button" onClick={() => navigate("/")}>
        Back to Homepage
      </button>
    </div>
  );
}
