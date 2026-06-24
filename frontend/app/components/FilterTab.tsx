"use client";

const FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

interface FilterTabProps {
  currentFilter: string;
  onChangeFilter: (filter: string) => void;
}

function FilterTab({ currentFilter, onChangeFilter }: FilterTabProps) {
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
