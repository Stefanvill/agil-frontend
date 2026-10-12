import { useState } from "react";
import { useNavigate } from "react-router";
import { mockOrder, mockTotal } from "../data/mockData";

export function CheckoutPage() {
  const navigate = useNavigate();

  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      address: "",
    };

    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (customerInfo.name.trim().split(/\s+/).length < 2) {
      newErrors.name = "Please enter your first and last name.";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "E-mail is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (customerInfo.address.trim().length < 5) {
      newErrors.address = "Please enter a valid address.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.address;
  };

  const handleContinueToPayment = () => {
    if (!validateForm()) {
      return;
    }

    navigate("/payment", {
      state: {
        customerInfo,
      },
    });
  };

  const handleInputChange = (
    field: "name" | "email" | "address",
    value: string,
  ) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: "",
    });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {!showCustomerInfo ? (
        <>
          <h2>Order Summary</h2>

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

          <button
            className="payment-button"
            onClick={() => setShowCustomerInfo(true)}
          >
            Continue to Customer Information
          </button>
        </>
      ) : (
        <>
          <h2>Customer Information</h2>

          <div className="checkout-form">
            <div className="checkout-field">
              <label htmlFor="name">Name</label>

              <input
                id="name"
                type="text"
                placeholder="First and last name"
                value={customerInfo.name}
                className={errors.name ? "input-error" : ""}
                onChange={(event) =>
                  handleInputChange("name", event.target.value)
                }
              />

              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="checkout-field">
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                placeholder="Email"
                value={customerInfo.email}
                className={errors.email ? "input-error" : ""}
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
              />

              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="checkout-field">
              <label htmlFor="address">Address</label>

              <input
                id="address"
                type="text"
                placeholder="Your address"
                value={customerInfo.address}
                className={errors.address ? "input-error" : ""}
                onChange={(event) =>
                  handleInputChange("address", event.target.value)
                }
              />

              {errors.address && (
                <p className="field-error">{errors.address}</p>
              )}
            </div>

            <div className="checkout-buttons">
              <button
                className="payment-button payment-button-secondary"
                onClick={() => {
                  setShowCustomerInfo(false);
                  setErrors({
                    name: "",
                    email: "",
                    address: "",
                  });
                }}
              >
                Back to Order Summary
              </button>

              <button
                className="payment-button"
                onClick={handleContinueToPayment}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
