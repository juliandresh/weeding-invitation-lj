"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "./audio-context";

export function MusicToggle() {
  const { hasStarted, isPlaying, togglePlayback } = useAudio();

  return (
    <AnimatePresence>
      {hasStarted && (
        <motion.button
          type="button"
          onClick={togglePlayback}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          aria-label={
            isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"
          }
          aria-pressed={isPlaying}
          className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory/90 text-gold shadow-md backdrop-blur transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="sr-only">
            {isPlaying ? "Pausar música" : "Reproducir música"}
          </span>
          {isPlaying ? (
            <NoteBars />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              aria-hidden="true"
            >
              <path
                d="M9 18V5.5L20 3v12.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" />
              <circle cx="17" cy="15.5" r="3" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function NoteBars() {
  return (
    <span
      className="flex h-4 items-end gap-[3px]"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gold"
          animate={{ height: ["35%", "100%", "55%", "85%"] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}
