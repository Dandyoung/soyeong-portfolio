import type { ReactNode } from "react";
import { site } from "@/content/site";
import FadeLink from "./FadeLink";
import MenuTrigger from "./MenuTrigger";

/** 내부 경로는 페이드 링크, 외부 URL 은 새 탭, "#" 은 링크 없는 글자 */
export function SiteLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href === "#") return <span className={className}>{children}</span>;
  if (/^https?:/.test(href)) return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>;
  return <FadeLink href={href} className={className}>{children}</FadeLink>;
}

function FooterColumns() {
  return site.footer.map((col, i) => (
    <div className="footer-column" key={i}>
      {col.items.map((it) => <SiteLink key={it.label} href={it.href}>{it.label}</SiteLink>)}
    </div>
  ));
}

/** 모든 페이지에 공통인 셸 : 오버레이 메뉴, 블러, 메뉴 버튼, 페이지 푸터, 배너 */
export function MenuOverlay() {
  return (
    <>
      <div className="menu-blur" />
      <div className="menu-container">
        <nav className="nav grid-20 uppercase">
          {site.nav.map((it) => (
            <div className={`menu-column${it.href === "#" ? " soon" : ""}`} key={it.label}>
              {it.href === "#" ? (
                // 아직 없는 페이지 : 데스크톱에서는 흐리게 두고 올리면 Coming soon, 모바일에서는 숨김 (원본과 같음)
                <span className="menu-link"><span className="label">{it.label}</span><span className="soon-label">Coming soon</span></span>
              ) : (
                <SiteLink className="menu-link" href={it.href}><span>{it.label}</span></SiteLink>
              )}
            </div>
          ))}
        </nav>
        <div className="footer grid-20 medium uppercase"><FooterColumns /></div>
      </div>
      <MenuTrigger />
    </>
  );
}

export function PageFooter() {
  return (
    <footer className="page-footer grid-20 medium uppercase"><FooterColumns /></footer>
  );
}

export function Banner() {
  const b = site.banner;
  return (
    <div id="banner" className="uppercase">
      <span>{b.text}</span>
      <SiteLink href={b.href}>{b.linkLabel}</SiteLink>
    </div>
  );
}

export function BackTrigger() {
  return (
    <FadeLink href="/" id="back-trigger" className="fixed-trigger menu-tohide uppercase">[ Back ]</FadeLink>
  );
}
