import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTab from "./components/FilterTab";
import WeeklyCalendar from "./components/WeeklyCalendar";

// 주어진 날짜가 속한 주의 월요일 날짜를 "YYYY-MM-DD"로 반환하는 헬퍼 함수
function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr);
  const day = d.getUTCDay();
  const distToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + distToMonday);
  return d.toISOString().split("T")[0];
}

/**
 * App 컴포넌트 (루트 컴포넌트)
 *
 * 상태 구조:
 *   todos        : Array<{ id, text, completed, date }>
 *   currentFilter: 'all' | 'active' | 'completed'
 *   selectedDate : string  — 선택된 날짜 ("YYYY-MM-DD"), 주간 뷰와 공유
 *   weekStartDate: string  — 주간 뷰에서 현재 보여주는 주의 월요일 날짜 ("YYYY-MM-DD")
 */
function App() {
  // todos: 로컬스토리지에서 초기값 불러오기 (함수형 초기화)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentFilter, setCurrentFilter] = useState("all");

  // selectedDate: 주간 뷰가 공유하는 "선택된 날짜"
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  // weekStartDate: 주간 뷰에서 현재 보여주는 주의 월요일
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const saved = localStorage.getItem("weekStartDate");
    if (saved) return saved;
    return getMondayOfWeek(new Date().toISOString().split("T")[0]);
  });

  // todos 변경 시 자동 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // weekStartDate 변경 시 자동 저장
  useEffect(() => {
    localStorage.setItem("weekStartDate", weekStartDate);
  }, [weekStartDate]);

  // Todo 추가 — 현재 선택된 날짜를 date 필드에 저장
  const handleAddTodo = (text) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false, date: selectedDate },
    ]);
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleEditTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 1차: 선택 날짜 / 2차: 상태 필터
  const filteredTodos = todos
    .filter((t) => t.date === selectedDate)
    .filter((t) => {
      if (currentFilter === "active") return !t.completed;
      if (currentFilter === "completed") return t.completed;
      return true;
    });

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <header>
          <h1 className="app-title">Todo List</h1>

          {/* 주간 캘린더
              - weekStartDate: 이번 주 월요일 (주간 뷰 자체의 위치)
              - selectedDate : 현재 선택된 날짜
              - onChangeWeek : 주간 뷰 이동 (weekStartDate만 변경)
              - onSelectDate : 날짜 카드 클릭 → selectedDate 변경 */}
          <WeeklyCalendar
            weekStartDate={weekStartDate}
            selectedDate={selectedDate}
            todos={todos}
            onChangeWeek={setWeekStartDate}
            onSelectDate={setSelectedDate}
          />
        </header>

        <TodoInput onAddTodo={handleAddTodo} />

        <FilterTab
          currentFilter={currentFilter}
          onChangeFilter={setCurrentFilter}
        />

        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;