import Link from "next/link";
import { Play, Video } from "lucide-react";

type VideoItem = {
  id: number;
  title: string;
  caption: string | null;
  videoUrl: string;
  platform: string;
  thumbnailUrl: string | null;
  featured: boolean;
};

function platformLabel(platform: string) {
  switch (platform) {
    case "youtube":
      return "YouTube";
    case "facebook":
      return "Facebook";
    case "vimeo":
      return "Vimeo";
    case "direct":
      return "Direct Video";
    default:
      return "Video";
  }
}

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link
      href={video.videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <div className="rounded-full bg-white/80 p-4 shadow-sm">
                <Video size={28} />
              </div>
              <span className="text-sm font-medium">No thumbnail available</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            {platformLabel(video.platform)}
          </span>

          {video.featured && (
            <span className="brand-badge">
              Featured
            </span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition duration-300 group-hover:scale-110">
            <Play size={24} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {video.title}
        </h3>

        {video.caption && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {video.caption}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[color:var(--pembe-purple)]">
            Watch video
          </span>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            {platformLabel(video.platform)}
          </span>
        </div>
      </div>
    </Link>
  );
}