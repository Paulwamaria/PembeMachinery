import { prisma } from "@/lib/prisma";
import VideoCard from "@/components/VideoCard";


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

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </section>
    );
}