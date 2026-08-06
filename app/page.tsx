"use client";

import { useAuth } from "@/components/AuthContext";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import LoginForm from "@/components/LoginForm";
import PasswordGeneratorModal from "@/components/PasswordGeneratorModal";
import RegisterForm from "@/components/RegisterForm";
import ThemeToggle from "@/components/ThemeToggle";
import VaultSidebar from "@/components/VaultSidebar";
import { useState } from "react";

export default function Home() {
  const { token, loading, user, logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: "var(--color-canvas-parchment)" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--color-primary)" }}></div>
          <p style={{ color: "var(--color-ink-muted-48)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return showRegister ? (
      <RegisterForm onToggleMode={() => setShowRegister(false)} />
    ) : (
      <LoginForm onToggleMode={() => setShowRegister(true)} />
    );
  }


  return (
    <div className="min-h-screen" style={{ background: "var(--color-canvas-parchment)" }}>

      <div className="border-b px-6 py-3" style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">

              <span className="text-[22px] font-semibold" style={{ color: "var(--color-ink)" }}>TreePass - Vault</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-full text-[14px] flex items-center space-x-2 active:scale-95 transition-transform"
              style={{ background: "var(--color-primary)", color: "#ffffff" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New</span>
            </button>
            <button
              onClick={() => setShowGenerator(true)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--color-ink-muted-48)" }}
              title="Password Generator"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <div className="relative group">
              <button
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "var(--color-divider-soft)" }}
              >
                <svg className="h-5 w-5" style={{ color: "var(--color-ink-muted-80)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-[11px] shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}
              >
                <div className="p-3 border-b" style={{ borderColor: "var(--color-hairline)" }}>
                  <p className="text-[12px] mb-1" style={{ color: "var(--color-ink-muted-48)" }}>Signed in as</p>
                  <p className="text-[14px] font-medium truncate" style={{ color: "var(--color-ink)" }}>{user?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full px-4 py-2.5 text-left text-[14px] transition-colors flex items-center space-x-2"
                    style={{ color: "var(--color-ink-muted-80)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span>Change Password</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2.5 text-left text-[14px] transition-colors rounded-b-[11px] flex items-center space-x-2"
                    style={{ color: "var(--color-ink-muted-80)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="h-[calc(100vh-57px)]">
        <VaultSidebar
          token={token}
          showAddForm={showAddForm}
          onCloseForm={() => setShowAddForm(false)}
          onOpenForm={() => setShowAddForm(true)}
        />
      </div>


      <PasswordGeneratorModal
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
      />


      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        token={token}
      />
    </div>
  );
}
