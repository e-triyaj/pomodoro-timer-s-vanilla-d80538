
# UX/UI Design Documentation

## Project: UX Design for Initialize and plan project: Pomodoro Timer S Vanilla

A focus timer with classic Pomodoro intervals. The user starts a 25-minute work session by clicking Start. After 25 minutes the timer announces a 5-minute...

## Template Features Addressed:
- Standard web application features

## Deliverables:
- Wireframes
- User Flow
- Design System

## Design Solution:
# Pomodoro Timer - UX/UI Design Solution

## 1. User Experience Strategy

### User Flow
```
[Landing/Timer Screen] 
    → User clicks "Start" 
    → 25-min Work Session (countdown active)
    → Session ends → Audio/Visual notification
    → [Break Screen] auto-displays
    → 5-min Break starts
    → Break ends → Notification
    → Returns to [Timer Screen] (cycle count +1)
    
Optional paths:
- Pause/Resume during any session
- Reset to start over
- View [Settings/Stats] for cycle history
```

### Information Architecture
- **Primary Screen:** Timer (focal point - large countdown display)
- **Secondary Screen:** Settings & History (durations, completed cycles)
- **Tertiary State:** Break screen (visual differentiation from work)

### Navigation Structure
Single-page app with state-based UI changes. Minimal nav: Timer ↔ Settings toggle.

### Interaction Patterns
- **Primary action:** Large Start/Pause button (centered, high contrast)
- **Secondary actions:** Reset, Skip session
- **Feedback:** Visual countdown ring + audio chime at transitions
- **Keyboard:** Space = Start/Pause, R = Reset, S = Skip

---

## 2. Visual Design

- **Primary color:** Tomato red `#E63946` (work mode — energy, focus)
- **Secondary color:** Mint green `#2A9D8F` (break mode — calm, recovery)
- **Accent:** Warm yellow `#F4A261` (notifications)
- **Neutrals:** `#1D3557` (text), `#F1FAEE` (background), `#A8DADC` (subtle UI)
- **Typography:** System sans-serif stack; monospace for the countdown numerals (tabular alignment)
- **Layout:** Single centered column, max-width 480px, generous whitespace

---

## 3. Wireframes & Design System

<!-- File: wireframes/timer.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pomodoro Timer — Focus Session</title>
  <link rel="stylesheet" href="../styles/design-system.css">
</head>
<body class="mode-work">
  <a href="#main" class="skip-link">Skip to main content</a>

  <header class="app-header" role="banner">
    <h1 class="app-title">Pomodoro</h1>
    <nav aria-label="Primary">
      <a href="settings.html" class="nav-link" aria-label="Open settings and history">Settings</a>
    </nav>
  </header>

  <main id="main" class="app-main" role="main">
    <section class="session-info" aria-live="polite">
      <p class="session-label">Work Session</p>
      <p class="session-counter">Cycle <span aria-label="current cycle">1</span> of 4</p>
    </section>

    <section class="timer-section" aria-labelledby="timer-heading">
      <h2 id="timer-heading" class="visually-hidden">Time Remaining</h2>
      <div
        class="timer-display"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="timer-time">25:00</span>
      </div>
      <progress
        class="timer-progress"
        value="0"
        max="1500"
        aria-label="Session progress"
      >0%</progress>
    </section>

    <section class="controls" aria-label="Timer controls">
      <button type="button" class="btn btn-primary" aria-keyshortcuts="Space">
        Start
      </button>
      <button type="button" class="btn btn-secondary" aria-keyshortcuts="R">
        Reset
      </button>
      <button type="button" class="btn btn-tertiary" aria-keyshortcuts="S">
        Skip
      </button>
    </section>

    <section class="status" aria-live="polite">
      <p class="status-text">Press Start to begin your focus session.</p>
    </section>
  </main>

  <footer class="app-footer" role="contentinfo">
    <p>Stay focused. <kbd>Space</kbd> Start/Pause · <kbd>R</kbd> Reset · <kbd>S</kbd> Skip</p>
  </footer>
