import type { NextConfig } from "next";

// GitHub Pages 처럼 하위 경로(/soyeong-portfolio)에 올릴 때 basePath. 로컬과 루트 도메인에서는 비어 있다
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // 서버 없이 정적 파일로 내보낸다 (out/). GitHub Pages 용
  output: "export",
  // /info/index.html 로 내보내 어떤 정적 호스팅에서도 /info 가 열리게 한다
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  // 개발 서버에 다른 호스트명으로 접근할 때 (ngrok 도메인도 여기에 추가)
  allowedDevOrigins: ["127.0.0.1", "localhost", "soyeong.ngrok.app"],
  // Colima(virtiofs) 컨테이너 안에서는 파일 변경 이벤트가 안 와서 폴링으로 감시한다. compose.yaml 에서만 켠다
  ...(process.env.NEXT_WATCH_POLL_MS ? { watchOptions: { pollIntervalMs: Number(process.env.NEXT_WATCH_POLL_MS) } } : {}),
  // 개발 중 왼쪽 아래 N 표시 숨김
  devIndicators: false,
  // cacheComponents, partialPrefetching 은 정적 내보내기(export)와 같이 못 쓴다 (PPR 불가). 정적 사이트라 필요 없다
};

export default nextConfig;
