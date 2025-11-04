// Schedule Data
const scheduleData = {
  monday: [
    {
      course_code: 'C302',
      course_name: 'Algoritmos Computacionales',
      start_time: '16:00',
      end_time: '18:00',
      building: 'Edif CI',
      room: 'Sala Sun',
      professor: 'Juan Roberto Reyes Enciso'
    },
    {
      course_code: 'C306',
      course_name: 'Álgebra Lineal',
      start_time: '18:00',
      end_time: '20:00',
      building: 'Edif CB',
      room: '108',
      professor: 'Alberto Carrillo Castrejón'
    }
  ],
  tuesday: [
    {
      course_code: 'C301',
      course_name: 'Probabilidad',
      start_time: '16:00',
      end_time: '18:00',
      building: 'Edif CB',
      room: '111',
      professor: 'Óscar Iván Hernández Bautista'
    },
    {
      course_code: 'C305',
      course_name: 'Sistemas Operativos',
      start_time: '18:00',
      end_time: '20:00',
      building: 'Edif CB',
      room: '203',
      professor: 'Ricardo Hernández Cerón'
    },
    {
      course_code: 'C307',
      course_name: 'Aplicaciones de la Ciencia Económica',
      start_time: '20:00',
      end_time: '22:00',
      building: 'Edif CS',
      room: '2',
      professor: 'Nicolás Mejía Chávez'
    }
  ],
  wednesday: [
    {
      course_code: 'C305',
      course_name: 'Sistemas Operativos',
      start_time: '18:00',
      end_time: '20:00',
      building: 'Edif CB',
      room: 'Redes',
      professor: 'Ricardo Hernández Cerón'
    },
    {
      course_code: 'C303',
      course_name: 'Abstracción y Uso de Datos',
      start_time: '20:00',
      end_time: '22:00',
      building: 'Edif CI',
      room: '105',
      professor: 'Francisco J. Pingarrón Morales'
    }
  ],
  thursday: [
    {
      course_code: 'C304',
      course_name: 'Requerimientos de Software',
      start_time: '14:00',
      end_time: '16:00',
      building: 'Edif CI',
      room: '114',
      professor: 'Jorge Checa Rosas'
    },
    {
      course_code: 'C301',
      course_name: 'Probabilidad',
      start_time: '16:00',
      end_time: '18:00',
      building: 'Edif CB',
      room: '306',
      professor: 'Óscar Iván Hernández Bautista'
    },
    {
      course_code: 'C306',
      course_name: 'Álgebra Lineal',
      start_time: '18:00',
      end_time: '20:00',
      building: 'Edif CB',
      room: '108',
      professor: 'Alberto Carrillo Castrejón'
    },
    {
      course_code: 'C307',
      course_name: 'Aplicaciones de la Ciencia Económica',
      start_time: '20:00',
      end_time: '22:00',
      building: 'Edif CS',
      room: '2',
      professor: 'Nicolás Mejía Chávez'
    }
  ],
  friday: [
    {
      course_code: 'C304',
      course_name: 'Requerimientos de Software',
      start_time: '14:00',
      end_time: '16:00',
      building: 'Edif CI',
      room: '106',
      professor: 'Jorge Checa Rosas'
    },
    {
      course_code: 'C302',
      course_name: 'Algoritmos Computacionales',
      start_time: '16:00',
      end_time: '18:00',
      building: 'Edif CI',
      room: '202',
      professor: 'Juan Roberto Reyes Enciso'
    },
    {
      course_code: 'C303',
      course_name: 'Abstracción y Uso de Datos',
      start_time: '20:00',
      end_time: '22:00',
      building: 'Edif CI',
      room: '105',
      professor: 'Francisco J. Pingarrón Morales'
    }
  ]
};

const subjectColors = {
  C301: '#FF6B6B',
  C302: '#4ECDC4',
  C303: '#45B7D1',
  C304: '#FFA07A',
  C305: '#98D8C8',
  C306: '#C7B3FF',
  C307: '#FFD93D'
};

const dayNames = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes'
};

const dayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// State Management
let currentView = 'week';
let selectedDay = 'monday';
let searchQuery = '';
let filterDay = 'all';
let theme = 'dark';
let timeFormat = '24';
let notificationMinutes = 15;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  startClock();
  updateLiveInfo();
  setInterval(updateLiveInfo, 60000); // Update every minute
});

function initializeApp() {
  renderWeekView();
  updateStatistics();
  updateTodaySummary();
  updateUpcomingClasses();
}

function setupEventListeners() {
  // View switcher
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.currentTarget.dataset.view;
      switchView(view);
    });
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderCurrentView();
  });

  // Day filters
  document.querySelectorAll('.day-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterDay = e.currentTarget.dataset.day;
      document.querySelectorAll('.day-filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderCurrentView();
    });
  });

  // Day navigation
  document.getElementById('prevDay').addEventListener('click', () => navigateDay(-1));
  document.getElementById('nextDay').addEventListener('click', () => navigateDay(1));

  // Quick actions
  document.getElementById('whereAmIBtn').addEventListener('click', showWhereAmI);
  document.getElementById('freeTimeBtn').addEventListener('click', showFreeTime);

  // Modals
  document.getElementById('settingsBtn').addEventListener('click', () => openModal('settingsModal'));
  document.getElementById('modalClose').addEventListener('click', () => closeModal('classModal'));
  document.getElementById('settingsModalClose').addEventListener('click', () => closeModal('settingsModal'));

  // Close modal on outside click
  document.getElementById('classModal').addEventListener('click', (e) => {
    if (e.target.id === 'classModal') closeModal('classModal');
  });
  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target.id === 'settingsModal') closeModal('settingsModal');
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('change', toggleTheme);

  // Export and print
  document.getElementById('exportBtn').addEventListener('click', exportSchedule);
  document.getElementById('printBtn').addEventListener('click', () => window.print());

  // Sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

  // Settings
  document.getElementById('timeFormatSelect').addEventListener('change', (e) => {
    timeFormat = e.target.value;
    renderCurrentView();
  });
  document.getElementById('notificationTime').addEventListener('change', (e) => {
    notificationMinutes = parseInt(e.target.value);
  });
}

// Clock and Live Info
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  document.getElementById('currentDate').textContent = dateStr;
  document.getElementById('currentTime').textContent = timeStr;
}

function updateLiveInfo() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  
  // Update classes today
  const todayClasses = currentDayKey ? scheduleData[currentDayKey] || [] : [];
  document.getElementById('classesToday').textContent = todayClasses.length;
  
  // Update next class
  const nextClass = getNextClass();
  if (nextClass) {
    const timeUntil = getTimeUntilClass(nextClass);
    document.getElementById('nextClassInfo').textContent = `${nextClass.course_code} en ${timeUntil}`;
  } else {
    document.getElementById('nextClassInfo').textContent = 'Ninguna';
  }
}

function getDayKey(dayIndex) {
  const keys = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', '', ''];
  return keys[dayIndex];
}

function getNextClass() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Check today's classes
  if (currentDayKey && scheduleData[currentDayKey]) {
    for (const classItem of scheduleData[currentDayKey]) {
      const classTime = parseTime(classItem.start_time);
      if (classTime > currentTime) {
        return { ...classItem, day: currentDayKey };
      }
    }
  }
  
  // Check next days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (dayIndex + i) % 7;
    const nextDayKey = getDayKey(nextDayIndex);
    if (nextDayKey && scheduleData[nextDayKey] && scheduleData[nextDayKey].length > 0) {
      return { ...scheduleData[nextDayKey][0], day: nextDayKey };
    }
  }
  
  return null;
}

