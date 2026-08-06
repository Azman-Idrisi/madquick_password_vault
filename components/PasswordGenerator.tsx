"use client";

import { useState } from "react";
import zxcvbn from "zxcvbn";

interface PasswordOptions {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
  excludeLookAlike?: boolean;
}

const LOOK_ALIKES = /[il1Lo0O]/g;

const PasswordGenerator = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeNumbers: true,
    includeSymbols: true,
    includeLowercase: true,
    includeUppercase: true,
    excludeLookAlike: true,
  });
  const [password, setPassword] = useState("");

  const generatePassword = (opts: PasswordOptions) => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let chars = "";
    if (opts.includeLowercase) chars += lower;
    if (opts.includeUppercase) chars += upper;
    if (opts.includeNumbers) chars += numbers;
    if (opts.includeSymbols) chars += symbols;

    if (opts.excludeLookAlike) chars = chars.replace(LOOK_ALIKES, "");

    let pwd = "";
    for (let i = 0; i < opts.length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const handleGenerate = () => {
    setPassword(generatePassword(options));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setTimeout(() => setPassword(""), 15000); 
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/20 p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Generate Secure Password</h3>
        <p className="text-purple-200">Customize your password settings below</p>
      </div>


      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-purple-200">Password Length</label>
          <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min={8}
          max={32}
          value={options.length}
          onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #7c3aed ${((options.length - 8) / (32 - 8)) * 100}%, #475569 ${((options.length - 8) / (32 - 8)) * 100}%, #475569 100%)`
          }}
        />
      </div>

      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <label className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-xl border border-purple-500/30 cursor-pointer hover:bg-slate-700/60 transition-all duration-200">
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
            className="w-5 h-5 text-purple-600 bg-slate-600 border-2 border-purple-500/50 rounded focus:ring-purple-500 focus:ring-2"
          />
          <div>
            <div className="font-medium text-white">Numbers</div>
            <div className="text-sm text-purple-300">0-9</div>
          </div>
        </label>

        <label className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-xl border border-purple-500/30 cursor-pointer hover:bg-slate-700/60 transition-all duration-200">
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
            className="w-5 h-5 text-purple-600 bg-slate-600 border-2 border-purple-500/50 rounded focus:ring-purple-500 focus:ring-2"
          />
          <div>
            <div className="font-medium text-white">Symbols</div>
            <div className="text-sm text-purple-300">!@#$%^&*</div>
          </div>
        </label>

        <label className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-xl border border-purple-500/30 cursor-pointer hover:bg-slate-700/60 transition-all duration-200">
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
            className="w-5 h-5 text-purple-600 bg-slate-600 border-2 border-purple-500/50 rounded focus:ring-purple-500 focus:ring-2"
          />
          <div>
            <div className="font-medium text-white">Lowercase</div>
            <div className="text-sm text-purple-300">a-z</div>
          </div>
        </label>

        <label className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-xl border border-purple-500/30 cursor-pointer hover:bg-slate-700/60 transition-all duration-200">
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
            className="w-5 h-5 text-purple-600 bg-slate-600 border-2 border-purple-500/50 rounded focus:ring-purple-500 focus:ring-2"
          />
          <div>
            <div className="font-medium text-white">Uppercase</div>
            <div className="text-sm text-purple-300">A-Z</div>
          </div>
        </label>

        <label className="flex items-center space-x-3 p-4 bg-slate-700/40 rounded-xl border border-purple-500/30 cursor-pointer hover:bg-slate-700/60 transition-all duration-200 col-span-2">
          <input
            type="checkbox"
            checked={options.excludeLookAlike}
            onChange={(e) => setOptions({ ...options, excludeLookAlike: e.target.checked })}
            className="w-5 h-5 text-purple-600 bg-slate-600 border-2 border-purple-500/50 rounded focus:ring-purple-500 focus:ring-2"
          />
          <div>
            <div className="font-medium text-white">Exclude Look-Alikes</div>
            <div className="text-sm text-purple-300">Avoid confusing characters like i, l, 1, L, o, 0, O</div>
          </div>
        </label>
      </div>

      
      <button
        onClick={handleGenerate}
        className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Generate Password</span>
      </button>

      
      {password && (
        <div className="mt-8 space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-6 border border-purple-500/30">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-purple-200">Generated Password</label>
              <button
                onClick={handleCopy}
                className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-100 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 border border-purple-500/30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <div className="font-mono text-lg text-white bg-slate-800 p-4 rounded-lg border border-purple-500/20 break-all">
              {password}
            </div>
          </div>

            
          <div className="bg-slate-700/40 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-200">Password Strength:</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-6 rounded-full ${
                        i < zxcvbn(password).score + 1
                          ? zxcvbn(password).score < 2
                            ? "bg-red-500"
                            : zxcvbn(password).score < 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-sm font-medium ${
                  zxcvbn(password).score < 2
                    ? "text-red-400"
                    : zxcvbn(password).score < 3
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}>
                  {zxcvbn(password).score < 2 ? "Weak" : zxcvbn(password).score < 3 ? "Good" : "Strong"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
