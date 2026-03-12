import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import VideoCard from "@/components/VideoCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Showcase Videos | Pembe Machinery",
  description:
    "Watch machine demos, fabrication work, and recent machinery showcase videos from Pembe Machinery.",
  openGraph: {
    title: "Showcase Videos | Pembe Machinery",
    description:
      "Watch machine demos, fabrication work, and recent machinery showcase videos from Pembe Machinery.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Showcase Videos | Pembe Machinery",
    description:
      "Watch machine demos, fabrication work, and recent machinery showcase videos from Pembe Machinery.",
  },
};

export default async function VideosPage() {
  const videos = await prisma.showcaseVideo.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-white to-slate-50 p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="section-kicker">Showcase</p>
          <h1 className="section-title mt-2">Showcase Videos</h1>
          <p className="mt-3 text-slate-600">
            Watch machine demos, fabrication projects, and recent work highlights
            from Pembe Machinery.
          </p>
        </div>
      </section>

      {videos.length === 0 ? (
        <div className="soft-card mt-8 p-10 text-center">
          <h2 className="text-xl font-semibold">No videos yet</h2>
          <p className="mt-2 text-slate-600">
            Showcase videos will appear here once added by admin.
          </p>
        </div>
      ) : (
        <section className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}