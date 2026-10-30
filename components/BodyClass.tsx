"use client";

import { useLayoutEffect } from "react";

/** 페이지별로 body 에 템플릿 클래스를 붙인다 (원본의 body.template-* 재현). 언마운트 시 제거. */
export default function BodyClass({ className }: { className: string }) {
  useLayoutEffect(() => {
    const classes = className.split(/\s+/).filter(Boolean);
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, [className]);
  return null;
}