function getCurrentClass() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  if (!currentDayKey || !scheduleData[currentDayKey]) return null;
  
  for (const classItem of scheduleData[currentDayKey]) {
    const startTime = parseTime(classItem.start_time);
    const endTime = parseTime(classItem.end_time);
    if (currentTime >= startTime && currentTime < endTime) {
      return { ...classItem, day: currentDayKey };
    }
  }
  
  return null;
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function getTimeUntilClass(classItem) {
  const now = new Date();
  const classDate = new Date();
  const [hours, minutes] = classItem.start_time.split(':').map(Number);
  classDate.setHours(hours, minutes, 0);
  
  // If class is on a different day
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  if (classItem.day !== currentDayKey) {
    const daysUntil = getDaysUntil(currentDayKey, classItem.day);
    return `${daysUntil}d`;
  }
  
  const diff = classDate - now;
  const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
  const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursUntil > 0) {
    return `${hoursUntil}h ${minutesUntil}m`;
  }
  return `${minutesUntil}m`;
}

function getDaysUntil(fromDay, toDay) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const fromIndex = days.indexOf(fromDay);
  const toIndex = days.indexOf(toDay);
  if (toIndex > fromIndex) {
    return toIndex - fromIndex;
  }
  return 5 - fromIndex + toIndex;
}

// View Rendering
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  
  document.querySelectorAll('.view-container').forEach(container => {
    container.classList.remove('active');
  });
  document.getElementById(`${view}View`).classList.add('active');
  
  renderCurrentView();
}

function renderCurrentView() {
  switch(currentView) {
    case 'week':
      renderWeekView();
      break;
    case 'day':
      renderDayView();
      break;
    case 'list':
      renderListView();
      break;
    case 'agenda':
      renderAgendaView();
      break;
  }
}

function renderWeekView() {
  const grid = document.getElementById('weekGrid');
  grid.innerHTML = '';
  
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDayKey = getDayKey(currentDayIndex);
  const currentClass = getCurrentClass();
  
  // Time column
  const timeColumn = document.createElement('div');
  timeColumn.className = 'time-column';
  timeColumn.innerHTML = '<div class="day-header" style="visibility: hidden;">Hora</div>';
  const times = ['14:00', '16:00', '18:00', '20:00', '22:00'];
  times.forEach(time => {
    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    timeSlot.textContent = formatTime(time);
    timeColumn.appendChild(timeSlot);
  });
  grid.appendChild(timeColumn);
  
  // Day columns
  Object.keys(scheduleData).forEach(day => {
    if (filterDay !== 'all' && filterDay !== day) return;
    
    const dayColumn = document.createElement('div');
    dayColumn.className = 'day-column';
    
    const header = document.createElement('div');
    header.className = 'day-header';
    if (day === currentDayKey) {
      header.classList.add('today');
    }
    header.textContent = dayNames[day];
    dayColumn.appendChild(header);
    
    const classesContainer = document.createElement('div');
    classesContainer.className = 'day-classes';
    
    const classes = scheduleData[day].filter(c => matchesSearch(c));
    classes.forEach(classItem => {
      const card = createClassCard(classItem, day);
      if (currentClass && currentClass.day === day && 
          currentClass.course_code === classItem.course_code && 
          currentClass.start_time === classItem.start_time) {
        card.classList.add('current');
      }
      classesContainer.appendChild(card);
    });
    
    if (classes.length === 0) {
      classesContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-text">Sin clases</div></div>';
    }
    
    dayColumn.appendChild(classesContainer);
    grid.appendChild(dayColumn);
  });
}

function createClassCard(classItem, day) {
  const card = document.createElement('div');
  card.className = 'class-card';
  const color = subjectColors[classItem.course_code];
  card.style.borderColor = color;
  card.style.background = `linear-gradient(135deg, ${color}15, ${color}05)`;
  card.style.color = color;
  
  card.innerHTML = `
    <div class="class-room-badge">${classItem.room}</div>
    <div class="class-code">${classItem.course_code}</div>
    <div class="class-name">${classItem.course_name}</div>
    <div class="class-time">
      ${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}
      <span class="class-building">${classItem.building}</span>
    </div>
  `;
  
  card.addEventListener('click', () => showClassDetails(classItem));
  
  return card;
}

