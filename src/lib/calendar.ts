export interface PostCalendarItem {
  position: number;
  isoDate: string;
  dayLabel: string;
  timeLabel: string;
  pillar: string;
  category?: string;
  caption: string;
  visualDirection: string;
  hashtags: string[];
}

export interface PlanCalendarMeta {
  brandName?: string | null;
  industryLabel?: string;
  id?: string;
}

/**
 * Parses isoDate and timeLabel into Date objects (start, end = +30m).
 */
export function getPostDateTimes(isoDate: string, timeLabel: string): { start: Date; end: Date } {
  let baseDate: Date;
  try {
    baseDate = new Date(isoDate);
    if (isNaN(baseDate.getTime())) {
      baseDate = new Date();
    }
  } catch {
    baseDate = new Date();
  }

  // Parse timeLabel like "10:30 AM" or "7:00 PM"
  let hours = 10;
  let minutes = 0;
  const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (match) {
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridiem = match[3]?.toUpperCase();

    if (meridiem === "PM" && h < 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    hours = h;
    minutes = m;
  }

  const start = new Date(baseDate);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start);
  end.setMinutes(start.getMinutes() + 30);

  return { start, end };
}

function formatGCalDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Formats calendar event title and description.
 */
export function formatPostCalendarDetails(post: PostCalendarItem, meta: PlanCalendarMeta) {
  const brand = meta.brandName ? meta.brandName.trim() : (meta.industryLabel || "Brand");
  const title = `[Post #${post.position}] ${brand} — ${post.pillar}`;

  const details = [
    `📅 SCHEDULED: ${post.dayLabel} at ${post.timeLabel}`,
    `🎯 PILLAR: ${post.pillar}${post.category ? ` (${post.category})` : ""}`,
    "",
    "✍️ CAPTION:",
    post.caption,
    "",
    "🎬 VISUAL DIRECTION:",
    post.visualDirection,
    "",
    "🏷️ HASHTAGS:",
    post.hashtags.join(" "),
  ].join("\n");

  return { title, details };
}

/**
 * Generates direct Google Calendar Web Event Template link.
 */
export function createGoogleCalendarUrl(post: PostCalendarItem, meta: PlanCalendarMeta): string {
  const { start, end } = getPostDateTimes(post.isoDate, post.timeLabel);
  const { title, details } = formatPostCalendarDetails(post, meta);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGCalDate(start)}/${formatGCalDate(end)}`,
    details: details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates RFC-5545 iCalendar (.ics) content for importing entire plan.
 */
export function generateIcsCalendar(posts: PostCalendarItem[], meta: PlanCalendarMeta): string {
  const brand = meta.brandName ? meta.brandName.trim() : (meta.industryLabel || "Social Atelier");
  
  const events = posts.map((post) => {
    const { start, end } = getPostDateTimes(post.isoDate, post.timeLabel);
    const { title, details } = formatPostCalendarDetails(post, meta);

    const escapeIcs = (str: string) =>
      str
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");

    const uid = `${meta.id || "plan"}-post-${post.position}-${start.getTime()}@socialatelier.ai`;
    const dtStamp = formatGCalDate(new Date());
    const dtStart = formatGCalDate(start);
    const dtEnd = formatGCalDate(end);

    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(details)}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: Post scheduled for ${escapeIcs(brand)}`,
      "END:VALARM",
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Social Atelier//Content Strategist Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${brand} Content Calendar`,
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Client-side file downloader for .ics calendar.
 */
export function downloadIcsFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
