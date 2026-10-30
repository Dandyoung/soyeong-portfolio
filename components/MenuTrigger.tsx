"use client";

import { useRef } from "react";

/** 메뉴 열고 닫기. 열 때는 원본처럼 메뉴 항목에 150ms 간격으로 show 를 붙여 블러가 걷히며 차례로 나타난다 */
export default function MenuTrigger() {
  const timer = useRef<number | null>(null);

  const toggle = () => {
    const body = document.body;
    body.classList.toggle("show-menu");
    body.classList.toggle("noscroll");
    const columns = Array.from(document.querySelectorAll<HTMLElement>(".menu-column"));
    if (timer.current) window.clearInterval(timer.current);
    if (body.classList.contains("show-menu")) {
      let i = 0;
      timer.current = window.setInterval(() => {
        if (i < columns.length) columns[i++].classList.add("show");
        else { window.clearInterval(timer.current!); timer.current = null; }
      }, 150);
    } else {
      columns.forEach((c) => c.classList.remove("show"));
    }
  };

  return (
    <div id="menu-trigger" className="fixed-trigger menu-tohide uppercase" onClick={toggle} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}>
      [ <span className="menu-label">Menu</span><span className="close-label">Close</span> ]
    </div>
  );
}
