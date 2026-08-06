"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import ThemeToggle from "./ThemeToggle";

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) setError("Invalid email or password");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen relative px-4" style={{ background: "var(--color-canvas-parchment)" }}>
      <div className="absolute top-6 left-6 flex items-center gap-2 select-none">

        <span className="text-[22px] font-semibold" style={{ color: "var(--color-ink)" }}>TreePass</span>
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1
            className="text-center mb-8 font-semibold"
            style={{ fontSize: 34, letterSpacing: "-0.374px", color: "var(--color-ink)" }}
          >
            Sign in to your account
          </h1>

          <div
            className="mx-auto rounded-[18px] p-6 border"
            style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] mb-1.5 font-normal" style={{ color: "var(--color-ink-muted-48)" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[11px] text-[17px] outline-none border focus:border-[var(--color-primary)]"
                  style={{ background: "var(--color-surface-pearl)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" }}
                  placeholder="you@example.com"
                />
              </div>

              <div className="relative">
                <label className="block text-[12px] mb-1.5 font-normal" style={{ color: "var(--color-ink-muted-48)" }}>
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-10 rounded-[11px] text-[17px] outline-none border focus:border-[var(--color-primary)]"
                  style={{ background: "var(--color-surface-pearl)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3"
                  style={{ color: "var(--color-ink-muted-48)" }}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>

              {error && (
                <div className="rounded-[11px] p-3 border" style={{ background: "rgba(255,59,48,0.08)", borderColor: "rgba(255,59,48,0.25)" }}>
                  <p className="text-[14px]" style={{ color: "#ff3b30" }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full font-normal text-[17px] active:scale-95 transition-transform disabled:opacity-50"
                style={{ background: "var(--color-primary)", color: "#ffffff" }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: "var(--color-hairline)" }}></div></div>
                <div className="relative flex justify-center text-[12px]">
                  <span className="px-2" style={{ background: "var(--color-canvas)", color: "var(--color-ink-muted-48)" }}>or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleMode}
                className="w-full py-3 rounded-full font-normal text-[17px] border active:scale-95 transition-transform"
                style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
