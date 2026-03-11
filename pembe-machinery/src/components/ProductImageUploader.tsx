"use client";

import { useRef, useState } from "react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function ProductImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    setUploading(true);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Upload failed");
      return;
    }

    const data = await res.json();
    onChange([...(value ?? []), ...(data.urls ?? [])]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeImage(url: string) {
    onChange(value.filter((item) => item !== url));
  }

  function setAsCover(index: number) {
    if (index === 0) return;

    const next = [...value];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    onChange(next);
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragEnter(index: number) {
    setDragOverIndex(index);
  }

  function handleDragEnd() {
    if (
      dragIndex === null ||
      dragOverIndex === null ||
      dragIndex === dragOverIndex
    ) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    const next = [...value];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(dragOverIndex, 0, moved);

    onChange(next);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="block"
        />
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
        Drag images to reorder them. The{" "}
        <span className="font-medium text-slate-700">first image</span> is used as the{" "}
        <span className="font-medium text-slate-700">cover image</span>.
      </div>

      {uploading ? (
        <div className="text-sm text-gray-500">Uploading...</div>
      ) : null}

      {value.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {value.map((url, index) => {
            const isCover = index === 0;
            const isDragging = dragIndex === index;
            const isDropTarget = dragOverIndex === index && dragIndex !== index;

            return (
              <div
                key={url}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                className={`rounded-2xl border bg-white p-3 shadow-sm transition ${
                  isDragging
                    ? "opacity-50 border-slate-400"
                    : isDropTarget
                    ? "border-blue-400 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="h-40 w-full rounded-xl object-cover"
                  />

                  {isCover ? (
                    <div className="absolute left-2 top-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      Cover
                    </div>
                  ) : null}

                  <div className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 border border-gray-200">
                    Drag
                  </div>
                </div>

                <div className="mt-3 text-xs font-medium text-slate-600">
                  Position: {index + 1} {isCover ? "(Cover)" : ""}
                </div>

                <div className="mt-2 text-xs text-gray-500 break-all">
                  {url}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAsCover(index)}
                    disabled={isCover}
                    className="rounded-xl border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-700 disabled:opacity-40"
                  >
                    Set as Cover
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">
          No uploaded images yet.
        </div>
      )}
    </div>
  );
}