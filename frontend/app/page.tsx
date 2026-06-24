"use client";

import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTab from "./components/FilterTab";
import WeeklyCalendar from "./components/WeeklyCalendar";
import { getMondayOfWeek, getTodayStr } from "./utils/dateUtils";
import { createTodo, Todo } from "./utils/todoUtils";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentFilter, setCurrentFilter] = useState("all");

  const [selectedDate, setSelectedDate] = useState(getTodayStr);

  const [weekStartDate, setWeekStartDate] = useState(() => {
    const saved = localStorage.getItem("weekStartDate");
    return saved ?? getMondayOfWeek(getTodayStr());
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("weekStartDate", weekStartDate);
  }, [weekStartDate]);

  const handleAddTodo = (text: string) => {
    setTodos((prev) => [...prev, createTodo(text, selectedDate)]);
  };

  const handleToggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

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
