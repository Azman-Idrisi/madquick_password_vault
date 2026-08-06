"use client";

import { useAuth } from "./AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      className="border-b"
      style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--color-primary)" }}
            >
              <svg className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold" style={{ color: "var(--color-ink)", letterSpacing: "-0.374px" }}>
              PassVault
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user && (
              <>
                <span className="text-[14px] hidden sm:inline" style={{ color: "var(--color-ink-muted-48)" }}>
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-[14px] rounded-full font-normal active:scale-95 transition-transform"
                  style={{ background: "var(--color-ink)", color: "var(--color-canvas)" }}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