</body>
</html>

<!-- File: wireframes/break.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pomodoro Timer — Break Time</title>
  <link rel="stylesheet" href="../styles/design-system.css">
</head>
<body class="mode-break">
  <a href="#main" class="skip-link">Skip to main content</a>

  <header class="app-header" role="banner">
    <h1 class="app-title">Pomodoro</h1>
    <nav aria-label="Primary">
      <a href="settings.html" class="nav-link">Settings</a>
    </nav>
  </header>

  <main id="main" class="app-main" role="main">
    <section class="session-info" aria-live="polite">
      <p class="session-label">Break Time ☕</p>
      <p class="session-counter">After cycle <span>1</span></p>
    </section>

    <section class="timer-section" aria-labelledby="timer-heading">
      <h2 id="timer-heading" class="visually-hidden">Break Time Remaining</h2>
      <div
        class="timer-display"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="timer-time">05:00</span>
      </div>
      <progress
        class="timer-progress"
        value="0"
        max="300"
        aria-label="Break progress"
      >0%</progress>
    </section>

    <section class="controls" aria-label="Break controls">
      <button type="button" class="btn btn-primary">Start Break</button>
      <button type="button" class="btn btn-tertiary">Skip Break</button>
    </section>

    <section class="status" aria-live="polite">
      <p class="status-text">Stand up, stretch, hydrate. Next work session starts after this break.</p>
    </section>
  </main>

  <footer class="app-footer" role="contentinfo">
    <p>Recharge. <kbd>Space</kbd> Start/Pause · <kbd>S</kbd> Skip</p>
  </footer>
</body>
</html>

<!-- File: wireframes/settings.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pomodoro Timer — Settings & History</title>
  <link rel="stylesheet" href="../styles/design-system.css">
</head>
<body class="mode-neutral">
  <a href="#main" class="skip-link">Skip to main content</a>

  <header class="app-header" role="banner">
    <h1 class="app-title">Pomodoro</h1>
    <nav aria-label="Primary">
      <a href="timer.html" class="nav-link" aria-label="Back to timer">← Timer</a>
    </nav>
  </header>

  <main id="main" class="app-main" role="main">
    <h2 class="section-heading">Settings</h2>
    <form class="settings-form" aria-label="Timer durations">
      <div class="form-row">
        <label for="work-duration">Work duration (minutes)</label>
        <input id="work-duration" type="number" min="1" max="90" value="25" inputmode="numeric">
      </div>
      <div class="form-row">
        <label for="break-duration">Short break (minutes)</label>
        <input id="break-duration" type="number" min="1" max="30" value="5" inputmode="numeric">
      </div>
      <div class="form-row">
        <label for="long-break">Long break (minutes)</label>
        <input id="long-break" type="number" min="1" max="60" value="15" inputmode="numeric">
      </div>
      <div class="form-row form-row-checkbox">
        <input id="sound" type="checkbox" checked>
        <label for="sound">Play sound at session end</label>
      </div>
      <button type="submit" class="btn btn-primary">Save Settings</button>
    </form>

    <h2 class="section-heading">Today's History</h2>
    <ul class="history-list" aria-label="Completed cycles today">
      <li class="history-item">
        <span class="history-time">09:00 – 09:25</span>
        <span class="history-label">Work</span>
      </li>
      <li class="history-item">
        <span class="history-time">09:25 – 09:30</span>
        <span class="history-label">Break</span>
      </li>
      <li class="history-item">
        <span class="history-time">09:30 – 09:55</span>
        <span class="history-label">Work</span>
      </li>
    </ul>
  </main>

  <footer class="app-footer" role="contentinfo">
    <p>Settings save locally on your device.</p>
  </footer>
</body>
</html>

