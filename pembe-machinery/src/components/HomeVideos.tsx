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

export default async function HomeVideos() {
    const videos = await prisma.showcaseVideo.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
    });

    if (!videos.length) return null;

    return (
        <section
            id="showcase-videos"
            className="section-space border-y border-[color:var(--border)] bg-[color:var(--soft-2)]"
        >
            <div className="container-shell">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="max-w-2xl">
                        <p className="section-kicker">Video Showcase</p>
                        <h2 className="section-title mt-2">Watch Our Machinery in Action</h2>
                        <p className="mt-3 text-sm md:text-base text-[color:var(--text-muted)]">
                            Short clips from machinery demos, workshop activity, and fabrication work.
                        </p>
                    </div>

                    <a href="/videos" className="ui-button ui-button-light w-fit">
                        View All Videos
                    </a>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mt-8">
                    {videos.map((video) => {
                        const embedUrl = getEmbedUrl(video.videoUrl, video.platform);

                        return (
                            <div key={video.id} className="soft-card p-4">
                                {video.videoType === "upload" || video.platform === "direct" ? (
                                    <video
                                        src={video.videoUrl}
                                        controls
                                        className="w-full rounded-2xl border border-[color:var(--border)]"
                                    />
                                ) : video.platform === "facebook" ? (
                                    <a
                                        href={video.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-2xl border border-[color:var(--border)] bg-white p-8 text-center text-sm text-[color:var(--pembe-purple)]"
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
                                    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-6 text-sm text-[color:var(--text-muted)]">
                                        Video unavailable
                                    </div>
                                )}

                                <h3 className="mt-4 font-semibold text-slate-900">
                                    {video.title}
                                </h3>
                                {video.caption ? (
                                    <p className="mt-2 text-sm text-[color:var(--text-muted)] leading-6">
                                        {video.caption}
                                    </p>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}