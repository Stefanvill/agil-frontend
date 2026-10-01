import { useState } from "react";
import {
  createProduct,
  type CreateProductRequest,
} from "../service/productService";

type ProductFormProps = {
  onSuccess: () => void;
};

function ProductForm({ onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "price" || name === "stock"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    
    if (!formData.name.trim()) {
      setError("Namn måste anges.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Beskrivning måste anges.");
      return;
    }

    if (formData.price <= 0) {
      setError("Priset måste vara större än 0.");
      return;
    }

    if (formData.stock < 0) {
      setError("Lagersaldo kan inte vara negativt.");
      return;
    }

    try {
      setLoading(true);

      await createProduct(formData);

      setSuccess("Produkten skapades!");

      onSuccess();
    } catch (error) {
      setError("Det gick inte att skapa produkten.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Namn</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description">Beskrivning</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="price">Pris</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="stock">Lagersaldo</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Skapar produkt..." : "Skapa produkt"}
      </button>
    </form>
  );
}

export default ProductForm;