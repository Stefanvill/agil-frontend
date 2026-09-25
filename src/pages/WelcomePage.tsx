export function WelcomePage() {
  const username = sessionStorage.getItem("username");

  return <h1>Hello {username}, welcome back!</h1>;
}
