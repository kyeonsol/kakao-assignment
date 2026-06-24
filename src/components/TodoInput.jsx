import { useState } from "react";

/**
 * TodoInput 컴포넌트
 * - 새로운 Todo를 입력하고 추가하는 폼 UI
 * - 입력값이 비어있으면 경고 메시지를 표시하고 Todo를 생성하지 않음
 */
function TodoInput({ onAddTodo }) {
  const [inputValue, setInputValue] = useState(""); // 입력창 값 상태
  const [errorMessage, setErrorMessage] = useState(""); // 유효성 검사 오류 메시지 상태

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    // 빈 입력값 검사
    if (trimmedValue === "") {
      setErrorMessage("할 일을 입력해주세요!");
      return;
    }

    // 부모 컴포넌트에 새 Todo 텍스트 전달
    onAddTodo(trimmedValue);

    // 입력창 초기화
    setInputValue("");
    setErrorMessage("");
  };

  // 입력값 변경 핸들러 (타이핑 시 오류 메시지 초기화)
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="새로운 할 일을 입력하세요..."
          className={`todo-input ${errorMessage ? "input-error" : ""}`}
          autoComplete="off"
        />
        <button type="submit" className="add-btn">
          추가
        </button>
      </form>
      {/* 오류 메시지 표시 영역 */}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
}

export default TodoInput;
