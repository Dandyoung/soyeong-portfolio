"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 페이지 공통 동작. 원본 사이트의 main.js(jQuery) 를 바닐라로 옮긴 것.
 * - 뷰포트 높이 CSS 변수, 로드 후 main 페이드 인
 * - .toslide 등장 애니메이션 + data-src lazy 미디어
 * - info 인트로 페이드, 메뉴 색 반전
 * 레이아웃이 아니라 각 페이지 끝에 두어야 한다. 레이아웃에 두면 페이지 내용이 스트리밍되기 전에 실행되어 .toslide 를 못 찾는다.
 */
export default function SiteBehaviors() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(ev: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      window.addEventListener(ev, fn, opts);
      cleanups.push(() => window.removeEventListener(ev, fn));
    };

    const setVh = () => document.documentElement.style.setProperty("--vh", document.documentElement.clientHeight + "px");
    setVh(); on("resize", setVh);

    body.classList.remove("fade-out", "noscroll", "show-menu", "scrolled");
    $$(".menu-column.show").forEach((el) => el.classList.remove("show"));
    const readyTimer = setTimeout(() => body.classList.add("ready"), 50);
    cleanups.push(() => clearTimeout(readyTimer));

    // 원본은 아래로 스크롤하면 고정 버튼을 숨기지만, 여기서는 Sound 와 Menu 를 항상 보이게 둔다
    on("scroll", () => { body.classList.toggle("scrolled", window.scrollY > 5); }, { passive: true });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("slide-in");
        const media = $$<HTMLImageElement | HTMLVideoElement>("[data-src]", el);
        if (el.dataset.src) media.push(el as unknown as HTMLImageElement);
        media.forEach((m) => {
          m.src = m.dataset.src ?? ""; m.removeAttribute("data-src");
          if (m instanceof HTMLVideoElement) m.play().catch(() => { m.controls = true; });
        });
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    $$(".toslide").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    const intro = document.querySelector<HTMLElement>(".about-intro-container");
    if (intro) {
      const t1 = setTimeout(() => $$<HTMLElement>(".intro-title p").forEach((p, i) => setTimeout(() => p.classList.add("show"), i * 150)), 500);
      const t2 = setTimeout(() => $$<HTMLElement>(".intro-credits, .intro-scroll").forEach((el) => el.classList.add("show")), 1200);
      cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
      const click = () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      intro.addEventListener("click", click);
      cleanups.push(() => intro.removeEventListener("click", click));
      on("scroll", () => { intro.style.opacity = String(Math.min(Math.max(1 - window.scrollY / window.innerHeight, 0), 1)); }, { passive: true });
    }
    if (body.classList.contains("black-menu-on-scroll")) {
      on("scroll", () => body.classList.toggle("black-menu", window.scrollY > 0.75 * window.innerHeight), { passive: true });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
