"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/app/utils/todoUtils";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    setEditValue(todo.text);
  }, [todo.text]);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed === "") {
      setEditError("내용을 입력해주세요!");
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
    setEditError("");
  };

  const handleCancelEdit = () => {
    setEditValue(todo.text);
    setIsEditing(false);
    setEditError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancelEdit();
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              if (editError) setEditError("");
            }}
            onKeyDown={handleKeyDown}
            className={`edit-input ${editError ? "input-error" : ""}`}
            autoFocus
          />
          {editError && <p className="edit-error">{editError}</p>}
          <div className="btn-group">
            <button className="save-btn" onClick={handleSave}>저장</button>
            <button className="cancel-btn" onClick={handleCancelEdit}>취소</button>
          </div>
        </div>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="btn-group">
            <button
              className="complete-btn"
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.completed ? "취소" : "완료"}
            </button>
            {!todo.completed && (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
            )}
            <button
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
