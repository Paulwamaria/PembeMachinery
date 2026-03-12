import Link from "next/link";

type VideoItem = {
  id: number;
  title: string;
  caption: string | null;
  videoUrl: string;
  platform: string;
  thumbnailUrl: string | null;
  featured: boolean;
};

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link
      href={video.videoUrl}
      target="_blank"
      rel="noreferrer"
      className="soft-card group overflow-hidden transition hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No thumbnail
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="rounded-full bg-white/90 px-4 py-3 text-sm font-semibold shadow">
            ▶ Play
          </div>
        </div>

        {video.featured && (
          <div className="absolute left-3 top-3">
            <span className="brand-badge">Featured</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900">{video.title}</h3>
        {video.caption && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {video.caption}
          </p>
        )}
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
          {video.platform}
        </p>
      </div>
    </Link>
  );
}