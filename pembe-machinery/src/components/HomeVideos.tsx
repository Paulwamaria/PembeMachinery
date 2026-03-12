import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicVideoEmbed from "@/components/PublicVideoEmbed";

export default async function HomeVideos() {
  const videos = await prisma.showcaseVideo.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 3,
  });

  if (!videos.length) return null;

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Video Showcase</p>
            <h2 className="section-title mt-2">Watch Our Machines in Action</h2>
            <p className="mt-3 text-sm md:text-base text-[color:var(--text-muted)]">
              Machine demos, fabrication highlights, and recent showcase videos.
            </p>
          </div>

          <Link href="/videos" className="ui-button ui-button-light w-fit">
            View All Videos
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <PublicVideoEmbed key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}