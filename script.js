/* ═══════════════════════════════════════════════════
   8-BIT PORTFOLIO – SCRIPT.JS
   Aravind Pattath Niraj
═══════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────── */
/*  BOOT SEQUENCE                                     */
/* ───────────────────────────────────────────────── */

const BOOT_LINES = [
  '> BIOS v2.4.1 (C) 1985 AravindTech',
  '> Checking memory... 640K OK',
  '> Initializing Python kernel.............. OK',
  '> Loading ML modules...................... OK',
  '> Mounting /projects/face-detection...... OK',
  '> Mounting /projects/aze-link............ OK',
  '> Mounting /projects/ai-attendance....... OK',
  '> IEEE daemon started..................... OK',
  '> Connecting to Jain University LAN...... OK',
  '> Loading portfolio.exe...................',
  '',
  '  ██████╗  ██████╗ ██████╗ ████████╗',
  '  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝',
  '  ██████╔╝██║   ██║██████╔╝   ██║',
  '  ██╔═══╝ ██║   ██║██╔══██╗   ██║',
  '  ██║     ╚██████╔╝██║  ██║   ██║',
  '  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝',
  '',
  '  :: ARAVIND PATTATH NIRAJ ::',
  '  :: B.TECH CSE | AI & ML SPECIALIST ::',
  '',
  '> All systems nominal.',
  '> Welcome, Player.',
];

const bootEl    = document.getElementById('boot-text');
const bootCursor = document.getElementById('boot-cursor');
const pressStart = document.getElementById('press-start');

let lineIndex = 0;
let charIndex = 0;
let bootDone  = false;

function typeBoot() {
  if (lineIndex >= BOOT_LINES.length) {
    bootDone = true;
    pressStart.style.display = 'block';
    document.addEventListener('keydown', function onEnter(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        document.removeEventListener('keydown', onEnter);
        launchMain();
      }
    });
    // Also allow click anywhere to dismiss
    document.getElementById('boot-screen').addEventListener('click', launchMain, { once: true });
    return;
  }

  const line = BOOT_LINES[lineIndex];

  if (charIndex <= line.length) {
    bootEl.textContent = bootEl.textContent.split('\n').slice(0, lineIndex).join('\n')
      + (lineIndex > 0 ? '\n' : '')
      + line.substring(0, charIndex);
    charIndex++;
    // Vary speed: fast for system lines, slower for logo
    const delay = (line.startsWith('  ') ? 8 : (line.includes('...') ? 6 : 20));
    setTimeout(typeBoot, delay);
  } else {
    bootEl.textContent += '\n';
    lineIndex++;
    charIndex = 0;
    setTimeout(typeBoot, line === '' ? 80 : 40);
  }
}

// Skip boot on any keypress before done
document.addEventListener('keydown', function skipBoot(e) {
  if (!bootDone) {
    document.removeEventListener('keydown', skipBoot);
    lineIndex = BOOT_LINES.length - 1;
    charIndex = BOOT_LINES[lineIndex].length + 1;
  }
});

function launchMain() {
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.style.opacity = '0';
  setTimeout(() => {
    bootScreen.style.display = 'none';
    const mainUI = document.getElementById('main-ui');
    mainUI.style.display = 'block';
    mainUI.style.opacity = '0';
    mainUI.style.transition = 'opacity 0.5s';
    requestAnimationFrame(() => { mainUI.style.opacity = '1'; });
    showXP('+50 XP  PORTFOLIO LOADED');
  }, 800);
}

// Start boot after small delay
setTimeout(typeBoot, 400);

/* ───────────────────────────────────────────────── */
/*  NAVIGATION                                        */
/* ───────────────────────────────────────────────── */

const SECTIONS = ['start-screen', 'about', 'skills', 'projects', 'achievements', 'contact'];
let currentSection = 'start-screen';

