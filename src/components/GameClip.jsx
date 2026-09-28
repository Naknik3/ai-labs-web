import { useEffect, useRef } from "react";
import "./GameClip.css";

// Muted gameplay loop: fetched and played only while on screen, poster only under reduced motion.
export default function GameClip({ src, poster, label, title, body, accent }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="clip">
      <div className="clip__screen">
        <video
          ref={videoRef}
          className="clip__video"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={title}
        />
        <span className="clip__label" style={{ color: `var(--${accent})` }}>
          {label}
        </span>
      </div>
      <figcaption className="clip__caption">
        <span className="clip__title">{title}</span>
        <span className="clip__body">{body}</span>
      </figcaption>
    </figure>
  );
}
