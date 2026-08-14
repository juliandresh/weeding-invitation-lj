"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type AudioContextValue = {
  hasStarted: boolean;
  isPlaying: boolean;
  /** Arranca la reproducción. Debe llamarse desde un gesto directo del
   * usuario (click/tap) para que los navegadores permitan audio con sonido. */
  start: () => void;
  togglePlayback: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setHasStarted(true);
        setIsPlaying(true);
      })
      .catch(() => {
        // Reproducción bloqueada por el navegador; el invitado puede
        // reintentar con el control de mute/play una vez visible.
        setHasStarted(true);
      });
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const value = useMemo(
    () => ({ hasStarted, isPlaying, start, togglePlayback }),
    [hasStarted, isPlaying, start, togglePlayback]
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={src} loop preload="none" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio debe usarse dentro de un AudioProvider");
  }
  return ctx;
}
