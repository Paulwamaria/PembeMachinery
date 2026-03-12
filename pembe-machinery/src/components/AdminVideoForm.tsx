"use client";

import { useState } from "react";

type Props = {
  initialData?: {
    title?: string;
    caption?: string;
    videoUrl?: string;
    videoType?: string;
    platform?: string;
    thumbnailUrl?: string;
    featured?: boolean;
  };
};

export default function AdminVideoForm({ initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [caption, setCaption] = useState(initialData?.caption || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [videoType, setVideoType] = useState(initialData?.videoType || "external");
  const [platform, setPlatform] = useState(initialData?.platform || "youtube");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl || "");
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-thumbnail", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setThumbnailUrl(data.url);
      setMessage("Thumbnail uploaded successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          videoUrl,
          videoType,
          platform,
          thumbnailUrl,
          featured,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save video.");
      }

      setMessage("Video saved successfully.");
      setTitle("");
      setCaption("");
      setVideoUrl("");
      setVideoType("external");
      setPlatform("youtube");
      setThumbnailUrl("");
      setFeatured(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="soft-card space-y-4 p-5">
      <div>
        <p className="section-kicker">Admin</p>
        <h2 className="section-title text-xl">Add Showcase Video</h2>
      </div>

      <input
        className="ui-input w-full"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="ui-input min-h-[120px] w-full"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        className="ui-input w-full"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
      />

      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="ui-input w-full"
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
        >
          <option value="external">External</option>
          <option value="upload">Upload</option>
        </select>

        <select
          className="ui-input w-full"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
          <option value="vimeo">Vimeo</option>
          <option value="direct">Direct</option>
        </select>
      </div>

      <input
        className="ui-input w-full"
        placeholder="Thumbnail URL (optional)"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      </div>

      {thumbnailUrl && (
        <div className="overflow-hidden rounded-2xl border">
          <img
            src={thumbnailUrl}
            alt="Thumbnail preview"
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Mark as featured
      </label>

      <button
        type="submit"
        className="ui-button-green"
        disabled={saving || uploading}
      >
        {saving ? "Saving..." : "Save Video"}
      </button>

      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}