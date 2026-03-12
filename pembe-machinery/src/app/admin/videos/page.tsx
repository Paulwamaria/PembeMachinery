"use client";

import { useEffect, useState } from "react";

type VideoItem = {
  id: string;
  title: string;
  caption?: string | null;
  videoUrl: string;
  videoType: "upload" | "external";
  platform: "direct" | "youtube" | "facebook" | "vimeo";
  featured: boolean;
};

function getEmbedUrl(url: string, platform: string) {
  if (platform === "youtube") {
    const match =
      url.match(/v=([^&]+)/) ||
      url.match(/youtu\.be\/([^?]+)/) ||
      url.match(/youtube\.com\/embed\/([^?]+)/);
    const id = match?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (platform === "vimeo") {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const id = match?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  return null;
}

export default function AdminVideosPage() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"upload" | "external">("upload");
  const [platform, setPlatform] = useState<"direct" | "youtube" | "facebook" | "vimeo">("direct");
  const [featured, setFeatured] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    setItems(data.results ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadVideo(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/admin/upload-video", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    setVideoUrl(data.url);
    setVideoType("upload");
    setPlatform("direct");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        caption: caption || null,
        videoUrl,
        videoType,
        platform,
        featured,
      }),
    });

    if (!res.ok) {
      alert("Failed to save video");
      return;
    }

    setTitle("");
    setCaption("");
    setVideoUrl("");
    setVideoType("upload");
    setPlatform("direct");
    setFeatured(true);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this video?")) return;

    const res = await fetch(`/api/admin/videos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    load();
  }

  return (
    <main className="max-w-5xl">
      <h1 className="text-2xl font-semibold">Manage Videos</h1>

      <form onSubmit={save} className="mt-6 space-y-4">
        <input
          className="ui-input"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="ui-input min-h-[100px]"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <label className="rounded-xl border border-gray-300 bg-white p-4">
            <div className="font-medium mb-2">Upload video file</div>
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadVideo(file);
              }}
            />
            {uploading ? (
              <div className="text-sm text-gray-500 mt-2">Uploading video...</div>
            ) : null}
          </label>

          <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3">
            <div className="font-medium">Or use external link</div>

            <select
              className="ui-input"
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value as "direct" | "youtube" | "facebook" | "vimeo")
              }
            >
              <option value="direct">Direct video URL</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="vimeo">Vimeo</option>
            </select>

            <input
              className="ui-input"
              placeholder="Paste video link"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setVideoType("external");
              }}
            />
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured video
        </label>

        <button className="ui-button ui-button-dark">
          Save Video
        </button>
      </form>

      <div className="mt-10 grid gap-4">
        {items.map((item) => {
          const embedUrl = getEmbedUrl(item.videoUrl, item.platform);

          return (
            <div key={item.id} className="soft-card p-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  {item.caption ? (
                    <div className="text-sm text-[color:var(--text-muted)] mt-2">
                      {item.caption}
                    </div>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.featured ? (
                      <span className="brand-badge brand-badge-purple">Featured</span>
                    ) : null}
                    <span className="brand-badge brand-badge-green">
                      {item.platform}
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-[320px]">
                  {item.videoType === "upload" || item.platform === "direct" ? (
                    <video
                      src={item.videoUrl}
                      controls
                      className="w-full rounded-2xl border border-[color:var(--border)]"
                    />
                  ) : item.platform === "facebook" ? (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-[color:var(--border)] bg-white p-6 text-center text-sm text-[color:var(--pembe-purple)]"
                    >
                      Open Facebook video
                    </a>
                  ) : embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="w-full aspect-video rounded-2xl border border-[color:var(--border)]"
                      allowFullScreen
                    />
                  ) : (
                    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-6 text-sm text-[color:var(--text-muted)]">
                      Invalid or unsupported external link
                    </div>
                  )}

                  <button
                    onClick={() => remove(item.id)}
                    className="mt-3 ui-button ui-button-light w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}