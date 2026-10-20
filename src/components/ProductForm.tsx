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
    category: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!formData.imageUrl.trim()) {
      setError("Image URL is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (formData.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (formData.stock < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      await createProduct(formData);

      setSuccess("Product created!");


      onSuccess();
    } catch {
      setError("Could not create the product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
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
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor={"category"}>Category</label>
        <input
          id={"category"}
          name={"category"}
          type="text"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
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
        <label htmlFor="stock">Stock</label>
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
        {loading ? "Creating product..." : "Create product"}
      </button>
    </form>
  );
}

export default ProductForm;
