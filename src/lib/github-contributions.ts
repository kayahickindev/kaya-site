// GitHub contribution calendar for the last year, read server-side so the
// heatmap paints real data at first render. Contributions are broader than
// commits: they count commits, pull requests, issues and reviews.
//
// There is no invented fallback. If the calendar cannot be read, callers get
// null and render nothing: a site that makes factual claims never paints
// made-up activity.

export type ContributionDay = { date: string; count: number };

export type ContributionCalendar = {
  username: string;
  total: number;
  days: ContributionDay[];
};

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Partial<ContributionDay>;
  return (
    typeof day.date === "string" &&
    DAY_PATTERN.test(day.date) &&
    typeof day.count === "number" &&
    Number.isFinite(day.count) &&
    day.count >= 0
  );
}

export async function getContributionCalendar(
  username = "kayahickindev",
): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!response.ok) return null;
    const json = (await response.json()) as {
      total?: { lastYear?: unknown };
      contributions?: unknown;
    };
    if (!Array.isArray(json.contributions)) return null;

    // The feed can list a day that has not started yet (it ran to 2026-09-24
    // on 2026-09-23 US time). A date after today in UTC is not drawn.
    const today = new Date().toISOString().slice(0, 10);
    const days = json.contributions
      .filter(isDay)
      .filter((day) => day.date <= today)
      .map(({ date, count }) => ({ date, count }))
      .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    if (days.length === 0) return null;

    const reported = json.total?.lastYear;
    const total =
      typeof reported === "number" && Number.isFinite(reported) && reported > 0
        ? reported
        : days.reduce((sum, day) => sum + day.count, 0);
    if (total <= 0) return null;

    return { username, total, days };
  } catch {
    return null;
  }
}

// "16846" -> "16,846" without depending on the runtime's locale data, so the
// server and client render the same string.
export function formatCount(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
