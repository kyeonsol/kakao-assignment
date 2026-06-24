"use client";

import { useState } from "react";

function TodoInput({ onAddTodo }: { onAddTodo: (text: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setErrorMessage("할 일을 입력해주세요!");
      return;
    }

    onAddTodo(trimmedValue);

    setInputValue("");
    setErrorMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
}

export default TodoInput;