function navigateTo(target) {
  if (!SECTIONS.includes(target)) return;

  const current = document.getElementById(currentSection);
  const next    = document.getElementById(target);

  if (!current || !next) return;

  // Slide out current
  current.style.opacity = '0';
  current.style.transform = 'translateY(-20px)';
  current.style.transition = 'opacity 0.25s, transform 0.25s';

  setTimeout(() => {
    current.style.display = 'none';
    current.style.opacity = '';
    current.style.transform = '';

    next.style.display = 'block';
    next.style.opacity = '0';
    next.style.transform = 'translateY(20px)';
    next.style.transition = 'opacity 0.3s, transform 0.3s';

    requestAnimationFrame(() => {
      next.style.opacity = '1';
      next.style.transform = 'translateY(0)';
    });

    currentSection = target;

    // Section-specific init
    if (target === 'about')        initAbout();
    if (target === 'skills')       initSkills();
    if (target === 'achievements') initAchievements();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // XP rewards per section
    const xpMap = {
      about: '+25 XP  PLAYER PROFILE VIEWED',
      skills: '+30 XP  SKILL TREE ACCESSED',
      projects: '+40 XP  MISSIONS LOG OPENED',
      achievements: '+35 XP  ACHIEVEMENTS UNLOCKED',
      contact: '+20 XP  TERMINAL CONNECTED',
    };
    if (xpMap[target]) showXP(xpMap[target]);

  }, 250);
}

/* ───────────────────────────────────────────────── */
/*  ABOUT – STAT BARS & TYPEWRITER                   */
/* ───────────────────────────────────────────────── */

let aboutInited = false;

function initAbout() {
  if (aboutInited) return;
  aboutInited = true;

  // Animate stat bars
  setTimeout(() => {
    document.querySelectorAll('.stat-fill').forEach(bar => {
      const fill = bar.style.getPropertyValue('--fill') || '0%';
      bar.style.width = fill;
    });
  }, 200);
}

/* ───────────────────────────────────────────────── */
/*  SKILLS – HOVER TOOLTIP EFFECT                    */
/* ───────────────────────────────────────────────── */

let skillsInited = false;

function initSkills() {
  if (skillsInited) return;
  skillsInited = true;

  document.querySelectorAll('.skill-node.unlocked').forEach(node => {
    node.addEventListener('click', () => {
      showXP('+10 XP  SKILL INSPECTED');
    });
  });
}

/* ───────────────────────────────────────────────── */
/*  ACHIEVEMENTS                                      */
/* ───────────────────────────────────────────────── */

let achInited = false;

function initAchievements() {
  if (achInited) return;
  achInited = true;

  // Staggered reveal
  document.querySelectorAll('.achievement').forEach((ach, i) => {
    ach.style.opacity = '0';
    ach.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      ach.style.transition = 'opacity 0.4s, transform 0.4s';
      ach.style.opacity = '1';
      ach.style.transform = 'translateX(0)';
    }, i * 80);
  });
}

/* ───────────────────────────────────────────────── */
/*  MISSIONS – EXPAND/COLLAPSE                        */
/* ───────────────────────────────────────────────── */

function expandMission(card) {
  const wasExpanded = card.classList.contains('expanded');

  // Collapse all
  document.querySelectorAll('.mission-card').forEach(c => c.classList.remove('expanded'));

  if (!wasExpanded) {
    card.classList.add('expanded');
    showXP('+15 XP  MISSION DETAILS READ');
  }
}

/* ───────────────────────────────────────────────── */
/*  XP NOTIFICATION                                  */
/* ───────────────────────────────────────────────── */

let xpTimer = null;

function showXP(msg) {
  const el = document.getElementById('xp-notif');
  el.textContent = msg;
  el.style.display = 'block';
  el.style.animation = 'none';
  // Force reflow
  void el.offsetWidth;
  el.style.animation = 'floatXP 2s ease forwards';

  clearTimeout(xpTimer);
  xpTimer = setTimeout(() => { el.style.display = 'none'; }, 2100);
}

/* ───────────────────────────────────────────────── */
/*  MINI TERMINAL (in Contact section)               */
/* ───────────────────────────────────────────────── */

function handleContactCmd(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('contact-cmd');
  const cmd   = input.value.trim().toLowerCase();
  input.value = '';
  if (!cmd) return;

  const body = document.getElementById('mini-term-body');
  appendToMiniTerm(body, `$ ${cmd}`, 'c-cyan');

  const response = getMiniTermResponse(cmd);
  response.forEach(line => appendToMiniTerm(body, line, ''));
  body.scrollTop = body.scrollHeight;
}

function appendToMiniTerm(body, text, cls) {
  const p = document.createElement('p');
  p.textContent = text;
  if (cls) p.className = cls;
  // Remove old blink cursor line if present
  const old = body.querySelector('.blink-cursor-line');
  if (old) old.remove();
  body.appendChild(p);

  // Add new cursor line
  const cur = document.createElement('p');
  cur.className = 'blink-cursor-line';
  cur.innerHTML = '<span class="c-green">PLAYER@ARAVIND-PC</span>:<span class="c-cyan">~$</span> <span class="blink-cursor">█</span>';
  body.appendChild(cur);
}

