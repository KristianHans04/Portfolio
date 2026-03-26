import { useState, useEffect, useCallback } from "react";

interface MediaModalProps {
  url: string;
  label: string;
  type: "article" | "video" | "image";
  publication?: string;
}

export function MediaModal({ url, label, type, publication }: MediaModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isDriveImage = url.includes("drive.google.com");

  const getEmbedUrl = useCallback(() => {
    if (isYouTube) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (isDriveImage) {
      const fileId = url.match(/\/d\/([^/]+)/)?.[1];
      if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  }, [url, isYouTube, isDriveImage]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg cursor-pointer"
      >
        {type === "video" && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {type === "article" && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        )}
        {type === "image" && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        {label}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${publication ? publication + ": " : ""}${label}`}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <div className="relative z-10 flex w-full max-w-5xl flex-col rounded-2xl border border-white/10 bg-[#0c1424] shadow-2xl overflow-hidden" style={{ maxHeight: "90vh" }}>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-3">
                {publication && (
                  <span className="text-sm font-semibold text-white">{publication}</span>
                )}
                <span className="text-xs text-[#8fa3c4]">{label}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#8fa3c4] transition-colors hover:border-white/30 hover:text-white no-underline"
                >
                  Open in new tab
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-[#8fa3c4] transition-colors hover:border-white/30 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden" style={{ minHeight: "60vh" }}>
              <iframe
                src={getEmbedUrl()}
                className="h-full w-full border-0"
                style={{ minHeight: "60vh" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={label}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
