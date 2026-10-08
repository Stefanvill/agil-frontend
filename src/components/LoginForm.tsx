import { useState } from "react";
import { login } from "../service/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginResponse = await login({
        username,
        password,
      });

      sessionStorage.setItem("username", username);
      sessionStorage.setItem(
        "loginResponse",
        JSON.stringify(loginResponse)
      );

      navigate("/welcome");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong while logging in.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">

      <div className="login-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>

      <div className="login-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>

      {error && (
        <p role="alert" className="login-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="login-button"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

    </form>
  );
}