function getMiniTermResponse(cmd) {
  const cmds = {
    help:    ['Available commands:', '  email    – show email', '  linkedin – show LinkedIn', '  skills   – list skills', '  clear    – clear screen'],
    email:   ['📧 pnaravind1@gmail.com'],
    linkedin:['💼 linkedin.com/in/aravind-pattath-niraj-a49b8a335'],
    skills:  ['⚔ Python  ⚔ SQL  ⚔ Java  ⚔ C', '🧠 ML  💬 NLP  👁 Computer Vision'],
    hello:   ['Hi there, adventurer! 👋', 'Feel free to reach out!'],
    hi:      ['Hello! 🎮 Ready to team up?'],
    clear:   ['__CLEAR__'],
  };

  if (cmd === 'clear') {
    const body = document.getElementById('mini-term-body');
    body.innerHTML = '';
    return [];
  }

  return cmds[cmd] || [`Command not found: '${cmd}'. Try 'help'.`];
}

/* ───────────────────────────────────────────────── */
/*  FULL TERMINAL OVERLAY                            */
/* ───────────────────────────────────────────────── */

let terminalOpen = false;

function toggleTerminal() {
  terminalOpen = !terminalOpen;
  const overlay = document.getElementById('terminal-overlay');
  overlay.style.display = terminalOpen ? 'flex' : 'none';

  if (terminalOpen) {
    const input = document.getElementById('term-input');
    input.focus();
    // Print welcome if first open
    const out = document.getElementById('term-output');
    if (out.children.length === 0) {
      printTermLine('  ┌──────────────────────────────────────────┐', 'term-out-system');
      printTermLine('  │   ARAVIND NIRAJ  PORTFOLIO TERMINAL v1.0  │', 'term-out-system');
      printTermLine('  └──────────────────────────────────────────┘', 'term-out-system');
      printTermLine('', '');
      printTermLine('Type "help" to see available commands.', 'term-out-info');
      printTermLine('', '');
    }
    showXP('+10 XP  TERMINAL OPENED');
  }
}

// Close terminal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && terminalOpen) toggleTerminal();
});

function handleTerminalInput(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('term-input');
  const cmd   = input.value.trim();
  input.value = '';
  if (!cmd) return;

  printTermLine(`PLAYER@PORTFOLIO:~$ ${cmd}`, 'c-cyan');
  processTerminalCommand(cmd.toLowerCase());

  const out = document.getElementById('term-output');
  out.scrollTop = out.scrollHeight;
}

function printTermLine(text, cls) {
  const out = document.getElementById('term-output');
  const p   = document.createElement('p');
  p.textContent = text;
  if (cls) p.className = cls;
  out.appendChild(p);
  out.scrollTop = out.scrollHeight;
}

