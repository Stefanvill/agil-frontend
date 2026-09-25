import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import { WelcomePage } from "./pages/WelcomePage";

function HomePage() {
  return <h1>Home page</h1>;
}

function ProductsPage() {
  return <h1>Products page</h1>;
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
