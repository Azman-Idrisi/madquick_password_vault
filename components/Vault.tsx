"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

interface VaultProps {
  token: string; 
}

interface VaultRef {
  addItem: (item: any) => Promise<void>;
}

const Vault = forwardRef<VaultRef, VaultProps>(({ token }, ref) => {
  const [vaultItems, setVaultItems] = useState<IVaultItem[]>([]);
  const [search, setSearch] = useState("");
  const [copyTimeouts, setCopyTimeouts] = useState<Record<string, NodeJS.Timeout>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

 
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/vault/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVaultItems(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

 
  const addItem = async (item: any) => {
    try {
      await axios.post("/api/vault/create", item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItems(); 
    } catch (err) {
      console.error(err);
    }
  };

  
  useImperativeHandle(ref, () => ({
    addItem
  }));


  const saveItem = async (item: Partial<IVaultItem> & { _id?: string }) => {
    try {
      if (item._id) {
        
      } else {
        await axios.post("/api/vault/create", item, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

 
  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`/api/vault/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

 
  const handleCopy = (itemId: string, password: string) => {
    navigator.clipboard.writeText(password);
    setCopiedId(itemId);
    setTimeout(() => setCopiedId(null), 2000);
    
    if (copyTimeouts[itemId]) clearTimeout(copyTimeouts[itemId]);
    const timeout = setTimeout(() => {
      navigator.clipboard.writeText("");
    }, 15000);
    setCopyTimeouts((prev) => ({ ...prev, [itemId]: timeout }));
  };

 
  const filteredItems = vaultItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
     
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
     
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-900/60 border-b border-slate-700/50">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
          </div>
          <div className="col-span-5">
            <span className="text-sm font-medium text-slate-400">Name</span>
          </div>
          <div className="col-span-5">
            <span className="text-sm font-medium text-slate-400">Owner</span>
          </div>
          <div className="col-span-1"></div>
        </div>

       
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-12 w-12 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No passwords found</h3>
            <p className="text-slate-400 text-sm">
              {search ? "Try adjusting your search terms" : "Start by adding your first password"}
            </p>
          </div>
        ) : (
          <div>
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className={`grid grid-cols-12 gap-4 px-4 py-4 hover:bg-slate-700/30 transition-colors ${
                  index !== filteredItems.length - 1 ? 'border-b border-slate-700/30' : ''
                }`}
              >
               
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                </div>

               
                <div className="col-span-5 flex items-center space-x-3 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-slate-700/50 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-blue-400 truncate hover:text-blue-300 cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{item.username}</p>
                  </div>
                </div>

               
                <div className="col-span-5 flex items-center min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">Me</span>
                    </div>
                  </div>
                </div>

               
                <div className="col-span-1 flex items-center justify-end">
                  <div className="relative group">
                    <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                   
                    <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button
                        onClick={() => handleCopy(item._id!, item.password)}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 flex items-center space-x-2 ${
                          copiedId === item._id
                            ? "bg-green-500/20 text-green-300"
                            : "text-slate-200 hover:bg-slate-700/50"
                        }`}
                      >
                        {copiedId === item._id ? (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy Password</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => saveItem(item)}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center space-x-2"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <div className="border-t border-slate-700"></div>
                      <button
                        onClick={() => deleteItem(item._id!)}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 rounded-b-lg"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Vault.displayName = 'Vault';

export default Vault;
