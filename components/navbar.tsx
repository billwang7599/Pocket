import { auth0 } from "@/lib/auth0";
import { ClientNavbar } from "./client-navbar";

export default async function Navbar() {
    // Get authentication status from the server
    const session = await auth0.getSession();

    // Define navigation items based on authentication state
    const navItems = session
        ? [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Transactions", href: "/transactions" },
              { label: "Settings", href: "/settings" },
          ]
        : [
              { label: "Login", href: "/auth/login" },
              { label: "Register", href: "/auth/login" },
          ];

    // Define the home link based on authentication state
    const homeLink = session ? "/dashboard" : "/";

    return <ClientNavbar navItems={navItems} homeLink={homeLink} />;
}
