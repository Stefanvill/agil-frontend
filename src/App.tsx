import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import AboutPage from "./pages/AboutPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { AdminPage } from "./pages/AdminPage";
import AdminProductPage from "./pages/AdminProductPage";
import { PaymentPage } from "./pages/PaymentPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PaymentResultPage } from "./pages/PaymentResultPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import CookieBanner from "./components/CookieBanner";

function HomePage() {
  return (
    <section className="home-page">
      <h1>Welcome to our WebShop!</h1>
      <p>
        Welcome to our webshop, where you can explore our products
        and enjoy a simple shopping experience.
      </p>
      <p>
        Please log in to browse our products, view product details,
        and add items to your shopping cart.
      </p>
    </section>
  );
}

function App() {
  const [cookieInfoOpen, setCookieInfoOpen] = useState(
    () => localStorage.getItem("cookieInfoDismissed") !== "true",
  );

  function closeCookieInfo() {
    localStorage.setItem("cookieInfoDismissed", "true");
    setCookieInfoOpen(false);
  }

  function openCookieInfo() {
    setCookieInfoOpen(true);
  }

  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<TestPage />} />
           
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetailPage />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer onCookieInfoClick={openCookieInfo} />
        {cookieInfoOpen && <CookieBanner onClose={closeCookieInfo} />}
      </div>
    </AuthProvider>
  );
}

export default App;
