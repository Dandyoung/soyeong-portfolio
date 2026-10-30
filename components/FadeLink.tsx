"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/** 내부 링크. 클릭하면 body 를 페이드 아웃한 뒤 이동한다 (원본의 beforeunload 페이드 재현). */
export default function FadeLink({ href, onClick, children, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || typeof href !== "string" || href.startsWith("#")) return;
    e.preventDefault();
    document.body.classList.add("fade-out");
    document.body.classList.remove("show-menu", "noscroll");
    setTimeout(() => router.push(href), 400);
  };
  return <Link href={href} onClick={handle} {...rest}>{children}</Link>;
}
