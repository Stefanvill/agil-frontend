import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { restoreSession } from "../service/authService";

vi.mock("../service/authService", () => ({
  restoreSession: vi.fn(),
}));

function TestComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (!user) {
    return <p>Utloggad</p>;
  }

  return (
    <div>
      <p>Användare: {user.subject}</p>
      <p>Roller: {user.roles.join(", ")}</p>
    </div>
  );
}

describe("AuthContext - återställning av användare", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("återställer användaren när /auth/me svarar med en användare", async () => {
    vi.mocked(restoreSession).mockResolvedValue({
      expiresIn: 3600,
      subject: "admin@test.se",
      roles: ["ADMIN"],
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(await screen.findByText("Användare: admin@test.se")).toBeTruthy();
    expect(screen.getByText("Roller: ADMIN")).toBeTruthy();
  });

  it("betraktar användaren som utloggad när /auth/me svarar 401", async () => {
    vi.mocked(restoreSession).mockResolvedValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(await screen.findByText("Utloggad")).toBeTruthy();
  });
});
