"use client";

import { useState } from "react";
import axios from "axios";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

const eyeOpen = "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21";
const eyeClosed = "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z";

const inputCls = "w-full px-3 py-2.5 pr-10 rounded-[11px] outline-none border text-[14px] focus:border-[var(--color-primary)]";
const inputStyle = { background: "var(--color-surface-pearl)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" };
const labelCls = "block text-[12px] mb-1.5";

const ChangePasswordModal = ({ isOpen, onClose, token }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await axios.put("/api/auth/change-password", { currentPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Password changed successfully!");
      setTimeout(() => {
        onClose();
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    onClose();
  };

  if (!isOpen) return null;

  const PwField = ({ id, label, value, onChange, show, toggle, placeholder, minLength }: any) => (
    <div>
      <label htmlFor={id} className={labelCls} style={{ color: "var(--color-ink-muted-48)" }}>{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"} id={id} value={value} onChange={onChange} required minLength={minLength}
          className={inputCls} style={inputStyle} placeholder={placeholder}
        />
        <button type="button" onClick={toggle} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5" style={{ color: "var(--color-ink-muted-48)" }}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={show ? eyeOpen : eyeClosed} />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-[18px] shadow-2xl border w-full max-w-md" style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}>
        <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: "var(--color-hairline)" }}>
          <h2 className="text-[17px] font-semibold" style={{ color: "var(--color-ink)" }}>Change Password</h2>
          <button onClick={handleClose} className="p-2 rounded transition-colors" style={{ color: "var(--color-ink-muted-48)" }}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <PwField id="currentPassword" label="Current Password" value={currentPassword}
            onChange={(e: any) => setCurrentPassword(e.target.value)} show={showCurrentPassword}
            toggle={() => setShowCurrentPassword(!showCurrentPassword)} placeholder="Enter current password" />

          <PwField id="newPassword" label="New Password" value={newPassword}
            onChange={(e: any) => setNewPassword(e.target.value)} show={showNewPassword}
            toggle={() => setShowNewPassword(!showNewPassword)} placeholder="Enter new password (min 6 characters)" minLength={6} />

          <PwField id="confirmPassword" label="Confirm New Password" value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)} show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)} placeholder="Confirm new password" />

          {error && (
            <div className="rounded-[11px] p-3 border" style={{ background: "rgba(255,59,48,0.08)", borderColor: "rgba(255,59,48,0.25)" }}>
              <p className="text-[14px]" style={{ color: "#ff3b30" }}>{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-[11px] p-3 border" style={{ background: "rgba(52,199,89,0.08)", borderColor: "rgba(52,199,89,0.25)" }}>
              <p className="text-[14px]" style={{ color: "#34c759" }}>{success}</p>
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-2.5 rounded-full text-[14px] font-medium active:scale-95 transition-transform"
              style={{ background: "var(--color-divider-soft)", color: "var(--color-ink)" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-full text-[14px] font-medium disabled:opacity-50 active:scale-95 transition-transform"
              style={{ background: "var(--color-primary)", color: "#ffffff" }}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