function processTerminalCommand(cmd) {
  const parts = cmd.split(' ');
  const base  = parts[0];

  switch (base) {
    case 'help':
      printTermLine('', '');
      printTermLine('╔══════════════════╦═══════════════════════════════════╗', 'term-out-system');
      printTermLine('║  COMMAND         ║  DESCRIPTION                      ║', 'term-out-system');
      printTermLine('╠══════════════════╬═══════════════════════════════════╣', 'term-out-system');
      printTermLine('║  about           ║  Show player profile               ║', '');
      printTermLine('║  skills          ║  List all skills                   ║', '');
      printTermLine('║  projects        ║  Show all missions / projects      ║', '');
      printTermLine('║  contact         ║  Show contact information          ║', '');
      printTermLine('║  cat resume      ║  Print resume summary              ║', '');
      printTermLine('║  whoami          ║  Identity card                     ║', '');
      printTermLine('║  ls              ║  List portfolio sections           ║', '');
      printTermLine('║  ping            ║  Check if Aravind is online        ║', '');
      printTermLine('║  easter          ║  ??? secret command                ║', '');
      printTermLine('║  clear           ║  Clear terminal                    ║', '');
      printTermLine('║  exit            ║  Close terminal                    ║', '');
      printTermLine('╚══════════════════╩═══════════════════════════════════╝', 'term-out-system');
      printTermLine('', '');
      break;

    case 'about':
      printTermLine('', '');
      printTermLine('[ PLAYER PROFILE ]', 'term-out-system');
      printTermLine('Name     : Aravind Pattath Niraj', '');
      printTermLine('Class    : AI & ML Engineer', '');
      printTermLine('Guild    : Jain University Kochi', '');
      printTermLine('Faction  : IEEE', '');
      printTermLine('Status   : Actively seeking opportunities', 'c-green');
      printTermLine('', '');
      break;

    case 'skills':
      printTermLine('', '');
      printTermLine('[ SKILL TREE ]', 'term-out-system');
      printTermLine('LANGUAGES :', 'term-out-info');
      printTermLine('  Python   ████████████████████ 90%', '');
      printTermLine('  SQL      ████████████████░░░░ 80%', '');
      printTermLine('  Java     ██████████████░░░░░░ 70%', '');
      printTermLine('  C        ████████████░░░░░░░░ 60%', '');
      printTermLine('', '');
      printTermLine('AI / ML :', 'term-out-info');
      printTermLine('  Machine Learning  ████████████████████ 92%', '');
      printTermLine('  NLP               ████████████████░░░░ 75%', '');
      printTermLine('  Computer Vision   ████████████████░░░░ 78%', '');
      printTermLine('  TensorFlow        ████████████░░░░░░░░ 65%', '');
      printTermLine('', '');
      break;

    case 'projects':
      printTermLine('', '');
      printTermLine('[ MISSIONS LOG ]', 'term-out-system');
      printTermLine('', '');
      printTermLine('  [1] AI Attendance System      ★★★★☆  +500 XP', '');
      printTermLine('      Face recognition for rural school attendance', 'term-out-info');
      printTermLine('', '');
      printTermLine('  [2] Aze Link                  ★★★★★  +750 XP', '');
      printTermLine('      AI-powered classroom management platform', 'term-out-info');
      printTermLine('', '');
      printTermLine('  [3] Face Detection Engine     ★★★☆☆  +300 XP', '');
      printTermLine('      Real-time face detection using Haar Cascades', 'term-out-info');
      printTermLine('', '');
      printTermLine('  [4] Airport Management System ★★★★☆  +400 XP', '');
      printTermLine('      Full SQL database system for airport management', 'term-out-info');
      printTermLine('', '');
      break;

    case 'contact':
      printTermLine('', '');
      printTermLine('[ CONTACT TERMINAL ]', 'term-out-system');
      printTermLine('Email    : pnaravind1@gmail.com', '');
      printTermLine('LinkedIn : linkedin.com/in/aravind-pattath-niraj-a49b8a335', '');
      printTermLine('Status   : Open to opportunities 🟢', 'c-green');
      printTermLine('', '');
      break;

    case 'whoami':
      printTermLine('', '');
      printTermLine('aravind-pattath-niraj', 'c-green');
      printTermLine('uid=3(ai-student) gid=1(ieee) groups=1(ieee),42(jain-university)', 'term-out-info');
      printTermLine('', '');
      break;

    case 'ls':
      printTermLine('', '');
      printTermLine('total 5 sections', 'term-out-info');
      printTermLine('drwxr-xr-x  about/', 'c-cyan');
      printTermLine('drwxr-xr-x  skills/', 'c-cyan');
      printTermLine('drwxr-xr-x  projects/', 'c-cyan');
      printTermLine('drwxr-xr-x  achievements/', 'c-cyan');
      printTermLine('drwxr-xr-x  contact/', 'c-cyan');
      printTermLine('', '');
      break;

    case 'cat':
      if (parts[1] === 'resume') {
        printTermLine('', '');
        printTermLine('=== RESUME: Aravind Pattath Niraj ===', 'term-out-system');
        printTermLine('', '');
        printTermLine('OBJECTIVE:', 'term-out-info');
        printTermLine('  B.Tech CSE student specializing in AI & ML, seeking to build', '');
        printTermLine('  intelligent systems that solve real-world problems.', '');
        printTermLine('', '');
        printTermLine('EDUCATION:', 'term-out-info');
        printTermLine('  B.Tech Computer Science Engineering', '');
        printTermLine('  Jain University Kochi | AI & ML Specialization', '');
        printTermLine('', '');
        printTermLine('PROJECTS:', 'term-out-info');
        printTermLine('  • AI Attendance System (Python, OpenCV)', '');
        printTermLine('  • Aze Link – AI Classroom Manager (NLP, Full-Stack)', '');
        printTermLine('  • Face Detection Engine (OpenCV, Haar Cascades)', '');
        printTermLine('  • Airport Management System (SQL)', '');
        printTermLine('', '');
        printTermLine('MEMBERSHIPS:', 'term-out-info');
        printTermLine('  • IEEE – Active Member', '');
        printTermLine('', '');
        printTermLine('CONTACT:', 'term-out-info');
        printTermLine('  pnaravind1@gmail.com', '');
        printTermLine('', '');
      } else {
        printTermLine(`cat: ${parts[1] || '(no file)'}: No such file. Try 'cat resume'`, 'term-out-error');
      }
      break;

    case 'ping':
      printTermLine('', '');
      printTermLine('PING aravind.niraj [ai-systems.local]', 'term-out-info');
      printTermLine('64 bytes: reply time=1ms  TTL=64', '');
      printTermLine('64 bytes: reply time=1ms  TTL=64', '');
      printTermLine('64 bytes: reply time=1ms  TTL=64', '');
      printTermLine('', '');
      printTermLine('aravind.niraj is UP ✔  — Available for opportunities!', 'c-green');
      printTermLine('', '');
      break;

    case 'easter':
      printTermLine('', '');
      printTermLine('🎮  SECRET UNLOCKED!', 'c-yellow');
      printTermLine('', '');
      printTermLine('  ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ', 'c-purple');
      printTermLine('  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗', 'c-purple');
      printTermLine('  ███████║███████║██║     █████╔╝ █████╗  ██║  ██║', 'c-purple');
      printTermLine('  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██║  ██║', 'c-purple');
      printTermLine('  ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██████╔╝', 'c-purple');
      printTermLine('  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ', 'c-purple');
      printTermLine('', '');
      printTermLine('  "The best way to predict the future is to build it."', 'c-yellow');
      printTermLine('                                    – Aravind Niraj', 'c-green');
      printTermLine('', '');
      showXP('+100 XP  EASTER EGG FOUND!');
      break;

    case 'clear':
      document.getElementById('term-output').innerHTML = '';
      break;

    case 'exit':
      toggleTerminal();
      break;

    default:
      printTermLine(`bash: command not found: '${cmd}'`, 'term-out-error');
      printTermLine("Type 'help' to see available commands.", 'term-out-info');
      break;
  }
}

