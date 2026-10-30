"use client";

import type { ReactNode } from "react";

/** 휴대폰 : 손가락 입력 기기나 iOS, Android UA */
const isMobile = () =>
  window.matchMedia("(pointer: coarse)").matches || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/**
 * 외부 링크. 데스크톱은 새 탭, 휴대폰은 같은 탭으로 연다.
 * 같은 탭으로 열어야 iOS Universal Links, Android App Links 가 동작해 유튜브 링크가 유튜브 앱으로 넘어간다
 * (새 탭이나 window.open 은 앱 연결이 끊기는 경우가 있다).
 */
export default function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => { if (isMobile()) e.currentTarget.target = "_self"; }}
    >
      {children}
    </a>
  );
}
