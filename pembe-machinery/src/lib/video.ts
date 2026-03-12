export function extractYouTubeId(url: string) {
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
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getAutoThumbnail(videoUrl: string, platform: string) {
  if (platform === "youtube") {
    const id = extractYouTubeId(videoUrl);
    if (id) {
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
  }

  return null;
}