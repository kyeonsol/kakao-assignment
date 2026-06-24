# Todo List - Next.js 버전

주간 캘린더 기반의 Todo 관리 앱을 Next.js로 구현한 프로젝트입니다.

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage

## 주요 기능

- ✅ 주간 캘린더 뷰
- ✅ 날짜별 Todo 관리
- ✅ 할일 추가/수정/삭제
- ✅ 상태 필터링 (전체/진행중/완료)
- ✅ 로컬스토리지 자동 저장
- ✅ 오늘 표시 및 선택된 날짜 강조

## 개발 환경 세팅

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000`에서 앱을 확인할 수 있습니다.

### 3. 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
app/
├── components/
│   ├── TodoInput.tsx       # Todo 입력 폼
│   ├── TodoItem.tsx        # Todo 항목 컴포넌트
│   ├── TodoList.tsx        # Todo 목록 컴포넌트
│   ├── FilterTab.tsx       # 필터 탭 컴포넌트
│   └── WeeklyCalendar.tsx  # 주간 캘린더 컴포넌트
├── utils/
│   ├── dateUtils.ts        # 날짜 관련 유틸 함수
│   └── todoUtils.ts        # Todo 관련 유틸 함수
├── globals.css             # 전역 스타일
├── layout.tsx              # 루트 레이아웃
└── page.tsx                # 메인 페이지
```

## 주요 상태 관리

### todos
- 전체 할일 목록
- localStorage에 자동 저장

### currentFilter
- 필터 상태 (all, active, completed)
- 로컬 상태로 관리

### selectedDate
- 선택된 날짜 (YYYY-MM-DD 형식)
- 주간 캘린더와 공유

### weekStartDate
- 주간 뷰의 월요일 날짜
- localStorage에 자동 저장

## 컴포넌트 설명

### TodoInput
- 새로운 할일을 입력하는 폼
- 빈 입력값에 대한 유효성 검사

### TodoItem
- 개별 할일 항목 표시
- 인라인 수정 모드 지원
- 완료/수정/삭제 기능

### FilterTab
- 전체/진행중/완료 필터 탭
- 버튼 클릭으로 필터 변경

### WeeklyCalendar
- 현재 주의 7일을 그리드로 표시
- 날짜별 할일 개수 배지 표시
- 주 이동 버튼 (이전주/다음주)
- 오늘 날짜와 선택된 날짜 시각적 구분

## 개발 시 참고사항

- 모든 상호작용이 필요한 컴포넌트는 `"use client"` 선언
- 날짜는 UTC 기준으로 YYYY-MM-DD 형식으로 통일
- localStorage는 클라이언트에서만 접근