/* ───────────────────────────────────────────────── */
/*  KEYBOARD NAV (Arrow keys on menu)               */
/* ───────────────────────────────────────────────── */

const MENU_ITEMS = ['about', 'skills', 'projects', 'achievements', 'contact'];
let selectedMenu = 0;

document.addEventListener('keydown', e => {
  if (currentSection !== 'start-screen') return;
  if (terminalOpen) return;

  if (e.key === 'ArrowDown') {
    selectedMenu = (selectedMenu + 1) % MENU_ITEMS.length;
    updateMenuHighlight();
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    selectedMenu = (selectedMenu - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
    updateMenuHighlight();
    e.preventDefault();
  } else if (e.key === 'Enter' && currentSection === 'start-screen') {
    navigateTo(MENU_ITEMS[selectedMenu]);
  }
});

function updateMenuHighlight() {
  document.querySelectorAll('.menu-item').forEach((item, i) => {
    if (i === selectedMenu) {
      item.style.color = 'var(--c-yellow)';
      item.style.textShadow = 'var(--glow-y)';
      item.style.paddingLeft = '20px';
      item.style.background = 'rgba(255,230,0,0.05)';
    } else {
      item.style.color = '';
      item.style.textShadow = '';
      item.style.paddingLeft = '';
      item.style.background = '';
    }
  });
}

/* ───────────────────────────────────────────────── */
/*  GLITCH TITLE – random re-trigger                 */
/* ───────────────────────────────────────────────── */

function randomGlitch() {
  const title = document.querySelector('.title-glitch');
  if (!title) return;
  title.style.animation = 'none';
  void title.offsetWidth;
  title.style.animation = '';
  setTimeout(randomGlitch, 4000 + Math.random() * 5000);
}
setTimeout(randomGlitch, 5000);

/* ───────────────────────────────────────────────── */
/*  PIXEL CURSOR TRAIL                               */
/* ───────────────────────────────────────────────── */

document.addEventListener('mousemove', e => {
  if (Math.random() > 0.15) return; // Only 15% of moves

  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed;
    left:${e.clientX}px;
    top:${e.clientY}px;
    width:4px; height:4px;
    background:var(--c-green);
    pointer-events:none;
    z-index:9996;
    box-shadow:0 0 4px var(--c-green);
    transition:opacity 0.5s;
    image-rendering:pixelated;
  `;
  document.body.appendChild(dot);
  requestAnimationFrame(() => { dot.style.opacity = '0'; });
  setTimeout(() => dot.remove(), 550);
});

/* ───────────────────────────────────────────────── */
/*  INIT                                             */
/* ───────────────────────────────────────────────── */

// Ensure start-screen is shown on load  
document.getElementById('start-screen').style.display = 'block';
