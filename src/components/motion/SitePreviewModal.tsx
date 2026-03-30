import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface SitePreviewModalProps {
  url: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SitePreviewModal({ url, title, children, className }: SitePreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMaximized]);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMaximized(false);
    setIsLoading(true);
  }, []);

  const canEmbed = !url.includes("github.com") && !url.includes("openbb.co");

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !isMaximized) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className={`relative z-10 flex flex-col overflow-hidden border border-white/10 bg-[#0c1424] shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMaximized
            ? "h-[calc(100vh-16px)] w-[calc(100vw-16px)] rounded-xl"
            : "h-[85vh] w-full max-w-6xl rounded-2xl"
        }`}
      >
        {/* Title bar */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Traffic light dots */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClose}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-colors hover:bg-[#ff5f57]/80 cursor-pointer"
                aria-label="Close"
                title="Close"
              >
                <svg className="h-1.5 w-1.5 text-[#4a0002] opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </button>
              <span className="h-3 w-3 rounded-full bg-[#febc2e]/40" />
              <button
                onClick={() => setIsMaximized((v) => !v)}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] transition-colors hover:bg-[#28c840]/80 cursor-pointer"
                aria-label={isMaximized ? "Restore" : "Maximize"}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                <svg className="h-1.5 w-1.5 text-[#006500] opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                  {isMaximized ? (
                    <path d="M4 14h6v6H4zM14 4h6v6h-6z" stroke="currentColor" strokeWidth="2" fill="none" />
                  ) : (
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="3" fill="none" />
                  )}
                </svg>
              </button>
            </div>

            {/* Address bar */}
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1">
              <svg className="h-3 w-3 shrink-0 text-[#3ab8ff]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="truncate text-xs text-[#8fa3c4]/80">{url}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 ml-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-medium text-[#8fa3c4] transition-colors hover:border-white/25 hover:text-white no-underline"
              title="Open in new tab"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">New tab</span>
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden bg-white">
          {canEmbed ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0c1424]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ab8ff]/20 border-t-[#3ab8ff]" />
                    <p className="text-sm text-[#8fa3c4]">Loading {title}...</p>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={url}
                className="h-full w-full border-0"
                onLoad={() => setIsLoading(false)}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                title={`${title} live preview`}
              />
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#0c1424] p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3ab8ff]/10">
                <svg className="h-8 w-8 text-[#3ab8ff]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{title}</p>
                <p className="mt-2 max-w-sm text-sm text-[#8fa3c4]">
                  This site cannot be previewed inline. Click below to visit it directly.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3ab8ff] px-6 py-3 text-sm font-semibold text-[#0c1424] transition-all hover:bg-[#3ab8ff]/90 no-underline"
              >
                Visit {title}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <span onClick={handleOpen} className={className} style={{ cursor: "pointer" }}>
        {children}
      </span>
      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
