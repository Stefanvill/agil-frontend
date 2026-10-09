import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { AdminPage } from "./pages/AdminPage";
import AdminProductPage from "./pages/AdminProductPage";
import { PaymentPage } from "./pages/PaymentPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PaymentResultPage } from "./pages/PaymentResultPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

function HomePage() {
  return <h1>Home page</h1>;
}

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-result" element={<PaymentResultPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/product"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-result"
            element={
              <ProtectedRoute>
                <PaymentResultPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
