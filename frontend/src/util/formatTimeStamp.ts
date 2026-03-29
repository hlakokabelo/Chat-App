export function formatTimeStamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Future safeguard
  if (diffMs < 0) return "just now";

  // Just now
  if (diffSeconds < 60) {
    return "just now";
  }

  // Minutes ago → 5m
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  // Hours ago → 2h
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  // Yesterday
  if (diffDays === 1) {
    return "Yesterday";
  }

  // Within 7 days → Mon, Tue...
  if (diffDays < 7) {
    return dayNames[date.getDay()];
  }

  // Older dates
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  if (year === now.getFullYear()) {
    return `${day} ${month}`; // e.g. 12 Mar
  }

  return `${day} ${month} ${year}`; // e.g. 12 Mar 2024
}