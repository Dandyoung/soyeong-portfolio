"use client";

import { useEffect, useRef } from "react";

/**
 * 배경 사운드 토글. 레이아웃에 두어 페이지를 옮겨도 끊기지 않는다.
 * 브라우저가 자동재생을 막으므로 사용자가 누를 때만 재생을 시작한다. preload=none 이라 누르기 전엔 받지 않는다.
 */
export default function SoundTrigger({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => document.body.classList.toggle("sound-playing", !audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    return () => { audio.removeEventListener("play", sync); audio.removeEventListener("pause", sync); };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" aria-label={title} />
      <div id="sound-trigger" className="fixed-trigger menu-tohide uppercase" onClick={toggle} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}>
        [ Sound <span className="muted">on</span><span className="unmuted">off</span> ]
      </div>
    </>
  );
}
