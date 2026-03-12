"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Upload, Trash2, Star } from "lucide-react";
import { useState } from "react";

type Props = {
  productId: string;
  initialImages: string[];
};

function SortableImage({
  id,
  url,
  isCover,
  onRemove,
}: {
  id: string;
  url: string;
  isCover: boolean;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="overflow-hidden rounded-2xl border bg-white shadow-sm"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={url} alt="Product image" className="h-full w-full object-cover" />
      </div>

      <div className="flex items-center justify-between gap-2 p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="ui-button flex items-center gap-2"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
            Drag
          </button>

          {isCover && (
            <span className="brand-badge inline-flex items-center gap-1">
              <Star size={12} />
              Cover
            </span>
          )}
        </div>

        <button
          type="button"
          className="ui-button-dark inline-flex items-center gap-2"
          onClick={() => onRemove(id)}
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function ProductImageSorter({
  productId,
  initialImages,
}: Props) {
  const [images, setImages] = useState(
    Array.from(new Set(initialImages.filter(Boolean)))
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  async function saveImages(nextImages: string[]) {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/products/${productId}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: nextImages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save image order.");
      }

      setMessage("Image order saved.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save image order."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/products/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      const url = String(data.url || "").trim();
      if (!url) {
        throw new Error("Upload succeeded but no image URL was returned.");
      }

      setImages((current) => {
        const next = Array.from(new Set([...current, url]));
        void saveImages(next);
        return next;
      });

      setMessage("Image uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setImages((current) => {
      const oldIndex = current.indexOf(String(active.id));
      const newIndex = current.indexOf(String(over.id));

      if (oldIndex === -1 || newIndex === -1) return current;

      const next = arrayMove(current, oldIndex, newIndex);
      void saveImages(next);
      return next;
    });
  }

  function handleRemove(id: string) {
    setImages((current) => {
      const next = current.filter((img) => img !== id);
      void saveImages(next);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <div className="soft-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Product Images</h3>
            <p className="mt-1 text-sm text-slate-500">
              Drag to reorder. The first image becomes the cover image on the public site.
            </p>
          </div>

          <label className="ui-button-green inline-flex cursor-pointer items-center gap-2">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  void handleUpload(file);
                  e.currentTarget.value = "";
                }
              }}
            />
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-6 text-sm text-slate-500">
          No images uploaded yet.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((url, index) => (
                <SortableImage
                  key={url}
                  id={url}
                  url={url}
                  isCover={index === 0}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="text-sm text-slate-600">
        {saving ? "Saving..." : message}
      </div>
    </div>
  );
}