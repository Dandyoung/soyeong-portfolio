import { getHomeBlocks, getHomeIntro, site } from "@/content/site";
import { Banner, PageFooter, SiteLink } from "@/components/Shell";
import BodyClass from "@/components/BodyClass";
import SiteBehaviors from "@/components/SiteBehaviors";

const PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export default function HomePage() {
  const intro = getHomeIntro();
  const blocks = getHomeBlocks();
  return (
    <>
      <BodyClass className="template-index has-banner" />
      <div id="keep-scrolling" className="medium uppercase">[ Keep scrolling ]</div>
      <main>
        <div className="homepage-block homepage-intro toslide">
          {intro.video ? (
            <video id="homepage-video" className="homepage-image" src={intro.video} poster={intro.image} muted loop playsInline preload="metadata" />
          ) : (
            <img className="homepage-image" src={intro.image} alt="" style={{ objectPosition: intro.position }} />
          )}
          <div className="homepage-hero-text">
            <p className="homepage-sub medium uppercase">{site.nameKo} / {site.role}</p>
            <h1>{site.name}</h1>
          </div>
        </div>
        {blocks.map((b) => (
          <div className={`homepage-block toslide${b.dark ? " dark" : ""}`} key={b.title}>
            <img className="homepage-image" data-src={b.image} src={PIXEL} alt="" style={{ objectPosition: b.position }} />
            <div className="homepage-title-link">
              <div className="homepage-title">{b.title}</div>
              <div className="homepage-link uppercase"><SiteLink href={b.href}>{b.linkLabel}</SiteLink></div>
            </div>
          </div>
        ))}
      </main>
      <PageFooter />
      <Banner />
      <SiteBehaviors />
    </>
  );
}
