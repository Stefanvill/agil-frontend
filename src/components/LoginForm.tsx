import { useState } from "react";
import { login } from "../service/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({
        username,
        password,
      });
      sessionStorage.setItem("username", username);
      navigate("/welcome");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Något gick fel vid inloggningen.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        required
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        required
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        bg-blue-600
        text-white
        rounded-lg
        px-4
        py-2
        hover:bg-blue-700
        disabled:bg-gray-400
      >
        {loading ? "Loggar in..." : "Logga in"}
      </button>

      {error && (
        <p role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </form>
  );
}
