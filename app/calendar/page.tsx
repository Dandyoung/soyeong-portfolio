import type { Metadata } from "next";
import { getCalendar } from "@/content/site";
import { BackTrigger } from "@/components/Shell";
import BodyClass from "@/components/BodyClass";
import SiteBehaviors from "@/components/SiteBehaviors";

export const metadata: Metadata = { title: "Calendar" };

export default function CalendarPage() {
  const entries = getCalendar();
  return (
    <>
      <BodyClass className="template-page black-menu" />
      <BackTrigger />
      <main>
        <div id="calendar-container">
          {entries.map((e) => (
            <a className="calendar-date grid-20 toslide" href={e.href} key={`${e.day}-${e.month}-${e.location}`}>
              <div className="calendar-day">{e.day}</div>
              <div className="calendar-month">{e.month}</div>
              <div className="calendar-title">{e.title}</div>
              <div className="calendar-location">{e.location}</div>
              <div className="calendar-tickets uppercase">{e.tickets}</div>
            </a>
          ))}
        </div>
      </main>
      <SiteBehaviors />
    </>
  );
}
