import { prisma } from "@/lib/prisma";

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

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await prisma.showcaseVideo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-gradient-to-b from-white to-[color:var(--soft-2)]">
        <div className="container-shell py-14 md:py-18">
          <p className="section-kicker">Showcase Videos</p>
          <h1 className="section-title mt-3">
            Machinery Videos and Workshop Clips
          </h1>
          <p className="max-w-3xl mt-5 text-base md:text-lg text-[color:var(--text-muted)] leading-7">
            Watch machinery demos, fabrication activity, and short product showcase clips
            from Pembe Machinery.
          </p>
        </div>
      </section>

      <section className="container-shell py-14">
        {videos.length === 0 ? (
          <div className="soft-card p-10 text-center">
            <h2 className="text-xl font-semibold text-[color:var(--pembe-purple)]">
              No videos available yet
            </h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              Upload or link showcase videos from the admin panel to display them here.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((video) => {
              const embedUrl = getEmbedUrl(video.videoUrl, video.platform);

              return (
                <div key={video.id} className="soft-card p-4">
                  {video.videoType === "upload" || video.platform === "direct" ? (
                    <video
                      src={video.videoUrl}
                      controls
                      className="w-full rounded-2xl border border-[color:var(--border)] bg-black"
                    />
                  ) : video.platform === "facebook" ? (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex aspect-video items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white text-sm font-medium text-[color:var(--pembe-purple)]"
                    >
                      Watch on Facebook
                    </a>
                  ) : embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="w-full aspect-video rounded-2xl border border-[color:var(--border)]"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white text-sm text-[color:var(--text-muted)]">
                      Video unavailable
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {video.featured ? (
                        <span className="brand-badge brand-badge-purple">Featured</span>
                      ) : null}
                      <span className="brand-badge brand-badge-green">
                        {video.platform}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                      {video.title}
                    </h2>

                    {video.caption ? (
                      <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
                        {video.caption}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}