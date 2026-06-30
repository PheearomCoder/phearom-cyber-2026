/* ═══════════════════════════════════════════════
   KEY Phearom — SalaCyber Profile
   main.js
   ═══════════════════════════════════════════════ */

'use strict';

// ── NAV SCROLL ──────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV ──────────────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav__links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── TYPEWRITER ──────────────────────────────────────────────────────────────
const taglines = [
  'Cybersecurity @ SalaCyber · RUPP',
  'SalaCyber Web Hacking Essential · Certified',
  'Red Team Leader CCEP · Certified',
  'Ethical Hacker · Cisco Certified',
  'Cyber Threat Intelligence Analyst',
  '#Ph3@R0M · Hack to Learn',
];

let tIdx = 0, cIdx = 0, deleting = false;
const taglineEl = document.getElementById('typedTagline');

function typeWriter() {
  const current = taglines[tIdx];
  if (!deleting) {
    taglineEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
    setTimeout(typeWriter, 55);
  } else {
    taglineEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % taglines.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 28);
  }
}
typeWriter();

// ── TERMINAL ANIMATION ──────────────────────────────────────────────────────
const terminalLines = [
  { cls: 't-prompt', text: '┌──(ph3@r0m㉿kali)-[~/offsec]' },
  { cls: 't-cmd',    text: '└─$ whoami' },
  { cls: 't-val',    text: 'KEY Phearom · #Ph3@R0M' },
  { cls: 't-cmd',    text: '└─$ cat profile.txt' },
  { cls: 't-key',    text: '[+] Name     : KEY Phearom' },
  { cls: 't-key',    text: '[+] School   : RUPP · IT Engineering' },
  { cls: 't-key',    text: '[+] GPA      : 3.60 / 4.00' },
  { cls: 't-key',    text: '[+] Location : Phnom Penh, KH' },
  { cls: 't-cmd',    text: '└─$ ls certs/' },
  { cls: 't-cert',   text: 'SWHE_SC3020487.cert  EthicalHacker_Cisco.cert' },
  { cls: 't-cert',   text: 'CyberThreat_Mgmt.cert  CTI101_arcX.cert' },
  { cls: 't-cert',   text: 'IntroCyber_Cisco.cert  IoT_Cisco.cert' },
  { cls: 't-cmd',    text: '└─$ nmap --skills phearom' },
  { cls: 't-ok',     text: '[✓] WebSec · PenTesting · BurpSuite' },
  { cls: 't-ok',     text: '[✓] Front/Back-End Dev · C/C++' },
  { cls: 't-ok',     text: '[✓] Network Config · IT Support' },
  { cls: 't-dim',    text: '' },
  { cls: 't-prompt', text: '└─$ █' },
];

const termBody = document.getElementById('terminalBody');
let lIdx = 0;

function printTermLine() {
  if (lIdx >= terminalLines.length) return;
  const { cls, text } = terminalLines[lIdx++];
  const p = document.createElement('p');
  p.className = cls;
  termBody.appendChild(p);
  let ci = 0;
  const speed = cls === 't-prompt' || cls === 't-cmd' ? 35 : 12;
  const inter = setInterval(() => {
    p.textContent = text.slice(0, ++ci);
    termBody.scrollTop = termBody.scrollHeight;
    if (ci >= text.length) {
      clearInterval(inter);
      setTimeout(printTermLine, cls === 't-cmd' ? 200 : 80);
    }
  }, speed);
}

// Start terminal after 800ms
setTimeout(printTermLine, 800);

// ── SCROLL FADE-IN ──────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll(
  '.cert, .skill-group, .timeline__item, .stat, .contact__link, .sem, .about__text, .profile-card'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => io.observe(el));

// ── SKILL BARS ──────────────────────────────────────────────────────────────
const barIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar__fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => barIO.observe(g));

// ── GPA BAR ANIMATION ───────────────────────────────────────────────────────
const gpaIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      gpaIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.gpa-bar__fill').forEach(b => {
  b.style.width = '0%';
  gpaIO.observe(b);
});

// ── CONTACT FORM ────────────────────────────────────────────────────────────
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = '[+] Message Sent!';
  btn.style.background = 'var(--green)';
  btn.style.color = 'var(--black)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.color = '';
    form.reset();
  }, 3000);
});

// ── ACTIVE NAV LINK ─────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cyber)' : '';
  });
});

// ── STAGGERED CERT ANIMATION ────────────────────────────────────────────────
document.querySelectorAll('.cert').forEach((cert, i) => {
  cert.style.transitionDelay = `${i * 60}ms`;
});
