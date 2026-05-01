const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const STORAGE_KEY = 'pomodoro.state.v1';

const state = {
  phase: 'work',
  remaining: WORK_DURATION,
  running: false,
  cycle: 1,
  intervalId: null,
  endTimestamp: null,
};

const els = {};

function $(id) {
  return document.getElementById(id);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${pad(m)}:${pad(r)}`;
}

function phaseDuration(phase) {
  return phase === 'work' ? WORK_DURATION : BREAK_DURATION;
}

function render() {
  const time = formatTime(state.remaining);
  els.timeValue.textContent = time;
  els.cycleCount.textContent = String(state.cycle);
  document.title = `${time} — ${state.phase === 'work' ? 'Focus' : 'Break'}`;

  if (state.phase === 'work') {
    els.phaseLabel.textContent = 'Work session';
    els.phaseHeading.textContent = 'Focus. One interval at a time.';
    els.timerCard.setAttribute('data-phase', 'work');
  } else {
    els.phaseLabel.textContent = 'Break';
    els.phaseHeading.textContent = 'Rest. Return sharper.';
    els.timerCard.setAttribute('data-phase', 'break');
  }

  if (state.running) {
    els.navStatus.textContent = state.phase === 'work' ? 'Focusing' : 'On break';
    els.startBtn.textContent = 'Running';
    els.startBtn.disabled = true;
    els.pauseBtn.disabled = false;
  } else {
    els.navStatus.textContent = state.remaining < phaseDuration(state.phase) ? 'Paused' : 'Ready to focus';
    els.startBtn.textContent = state.remaining < phaseDuration(state.phase) ? 'Resume' : 'Start';
    els.startBtn.disabled = false;
    els.pauseBtn.disabled = true;
  }

  els.workMeta.textContent = formatTime(WORK_DURATION);
  els.breakMeta.textContent = formatTime(BREAK_DURATION);
}

function announce(message) {
  els.announcement.textContent = message;
  els.announcement.classList.add('is-visible');
  clearTimeout(announce._t);
  announce._t = setTimeout(() => {
    els.announcement.classList.remove('is-visible');
  }, 5000);
}

function persist() {
  try {
    const snapshot = {
      phase: state.phase,
      remaining: state.remaining,
      running: state.running,
      cycle: state.cycle,
      endTimestamp: state.endTimestamp,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (e) {}
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return;

    state.phase = data.phase === 'break' ? 'break' : 'work';
    state.cycle = Number.isFinite(data.cycle) && data.cycle > 0 ? data.cycle : 1;

    if (data.running && data.endTimestamp) {
      const now = Date.now();
      const remainingMs = data.endTimestamp - now;
      if (remainingMs > 0) {
        state.remaining = Math.ceil(remainingMs / 1000);
        state.running = true;
        state.endTimestamp = data.endTimestamp;
      } else {
        // Phase elapsed while away; advance.
        state.remaining = 0;
        state.running = false;
        state.endTimestamp = null;
      }
    } else {
      state.remaining = Number.isFinite(data.remaining)
        ? Math.max(0, Math.min(data.remaining, phaseDuration(state.phase)))
        : phaseDuration(state.phase);
      state.running = false;
      state.endTimestamp = null;
    }
  } catch (e) {}
}

function tick() {
  if (!state.running || state.endTimestamp == null) return;
  const remainingMs = state.endTimestamp - Date.now();
  state.remaining = Math.max(0, Math.ceil(remainingMs / 1000));
  if (state.remaining <= 0) {
    completePhase();
  } else {
    render();
    persist();
  }
}

function startTimer() {
  if (state.running) return;
  if (state.remaining <= 0) state.remaining = phaseDuration(state.phase);
  state.running = true;
  state.endTimestamp = Date.now() + state.remaining * 1000;
  if (state.intervalId) clearInterval(state.intervalId);
  state.intervalId = setInterval(tick, 250);
  if (state.phase === 'work') {
    announce('Work session started. Hold the line for twenty-five minutes.');
  } else {
    announce('Break started. Step away and reset.');
  }
  render();
  persist();
}

function pauseTimer() {
  if (!state.running) return;
  const remainingMs = state.endTimestamp - Date.now();
  state.remaining = Math.max(0, Math.ceil(remainingMs / 1000));
  state.running = false;
  state.endTimestamp = null;
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
  announce('Paused. Resume when ready.');
  render();
  persist();
}

function resetTimer() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
  state.running = false;
  state.endTimestamp = null;
  state.phase = 'work';
  state.remaining = WORK_DURATION;
  state.cycle = 1;
  announce('Timer reset. Begin again.');
  render();
  persist();
}

function completePhase() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
  state.running = false;
  state.endTimestamp = null;

  if (state.phase === 'work') {
    state.phase = 'break';
    state.remaining = BREAK_DURATION;
    announce('Work complete. Five-minute break begins now.');
    render();
    persist();
    // Auto-start the break.
    setTimeout(() => startTimer(), 600);
  } else {
    state.phase = 'work';
    state.cycle += 1;
    state.remaining = WORK_DURATION;
    announce(`Break complete. Cycle ${state.cycle} — back to work.`);
    render();
    persist();
  }
}

function skipPhase() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
  state.running = false;
  state.endTimestamp = null;
  state.remaining = 0;
  completePhase();
}

function bindEvents() {
  els.startBtn.addEventListener('click', startTimer);
  els.pauseBtn.addEventListener('click', pauseTimer);
  els.resetBtn.addEventListener('click', resetTimer);
  els.skipBtn.addEventListener('click', skipPhase);

  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.code === 'Space') {
      e.preventDefault();
      if (state.running) pauseTimer(); else startTimer();
    } else if (e.key === 'r' || e.key === 'R') {
      resetTimer();
    } else if (e.key === 's' || e.key === 'S') {
      skipPhase();
    }
  });

  window.addEventListener('beforeunload', persist);
}

function init() {
  els.timeValue = $('timeValue');
  els.timerDisplay = $('timerDisplay');
  els.phaseLabel = $('phaseLabel');
  els.phaseHeading = $('phaseHeading');
  els.cycleCount = $('cycleCount');
  els.startBtn = $('startBtn');
  els.pauseBtn = $('pauseBtn');
  els.resetBtn = $('resetBtn');
  els.skipBtn = $('skipBtn');
  els.announcement = $('announcement');
  els.navStatus = $('navStatus');
  els.workMeta = $('workMeta');
  els.breakMeta = $('breakMeta');
  els.timerCard = document.querySelector('.timer-card');

  restore();
  bindEvents();

  if (state.running && state.endTimestamp) {
    if (state.intervalId) clearInterval(state.intervalId);
    state.intervalId = setInterval(tick, 250);
  } else if (state.remaining <= 0) {
    completePhase();
    return;
  }

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}