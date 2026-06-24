import TodoItem from "./TodoItem";

/**
 * TodoList 컴포넌트
 * - 필터링된 Todo 배열을 받아 목록으로 렌더링
 * - 데이터가 없을 때 빈 상태 메시지 표시
 */
function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
  // 빈 상태 처리
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>할 일이 없어요. 새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
