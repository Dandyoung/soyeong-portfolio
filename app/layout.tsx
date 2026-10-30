import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { MenuOverlay } from "@/components/Shell";
import SoundTrigger from "@/components/SoundTrigger";

// Lateral(원본 상용 폰트) 대체. 나중에 next/font/local 로 바꾸면 된다
const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s, ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // html/body 의 클래스와 style 은 SiteBehaviors, BodyClass 가 DOM 에서 직접 바꾼다 (원본의 body.* 상태 재현).
    // React 가 하이드레이션 때 그 차이를 경고하지 않도록 두 요소만 억제한다.
    <html lang="ko" className={sans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MenuOverlay />
        <SoundTrigger src={site.audio.src} title={site.audio.title} />
        {children}
      </body>
    </html>
  );
}
