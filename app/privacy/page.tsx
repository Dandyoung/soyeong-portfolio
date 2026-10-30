import type { Metadata } from "next";
import { BackTrigger } from "@/components/Shell";
import BodyClass from "@/components/BodyClass";
import SiteBehaviors from "@/components/SiteBehaviors";

export const metadata: Metadata = { title: "Privacy Policy" };

/** 개인정보 처리방침. 이 사이트는 아무것도 수집하지 않는다. 내용은 content 가 아니라 여기 두었다 (바뀔 일이 거의 없다) */
export default function PrivacyPage() {
  return (
    <>
      <BodyClass className="template-page black-menu" />
      <BackTrigger />
      <main>
        <div className="body-text" id="privacy-container">
          <h1 className="uppercase">Privacy Policy</h1>
          <p>이 사이트는 방문자의 개인정보를 수집하거나 저장하지 않습니다. 회원 가입, 문의 양식, 쿠키, 방문 분석 도구를 쓰지 않습니다.</p>
          <p>사이트의 사진과 음원은 이소영의 소유이며 허락 없이 복제하거나 배포할 수 없습니다.</p>
          <p>YouTube, Instagram 으로 가는 링크는 각 서비스의 개인정보 처리방침을 따릅니다.</p>
          <p className="small">2026년 10월 30일</p>
        </div>
      </main>
      <SiteBehaviors />
    </>
  );
}
