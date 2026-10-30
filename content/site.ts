/** 사이트 콘텐츠. 지금은 파일, 나중에 DB 나 CMS 로 바꿀 때 이 모듈의 함수만 교체한다. */

export type NavItem = { label: string; href: string };
export type FooterColumn = { items: NavItem[] };
/**
 * position : CSS object-position. 사진마다 비율이 달라 틀에 맞춰 잘리므로 얼굴이 남도록 초점을 준다.
 * dark : 밝은 사진이라 글자를 검정으로.
 */
export type HomeBlock = { title: string; linkLabel: string; href: string; image: string; position?: string; dark?: boolean };
export type CalendarEntry = {
  day: string; month: string; title: string; location: string; tickets: string; href: string;
};

/** public/ 아래 파일 경로. basePath 가 있을 때(GitHub Pages) 앞에 붙인다. <img>, <audio> 는 Next 가 자동으로 안 붙여 준다 */
const asset = (p: string) => (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + p;

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@%EC%9D%B4%EC%86%8C%EC%98%81-k3q";
// youtu.be 짧은 주소가 휴대폰에서 유튜브 앱으로 가장 확실하게 넘어간다
export const RECITAL_VIDEO = "https://youtu.be/wyKtAE_AEEo";

export const site = {
  name: "Soyeong Lee",
  nameKo: "이소영",
  role: "Daegeumer",
  description: "대금 연주자 이소영 Soyeong Lee",
  nav: [
    { label: "Info", href: "/info" },
    // 아직 없는 페이지는 "#" 으로 두면 글자만 보이고 눌리지 않는다
    { label: "Works", href: "#" },
    { label: "Calendar", href: "#" },
    { label: "YouTube", href: YOUTUBE_CHANNEL },
    { label: "Contact", href: "#" },
  ] satisfies NavItem[],
  // 실제로 있는 링크만 둔다. SNS 가 생기면 여기에 추가
  footer: [
    { items: [{ label: "YouTube", href: YOUTUBE_CHANNEL }] },
    { items: [{ label: "© 2026 Soyeong Lee", href: "#" }] },
  ] satisfies FooterColumn[],
  banner: { text: "달 그림자, 제 1회 대금독주회 [시간의 틈새(闖塞)] 중", linkLabel: "[ Watch ]", href: RECITAL_VIDEO },
  /** 배경 사운드. 유튜브 실황 '달 그림자' 음원을 받아 -18 LUFS 로 맞추고 페이드를 넣은 파일 */
  audio: { src: asset("/audio/dal-geurimja.m4a"), title: "달 그림자" },
};

export function getHomeIntro() {
  return { image: asset("/images/lake-bw.jpg"), position: "55% 45%", video: null as string | null };
}

export function getHomeBlocks(): HomeBlock[] {
  return [
    { title: "달 그림자", linkLabel: "[ Watch ]", href: RECITAL_VIDEO, image: asset("/images/stage-blue.jpg"), position: "45% 38%" },
    { title: "Biography", linkLabel: "[ Read more ]", href: "/info", image: asset("/images/portrait-grey-2.jpg"), position: "60% 25%" },
    { title: "Calendar", linkLabel: "[ Coming soon ]", href: "#", image: asset("/images/hanbok-purple.jpg"), position: "45% 15%", dark: true },
    { title: "YouTube", linkLabel: "[ Subscribe ]", href: YOUTUBE_CHANNEL, image: asset("/images/stage-green.jpg"), position: "30% 50%" },
  ];
}

export function getInfo() {
  return {
    titleLines: ["Soyeong Lee", "Daegeum"],
    credits: ["Photo", "Soyeong Lee"],
    portrait: asset("/images/portrait-black.jpg"),
    portraitPosition: "50% 30%",
    sections: [
      { type: "text" as const, paragraphs: [
        "이소영은 대금 연주자다. 정악과 산조의 호흡 위에 동시대의 소리를 얹어, 대금이 무대와 공간을 어떻게 바꾸는지 탐구한다.",
        "제 1회 대금독주회 '시간의 틈새(闖塞)' 를 열었고, 실황 가운데 '달 그림자' 를 유튜브에 공개했다.",
      ] },
      { type: "two-images" as const, images: [
        { src: asset("/images/portrait-grey-1.jpg"), position: "50% 20%", caption: "PHOTO © Soyeong Lee", size: "big" as const },
        { src: asset("/images/stage-white-1.jpg"), position: "50% 30%", caption: "LIVE", size: "small" as const },
      ] },
      { type: "text" as const, paragraphs: [
        "협업과 공연 문의는 Contact 페이지를 통해 받는다.",
      ] },
      { type: "two-images" as const, images: [
        { src: asset("/images/stage-white-2.jpg"), position: "50% 40%", caption: "LIVE", size: "big" as const },
        { src: asset("/images/stage-blue.jpg"), position: "45% 35%", caption: "LIVE", size: "small" as const },
      ] },
    ],
  };
}

export function getCalendar(): CalendarEntry[] {
  return [
    { day: "16th", month: "Mar 2027", title: "대금 독주회", location: "Platform-L, Seoul", tickets: "Buy tickets", href: "#" },
    { day: "22nd", month: "Mar 2027", title: "Listening Session", location: "Komfy, Seoul", tickets: "Sold out", href: "#" },
    { day: "04th", month: "Apr 2027", title: "Europe Tour", location: "Philharmonie, Berlin", tickets: "Buy tickets", href: "#" },
    { day: "09th", month: "Apr 2027", title: "Europe Tour", location: "Barbican, London", tickets: "Buy tickets", href: "#" },
    { day: "18th", month: "May 2027", title: "Asia Tour", location: "Blue Note, Tokyo", tickets: "Buy tickets", href: "#" },
  ];
}
