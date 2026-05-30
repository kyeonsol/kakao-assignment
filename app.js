// DOM 요소 선택
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const currentMonthDisplay = document.getElementById('current-month-display'); // [변경] 월 표시 엘리먼트
const prevWeekBtn = document.getElementById('prev-week-btn');                 // [변경] 이전 주 버튼
const nextWeekBtn = document.getElementById('next-week-btn');                 // [변경] 다음 주 버튼
const weeklyCalendar = document.getElementById('weekly-calendar');           // [신규] 주간 캘린더 컨테이너

// 상태 데이터
let todos = loadTodosFromLocalStorage();
let currentFilter = 'all'; 
let selectedDate = new Date(); // 사용자가 현재 '클릭하여 선택한' 날짜

// 로컬스토리지 저장 및 불러오기 함수
function saveTodosToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
}

// Date 객체를 YYYY-MM-DD 문자열 포맷으로 변환하는 헬퍼 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// [신규] 특정 날짜에 해당하는 Todo의 총 개수를 반환하는 함수
function getTodoCountByDate(dateStr) {
  return todos.filter(todo => todo.date === dateStr).length;
}

// [신규] 기준 날짜가 속한 주의 월요일부터 일요일까지의 Date 객체 배열을 구하는 함수
function getWeekDays(current) {
  const week = [];
  const start = new Date(current);
  
  // 현재 요일 구하기 (0: 일, 1: 월, ..., 6: 토)
  const currentDay = start.getDay();
  
  // 월요일을 주의 시작일(인덱스 0)로 설정하기 위한 보정값 계산
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  start.setDate(start.getDate() + distanceToMonday); // 해당 주의 월요일로 날짜 변경

  for (let i = 0; i < 7; i++) {
    week.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return week;
}

// [신규] 주간 캘린더 렌더링 함수
function renderWeeklyCalendar() {
  weeklyCalendar.innerHTML = '';
  
  // 상단 월 타이틀 업데이트 (선택된 날짜 기준)
  currentMonthDisplay.textContent = `${selectedDate.getFullYear()}년 ${String(selectedDate.getMonth() + 1).padStart(2, '0')}월`;

  const weekDays = getWeekDays(selectedDate);
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
  const todayStr = formatDate(new Date()); // 실제 오늘 날짜 문자열
  const selectedStr = formatDate(selectedDate); // 현재 유저가 클릭한 날짜 문자열

  weekDays.forEach((date, index) => {
    const dateStr = formatDate(date);
    const todoCount = getTodoCountByDate(dateStr);

    // 날짜 카드 요소 생성
    const dayCard = document.createElement('div');
    dayCard.className = 'day-card';
    
    // 상태 조건에 따른 클래스 바인딩
    if (dateStr === selectedStr) dayCard.classList.add('selected'); // 클릭 선택 항목
    if (dateStr === todayStr) dayCard.classList.add('today');       // [조건] 실제 오늘 날짜 강조

    // 내부 텍스트 생성 (요일, 일자, 할 일 개수)
    dayCard.innerHTML = `
      <span class="day-label">${dayLabels[index]}</span>
      <span class="date-label">${date.getDate()}</span>
      <span class="todo-count">${todoCount}</span>
    `;

    // [조건] 날짜 카드 클릭 이벤트 바인딩
    dayCard.addEventListener('click', () => {
      selectedDate = date; // 선택 날짜 변경
      renderWeeklyCalendar(); // 캘린더 선택 상태 UI 업데이트
      renderTodos();          // 하단 할 일 목록 리렌더링
    });

    weeklyCalendar.appendChild(dayCard);
  });
}

// 1. Todo 추가 함수 (주간 캘린더 개수 갱신 연동)
function addTodo(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === '') {
    alert('할 일을 입력해주세요!');
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    date: formatDate(selectedDate) // 클릭해서 선택해 놓은 날짜에 생성
  };

  todos.push(newTodo);
  
  saveTodosToLocalStorage(); 
  renderWeeklyCalendar(); // 할 일 개수 실시간 반영을 위해 캘린더 재생성
  renderTodos(); 
  todoInput.value = '';
}

// 2. Todo 삭제 함수
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodosToLocalStorage();
  renderWeeklyCalendar(); // 개수 배지 감소 반영
  renderTodos();
}

// 3. Todo 완료 토글 함수
function toggleComplete(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodosToLocalStorage();
  renderTodos();
}

// 4. Todo 수정 모드 전환 및 저장 함수
function toggleEdit(id, liElement) {
  const targetTodo = todos.find(todo => todo.id === id);
  const textSpan = liElement.querySelector('.todo-text');
  const editBtn = liElement.querySelector('.edit-btn');
  const completeBtn = liElement.querySelector('.complete-btn');

  const isEditing = liElement.querySelector('.edit-input') !== null;

  if (!isEditing) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = targetTodo.text;

    liElement.insertBefore(input, textSpan);
    liElement.removeChild(textSpan);

    editBtn.textContent = '저장';
    editBtn.className = 'save-btn';
    if (completeBtn) completeBtn.style.display = 'none';

    input.focus();
  } else {
    const input = liElement.querySelector('.edit-input');
    const newText = input.value.trim();

    if (newText === '') {
      alert('내용을 입력해주세요!');
      input.focus();
      return;
    }

    targetTodo.text = newText;
    saveTodosToLocalStorage();
    renderTodos();
  }
}

// 5. 필터 변경 함수
function changeFilter(event) {
  const selectedFilter = event.target.dataset.filter;
  currentFilter = selectedFilter; 

  filterButtons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  renderTodos(); 
}

// [변경] 6. 주차 단위 이동 함수 (7일 가감)
function handleWeekNavigation(offset) {
  // offset이 -1이면 이전 주(-7일), 1이면 다음 주(+7일)로 선택일 변경
  selectedDate.setDate(selectedDate.getDate() + (offset * 7));
  renderWeeklyCalendar();
  renderTodos();
}

// 7. 화면에 Todo 리스트를 그려주는 렌더링 함수
function renderTodos() {
  todoList.innerHTML = ''; 

  const formattedSelectedDate = formatDate(selectedDate);

  // 1차 필터링: 유저가 상단 캘린더에서 누른 날짜와 일치하는 Todo 선별
  let filteredTodos = todos.filter(todo => todo.date === formattedSelectedDate);

  // 2차 필터링: 상태 필터 적용
  if (currentFilter === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  // 최종 리스트 그리기
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    li.appendChild(span);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = todo.completed ? '취소' : '완료';
    completeBtn.addEventListener('click', () => toggleComplete(todo.id));
    btnGroup.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '수정';
    editBtn.addEventListener('click', () => toggleEdit(todo.id, li));
    if (todo.completed) {
      editBtn.style.display = 'none';
    }
    btnGroup.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    btnGroup.appendChild(deleteBtn);

    li.appendChild(btnGroup);
    todoList.appendChild(li);
  });
}

// 초기화 실행
renderWeeklyCalendar();
renderTodos();

// 이벤트 리스너 등록
todoForm.addEventListener('submit', addTodo);

filterButtons.forEach(button => {
  button.addEventListener('click', changeFilter);
});

// 주차 단위 조작 버튼 이벤트 등록
prevWeekBtn.addEventListener('click', () => handleWeekNavigation(-1));
nextWeekBtn.addEventListener('click', () => handleWeekNavigation(1));