"use client";

import React, { useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseClientAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";
import type { AdminUserRecord, SchoolConfig, SchoolId } from "@/lib/types/school";
import { SCHOOL_IDS } from "@/lib/types/school";
import {
  CollectionItemForm,
  type CollectionName,
} from "@/components/admin/CollectionItemForm";
import {
  LogOut,
  Save,
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  AlertCircle,
  Shield,
  Palette,
  FileText,
  Mail,
  Users,
  ExternalLink,
  RefreshCw,
  Menu,
  X,
  Layers,
  Building2,
  Globe,
  ChevronRight,
} from "lucide-react";

type TabId = "branding" | "homepage" | "collections" | "submissions" | "admins";

interface SessionResponse {
  admin: AdminUserRecord;
  currentHostSchoolId?: SchoolId | null;
  schools: Array<{ id: SchoolId; canonicalHost: string }>;
}

const TAB_META: Record<TabId, { title: string; subtitle: string }> = {
  branding: {
    title: "Identity, Theme & Contact",
    subtitle: "Configure school branding, theme palette, publish status, and contact details.",
  },
  homepage: {
    title: "Homepage Sections",
    subtitle: "Toggle homepage blocks, update hero media, vision/mission, and facility cards.",
  },
  collections: {
    title: "Content Collections",
    subtitle: "Create, edit, publish, or remove announcements, news, people, documents, and media.",
  },
  submissions: {
    title: "Contact Inquiries",
    subtitle: "Review private contact form submissions sent from this school's website.",
  },
  admins: {
    title: "Admin Users",
    subtitle: "Assign school administrator roles and campus access permissions.",
  },
};

export function AdminDashboardClient() {
  const clientConfigured = isFirebaseClientConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!clientConfigured);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [adminProfile, setAdminProfile] = useState<AdminUserRecord | null>(null);
  const [accessibleSchools, setAccessibleSchools] = useState<
    Array<{ id: SchoolId; canonicalHost: string }>
  >([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<SchoolId | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("branding");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig | null>(null);
  const [activeCollection, setActiveCollection] = useState<CollectionName>("announcements");
  const [collectionItems, setCollectionItems] = useState<Array<Record<string, unknown>>>([]);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const [submissions, setSubmissions] = useState<Array<Record<string, unknown>>>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>([]);

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"school_admin" | "super_admin">("school_admin");
  const [newAdminSchools, setNewAdminSchools] = useState<SchoolId[]>(["kollam"]);

  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!clientConfigured) return;
    const auth = getFirebaseClientAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setAdminProfile(null);
        setAccessibleSchools([]);
        setSchoolConfig(null);
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, [clientConfigured]);

  const authedFetch = useCallback(
    async (url: string, init?: RequestInit) => {
      if (!user) throw new Error("Not signed in");
      const token = await user.getIdToken();
      const res = await fetch(url, {
        ...init,
        headers: {
          ...(init?.headers ?? {}),
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
      }
      return data;
    },
    [user]
  );

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    authedFetch("/api/admin/session")
      .then((raw) => {
        if (cancelled) return;
        const data = raw as SessionResponse;
        setAdminProfile(data.admin);
        setAccessibleSchools(data.schools);
        if (data.schools.length > 0) {
          const preferred =
            data.currentHostSchoolId &&
            data.schools.some((s) => s.id === data.currentHostSchoolId)
              ? data.currentHostSchoolId
              : data.schools[0]!.id;
          setSelectedSchoolId((prev) => prev ?? preferred);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setFeedback({
          type: "err",
          text: err instanceof Error ? err.message : "Failed to load admin session",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [user, authedFetch]);

  const adminRole = adminProfile?.role;

  const loadSchoolData = useCallback(async () => {
    if (!user || !selectedSchoolId) return;
    setBusy(true);
    try {
      const cfgRes = (await authedFetch(`/api/admin/schools/${selectedSchoolId}`)) as {
        config: SchoolConfig;
      };
      setSchoolConfig(cfgRes.config);

      if (activeTab === "collections") {
        const itemsRes = (await authedFetch(
          `/api/admin/schools/${selectedSchoolId}/items?collection=${activeCollection}`
        )) as { items: Array<Record<string, unknown>> };
        setCollectionItems(itemsRes.items);
      } else if (activeTab === "submissions") {
        const subRes = (await authedFetch(
          `/api/admin/schools/${selectedSchoolId}/items?collection=submissions`
        )) as { items: Array<Record<string, unknown>> };
        setSubmissions(subRes.items);
      } else if (activeTab === "admins" && adminRole === "super_admin") {
        const usersRes = (await authedFetch("/api/admin/users")) as {
          users: AdminUserRecord[];
        };
        setAdminUsers(usersRes.users);
      }
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to load school data",
      });
    } finally {
      setBusy(false);
    }
  }, [user, selectedSchoolId, activeTab, activeCollection, adminRole, authedFetch]);

  useEffect(() => {
    if (!user || !selectedSchoolId) return;
    let cancelled = false;
    (async () => {
      if (!cancelled) {
        await loadSchoolData();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, selectedSchoolId, loadSchoolData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const auth = getFirebaseClientAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Sign-in failed");
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedSchoolId || !schoolConfig) return;
    setBusy(true);
    setFeedback(null);
    try {
      const res = (await authedFetch(`/api/admin/schools/${selectedSchoolId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schoolConfig),
      })) as { config: SchoolConfig };
      setSchoolConfig(res.config);
      setFeedback({
        type: "ok",
        text: `Saved & revalidated cache for ${res.config.name}.`,
      });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleToggleItemStatus = async (item: Record<string, unknown>) => {
    if (!selectedSchoolId) return;
    const nextStatus = item.status === "published" ? "draft" : "published";
    try {
      await authedFetch(`/api/admin/schools/${selectedSchoolId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: activeCollection,
          item: { ...item, status: nextStatus },
        }),
      });
      await loadSchoolData();
      setFeedback({ type: "ok", text: `Updated status to ${nextStatus}.` });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Update failed",
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!selectedSchoolId) return;
    try {
      await authedFetch(
        `/api/admin/schools/${selectedSchoolId}/items?collection=${activeCollection}&id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      await loadSchoolData();
      setFeedback({ type: "ok", text: `Deleted ${id}.` });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  const handleSaveCollectionItem = async (item: Record<string, unknown>) => {
    if (!selectedSchoolId) return;
    await authedFetch(`/api/admin/schools/${selectedSchoolId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: activeCollection, item }),
    });
    setEditingItem(null);
    setShowNewForm(false);
    await loadSchoolData();
    setFeedback({ type: "ok", text: `Saved item in ${activeCollection}.` });
  };

  const handleAssignAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authedFetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newAdminEmail,
          role: newAdminRole,
          assignedSchoolIds: newAdminSchools,
          active: true,
        }),
      });
      setNewAdminEmail("");
      await loadSchoolData();
      setFeedback({ type: "ok", text: "Administrator assignment updated." });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Failed to assign admin",
      });
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-medium">
        Loading admin portal...
      </div>
    );
  }

  if (!clientConfigured) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Firebase Not Configured</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Set <code>NEXT_PUBLIC_FIREBASE_API_KEY</code>,{" "}
            <code>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</code>, and{" "}
            <code>NEXT_PUBLIC_FIREBASE_PROJECT_ID</code> (plus server Admin SDK credentials) in your
            environment to enable the multi-tenant admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-8">
          <div className="flex items-center gap-3.5 mb-7">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Chinmaya Schools Admin</h1>
              <p className="text-xs text-slate-500">Multi-Tenant Content &amp; Theme Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15 focus:border-slate-400"
                placeholder="admin@chinmaya.edu.in"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15 focus:border-slate-400"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const workspaceTabs = [
    { id: "branding" as const, label: "Identity, Theme & Contact", icon: Palette },
    { id: "homepage" as const, label: "Homepage Sections", icon: FileText },
    { id: "collections" as const, label: "Content Collections", icon: Layers },
    { id: "submissions" as const, label: "Contact Inquiries", icon: Mail },
  ];

  const adminTabs =
    adminProfile?.role === "super_admin"
      ? [{ id: "admins" as const, label: "Admin Users", icon: Users }]
      : [];

  const handleSelectTab = (tabId: TabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-200 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
                Chinmaya Admin
              </h1>
              <p className="text-[11px] text-slate-400">Multi-Tenant Portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* School Switcher */}
        <div className="px-4 py-4 border-b border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Active Campus
          </div>
          {accessibleSchools.length > 0 && (
            <select
              value={selectedSchoolId ?? ""}
              onChange={(e) => {
                setSelectedSchoolId(e.target.value as SchoolId);
                setEditingItem(null);
                setShowNewForm(false);
              }}
              aria-label="Select school"
              className="w-full bg-slate-900 text-white text-xs font-medium px-3 py-2.5 rounded-lg border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              {accessibleSchools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id.toUpperCase()} ({s.canonicalHost})
                </option>
              ))}
            </select>
          )}
          {schoolConfig && (
            <a
              href={`https://${schoolConfig.primaryDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <span className="inline-flex items-center gap-2 truncate">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{schoolConfig.primaryDomain}</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </a>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </p>
            <div className="space-y-1">
              {workspaceTabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSelectTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/25"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-amber-400" : "text-slate-400"}`} />
                      <span className="truncate">{tab.label}</span>
                    </span>
                    {active && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {adminTabs.length > 0 && (
            <div>
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Administration
              </p>
              <div className="space-y-1">
                {adminTabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        active
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/25"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${active ? "text-amber-400" : "text-slate-400"}`} />
                        <span className="truncate">{tab.label}</span>
                      </span>
                      {active && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-amber-300 flex items-center justify-center text-xs font-bold uppercase shrink-0">
              {(adminProfile?.email?.[0] ?? "A").toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-200 truncate">
                {adminProfile?.email || user.email}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {adminProfile?.role || "verifying"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut(getFirebaseClientAuth())}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-red-600/90 border border-slate-800 hover:border-red-500 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {selectedSchoolId && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {selectedSchoolId}
                  </span>
                )}
                {schoolConfig && (
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      schoolConfig.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {schoolConfig.status}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate mt-0.5">
                {TAB_META[activeTab].title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadSchoolData()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${busy ? "animate-spin" : ""}`} />
              Refresh
            </button>

            {(activeTab === "branding" || activeTab === "homepage") && schoolConfig && (
              <button
                type="button"
                onClick={handleSaveConfig}
                disabled={busy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-slate-800 disabled:opacity-60 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                {busy ? "Saving..." : activeTab === "branding" ? "Save & Publish" : "Save Homepage"}
              </button>
            )}
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-6">
          <p className="text-sm text-slate-500 -mt-2">{TAB_META[activeTab].subtitle}</p>

          {feedback && (
            <div
              className={`flex items-center justify-between gap-3 p-3.5 rounded-xl text-sm border shadow-xs ${
                feedback.type === "ok"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {feedback.type === "ok" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{feedback.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                aria-label="Dismiss notification"
                className="p-1 rounded hover:bg-black/5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {activeTab === "branding" && schoolConfig && (
            <div className="space-y-6">
              {/* General Info Card */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Campus Identity &amp; Status</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Display names and live visibility for this campus website.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={schoolConfig.name}
                      onChange={(e) => setSchoolConfig({ ...schoolConfig, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Short Name
                    </label>
                    <input
                      type="text"
                      value={schoolConfig.shortName}
                      onChange={(e) =>
                        setSchoolConfig({ ...schoolConfig, shortName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Publish Status
                    </label>
                    <select
                      value={schoolConfig.status}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          status: e.target.value as "draft" | "published",
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    >
                      <option value="draft">Draft (Unpublished)</option>
                      <option value="published">Published (Live)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Theme Colors Card */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Theme Palette</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    CSS theme tokens applied across headers, buttons, and accents.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {(
                    [
                      "primary",
                      "secondary",
                      "accent",
                      "accentAlt",
                      "brandBlue",
                    ] as const
                  ).map((key) => (
                    <div
                      key={key}
                      className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 space-y-2"
                    >
                      <label className="block text-xs font-bold text-slate-700 capitalize">
                        {key}
                      </label>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="color"
                          value={schoolConfig.theme[key]}
                          onChange={(e) =>
                            setSchoolConfig({
                              ...schoolConfig,
                              theme: { ...schoolConfig.theme, [key]: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer shrink-0 bg-white p-0.5"
                        />
                        <input
                          type="text"
                          value={schoolConfig.theme[key]}
                          onChange={(e) =>
                            setSchoolConfig({
                              ...schoolConfig,
                              theme: { ...schoolConfig.theme, [key]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Info Card */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Contact Details</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Shown in the website header, footer, and contact page.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={schoolConfig.contact.phone}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          contact: { ...schoolConfig.contact, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={schoolConfig.contact.email}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          contact: { ...schoolConfig.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "homepage" && schoolConfig && (
            <div className="space-y-6">
              {/* Section Toggles */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Visible Homepage Sections</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enable or hide sections on the main landing page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <label className="flex items-center gap-2.5 text-sm font-medium p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolConfig.visionMission.enabled}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          visionMission: {
                            ...schoolConfig.visionMission,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300"
                    />
                    Vision &amp; Mission
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolConfig.historySummary.enabled}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          historySummary: {
                            ...schoolConfig.historySummary,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300"
                    />
                    Origin &amp; History
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolConfig.recentNewsSection.enabled}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          recentNewsSection: {
                            ...schoolConfig.recentNewsSection,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300"
                    />
                    Recent News
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolConfig.testimonialsSection.enabled}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          testimonialsSection: {
                            ...schoolConfig.testimonialsSection,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300"
                    />
                    Testimonials
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schoolConfig.facilitiesSection.enabled}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          facilitiesSection: {
                            ...schoolConfig.facilitiesSection,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-slate-300"
                    />
                    Our Facilities
                  </label>
                </div>
              </section>

              {/* Hero & Vision/Mission */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Hero Media &amp; Vision / Mission</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Hero Media URL
                    </label>
                    <input
                      type="text"
                      value={schoolConfig.hero.mediaUrl}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          hero: { ...schoolConfig.hero, mediaUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Hero Media Type
                    </label>
                    <select
                      value={schoolConfig.hero.mediaType}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          hero: {
                            ...schoolConfig.hero,
                            mediaType: e.target.value as "video" | "image",
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    >
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Vision Text
                    </label>
                    <textarea
                      rows={4}
                      value={schoolConfig.visionMission.visionText}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          visionMission: {
                            ...schoolConfig.visionMission,
                            visionText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Mission Text
                    </label>
                    <textarea
                      rows={4}
                      value={schoolConfig.visionMission.missionText}
                      onChange={(e) =>
                        setSchoolConfig({
                          ...schoolConfig,
                          visionMission: {
                            ...schoolConfig.visionMission,
                            missionText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </div>
                </div>
              </section>

              {/* Facilities Editor */}
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Our Facilities Cards ({schoolConfig.facilitiesSection.items.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cards displayed in the Our Facilities carousel/grid on the homepage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSchoolConfig({
                        ...schoolConfig,
                        facilitiesSection: {
                          ...schoolConfig.facilitiesSection,
                          enabled: true,
                          items: [
                            ...schoolConfig.facilitiesSection.items,
                            {
                              id: `facility-${Date.now()}`,
                              title: "",
                              href: "",
                              image: "",
                              desc: "",
                            },
                          ],
                        },
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Facility Card
                  </button>
                </div>

                {schoolConfig.facilitiesSection.items.length === 0 ? (
                  <p className="text-sm text-slate-500 py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    No facility cards added yet. Click &ldquo;Add Facility Card&rdquo; to create one.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {schoolConfig.facilitiesSection.items.map((fac, idx) => (
                      <div
                        key={fac.id}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200"
                      >
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={fac.title}
                            placeholder="Title (e.g. Library)"
                            onChange={(e) => {
                              const next = [...schoolConfig.facilitiesSection.items];
                              next[idx] = { ...fac, title: e.target.value };
                              setSchoolConfig({
                                ...schoolConfig,
                                facilitiesSection: { ...schoolConfig.facilitiesSection, items: next },
                              });
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Page Link
                          </label>
                          <input
                            type="text"
                            value={fac.href}
                            placeholder="Link (e.g. /facilities/library)"
                            onChange={(e) => {
                              const next = [...schoolConfig.facilitiesSection.items];
                              next[idx] = { ...fac, href: e.target.value };
                              setSchoolConfig({
                                ...schoolConfig,
                                facilitiesSection: { ...schoolConfig.facilitiesSection, items: next },
                              });
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={fac.image}
                            placeholder="Image URL (e.g. /facilities/library.jpg)"
                            onChange={(e) => {
                              const next = [...schoolConfig.facilitiesSection.items];
                              next[idx] = { ...fac, image: e.target.value };
                              setSchoolConfig({
                                ...schoolConfig,
                                facilitiesSection: { ...schoolConfig.facilitiesSection, items: next },
                              });
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Short Description
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={fac.desc}
                              placeholder="Short description"
                              onChange={(e) => {
                                const next = [...schoolConfig.facilitiesSection.items];
                                next[idx] = { ...fac, desc: e.target.value };
                                setSchoolConfig({
                                  ...schoolConfig,
                                  facilitiesSection: {
                                    ...schoolConfig.facilitiesSection,
                                    items: next,
                                  },
                                });
                              }}
                              className="flex-1 min-w-0 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                            />
                            <button
                              type="button"
                              aria-label={`Remove ${fac.title || "facility"}`}
                              onClick={() => {
                                const next = schoolConfig.facilitiesSection.items.filter(
                                  (_, i) => i !== idx
                                );
                                setSchoolConfig({
                                  ...schoolConfig,
                                  facilitiesSection: {
                                    ...schoolConfig.facilitiesSection,
                                    items: next,
                                  },
                                });
                              }}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === "collections" && selectedSchoolId && user && (
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "announcements",
                      "news",
                      "people",
                      "documents",
                      "albums",
                      "videos",
                      "accolades",
                    ] as const
                  ).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => {
                        setActiveCollection(col);
                        setEditingItem(null);
                        setShowNewForm(false);
                      }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors ${
                        activeCollection === col
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setShowNewForm((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              </div>

              {(showNewForm || editingItem) && (
                <CollectionItemForm
                  key={String(editingItem?.id ?? `new-${activeCollection}`)}
                  collection={activeCollection}
                  initialItem={editingItem}
                  schoolId={selectedSchoolId}
                  getToken={() => user.getIdToken()}
                  onSave={handleSaveCollectionItem}
                  onCancel={() => {
                    setShowNewForm(false);
                    setEditingItem(null);
                  }}
                />
              )}

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {collectionItems.length === 0 ? (
                  <p className="p-8 text-sm text-slate-500 text-center">
                    No records in {activeCollection} yet. Click &ldquo;Add New&rdquo; above to create one.
                  </p>
                ) : (
                  collectionItems.map((item) => {
                    const id = String(item.id);
                    const title = String(item.title || item.name || id);
                    const subtitle = String(item.kind || item.category || item.role || "");
                    const status = String(item.status || "published");
                    return (
                      <div
                        key={id}
                        className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-slate-900 truncate">{title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {subtitle ? `${subtitle} · ` : ""}
                            <span className="font-mono">{id}</span>
                          </p>
                          {typeof item.reviewNote === "string" && item.reviewNote && (
                            <p className="text-xs text-amber-700 mt-1">{item.reviewNote}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewForm(false);
                              setEditingItem(item);
                            }}
                            aria-label={`Edit ${title}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleItemStatus(item)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                              status === "published"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200/70"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200/70"
                            }`}
                          >
                            {status}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(id)}
                            aria-label={`Delete ${title}`}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Contact Form Submissions ({submissions.length})
                </h3>
              </div>
              {submissions.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">
                  No inquiries submitted yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {submissions.map((s) => (
                    <div
                      key={String(s.id)}
                      className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5"
                    >
                      <div className="flex flex-wrap justify-between gap-2 text-sm font-bold text-slate-900">
                        <span>
                          {String(s.name)} ({String(s.email)})
                        </span>
                        <span className="text-xs font-normal text-slate-500">
                          {String(s.createdAt ?? "")}
                        </span>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {String(s.subject)} · {String(s.phone ?? "")}
                      </p>
                      <p className="text-sm text-slate-700 pt-1">{String(s.message)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "admins" && adminProfile?.role === "super_admin" && (
            <div className="space-y-6">
              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Assign or Update Administrator
                  </h3>
                </div>

                <form onSubmit={handleAssignAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      User Email (must exist in Firebase Auth)
                    </label>
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Role
                    </label>
                    <select
                      value={newAdminRole}
                      onChange={(e) =>
                        setNewAdminRole(e.target.value as "school_admin" | "super_admin")
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                    >
                      <option value="school_admin">School Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Assigned Schools
                    </label>
                    <div className="flex flex-wrap gap-2.5 py-1.5">
                      {SCHOOL_IDS.map((sid) => (
                        <label key={sid} className="inline-flex items-center gap-1.5 text-xs font-medium">
                          <input
                            type="checkbox"
                            checked={newAdminSchools.includes(sid)}
                            onChange={(e) => {
                              setNewAdminSchools((prev) =>
                                e.target.checked ? [...prev, sid] : prev.filter((x) => x !== sid)
                              );
                            }}
                          />
                          {sid}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 cursor-pointer md:col-span-3 w-fit"
                  >
                    Assign / Update Admin
                  </button>
                </form>
              </section>

              <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Current Administrators ({adminUsers.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {adminUsers.map((u) => (
                    <div key={u.uid} className="p-4 flex flex-wrap justify-between items-center gap-2 text-sm">
                      <div>
                        <p className="font-bold text-slate-900">{u.email}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {u.role} · Schools: {u.assignedSchoolIds.join(", ") || "none"}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{u.uid}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
