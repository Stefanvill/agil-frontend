import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { http, HttpResponse } from "msw";
import App from "../App";
import { server } from "../mocks/server";

describe("App with MSW", () => {
  beforeEach(() => {
    sessionStorage.setItem("access_token", "fake-token");
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("shows products for a logged in user", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", { name: "Laptop" })
    ).toBeInTheDocument();
  });

  it("shows an error message when fetching fails", async () => {
    server.use(
      http.get("*/products", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Could not load the products.")).toBeInTheDocument();
  });
});