function renderDayView() {
  const title = document.getElementById('selectedDayTitle');
  title.textContent = dayNames[selectedDay];
  
  const content = document.getElementById('dayContent');
  content.innerHTML = '';
  
  const classes = scheduleData[selectedDay].filter(c => matchesSearch(c));
  
  if (classes.length === 0) {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-text">Sin clases este día</div></div>';
    return;
  }
  
  classes.forEach(classItem => {
    const card = createClassCard(classItem, selectedDay);
    card.style.maxWidth = '100%';
    content.appendChild(card);
  });
}

function renderListView() {
  const content = document.getElementById('listContent');
  content.innerHTML = '';
  
  Object.keys(scheduleData).forEach(day => {
    if (filterDay !== 'all' && filterDay !== day) return;
    
    const classes = scheduleData[day].filter(c => matchesSearch(c));
    if (classes.length === 0) return;
    
    const dayGroup = document.createElement('div');
    dayGroup.className = 'list-day-group';
    
    const dayTitle = document.createElement('h3');
    dayTitle.className = 'list-day-title';
    dayTitle.textContent = dayNames[day];
    dayGroup.appendChild(dayTitle);
    
    classes.forEach(classItem => {
      const item = document.createElement('div');
      item.className = 'list-class-item';
      const color = subjectColors[classItem.course_code];
      item.style.borderLeftColor = color;
      
      item.innerHTML = `
        <div class="list-class-time" style="color: ${color}">
          ${formatTime(classItem.start_time)}<br/>
          ${formatTime(classItem.end_time)}
        </div>
        <div class="list-class-details">
          <div class="list-class-header">
            <div>
              <div class="list-class-code" style="color: ${color}">${classItem.course_code}</div>
              <div class="list-class-name">${classItem.course_name}</div>
            </div>
            <div class="class-room-badge">${classItem.room}</div>
          </div>
          <div class="list-class-meta">
            <span>👨‍🏫 ${classItem.professor}</span>
            <span>📍 ${classItem.building}</span>
          </div>
        </div>
      `;
      
      item.addEventListener('click', () => showClassDetails(classItem));
      dayGroup.appendChild(item);
    });
    
    content.appendChild(dayGroup);
  });
  
  if (content.innerHTML === '') {
    content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">No se encontraron clases</div></div>';
  }
}

function renderAgendaView() {
  const content = document.getElementById('agendaContent');
  content.innerHTML = `
    <div class="agenda-header">
      <h2 class="agenda-title">📅 Próximas Clases</h2>
      <p class="agenda-subtitle">Tu agenda académica semanal</p>
    </div>
    <div class="agenda-timeline" id="agendaTimeline"></div>
  `;
  
  const timeline = document.getElementById('agendaTimeline');
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDayKey = getDayKey(currentDayIndex);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  let upcomingClasses = [];
  
  // Get upcoming classes starting from today
  Object.keys(scheduleData).forEach(day => {
    scheduleData[day].forEach(classItem => {
      if (filterDay !== 'all' && filterDay !== day) return;
      if (!matchesSearch(classItem)) return;
      
      // If it's today, only show future classes
      if (day === currentDayKey) {
        const classTime = parseTime(classItem.start_time);
        if (classTime > currentTime) {
          upcomingClasses.push({ ...classItem, day });
        }
      } else {
        upcomingClasses.push({ ...classItem, day });
      }
    });
  });
  
  // Sort by day and time
  upcomingClasses.sort((a, b) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return parseTime(a.start_time) - parseTime(b.start_time);
  });
  
  if (upcomingClasses.length === 0) {
    timeline.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">¡No hay más clases esta semana!</div></div>';
    return;
  }
  
  upcomingClasses.forEach((classItem, index) => {
    const item = document.createElement('div');
    item.className = 'agenda-item';
    const color = subjectColors[classItem.course_code];
    
    item.innerHTML = `
      <div class="list-class-header">
        <div>
          <div class="list-class-code" style="color: ${color}">${classItem.course_code}</div>
          <div class="list-class-name">${classItem.course_name}</div>
        </div>
        <div class="class-room-badge">${classItem.room}</div>
      </div>
      <div class="list-class-meta" style="margin-top: 8px;">
        <span>📅 ${dayNames[classItem.day]}</span>
        <span>⏰ ${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}</span>
        <span>📍 ${classItem.building}</span>
      </div>
    `;
    
    item.addEventListener('click', () => showClassDetails(classItem));
    timeline.appendChild(item);
  });
}

