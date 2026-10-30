import type { Metadata } from "next";
import { getInfo } from "@/content/site";
import { BackTrigger, PageFooter } from "@/components/Shell";
import BodyClass from "@/components/BodyClass";
import SiteBehaviors from "@/components/SiteBehaviors";

export const metadata: Metadata = { title: "Info" };


export default function InfoPage() {
  const info = getInfo();
  return (
    <>
      <BodyClass className="template-page black-menu-on-scroll" />
      <BackTrigger />
      <main>
        <div className="about-intro-container">
          <div className="intro-text-container">
            <div className="intro-title uppercase">
              {info.titleLines.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="intro-credits medium">{info.credits[0]}<br />{info.credits[1]}</div>
            <div className="intro-scroll medium">Scroll to read more</div>
          </div>
          <div className="intro-image-container"><img src={info.portrait} alt="" style={{ objectPosition: info.portraitPosition }} /></div>
        </div>
        <div className="intro-spacer" />
        {info.sections.map((s, i) =>
          s.type === "text" ? (
            <div className="body-text" key={i}>{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          ) : (
            <div className="two-images" key={i}>
              {s.images.map((im) => (
                <div className="image-column toslide" key={im.src}>
                  <div className={`image-container ${im.size}`}>
                    <img src={im.src} loading="lazy" alt="" style={{ objectPosition: im.position }} />
                    <p className="caption medium">{im.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        )}
      </main>
      <PageFooter />
      <SiteBehaviors />
    </>
  );
}
