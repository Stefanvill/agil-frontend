import type { LoginResponse } from "../types/auth";

export function WelcomePage() {
  const storedResponse = sessionStorage.getItem("loginResponse");

  if (storedResponse === null) {
    return <h1>No logged-in user found.</h1>;
  }

  const loginResponse: LoginResponse = JSON.parse(storedResponse);

  return (
    <div>
      <h1>Hello {loginResponse.subject}, welcome back!</h1>
      <p>Roles: {loginResponse.roles.join(", ")}</p>
    </div>
  );
}
