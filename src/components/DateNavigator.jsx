/**
 * DateNavigator 컴포넌트
 * - 현재 선택된 날짜를 표시
 * - 이전 / 다음 버튼으로 날짜를 하루씩 이동
 *
 * props:
 *   selectedDate: string  — 현재 선택된 날짜 (YYYY-MM-DD 형식)
 *   onChangeDate: (dateStr: string) => void  — 날짜 변경 핸들러
 */
function DateNavigator({ selectedDate, onChangeDate }) {

  // YYYY-MM-DD 문자열을 받아 하루를 더하거나 빼서 새 문자열 반환
  const shiftDate = (dateStr, days) => {
    const date = new Date(dateStr);
    // UTC 기준으로 날짜를 다루면 타임존 오차 없이 안전하게 계산 가능
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  // 화면에 표시할 날짜 포맷: "2026년 06월 08일 (월)"
  const formatDisplayDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00"); // 로컬 시간 기준으로 파싱
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayName = dayNames[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  // 오늘 날짜인지 확인 (오늘 버튼 표시 여부 결정)
  const todayStr = new Date().toISOString().split("T")[0];
  const isToday = selectedDate === todayStr;

  return (
    <div className="date-navigator">
      {/* 이전 날짜 버튼 */}
      <button
        className="date-nav-btn"
        onClick={() => onChangeDate(shiftDate(selectedDate, -1))}
        aria-label="이전 날짜"
      >
        &lt;
      </button>

      {/* 날짜 표시 + 오늘로 돌아가기 버튼 */}
      <div className="date-display">
        <span className="date-text">{formatDisplayDate(selectedDate)}</span>
        {/* 오늘 날짜가 아닐 때만 '오늘' 버튼 표시 */}
        {!isToday && (
          <button
            className="today-btn"
            onClick={() => onChangeDate(todayStr)}
          >
            오늘
          </button>
        )}
      </div>

      {/* 다음 날짜 버튼 */}
      <button
        className="date-nav-btn"
        onClick={() => onChangeDate(shiftDate(selectedDate, 1))}
        aria-label="다음 날짜"
      >
        &gt;
      </button>
    </div>
  );
}

export default DateNavigator;
