"use client";

import { useState } from "react";

interface VaultItemViewProps {
  item: IVaultItem;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}

const VaultItemView = ({ item, onEdit, onDelete, onClose, isDeleting = false }: VaultItemViewProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const decryptedPassword = item.password;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    setTimeout(() => navigator.clipboard.writeText(""), 15000);
  };

  const getFaviconUrl = (url?: string) => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(item.url);
  const fieldRow = "flex items-center space-x-2 rounded-[11px] p-3 border";
  const fieldRowStyle = { background: "var(--color-surface-pearl)", borderColor: "var(--color-hairline)" };

  const copyBtnStyle = (field: string) => ({
    color: copiedField === field ? "#34c759" : "var(--color-ink-muted-48)",
    background: copiedField === field ? "rgba(52,199,89,0.12)" : "transparent",
  });

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--color-canvas-parchment)" }}>
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--color-hairline)", background: "var(--color-canvas)" }}>
        <div className="flex items-center space-x-3">
          {faviconUrl ? (
            <img src={faviconUrl} alt="" className="h-10 w-10 rounded" />
          ) : (
            <div className="h-10 w-10 rounded flex items-center justify-center" style={{ background: "var(--color-divider-soft)" }}>
              <svg className="h-6 w-6" style={{ color: "var(--color-ink-muted-48)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <h2 className="text-[20px] font-semibold" style={{ color: "var(--color-ink)", letterSpacing: "-0.374px" }}>{item.title}</h2>
        </div>
        <button onClick={onClose} style={{ color: "var(--color-ink-muted-48)" }}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-[13px]" style={{ color: "var(--color-ink-muted-48)" }}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>No folder</span>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Login credentials</h3>

            <div className="mb-4">
              <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Username</label>
              <div className={fieldRow} style={fieldRowStyle}>
                <span className="flex-1 text-[14px]" style={{ color: "var(--color-ink)" }}>{item.username}</span>
                <button onClick={() => handleCopy(item.username, "username")} className="p-1.5 rounded transition-all duration-200" style={copyBtnStyle("username")} title="Copy">
                  {copiedField === "username" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Password</label>
              <div className={fieldRow} style={fieldRowStyle}>
                <span className="flex-1 text-[14px] font-mono" style={{ color: "var(--color-ink)" }}>
                  {showPassword ? decryptedPassword : "•".repeat(decryptedPassword.length)}
                </span>
                <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 rounded transition-colors" style={{ color: "var(--color-ink-muted-48)" }} title={showPassword ? "Hide" : "Show"}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
                <button onClick={() => handleCopy(decryptedPassword, "password")} className="p-1.5 rounded transition-all duration-200" style={copyBtnStyle("password")} title="Copy">
                  {copiedField === "password" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6" style={{ borderColor: "var(--color-hairline)" }}>
            <h3 className="text-[15px] font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Item history</h3>
            <div className="space-y-2 text-[13px]">
              <div>
                <span style={{ color: "var(--color-ink-muted-48)" }}>Last edited: </span>
                <span style={{ color: "var(--color-ink-muted-80)" }}>
                  {item.updatedAt ? new Date(item.updatedAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "N/A"}
                </span>
              </div>
              <div>
                <span style={{ color: "var(--color-ink-muted-48)" }}>Created: </span>
                <span style={{ color: "var(--color-ink-muted-80)" }}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "var(--color-hairline)", background: "var(--color-canvas)" }}>
        <button onClick={onDelete} disabled={isDeleting} className="text-[14px] font-medium disabled:opacity-50 flex items-center space-x-2" style={{ color: "#ff3b30" }}>
          {isDeleting && <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: "#ff3b30" }}></div>}
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
        <button onClick={onEdit} disabled={isDeleting} className="px-4 py-2 rounded-full text-[14px] font-medium disabled:opacity-50 active:scale-95 transition-transform"
          style={{ background: "var(--color-primary)", color: "#ffffff" }}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default VaultItemView;
