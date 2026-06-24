"use client";

import { useMemo } from "react";
import {
  shiftDateStr,
  getWeekDates,
  formatMonthLabel,
  getTodayStr,
} from "@/app/utils/dateUtils";
import { countTodosByDate, Todo } from "@/app/utils/todoUtils";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

interface WeeklyCalendarProps {
  weekStartDate: string;
  selectedDate: string;
  todos: Todo[];
  onChangeWeek: (date: string) => void;
  onSelectDate: (date: string) => void;
}

function WeeklyCalendar({
  weekStartDate,
  selectedDate,
  todos,
  onChangeWeek,
  onSelectDate,
}: WeeklyCalendarProps) {
  const todayStr = useMemo(() => getTodayStr(), []);
  const weekDates = getWeekDates(weekStartDate);

  const handlePrevWeek = () => onChangeWeek(shiftDateStr(weekStartDate, -7));
  const handleNextWeek = () => onChangeWeek(shiftDateStr(weekStartDate, 7));

  return (
    <div className="weekly-calendar">
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

      <div className="week-grid">
        {weekDates.map((dateStr, index) => {
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const count = countTodosByDate(todos, dateStr);
          const dayNum = new Date(dateStr + "T00:00:00").getDate();

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
