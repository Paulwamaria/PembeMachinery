import { prisma } from "@/lib/prisma";
import VideoCard from "@/components/VideoCard";

export default async function VideosPage() {
  const videos = await prisma.showcaseVideo.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="section-kicker">Showcase</p>
        <h1 className="section-title">Showcase Videos</h1>
        <p className="mt-2 text-slate-600">
          Watch machine demos, fabrication projects, and recent work highlights.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="soft-card p-10 text-center">
          <h2 className="text-xl font-semibold">No videos yet</h2>
          <p className="mt-2 text-slate-600">
            Showcase videos will appear here once added by admin.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}