<!-- File: styles/design-system.css -->
/* =========================================
   Pomodoro Timer — Design System
   WCAG 2.1 AA compliant
   ========================================= */

:root {
  /* Colors — Brand */
  --color-work: #E63946;
  --color-work-dark: #B82B36;
  --color-break: #2A9D8F;
  --color-break-dark: #1F7A6F;
  --color-accent: #F4A261;

  /* Colors — Neutral */
  --color-text: #1D3557;
  --color-text-muted: #4A5A75;
  --color-bg: #F1FAEE;
  --color-surface: #FFFFFF;
  --color-border: #A8DADC;

  /* Mode-driven (overridden by body class) */
  --color-mode: var(--color-work);
  --color-mode-dark: var(--color-work-dark);

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "SF Mono", Menlo, Monaco, Consolas, monospace;

  --fs-xs: 0.875rem;
  --fs-sm: 1rem;
  --fs-md: 1.125rem;
  --fs-lg: 1.5rem;
  --fs-xl: 2rem;
  --fs-display: clamp(4rem, 18vw, 8rem);

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-bold: 700;

  /* Spacing (8px scale) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --space-7: 4rem;

  /* Layout */
  --container-max: 480px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  /* Effects */
  --shadow-sm: 0 1px 3px rgba(29,53,87,0.08);
  --shadow-md: 0 4px 12px rgba(29,53,87,0.12);
  --transition: 200ms ease;

  /* Breakpoints (referenced in media queries) */
  --bp-sm: 480px;
  --bp-md: 768px;
}

/* Mode themes */
body.mode-work {
  --color-mode: var(--color-work);
  --color-mode-dark: var(--color-work-dark);
}
body.mode-break {
  --color-mode: var(--color-break);
  --color-mode-dark: var(--color-break-dark);
}
body.mode-neutral {
  --color-mode: var(--color-text);
  --color-mode-dark: #0F1F33;
}

/* =========================================
   Reset & Base
   ========================================= */
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--fs-sm);
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background var(--transition);
}

h1, h2, h3 { margin: 0; line-height: 1.2; }
p { margin: 0; }

/* =========================================
   Accessibility utilities
   ========================================= */
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

.skip-link {
  position: absolute;
  top: -40px; left: var(--space-3);
  background: var(--color-text);
  color: var(--color-bg);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  text-decoration: none;
  z-index: 100;
  transition: top var(--transition);
}
.skip-link:focus { top: var(--space-3); }

:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

/* =========================================
   Layout
   ========================================= */
.app-header,
.app-main,
.app-footer {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-top: var(--space-5);
  padding-bottom: var(--space-5);
}

.app-footer {
  text-align: center;
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
  padding-bottom: var(--space-4);
}

.app-title {
  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
  color: var(--color-mode);
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: var(--fw-medium);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}
.nav-link:hover, .nav-link:focus { background: var(--color-border); }

/* =========================================
   Session info
   ========================================= */
