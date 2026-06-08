/**
 * WeeklyCalendar 컴포넌트
 * - 현재 주(월~일)를 7칸 그리드로 표시
 * - 날짜 카드 클릭 시 해당 날짜 선택 → 일간 뷰와 동기화
 * - 이전/다음 주 버튼으로 weekStartDate 이동
 * - 오늘 날짜: 날짜 숫자만 보라색(#672be0) 강조
 * - 선택된 날짜: 카드 전체가 보라색 배경, 숫자는 흰색으로 대비
 *
 * props:
 *   weekStartDate : string  — 현재 주의 월요일 날짜 ("YYYY-MM-DD")
 *   selectedDate  : string  — 현재 선택된 날짜 ("YYYY-MM-DD")
 *   todos         : Array   — 전체 Todo 배열 (날짜별 개수 배지 표시용)
 *   onChangeWeek  : (mondayStr: string) => void  — 주 이동 핸들러
 *   onSelectDate  : (dateStr: string) => void    — 날짜 선택 핸들러
 */

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

// YYYY-MM-DD 문자열을 받아 days만큼 이동한 날짜를 YYYY-MM-DD로 반환
function shiftDateStr(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

// 월요일 기준 주의 7일 날짜 문자열 배열 반환
function getWeekDates(mondayStr) {
  return Array.from({ length: 7 }, (_, i) => shiftDateStr(mondayStr, i));
}

// 연·월 표시 포맷: "2026년 06월"
function formatMonthLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}년 ${month}월`;
}

// 해당 날짜의 Todo 개수 반환
function countTodosByDate(todos, dateStr) {
  return todos.filter((t) => t.date === dateStr).length;
}

function WeeklyCalendar({
  weekStartDate,
  selectedDate,
  todos,
  onChangeWeek,
  onSelectDate,
}) {
  const todayStr = new Date().toISOString().split("T")[0];
  const weekDates = getWeekDates(weekStartDate);

  // 이전 주: 월요일에서 7일 빼기
  const handlePrevWeek = () => onChangeWeek(shiftDateStr(weekStartDate, -7));
  // 다음 주: 월요일에서 7일 더하기
  const handleNextWeek = () => onChangeWeek(shiftDateStr(weekStartDate, 7));

  return (
    <div className="weekly-calendar">
      {/* 월 표시 + 주 이동 버튼 */}
      <div className="week-navigator">
        <button className="week-nav-btn" onClick={handlePrevWeek}>
          &lt; 이전 주
        </button>
        <span className="month-display">
          {formatMonthLabel(selectedDate)}
        </span>
        <button className="week-nav-btn" onClick={handleNextWeek}>
          다음 주 &gt;
        </button>
      </div>

      {/* 7일 그리드 */}
      <div className="week-grid">
        {weekDates.map((dateStr, index) => {
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const count = countTodosByDate(todos, dateStr);
          const dayNum = new Date(dateStr + "T00:00:00").getDate();

          // 카드 클래스 조합
          // selected가 today보다 우선 적용되도록 순서 배치
          const cardClass = [
            "day-card",
            isSelected ? "selected" : "",
            !isSelected && isToday ? "today" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={dateStr}
              className={cardClass}
              onClick={() => onSelectDate(dateStr)}
            >
              {/* 요일 레이블 */}
              <span className="day-label">{DAY_LABELS[index]}</span>

              {/* 날짜 숫자
                  - 선택됨: 흰색 (카드 배경이 보라색이므로 대비)
                  - 오늘(미선택): 보라색 (#672be0)
                  - 일반: 기본 텍스트 색 */}
              <span
                className="date-num"
                style={
                  isSelected
                    ? { color: "#ffffff" }
                    : isToday
                    ? { color: "#672be0", fontWeight: 700 }
                    : {}
                }
              >
                {dayNum}
              </span>

              {/* Todo 개수 배지 */}
              <span className="todo-badge">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
