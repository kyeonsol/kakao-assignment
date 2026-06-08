/**
 * FilterTab 컴포넌트
 * - 전체 / 진행 중 / 완료 필터 탭 UI
 * - 현재 선택된 탭은 active 클래스로 시각적으로 구분
 */

// 필터 옵션 정의
const FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

function FilterTab({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-container">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${currentFilter === option.value ? "active" : ""}`}
          onClick={() => onChangeFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTab;