// Helper Functions
function matchesSearch(classItem) {
  if (!searchQuery) return true;
  const searchFields = [
    classItem.course_code,
    classItem.course_name,
    classItem.professor,
    classItem.building,
    classItem.room
  ].map(f => f.toLowerCase());
  return searchFields.some(field => field.includes(searchQuery));
}

function formatTime(time) {
  if (timeFormat === '12') {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  }
  return time;
}

function navigateDay(direction) {
  const days = Object.keys(scheduleData);
  const currentIndex = days.indexOf(selectedDay);
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = days.length - 1;
  if (newIndex >= days.length) newIndex = 0;
  selectedDay = days[newIndex];
  renderDayView();
}

// Statistics
function updateStatistics() {
  // Calculate weekly hours
  let totalHours = 0;
  Object.values(scheduleData).forEach(classes => {
    classes.forEach(c => {
      const start = parseTime(c.start_time);
      const end = parseTime(c.end_time);
      totalHours += (end - start) / 60;
    });
  });
  document.getElementById('weeklyHours').textContent = `${totalHours}h`;
  
  // Find busiest day
  let maxClasses = 0;
  let busiestDay = '';
  Object.entries(scheduleData).forEach(([day, classes]) => {
    if (classes.length > maxClasses) {
      maxClasses = classes.length;
      busiestDay = dayNames[day];
    }
  });
  document.getElementById('busiestDay').textContent = busiestDay;
  
  // Most frequent building
  const buildingCount = {};
  Object.values(scheduleData).forEach(classes => {
    classes.forEach(c => {
      buildingCount[c.building] = (buildingCount[c.building] || 0) + 1;
    });
  });
  const mostFrequent = Object.entries(buildingCount).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('frequentBuilding').textContent = mostFrequent ? mostFrequent[0] : '--';
  
  // Average classes per day
  const avgClasses = (Object.values(scheduleData).reduce((sum, classes) => sum + classes.length, 0) / 5).toFixed(1);
  document.getElementById('avgClasses').textContent = avgClasses;
}

function updateTodaySummary() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  const summary = document.getElementById('todaySummary');
  
  if (!currentDayKey || !scheduleData[currentDayKey]) {
    summary.innerHTML = '<div class="summary-item">🎉 ¡No hay clases hoy!</div>';
    return;
  }
  
  const classes = scheduleData[currentDayKey];
  if (classes.length === 0) {
    summary.innerHTML = '<div class="summary-item">🎉 ¡No hay clases hoy!</div>';
    return;
  }
  
  summary.innerHTML = `
    <div class="summary-item">📚 ${classes.length} clases programadas</div>
    <div class="summary-item">⏰ Primera clase: ${formatTime(classes[0].start_time)}</div>
    <div class="summary-item">🏁 Última clase: ${formatTime(classes[classes.length - 1].end_time)}</div>
  `;
}

function updateUpcomingClasses() {
  const list = document.getElementById('upcomingList');
  const nextClass = getNextClass();
  
  if (!nextClass) {
    list.innerHTML = '<div class="upcoming-item">✅ ¡No hay más clases esta semana!</div>';
    return;
  }
  
  // Get next 3 classes
  const upcoming = [];
  const now = new Date();
  const dayIndex = now.getDay();
  let currentDayKey = getDayKey(dayIndex);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  Object.keys(scheduleData).forEach(day => {
    scheduleData[day].forEach(classItem => {
      if (day === currentDayKey) {
        const classTime = parseTime(classItem.start_time);
        if (classTime > currentTime) {
          upcoming.push({ ...classItem, day });
        }
      } else {
        upcoming.push({ ...classItem, day });
      }
    });
  });
  
  upcoming.sort((a, b) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return parseTime(a.start_time) - parseTime(b.start_time);
  });
  
  list.innerHTML = upcoming.slice(0, 3).map(c => `
    <div class="upcoming-item">
      <div class="upcoming-time">${dayNames[c.day]} • ${formatTime(c.start_time)}</div>
      <div class="upcoming-course">${c.course_code}: ${c.course_name}</div>
    </div>
  `).join('');
}

