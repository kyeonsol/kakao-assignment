# Todo List App

날짜별로 할 일을 관리하는 미니멀한 Todo 웹 앱입니다.
Vanilla JS → React + Vite → **Next.js 3단계 마이그레이션 프로젝트**입니다.

---

## 📋 과제 진행 상황

| 과제 | 브랜치 | 상태 | 설명 |
|------|--------|------|------|
| **#1** | `week-1-hyunsol` | ✅ 완료 | Vanilla JS 기반 Todo 앱 구현 |
| **#2** | `week-2-hyunsol` | ✅ 완료 | React + Vite로 마이그레이션 |
| **#3** | `week-3-hyunsol` | ✅ 완료 | Next.js + TypeScript로 마이그레이션 |

---

## 주요 기능

- **Todo CRUD** — 할 일 추가 / 수정 (인라인 편집) / 완료 처리 / 삭제
- **상태별 필터링** — 전체 / 진행 중 / 완료 탭으로 분류해서 보기
- **주간 뷰** — 이번 주 월~일 캘린더, 날짜 카드 클릭으로 일간 뷰와 동기화
- **데이터 영속성** — localStorage에 자동 저장, 새로고침 후에도 데이터 유지
- **빈 상태 처리** — 할 일이 없을 때 안내 메시지 표시
- **유효성 검사** — 빈 입력값 제출 시 에러 메시지 표시

---

## 🛠 기술 스택

| 역할 | 현재 (과제 #3) | 이전 (과제 #2) | 초기 (과제 #1) |
|------|--------|--------|--------|
| 프레임워크 | **Next.js 15** | React 18 | Vanilla JS |
| 빌드 도구 | Next.js | Vite 5 | - |
| 언어 | **TypeScript** | JavaScript | JavaScript |
| 라우팅 | **App Router** | SPA | - |
| 스타일링 | Tailwind CSS 3 + CSS Variables | Tailwind CSS 4 | CSS Variables |
| 데이터 저장 | Web Storage API | Web Storage API | Web Storage API |

---

## 📁 프로젝트 구조

### 현재 구조 (Next.js)
```
frontend/
├── app/
│   ├── components/
│   │   ├── TodoInput.tsx       # Todo 입력 폼
│   │   ├── TodoItem.tsx        # Todo 항목 컴포넌트
│   │   ├── TodoList.tsx        # Todo 목록
│   │   ├── FilterTab.tsx       # 필터 탭
│   │   └── WeeklyCalendar.tsx  # 주간 캘린더
│   ├── utils/
│   │   ├── dateUtils.ts        # 날짜 헬퍼 함수
│   │   └── todoUtils.ts        # Todo 로직 함수
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 페이지
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 설치 및 실행

**Node.js 18 이상**이 필요합니다.

### 1. 저장소 클론
```bash
git clone <저장소 URL>
cd kakao-assignment
```

### 2. frontend 디렉토리에서 작업
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 확인합니다.

### 3. 빌드 (배포용)
```bash
npm run build    # .next/ 폴더에 최적화된 빌드 생성
npm start        # 프로덕션 서버 실행
```

---

## 📚 마이그레이션 단계별 학습 내용

### 과제 #1 → #2: Vanilla JS → React
| 항목 | 변경 사항 |
|------|----------|
| 상태 관리 | 전역 변수 → `useState` 훅 |
| DOM 업데이트 | `innerHTML` 직접 조작 → 자동 리렌더링 |
| 컴포넌트 구조 | 하나의 HTML → 역할별 컴포넌트 분리 |
| Props | - | 단방향 데이터 흐름 |

### 과제 #2 → #3: React + Vite → Next.js + TypeScript
| 항목 | 변경 사항 |
|------|----------|
| 라우팅 | SPA 수동 라우팅 → 파일 기반 App Router |
| 언어 | JavaScript → **TypeScript** |
| 컴포넌트 | 모두 클라이언트 → Server/Client 구분 |
| 타입 안정성 | 없음 → Props, State 타입 정의 |
| 개발 경험 | IDE 자동완성 제한 → 전체 타입 지원 |

---

## 💡 핵심 개념 정리

### Next.js App Router
- 파일 구조가 곧 URL 경로
- `app/page.tsx` → `/`
- `app/todos/page.tsx` → `/todos`

### Server Component vs Client Component
- **Server Component**: 기본값, 상호작용 불필요한 데이터 표시
- **Client Component**: `"use client"` 선언 필요, 이벤트 핸들러/훅 사용 가능

### TypeScript 타입 정의
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}
```

---

## 🔗 다음 단계

과제 #3에서 구현하지 않은 기능들:

- [ ] FastAPI 백엔드 구축 및 API 연동
- [ ] `route.ts`를 통한 프록시 서버 구현
- [ ] Server Actions로 서버 함수 호출
- [ ] URL 파라미터 기반 필터링 상태 관리
- [ ] 검색 기능 구현

---

## 📖 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React 훅 API](https://react.dev/reference/react/hooks)
