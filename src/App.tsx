import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main>{/* Current page or router outlet */}</main>

      <Footer />
    </div>
  );
}

export default App;
