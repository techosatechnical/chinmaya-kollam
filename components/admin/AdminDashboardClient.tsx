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
} from "lucide-react";

type TabId = "branding" | "homepage" | "collections" | "submissions" | "admins";

interface SessionResponse {
  admin: AdminUserRecord;
  schools: Array<{ id: SchoolId; canonicalHost: string }>;
}

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
          setSelectedSchoolId((prev) => prev ?? data.schools[0]!.id);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Loading admin portal...
      </div>
    );
  }

  if (!clientConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md border border-slate-200 p-8">
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Chinmaya Schools Admin</h1>
              <p className="text-xs text-slate-500">Multi-Tenant Content &amp; Theme Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm"
                placeholder="admin@chinmaya.edu.in"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-sm rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Shield className="w-6 h-6 text-amber-400" />
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">
              Chinmaya Schools Admin
            </h1>
            <p className="text-xs text-slate-400">
              {adminProfile?.email} ·{" "}
              <span className="uppercase font-semibold text-amber-300">
                {adminProfile?.role || "verifying"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {accessibleSchools.length > 0 && (
            <select
              value={selectedSchoolId ?? ""}
              onChange={(e) => {
                setSelectedSchoolId(e.target.value as SchoolId);
                setEditingItem(null);
                setShowNewForm(false);
              }}
              aria-label="Select school"
              className="bg-slate-800 text-white text-sm px-3 py-2 rounded-md border border-slate-700"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </a>
          )}

          <button
            onClick={() => signOut(getFirebaseClientAuth())}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-600/90 hover:bg-red-600 text-xs font-semibold text-white cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex-1 space-y-6">
        {feedback && (
          <div
            className={`flex items-center gap-2 p-3 rounded-md text-sm border ${
              feedback.type === "ok"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {feedback.type === "ok" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {(
            [
              { id: "branding", label: "Identity, Theme & Contact", icon: Palette },
              { id: "homepage", label: "Homepage Sections", icon: FileText },
              { id: "collections", label: "Content Collections", icon: Plus },
              { id: "submissions", label: "Contact Inquiries", icon: Mail },
              ...(adminProfile?.role === "super_admin"
                ? [{ id: "admins" as const, label: "Admin Users", icon: Users }]
                : []),
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "branding" && schoolConfig && (
          <div className="bg-white rounded-md border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">School Identity, Theme &amp; Contact</h2>
              <button
                onClick={handleSaveConfig}
                disabled={busy}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {busy ? "Saving..." : "Save & Publish Changes"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={schoolConfig.name}
                  onChange={(e) => setSchoolConfig({ ...schoolConfig, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  value={schoolConfig.shortName}
                  onChange={(e) => setSchoolConfig({ ...schoolConfig, shortName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                >
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="published">Published (Live)</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">Theme Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(
                  [
                    "primary",
                    "secondary",
                    "accent",
                    "accentAlt",
                    "brandBlue",
                  ] as const
                ).map((key) => (
                  <div key={key} className="border border-slate-200 rounded-md p-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1 capitalize">
                      {key}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={schoolConfig.theme[key]}
                        onChange={(e) =>
                          setSchoolConfig({
                            ...schoolConfig,
                            theme: { ...schoolConfig.theme, [key]: e.target.value },
                          })
                        }
                        className="w-8 h-8 rounded cursor-pointer"
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
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "homepage" && schoolConfig && (
          <div className="bg-white rounded-md border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Homepage Sections</h2>
              <button
                onClick={handleSaveConfig}
                disabled={busy}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Homepage
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-md border border-slate-200">
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={schoolConfig.visionMission.enabled}
                  onChange={(e) =>
                    setSchoolConfig({
                      ...schoolConfig,
                      visionMission: { ...schoolConfig.visionMission, enabled: e.target.checked },
                    })
                  }
                />
                Vision &amp; Mission
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium">
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
                />
                Origin &amp; History
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium">
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
                />
                Recent News
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium">
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
                />
                Testimonials
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                >
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Vision Text
              </label>
              <textarea
                rows={3}
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
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Mission Text
              </label>
              <textarea
                rows={3}
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
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
              />
            </div>
          </div>
        )}

        {activeTab === "collections" && selectedSchoolId && user && (
          <div className="bg-white rounded-md border border-slate-200 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
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
                    onClick={() => {
                      setActiveCollection(col);
                      setEditingItem(null);
                      setShowNewForm(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase cursor-pointer ${
                      activeCollection === col
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowNewForm((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
                <button
                  onClick={() => loadSchoolData()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>
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

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-md">
              {collectionItems.length === 0 ? (
                <p className="p-6 text-sm text-slate-500 text-center">
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
                      className="p-4 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{title}</p>
                        <p className="text-xs text-slate-500">
                          {subtitle ? `${subtitle} · ` : ""}
                          <span className="font-mono">{id}</span>
                        </p>
                        {typeof item.reviewNote === "string" && item.reviewNote && (
                          <p className="text-xs text-amber-700 mt-1">{item.reviewNote}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setShowNewForm(false);
                            setEditingItem(item);
                          }}
                          aria-label={`Edit ${title}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleItemStatus(item)}
                          className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                            status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {status}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(id)}
                          aria-label={`Delete ${title}`}
                          className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
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
          <div className="bg-white rounded-md border border-slate-200 p-6 space-y-4">
            <h2 className="text-xl font-bold">Contact Form Submissions (Private)</h2>
            {submissions.length === 0 ? (
              <p className="text-sm text-slate-500">No inquiries submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {submissions.map((s) => (
                  <div key={String(s.id)} className="border border-slate-200 rounded-md p-4">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{String(s.name)} ({String(s.email)})</span>
                      <span className="text-xs text-slate-500">{String(s.createdAt ?? "")}</span>
                    </div>
                    <p className="text-xs font-semibold uppercase text-slate-500 mt-1">
                      {String(s.subject)} · {String(s.phone ?? "")}
                    </p>
                    <p className="text-sm text-slate-700 mt-2">{String(s.message)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "admins" && adminProfile?.role === "super_admin" && (
          <div className="bg-white rounded-md border border-slate-200 p-6 space-y-6">
            <h2 className="text-xl font-bold">Administrator Role Assignments (Super Admin)</h2>

            <form onSubmit={handleAssignAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  User Email (must exist in Firebase Auth)
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Role
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) =>
                    setNewAdminRole(e.target.value as "school_admin" | "super_admin")
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
                >
                  <option value="school_admin">School Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Assigned Schools
                </label>
                <div className="flex flex-wrap gap-2">
                  {SCHOOL_IDS.map((sid) => (
                    <label key={sid} className="inline-flex items-center gap-1 text-xs">
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
                className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 cursor-pointer md:col-span-3 w-fit"
              >
                Assign / Update Admin
              </button>
            </form>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-md">
              {adminUsers.map((u) => (
                <div key={u.uid} className="p-4 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold">{u.email}</p>
                    <p className="text-xs text-slate-500">
                      {u.role} · Schools: {u.assignedSchoolIds.join(", ") || "none"}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{u.uid}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