// Modals
function showClassDetails(classItem) {
  const modal = document.getElementById('classModal');
  const body = document.getElementById('modalBody');
  const color = subjectColors[classItem.course_code];
  
  body.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-course-name" style="color: ${color}">${classItem.course_name}</h2>
      <p class="modal-course-code">${classItem.course_code}</p>
    </div>
    <div class="modal-details">
      <div class="modal-detail-row">
        <div class="modal-detail-icon">⏰</div>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Horario</div>
          <div class="modal-detail-value">${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}</div>
        </div>
      </div>
      <div class="modal-detail-row">
        <div class="modal-detail-icon">👨‍🏫</div>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Profesor</div>
          <div class="modal-detail-value">${classItem.professor}</div>
        </div>
      </div>
      <div class="modal-detail-row">
        <div class="modal-detail-icon">🏢</div>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Edificio</div>
          <div class="modal-detail-value">${classItem.building}</div>
        </div>
      </div>
      <div class="modal-detail-row">
        <div class="modal-detail-icon">🚪</div>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Salón</div>
          <div class="modal-detail-value">${classItem.room}</div>
        </div>
      </div>
      <div class="modal-detail-row">
        <div class="modal-detail-icon">⏱️</div>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Duración</div>
          <div class="modal-detail-value">${(parseTime(classItem.end_time) - parseTime(classItem.start_time)) / 60} horas</div>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Quick Actions
function showWhereAmI() {
  const currentClass = getCurrentClass();
  const nextClass = getNextClass();
  
  let message = '';
  if (currentClass) {
    message = `Estás en: ${currentClass.course_name} (${currentClass.building} - Salón ${currentClass.room})`;
  } else if (nextClass) {
    const timeUntil = getTimeUntilClass(nextClass);
    message = `Próxima clase en ${timeUntil}: ${nextClass.course_name} (${nextClass.building} - Salón ${nextClass.room})`;
  } else {
    message = '¡No tienes más clases hoy!';
  }
  
  alert(message);
}

function showFreeTime() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayKey = getDayKey(dayIndex);
  
  if (!currentDayKey || !scheduleData[currentDayKey]) {
    alert('¡Hoy es día libre!');
    return;
  }
  
  const classes = scheduleData[currentDayKey];
  const gaps = [];
  
  for (let i = 0; i < classes.length - 1; i++) {
    const endTime = parseTime(classes[i].end_time);
    const nextStartTime = parseTime(classes[i + 1].start_time);
    const gapMinutes = nextStartTime - endTime;
    if (gapMinutes > 0) {
      gaps.push({
        start: classes[i].end_time,
        end: classes[i + 1].start_time,
        duration: gapMinutes / 60
      });
    }
  }
  
  if (gaps.length === 0) {
    alert('No tienes tiempo libre entre clases hoy.');
  } else {
    const message = gaps.map(g => 
      `${formatTime(g.start)} - ${formatTime(g.end)} (${g.duration}h)`
    ).join('\n');
    alert('Tiempos libres hoy:\n\n' + message);
  }
}

// Theme Toggle
function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}

// Export
function exportSchedule() {
  let csvContent = 'Día,Código,Materia,Inicio,Fin,Edificio,Salón,Profesor\n';
  
  Object.entries(scheduleData).forEach(([day, classes]) => {
    classes.forEach(c => {
      csvContent += `${dayNames[day]},${c.course_code},"${c.course_name}",${c.start_time},${c.end_time},${c.building},${c.room},"${c.professor}"\n`;
    });
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mi_horario.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

// Sidebar Toggle
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}