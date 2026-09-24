import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />





        </Routes>


      </main>

      <Footer />
    </>
  );
}

export default App;
