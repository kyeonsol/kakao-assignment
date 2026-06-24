export function shiftDateStr(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

export function getMondayOfWeek(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = d.getUTCDay();
  const distToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + distToMonday);
  return d.toISOString().split("T")[0];
}

export function getWeekDates(mondayStr: string): string[] {
  return Array.from({ length: 7 }, (_, i) => shiftDateStr(mondayStr, i));
}

export function formatMonthLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}년 ${month}월`;
}

export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}
