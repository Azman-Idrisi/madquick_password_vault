"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "./AuthContext";
import ThemeToggle from "./ThemeToggle";

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const success = await register(email, password);
      if (!success) setError("Registration failed. Email might already be in use.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--color-surface-pearl)",
    color: "var(--color-ink)",
    borderColor: "var(--color-hairline)",
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
            Create your account
          </h1>

          <div
            className="mx-auto rounded-[18px] p-6 border"
            style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[11px] text-[17px] outline-none border focus:border-[var(--color-primary)]"
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-[11px] text-[17px] outline-none border focus:border-[var(--color-primary)]"
                  style={inputStyle}
                  placeholder="Min 6 characters"
                />
              </div>

              <div>
                <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[11px] text-[17px] outline-none border focus:border-[var(--color-primary)]"
                  style={inputStyle}
                  placeholder="Confirm your password"
                />
              </div>

              {error && (
                <div className="rounded-[11px] p-3 border" style={{ background: "rgba(255,59,48,0.08)", borderColor: "rgba(255,59,48,0.25)" }}>
                  <p className="text-[14px]" style={{ color: "#ff3b30" }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-[17px] active:scale-95 transition-transform disabled:opacity-50"
                style={{ background: "var(--color-primary)", color: "#ffffff" }}
              >
                {loading ? "Creating account..." : "Create account"}
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
                className="w-full py-3 rounded-full text-[17px] border active:scale-95 transition-transform"
                style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
