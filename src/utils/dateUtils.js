/**
 * dateUtils.js
 * 날짜 관련 헬퍼 함수 모음
 * - 앱 전반에서 사용하는 날짜 계산/포맷 로직을 한 곳에서 관리
 */

// YYYY-MM-DD 문자열을 받아 days만큼 이동한 날짜를 YYYY-MM-DD로 반환
export function shiftDateStr(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

// 주어진 날짜가 속한 주의 월요일 날짜를 YYYY-MM-DD로 반환
export function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = d.getUTCDay(); // 0=일, 1=월, ..., 6=토
  const distToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + distToMonday);
  return d.toISOString().split("T")[0];
}

// 월요일 기준 해당 주의 7일 날짜 문자열 배열 반환
export function getWeekDates(mondayStr) {
  return Array.from({ length: 7 }, (_, i) => shiftDateStr(mondayStr, i));
}

// 연·월 표시 포맷: "2026년 06월"
export function formatMonthLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}년 ${month}월`;
}

// 오늘 날짜를 YYYY-MM-DD 문자열로 반환
export function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}
