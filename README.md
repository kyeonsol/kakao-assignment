# Todo List App

날짜별로 할 일을 관리하는 미니멀한 Todo 웹 앱입니다.
Vanilla JS로 제작한 프로젝트를 React + Vite + Tailwind CSS 기반으로 마이그레이션했습니다.

---

## 주요 기능

- **Todo CRUD** — 할 일 추가 / 수정 (인라인 편집) / 완료 처리 / 삭제
- **상태별 필터링** — 전체 / 진행 중 / 완료 탭으로 분류해서 보기
- **주간 뷰** — 이번 주 월~일 캘린더, 날짜 카드 클릭으로 일간 뷰와 동기화
- **데이터 영속성** — localStorage에 자동 저장, 새로고침 후에도 데이터 유지
- **빈 상태 처리** — 할 일이 없을 때 안내 메시지 표시
- **유효성 검사** — 빈 입력값 제출 시 에러 메시지 표시

---

## 기술 스택

| 역할 | 기술 |
|---|---|
| UI 라이브러리 | React 18 |
| 빌드 도구 | Vite 5 |
| 스타일링 | Tailwind CSS 4 + CSS Variables |
| 데이터 저장 | Web Storage API (localStorage) |

---

## 파일 구조

```
src/
├── App.jsx                  # 루트 컴포넌트, 전역 상태 관리
├── main.jsx                 # React 앱 진입점
├── index.css                # 전역 스타일 및 CSS 변수
└── components/
    ├── WeeklyCalendar.jsx   # 주간 캘린더 (주 이동, 날짜 선택)
    ├── TodoInput.jsx        # Todo 입력 폼
    ├── TodoList.jsx         # Todo 목록 렌더링
    ├── TodoItem.jsx         # 개별 Todo 항목 (인라인 수정 포함)
    └── FilterTab.jsx        # 상태별 필터 탭
```

---

## 설치 및 실행

**Node.js 18 이상**이 필요합니다.

```bash
# 1. 저장소 클론
git clone <저장소 URL>
cd <프로젝트 폴더명>

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 확인합니다.

### 빌드 (배포용)

```bash
npm run build    # dist/ 폴더에 정적 파일 생성
npm run preview  # 빌드 결과 로컬에서 미리보기
```

---

## Vanilla JS → React 마이그레이션 주요 변경점

| 항목 | Vanilla JS | React |
|---|---|---|
| 상태 관리 | 전역 변수 (`let todos`, `let selectedDate`) | `useState` 훅 |
| DOM 업데이트 | `innerHTML` 직접 조작 | 상태 변경 시 자동 리렌더링 |
| Todo 수정 UI | `prompt()` 팝업 | 인라인 입력창 (`isEditing` 상태) |
| 필터링 | `querySelectorAll`로 DOM 숨기기/보이기 | 배열 `.filter()`로 렌더링 데이터 가공 |
| localStorage 저장 | 각 함수마다 `setItem()` 직접 호출 | `useEffect`로 `todos` 변경 시 자동 저장 |