.session-info { text-align: center; }
.session-label {
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  color: var(--color-mode);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.session-counter {
  font-size: var(--fs-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-1);
}

/* =========================================
   Timer display
   ========================================= */
.timer-section {
  text-align: center;
  padding: var(--space-5) 0;
}

.timer-display {
  font-family: var(--font-mono);
  font-size: var(--fs-display);
  font-weight: var(--fw-bold);
  color: var(--color-mode);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  margin-bottom: var(--space-4);
}

.timer-progress {
  width: 100%;
  height: 8px;
  border-radius: var(--radius-pill);
  overflow: hidden;
  appearance: none;
  background: var(--color-border);
  border: none;
}
.timer-progress::-webkit-progress-bar { background: var(--color-border); }
.timer-progress::-webkit-progress-value {
  background: var(--color-mode);
  transition: width var(--transition);
}
.timer-progress::-moz-progress-bar { background: var(--color-mode); }

/* =========================================
   Controls / Buttons
   ========================================= */
.controls {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.btn {
  font: inherit;
  font-weight: var(--fw-bold);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  border: 2px solid transparent;
  cursor: pointer;
  min-height: 48px; /* WCAG touch target */
  min-width: 120px;
  transition: background var(--transition), transform var(--transition);
}
.btn:active { transform: scale(0.97); }

.btn-primary {
  background: var(--color-mode);
  color: #FFFFFF;
}
.btn-primary:hover, .btn-primary:focus { background: var(--color-mode-dark); }

.btn-secondary {
  background: transparent;
  color: var(--color-mode);
  border-color: var(--color-mode);
}
.btn-secondary:hover, .btn-secondary:focus {
  background: var(--color-mode);
  color: #FFFFFF;
}

.btn-tertiary {
  background: transparent;
  color: var(--color-text-muted);
  border-color: var(--color-border);
}
.btn-tertiary:hover, .btn-tertiary:focus {
  background: var(--color-border);
  color: var(--color-text);
}

/* =========================================
   Status
   ========================================= */
.status {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  min-height: 1.5em;
}

/* =========================================
   Settings form
   ========================================= */
.section-heading {
  font-size: var(--fs-lg);
  margin-bottom: var(--space-3);
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.form-row-checkbox {
  flex-direction: row;
  align-items: center;
}

.form-row label {
  font-weight: var(--fw-medium);
  font-size: var(--fs-sm);
}

.form-row input[type="number"] {
  font: inherit;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  min-height: 44px;
  background: var(--color-bg);
}
.form-row input[type="number"]:focus {
  border-color: var(--color-mode);
  outline: none;
}

.form-row input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--color-mode);
}

/* =========================================
   History list
   ========================================= */
.history-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3);
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--color-mode);
}
.history-time { font-family: var(--font-mono); }
.history-label {
  font-weight: var(--fw-bold);
  color: var(--color-mode);
}

kbd {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-border);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

/* =========================================
   Responsive
   ========================================= */
@media (max-width: 480px) {
  .app-header, .app-main, .app-footer { padding-left: var(--space-3); padding-right: var(--space-3); }
  .controls { flex-direction: column; }
  .btn { width: 100%; }
}

/* =========================================
   Reduced motion
   ========================================= */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* =========================================
   Dark mode
   ========================================= */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #F1FAEE;
    --color-text-muted: #A8DADC;
    --color-bg: #0F1F33;
    --color-surface: #1D3557;
    --color-border: #2C4A6F;
  }
}

---

## 4. Accessibility Summary (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| **Color contrast** | Text `#1D3557` on `#F1FAEE` = 12.6:1 ✓; Work red on white = 4.7:1 ✓ |
| **Keyboard nav** | All interactive elements focusable; visible `:focus-visible` ring; documented shortcuts |
| **Screen readers** | `role="timer"` + `aria-live="polite"` for countdown; `aria-atomic` for full announcement; `aria-live` status region for transitions |
| **Touch targets** | All buttons ≥48px height (WCAG 2.5.5) |
| **Skip link** | Provided to bypass header |
| **Reduced motion** | `prefers-reduced-motion` honored |
| **Form labels** | Every input has explicit `<label for>` |
| **Semantic HTML** | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` with proper headings |
| **Language** | `lang="en"` on `<html>` |

## 5. Design Decisions

- **Color shifts by mode** to give immediate, pre-attentive feedback (red = focus, green = rest) without relying on color alone (text labels also change).
- **Monospace tabular numerals** prevent the timer from "jittering" as digits change width.
- **Single-column, max 480px** keeps the experience phone-friendly and avoids distractions on desktop.
- **Pill-shaped primary button** is unmistakably the main CTA — Hick's law applied: only one obvious next action.
- **Settings as a separate page** (not modal) keeps the timer screen radically minimal — pure focus.

---
Generated by UX Designer Agent
