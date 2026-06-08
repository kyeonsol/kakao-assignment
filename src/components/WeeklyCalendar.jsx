import { useMemo } from "react";
import {
  shiftDateStr,
  getWeekDates,
  formatMonthLabel,
  getTodayStr,
} from "../utils/dateUtils";
import { countTodosByDate } from "../utils/todoUtils";

/**
 * WeeklyCalendar 컴포넌트
 * - 현재 주(월~일)를 7칸 그리드로 표시
 * - 날짜 카드 클릭 시 해당 날짜 선택
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

function WeeklyCalendar({
  weekStartDate,
  selectedDate,
  todos,
  onChangeWeek,
  onSelectDate,
}) {
  // 오늘 날짜는 앱 실행 중 바뀌지 않으므로 useMemo로 캐싱
  const todayStr = useMemo(() => getTodayStr(), []);
  const weekDates = getWeekDates(weekStartDate);

  const handlePrevWeek = () => onChangeWeek(shiftDateStr(weekStartDate, -7));
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
              <span className="day-label">{DAY_LABELS[index]}</span>

              {/* 선택됨: 흰색 / 오늘(미선택): 보라색 / 일반: 기본색 */}
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

              <span className="todo-badge">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
