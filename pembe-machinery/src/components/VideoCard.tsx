export default function VideoCard({ video }: any) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-60 object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/60 text-white rounded-full p-4">
          ▶
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold">{video.title}</h3>
      </div>
    </div>
  )
}