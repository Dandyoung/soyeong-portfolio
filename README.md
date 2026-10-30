# Soyeong 웹사이트

maxrichtermusic.com 의 레이아웃(sticky 풀스크린 블록, 전체화면 오버레이 메뉴, `[ LABEL ]` 표기)을 베이스로 만든 개인 사이트. 구조 분석은 `../reference/maxrichter/TEMPLATES.md`.

## 스택

- Next.js 16 (App Router, Turbopack) + TypeScript + React 19
- 스타일은 전역 CSS 하나 (`app/globals.css`). Tailwind 없음
- 콘텐츠는 `content/site.ts` 의 함수로 공급. 나중에 DB 나 CMS 로 바꿀 때 이 파일만 교체
- 폰트는 Inter Tight (Google). 원본의 Lateral 은 상용이라 대체
- 사진은 `public/images/` (원본을 최대 2000px, JPEG 82 로 줄인 것). 비율이 제각각이라 `content/site.ts` 의 `position` 으로 사진마다 초점을 준다. 틀은 고정이고 사진이 잘려 들어간다
- 배경 사운드는 `public/audio/dal-geurimja.m4a`. 유튜브 실황 '달 그림자' 음원을 yt-dlp 로 받아 ffmpeg 로 -18 LUFS, 페이드, AAC 96k 로 만든 것. 레이아웃의 `SoundTrigger` 가 재생하고 페이지를 옮겨도 이어진다

## 실행

컨테이너 (Colima) :

```bash
docker compose up --build -d   # http://localhost:3000
docker compose logs -f web
docker compose down
```

소스는 볼륨으로 마운트되어 저장하면 1초 안에 반영된다. `node_modules` 와 `.next` 는 컨테이너 전용 볼륨이라 Mac 쪽과 섞이지 않는다.

Colima 의 virtiofs 마운트는 파일 변경 이벤트를 컨테이너에 전달하지 않아서, compose 가 `NEXT_WATCH_POLL_MS=1000` 으로 폴링 감시를 켠다 (`next.config.ts` 의 `watchOptions`). Mac 에서 직접 돌릴 때는 이 변수가 없으니 폴링하지 않는다.

알려진 문제 : 폴링 상태에서 브라우저가 붙어 있으면 Turbopack 이 분당 수백 번 재컴파일한다 (`docker compose logs web` 에 `Compiled in 0ms` 가 계속 찍힘). 폴링을 끄면 0회지만 그러면 저장이 반영되지 않는다. 근본 해결은 Colima 를 `colima stop && colima start --mount-inotify` 로 올려 파일 이벤트를 받게 하고 compose 의 폴링 변수를 지우는 것이다.

Mac 에서 직접 :

```bash
npm install
npm run dev
```

## 외부 공개 (ngrok)

```bash
ngrok http --url=soyeong.ngrok.app 3000   # https://soyeong.ngrok.app
```

도메인 `soyeong.ngrok.app` 은 이 계정의 ngrok 플랜으로 바로 쓸 수 있다 (예약 불필요). 개발 서버는 다른 호스트명으로 들어오는 HMR 요청을 막으므로 이 도메인이 `next.config.ts` 의 `allowedDevOrigins` 에 들어 있다. 다른 도메인을 쓰면 거기에 추가하고 컨테이너를 재시작한다. ngrok 토큰은 `ngrok config add-authtoken` 으로 Mac 의 ngrok 설정에 저장돼 있다.

## 구조

| 경로 | 역할 |
|---|---|
| `app/layout.tsx` | 폰트, 전역 CSS, 오버레이 메뉴, 공통 동작 |
| `app/page.tsx` | 홈. sticky 블록 + 소리 토글 + 배너 |
| `app/info/page.tsx` | 고정 인트로 + 본문 + 2단 이미지 |
| `app/calendar/page.tsx` | 20컬럼 그리드 일정 |
| `components/Shell.tsx` | 메뉴 오버레이, 푸터, 배너, Back 버튼 (서버 컴포넌트) |
| `components/SoundTrigger.tsx` | 배경 사운드 토글. 홈은 왼쪽 위, 하위 페이지는 왼쪽 아래 |
| `components/SiteBehaviors.tsx` | 스크롤 숨김, 등장 애니메이션, lazy 미디어, 인트로 페이드 (클라이언트) |
| `components/FadeLink.tsx` | 페이드 아웃 뒤 이동하는 내부 링크 |
| `components/BodyClass.tsx` | 페이지별 body 클래스 (원본의 `body.template-*`) |
| `content/site.ts` | 메뉴, 푸터, 홈 블록, 일정, 소개 글 |

## 검사

모바일 확인은 `screenshots/mobile/shoot.mjs` (Playwright, 설치된 Chrome 사용, iPhone 14 에뮬레이션). 임시 폴더에 `npm i playwright` 한 뒤 `node shoot.mjs http://localhost:3000 <출력폴더>`.


```bash
npx tsc --noEmit
npm run lint
```
