type VideoItem = {
  id: number;
  title: string;
  caption: string | null;
  videoUrl: string;
  platform: string;
  videoType: string;
  thumbnailUrl: string | null;
  featured: boolean;
};

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").trim() || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;

      const parts = parsed.pathname.split("/").filter(Boolean);

      const embedIndex = parts.findIndex((part) => part === "embed");
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

      const shortsIndex = parts.findIndex((part) => part === "shorts");
      if (shortsIndex >= 0 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
    }

    return null;
  } catch {
    return null;
  }
}

function extractVimeoId(url: string) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  } catch {
    return null;
  }
}

function getEmbedUrl(video: VideoItem) {
  if (video.platform === "youtube") {
    const id = extractYouTubeId(video.videoUrl);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (video.platform === "vimeo") {
    const id = extractVimeoId(video.videoUrl);
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  return null;
}

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

export default function PublicVideoEmbed({ video }: { video: VideoItem }) {
  const embedUrl = getEmbedUrl(video);
  const isDirect =
    video.platform === "direct" ||
    video.videoType === "upload" ||
    video.videoUrl.startsWith("/uploads/");

  const isFacebook = video.platform === "facebook";

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm">
      <div className="aspect-[16/10] bg-slate-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isDirect ? (
          <video
            src={video.videoUrl}
            className="h-full w-full object-cover"
            controls
            preload="metadata"
          />
        ) : video.thumbnailUrl ? (
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-full w-full"
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="rounded-full bg-white/90 px-4 py-3 font-semibold shadow">
                ▶ Play
              </div>
            </div>
          </a>
        ) : isFacebook ? (
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6 text-center"
          >
            <div>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                f
              </div>
              <div className="text-base font-semibold text-slate-900">
                Open Facebook Video
              </div>
              <div className="mt-2 text-sm text-slate-500">
                Facebook preview is limited here. Click to watch on Facebook.
              </div>
            </div>
          </a>
        ) : (
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 text-center"
          >
            <div>
              <div className="text-base font-semibold text-slate-900">
                Open Video
              </div>
              <div className="mt-2 text-sm text-slate-500">
                Preview unavailable for this source.
              </div>
            </div>
          </a>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="brand-badge">{platformLabel(video.platform)}</span>
          {video.featured && <span className="brand-badge">Featured</span>}
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>

        {video.caption && (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {video.caption}
          </p>
        )}
      </div>
    </div>
  );
}