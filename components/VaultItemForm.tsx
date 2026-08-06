"use client";

import { useState } from "react";

interface VaultItemFormProps {
  onSubmit: (item: {
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
  };
}

const VaultItemForm = ({ onSubmit, onCancel, initialData }: VaultItemFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    username: initialData?.username || "",
    password: initialData?.password || "",
    url: initialData?.url || "",
    notes: initialData?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1">
            {initialData ? "Edit Item" : "Add Item"}
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            {initialData ? "Update your password entry" : "Store a new password securely"}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="e.g., Gmail Account, Facebook, Netflix"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter username or email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2">
                Website URL <span className="text-xs text-slate-500">(optional)</span>
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">
                Notes <span className="text-xs text-slate-500">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
                placeholder="Additional notes or security questions..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {initialData ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-600 text-slate-200 py-2.5 px-4 rounded-lg font-medium hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaultItemForm;
