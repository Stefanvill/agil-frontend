import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

function AdminProductPage() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/admin");
  }

  return (
    <div>
      <h1>Lägg till produkt</h1>

      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
}

export default AdminProductPage;