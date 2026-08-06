"use client";

import { useState, useEffect } from "react";

interface PasswordGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordGeneratorModal = ({ isOpen, onClose }: PasswordGeneratorModalProps) => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [minNumbers, setMinNumbers] = useState(1);
  const [minSpecial, setMinSpecial] = useState(1);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    const ambiguous = "{}[]()/\\'\"`~,;:.<>";

    let chars = "";
    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += avoidAmbiguous ? symbols : symbols + ambiguous;

    let pwd = "";
    for (let i = 0; i < length; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(pwd);
  };

  useEffect(() => {
    if (isOpen) generatePassword();
  }, [isOpen, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidAmbiguous]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardStyle = { background: "var(--color-surface-pearl)", borderColor: "var(--color-hairline)" };
  const numInputCls = "px-2 py-1.5 rounded-[8px] text-[14px] text-center outline-none border focus:border-[var(--color-primary)]";
  const numInputStyle = { background: "var(--color-canvas)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" };
  const checkboxCls = "w-4 h-4 rounded accent-[var(--color-primary)]";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-[18px] shadow-2xl border w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--color-hairline)" }}>
          <h2 className="text-[20px] font-semibold" style={{ color: "var(--color-ink)", letterSpacing: "-0.374px" }}>Generator</h2>
          <button onClick={onClose} className="p-1" style={{ color: "var(--color-ink-muted-48)" }}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-[11px] p-4 border" style={cardStyle}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[16px] break-all flex-1 min-w-0" style={{ color: "var(--color-ink)" }}>
                {password || "Click regenerate to generate password"}
              </span>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button onClick={generatePassword} className="p-2 rounded transition-colors" style={{ color: "var(--color-ink-muted-48)" }} title="Regenerate">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded transition-all duration-200"
                  style={{ color: copied ? "#34c759" : "var(--color-ink-muted-48)", background: copied ? "rgba(52,199,89,0.12)" : "transparent" }}
                  title={copied ? "Copied!" : "Copy"}
                >
                  {copied ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>Options</h3>

            <div className="rounded-[11px] p-4 border" style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] font-medium" style={{ color: "var(--color-ink-muted-80)" }}>Length</label>
                <input type="number" min={5} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className={`w-16 ${numInputCls}`} style={numInputStyle} />
              </div>
              <p className="text-[12px]" style={{ color: "var(--color-ink-muted-48)" }}>
                Value must be between 5 and 128. Use 14 characters or more to generate a strong password.
              </p>
            </div>

            <div className="rounded-[11px] p-4 border" style={cardStyle}>
              <h4 className="text-[14px] font-semibold mb-3" style={{ color: "var(--color-ink)" }}>Include</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className={checkboxCls} />
                  <span className="text-[14px]" style={{ color: "var(--color-ink-muted-80)" }}>A-Z</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className={checkboxCls} />
                  <span className="text-[14px]" style={{ color: "var(--color-ink-muted-80)" }}>a-z</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className={checkboxCls} />
                  <span className="text-[14px]" style={{ color: "var(--color-ink-muted-80)" }}>0-9</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className={checkboxCls} />
                  <span className="text-[14px]" style={{ color: "var(--color-ink-muted-80)" }}>!@#$%^&*</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Minimum numbers</label>
                  <input type="number" min={0} max={5} value={minNumbers} onChange={(e) => setMinNumbers(Number(e.target.value))} className={`w-full ${numInputCls}`} style={numInputStyle} />
                </div>
                <div>
                  <label className="block text-[12px] mb-1.5" style={{ color: "var(--color-ink-muted-48)" }}>Minimum special</label>
                  <input type="number" min={0} max={5} value={minSpecial} onChange={(e) => setMinSpecial(Number(e.target.value))} className={`w-full ${numInputCls}`} style={numInputStyle} />
                </div>
              </div>
            </div>

            <div className="rounded-[11px] p-4 border" style={cardStyle}>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" checked={avoidAmbiguous} onChange={(e) => setAvoidAmbiguous(e.target.checked)} className={`${checkboxCls} mt-0.5`} />
                <span className="text-[14px]" style={{ color: "var(--color-ink-muted-80)" }}>Avoid ambiguous characters</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t" style={{ borderColor: "var(--color-hairline)" }}>
          <button
            onClick={() => { handleCopy(); onClose(); }}
            className="w-full py-3 px-6 rounded-full font-normal text-[17px] active:scale-95 transition-transform"
            style={{ background: "var(--color-primary)", color: "#ffffff" }}
          >
            Use this password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorModal;
