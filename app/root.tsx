import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css"; // THIS LINE IS REQUIRED

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}