"use client";

import { useState } from "react";

interface VaultDetailPanelProps {
  item?: IVaultItem;
  onSave: (item: any) => void;
  onCancel: () => void;
  onDelete?: () => void;
  token: string;
}

const inputCls = "w-full px-3 py-2.5 rounded-[11px] outline-none border text-[14px] focus:border-[var(--color-primary)]";
const inputStyle = { background: "var(--color-canvas)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" };
const labelCls = "block text-[12px] mb-1.5";

const VaultDetailPanel = ({ item, onSave, onCancel, onDelete, token }: VaultDetailPanelProps) => {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    username: item?.username || "",
    password: item?.password || "",
    url: item?.url || "",
    notes: item?.notes || "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 16; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    setFormData({ ...formData, password: pwd });
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--color-canvas-parchment)" }}>
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--color-hairline)", background: "var(--color-canvas)" }}>
        <h2 className="text-[20px] font-semibold" style={{ color: "var(--color-ink)", letterSpacing: "-0.374px" }}>Item details</h2>
        <button onClick={onCancel} style={{ color: "var(--color-ink-muted-48)" }}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>
              Name <span style={{ color: "#ff3b30" }}>*</span>
            </label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
              className={inputCls} style={inputStyle} placeholder="e.g., Gmail, Facebook, Netflix" />
          </div>

          <div className="border-t pt-6" style={{ borderColor: "var(--color-hairline)" }}>
            <h3 className="text-[15px] font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Login credentials</h3>

            <div className="mb-4">
              <label htmlFor="username" className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required
                className={inputCls} style={inputStyle} placeholder="Enter username" />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password" value={formData.password} onChange={handleChange} required
                  className={`${inputCls} pr-20`} style={inputStyle} placeholder="Enter password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1.5" style={{ color: "var(--color-ink-muted-48)" }} title={showPassword ? "Hide" : "Show"}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                  <button type="button" onClick={generatePassword} className="p-1.5" style={{ color: "var(--color-ink-muted-48)" }} title="Generate password">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-[12px] mt-2 flex items-center" style={{ color: "var(--color-primary)" }}>
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Use the generator to create a strong unique password
              </p>
            </div>
          </div>

          <div className="border-t pt-6" style={{ borderColor: "var(--color-hairline)" }}>
            <h3 className="text-[15px] font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Additional options</h3>

            <div className="mb-4">
              <label htmlFor="url" className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>Website URL</label>
              <input type="url" id="url" name="url" value={formData.url} onChange={handleChange}
                className={inputCls} style={inputStyle} placeholder="https://example.com" />
            </div>

            <div>
              <label htmlFor="notes" className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>Notes</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4}
                className={`${inputCls} resize-none`} style={inputStyle} placeholder="Add notes here..." />
            </div>
          </div>
        </form>
      </div>

      <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "var(--color-hairline)", background: "var(--color-canvas)" }}>
        <div>
          {item && onDelete && (
            <button type="button" onClick={onDelete} className="text-[14px]" style={{ color: "#ff3b30" }}>
              Delete
            </button>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-full text-[14px] active:scale-95 transition-transform"
            style={{ background: "var(--color-divider-soft)", color: "var(--color-ink)" }}>
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded-full text-[14px] active:scale-95 transition-transform"
            style={{ background: "var(--color-primary)", color: "#ffffff" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaultDetailPanel;
