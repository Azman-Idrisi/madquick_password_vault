"use client";

import VaultDetailPanel from "@/components/VaultDetailPanel";
import axios from "axios";
import { useEffect, useState } from "react";
import VaultItemView from "./VaultItemView";

interface VaultSidebarProps {
  token: string;
  showAddForm: boolean;
  onCloseForm: () => void;
  onOpenForm: () => void;
}

const VaultSidebar = ({ token, showAddForm, onCloseForm, onOpenForm }: VaultSidebarProps) => {
  const [vaultItems, setVaultItems] = useState<IVaultItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IVaultItem | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);


  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/vault/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVaultItems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const handleAddItem = async (item: any) => {
    try {
      await axios.post("/api/vault/create", item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItems();
      onCloseForm();
    } catch (err) {
      console.error(err);
    }
  };


  const handleUpdateItem = async (item: any) => {
    try {
      const payload = {
        title: item.title,
        username: item.username,
        password: item.password,
        url: item.url,
        notes: item.notes,
      };

      await axios.put(`/api/vault/update/${selectedItem?._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchItems();
      setSelectedItem(null);
      setIsEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };


  const deleteItem = async (id: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await axios.delete(`/api/vault/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItems();
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };


  const filteredItems = vaultItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.username.toLowerCase().includes(search.toLowerCase())
  );


  const getFaviconUrl = (url?: string) => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <div className="flex h-full">

      <div className="w-[400px] border-r flex flex-col" style={{ background: "var(--color-canvas)", borderColor: "var(--color-hairline)" }}>

        <div className="p-4 border-b" style={{ borderColor: "var(--color-hairline)" }}>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search vault"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 pl-9 rounded-full text-[14px] outline-none border focus:border-[var(--color-primary)]"
              style={{ background: "var(--color-surface-pearl)", color: "var(--color-ink)", borderColor: "var(--color-hairline)" }}
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: "var(--color-ink-muted-48)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--color-primary)" }}></div>
              <p className="text-[14px]" style={{ color: "var(--color-ink-muted-48)" }}>Loading...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[14px]" style={{ color: "var(--color-ink-muted-48)" }}>No items found</p>
            </div>
          ) : (
            <div>
              {filteredItems.map((item) => {
                const faviconUrl = getFaviconUrl(item.url);
                const active = selectedItem?._id === item._id;
                return (
                  <button
                    key={item._id}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditMode(false);
                    }}
                    className="w-full px-4 py-3 flex items-center space-x-3 transition-colors text-left border-b"
                    style={{
                      background: active ? "var(--color-surface-pearl)" : "transparent",
                      borderColor: "var(--color-divider-soft)",
                    }}
                  >

                    <div className="flex-shrink-0">
                      {faviconUrl ? (
                        <img src={faviconUrl} alt="" className="h-8 w-8 rounded" />
                      ) : (
                        <div className="h-8 w-8 rounded flex items-center justify-center" style={{ background: "var(--color-divider-soft)" }}>
                          <svg className="h-4 w-4" style={{ color: "var(--color-ink-muted-48)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>


                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-medium truncate" style={{ color: "var(--color-ink)" }}>
                        {item.title}
                      </h3>
                      <p className="text-[12px] truncate" style={{ color: "var(--color-ink-muted-48)" }}>
                        {item.username}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>


        <div className="p-3 border-t" style={{ borderColor: "var(--color-hairline)" }}>
          <button
            onClick={() => {
              setSelectedItem(null);
              onOpenForm();
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 rounded-full transition-colors active:scale-95"
            style={{ background: "var(--color-surface-pearl)", color: "var(--color-primary)" }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>


      <div className="flex-1" style={{ background: "var(--color-canvas-parchment)" }}>
        {showAddForm ? (
          <VaultDetailPanel
            onSave={handleAddItem}
            onCancel={onCloseForm}
            token={token}
          />
        ) : selectedItem && isEditMode ? (
          <VaultDetailPanel
            item={selectedItem}
            onSave={handleUpdateItem}
            onCancel={() => {
              setSelectedItem(null);
              setIsEditMode(false);
            }}
            onDelete={() => deleteItem(selectedItem._id!)}
            token={token}
          />
        ) : selectedItem ? (
          <VaultItemView
            item={selectedItem}
            onEdit={() => setIsEditMode(true)}
            onDelete={() => deleteItem(selectedItem._id!)}
            onClose={() => setSelectedItem(null)}
            isDeleting={isDeleting}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-[28px] font-semibold mb-2" style={{ color: "var(--color-ink)", letterSpacing: "-0.28px" }}>TreePass</h2>
              <p className="text-[14px]" style={{ color: "var(--color-ink-muted-48)" }}>Select an item to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultSidebar;

