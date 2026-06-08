import { useState, useEffect } from "react";

/**
 * TodoItem 컴포넌트
 * - 개별 Todo 항목을 렌더링
 * - isEditing 상태로 뷰 모드 ↔ 수정 모드 전환
 * - 완료 / 수정 / 삭제 기능 버튼 포함
 */
function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [editError, setEditError] = useState("");

  // 외부에서 todo.text가 변경될 경우 editValue 동기화
  useEffect(() => {
    setEditValue(todo.text);
  }, [todo.text]);

  // 수정 저장 핸들러
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

  // 수정 취소 핸들러 (원래 텍스트로 복원)
  const handleCancelEdit = () => {
    setEditValue(todo.text);
    setIsEditing(false);
    setEditError("");
  };

  // Enter: 저장 / Escape: 취소
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancelEdit();
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        /* 수정 모드: 인라인 입력창 표시 */
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
        /* 뷰 모드: 텍스트와 액션 버튼 표시 */
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="btn-group">
            <button
              className="complete-btn"
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.completed ? "취소" : "완료"}
            </button>
            {/* 완료된 항목은 수정 버튼 숨김 */}
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
