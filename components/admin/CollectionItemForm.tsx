"use client";

import React, { useState } from "react";
import { Upload, Save, X } from "lucide-react";

export type CollectionName =
  | "announcements"
  | "news"
  | "people"
  | "documents"
  | "albums"
  | "videos"
  | "accolades";

interface CollectionItemFormProps {
  collection: CollectionName;
  initialItem?: Record<string, unknown> | null;
  schoolId: string;
  getToken: () => Promise<string>;
  onSave: (item: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
}

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? trimmed;
}

export function CollectionItemForm({
  collection,
  initialItem,
  schoolId,
  getToken,
  onSave,
  onCancel,
}: CollectionItemFormProps) {
  const isEditing = Boolean(initialItem?.id);

  const [id, setId] = useState(String(initialItem?.id ?? ""));
  const [status, setStatus] = useState<"published" | "draft">(
    initialItem?.status === "draft" ? "draft" : "published"
  );
  const [order, setOrder] = useState<number>(Number(initialItem?.order ?? 1));

  // Shared / per-collection fields
  const [kind, setKind] = useState(
    String(
      initialItem?.kind ??
        (collection === "announcements"
          ? "board"
          : collection === "people"
          ? "mentor-faculty"
          : collection === "documents"
          ? "newsletter"
          : collection === "accolades"
          ? "accolade"
          : "")
    )
  );
  const [title, setTitle] = useState(String(initialItem?.title ?? ""));
  const [name, setName] = useState(String(initialItem?.name ?? ""));
  const [role, setRole] = useState(String(initialItem?.role ?? ""));
  const [qualification, setQualification] = useState(String(initialItem?.qualification ?? ""));
  const [organization, setOrganization] = useState(String(initialItem?.organization ?? ""));
  const [quote, setQuote] = useState(String(initialItem?.quote ?? ""));
  const [bio, setBio] = useState(String(initialItem?.bio ?? ""));
  const [dateLabel, setDateLabel] = useState(String(initialItem?.dateLabel ?? ""));
  const [category, setCategory] = useState(String(initialItem?.category ?? "Event"));
  const [badge, setBadge] = useState(String(initialItem?.badge ?? "Event"));
  const [excerpt, setExcerpt] = useState(String(initialItem?.excerpt ?? ""));
  const [content, setContent] = useState(String(initialItem?.content ?? ""));
  const [description, setDescription] = useState(String(initialItem?.description ?? ""));
  const [featured, setFeatured] = useState(Boolean(initialItem?.featured ?? true));
  const [image, setImage] = useState(
    String(initialItem?.image ?? initialItem?.imageUrl ?? "")
  );
  const [alt, setAlt] = useState(String(initialItem?.alt ?? ""));
  const [link, setLink] = useState(String(initialItem?.link ?? ""));
  const [fileUrl, setFileUrl] = useState(String(initialItem?.fileUrl ?? ""));
  const [year, setYear] = useState(String(initialItem?.year ?? "2026"));
  const [academicYear, setAcademicYear] = useState(
    String(initialItem?.academicYear ?? "2026-27")
  );
  const [youtubeId, setYoutubeId] = useState(String(initialItem?.youtubeId ?? ""));
  const [colorClass, setColorClass] = useState(
    String(initialItem?.colorClass ?? "text-emerald-400")
  );
  const [coverColor, setCoverColor] = useState(
    String(initialItem?.coverColor ?? "from-blue-600 to-indigo-700")
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (
    file: File,
    folder: "images" | "documents",
    onUploaded: (url: string) => void
  ) => {
    setUploading(true);
    setError("");
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch(`/api/admin/schools/${schoolId}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onUploaded(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const buildPayload = (): Record<string, unknown> => {
    const base = {
      ...(id.trim() ? { id: id.trim() } : {}),
      order: Number.isFinite(order) ? order : 1,
      status,
    };

    switch (collection) {
      case "announcements":
        return {
          ...base,
          kind,
          title,
          dateLabel: dateLabel || undefined,
          image: image || undefined,
          alt: alt || undefined,
          link: link || undefined,
          colorClass: kind === "ticker" ? colorClass : undefined,
        };
      case "news":
        return {
          ...base,
          title,
          category,
          badge: badge || category,
          dateLabel: dateLabel || "Recent",
          image: image || "/news/infini.jpeg",
          excerpt,
          content: content || undefined,
          link: link || "/academics/news",
          featured,
        };
      case "people":
        return {
          ...base,
          kind,
          name,
          role,
          qualification: qualification || undefined,
          organization: organization || undefined,
          quote: quote || undefined,
          bio: bio || undefined,
          image: image || undefined,
        };
      case "documents":
        return {
          ...base,
          kind,
          title,
          dateLabel: dateLabel || undefined,
          description: description || undefined,
          fileUrl,
          coverColor: kind === "newsletter" ? coverColor : undefined,
        };
      case "albums":
        return {
          ...base,
          title,
          year,
          imageUrl: image,
          heightClass: "h-80",
        };
      case "videos":
        return {
          ...base,
          title,
          youtubeId: extractYoutubeId(youtubeId),
          academicYear,
        };
      case "accolades":
        return {
          ...base,
          kind,
          title,
          imageUrl: image,
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave(buildPayload());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  const renderImageField = (label: string, required = false) => (
    <div>
      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          required={required}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/image/... or https://..."
          className="flex-1 min-w-[200px] px-3 py-2 border border-slate-200 rounded-md text-sm"
        />
        <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md cursor-pointer">
          <Upload className="w-3.5 h-3.5" />
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFileUpload(f, "images", setImage);
            }}
          />
        </label>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-slate-200 rounded-md p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          {isEditing ? `Edit Item (${id})` : `Add New to ${collection}`}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>

      {/* Common metadata row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            Publish Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "published" | "draft")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
          >
            <option value="published">Published (Live)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
            Display Order
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
          />
        </div>
        {!isEditing && (
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Custom ID (Optional)
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Auto-generated if blank"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
        )}
      </div>

      {/* Collection-specific fields */}
      {collection === "announcements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Announcement Type
            </label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            >
              <option value="board">Homepage Board (Dated List)</option>
              <option value="ticker">Top Bar Scrolling Ticker</option>
              <option value="modal">Popup Flyer Modal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Admission open for 2026-27"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          {kind === "board" && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Date Label
              </label>
              <input
                type="text"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                placeholder="e.g. June 5, 2026"
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              />
            </div>
          )}
          {kind === "ticker" && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Ticker Text Color
              </label>
              <select
                value={colorClass}
                onChange={(e) => setColorClass(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              >
                <option value="text-emerald-400">Emerald Green</option>
                <option value="text-[#FF9924]">Amber Orange</option>
                <option value="text-[#385EEC]">Royal Blue</option>
                <option value="text-white">White</option>
              </select>
            </div>
          )}
          {kind === "modal" && (
            <>
              <div className="md:col-span-2">{renderImageField("Flyer Image URL", true)}</div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Click Link (Optional)
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/academics/academic-results"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                />
              </div>
            </>
          )}
        </div>
      )}

      {collection === "news" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setBadge(e.target.value);
              }}
              placeholder="Event, Academics, Sports, Culture, Campus"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Date Label
            </label>
            <input
              type="text"
              required
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              placeholder="e.g. June 2026 or Recent"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              id="news-featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label htmlFor="news-featured" className="text-sm font-medium text-slate-700">
              Show on Homepage &ldquo;Recent News&rdquo; Carousel
            </label>
          </div>
          <div className="md:col-span-2">{renderImageField("News Image URL", true)}</div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Short Summary (Excerpt)
            </label>
            <textarea
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
        </div>
      )}

      {collection === "people" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Section / Group
            </label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            >
              <option value="mentor-faculty">Teaching Faculty (Mentors)</option>
              <option value="mentor-leadership">Mentor Leadership (Principal / VP)</option>
              <option value="management-featured">Management Featured Leader</option>
              <option value="management-member">Management Board Member</option>
              <option value="frontrunner">Alumni Frontrunner</option>
              <option value="testimonial">Homepage Testimonial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Role / Subject / Designation
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Principal, Mathematics, Alumni, Parent"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Qualification (Optional)
            </label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. M.Sc, B.Ed"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          {(kind === "frontrunner" || kind === "testimonial") && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Quote / Testimonial
                </label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                />
              </div>
            </>
          )}
          {kind === "management-featured" && (
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Short Bio
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              />
            </div>
          )}
          <div className="md:col-span-2">{renderImageField("Photo URL (Optional)")}</div>
        </div>
      )}

      {collection === "documents" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Document Type
            </label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            >
              <option value="newsletter">Newsletter</option>
              <option value="download">Downloads Page Item</option>
              <option value="academic-planner">Academic Planner PDF</option>
              <option value="general-info">General Information PDF</option>
              <option value="safety-policy">School Safety Policy PDF</option>
              <option value="child-protection-policy">Child Protection Policy PDF</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Document Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Date / Academic Year Label
            </label>
            <input
              type="text"
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              placeholder="e.g. Academic Year 2026-27"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Card Accent Color
            </label>
            <select
              value={coverColor}
              onChange={(e) => setCoverColor(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            >
              <option value="from-blue-600 to-indigo-700">Blue / Indigo</option>
              <option value="from-orange-500 to-red-600">Orange / Red</option>
              <option value="from-emerald-500 to-teal-600">Emerald / Teal</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              PDF File URL
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="/document.pdf or https://..."
                className="flex-1 min-w-[200px] px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                {uploading ? "Uploading..." : "Upload PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleFileUpload(f, "documents", setFileUrl);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
        </div>
      )}

      {collection === "albums" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Photo Title / Caption
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Year
            </label>
            <input
              type="text"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2026"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div className="md:col-span-2">{renderImageField("Photo URL", true)}</div>
        </div>
      )}

      {collection === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Video Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              YouTube URL or Video ID
            </label>
            <input
              type="text"
              required
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or ID"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              required
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="e.g. 2026-27"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
        </div>
      )}

      {collection === "accolades" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Type
            </label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            >
              <option value="accolade">Accolade / Award</option>
              <option value="academic-result">Academic Result Flyer</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
            />
          </div>
          <div className="md:col-span-2">{renderImageField("Image URL", true)}</div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md p-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || uploading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Item"}
      </button>
    </form>
  );
}
