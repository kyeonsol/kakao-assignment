/**
 * todoUtils.js
 * Todo 객체 관련 유틸 함수 모음
 * - Todo 생성 로직을 한 곳에서 관리해 구조 변경 시 이 파일만 수정하면 됨
 */

// 새로운 Todo 객체를 생성해 반환하는 팩토리 함수
export function createTodo(text, date) {
  return {
    id: Date.now(),
    text,
    completed: false,
    date,
  };
}

// 특정 날짜의 Todo 개수를 반환
export function countTodosByDate(todos, dateStr) {
  return todos.filter((t) => t.date === dateStr).length;
}
