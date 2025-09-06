const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => Array.from(ctx.querySelectorAll(q));

// Current year
$('#year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = $('.menu-btn');
const navLinks = $('#navLinks');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks.classList.toggle('hide');
});
// Start hidden on small screens
const mq = window.matchMedia('(max-width: 720px)');
const setMenuVisibility = () => {
  if (mq.matches) navLinks.classList.add('hide'); else navLinks.classList.remove('hide');
};
mq.addEventListener('change', setMenuVisibility);
setMenuVisibility();

// Active link on scroll
const sections = $$('section, header.hero');
const navA = $$('.nav-links a');
const setActive = () => {
  let idx = 0; let minDist = Infinity;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    const dist = Math.abs(rect.top - 120);
    if (dist < minDist) { minDist = dist; idx = i; }
  });
  navA.forEach(a => a.classList.remove('active'));
  const id = sections[idx].id || 'home';
  const current = $(`.nav-links a[href="#${id}"]`);
  if (current) current.classList.add('active');
};
document.addEventListener('scroll', setActive, { passive: true });
setActive();

// Intersection fade-in
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
$$('.fade-in').forEach(el => io.observe(el));

// Animate skill bars when visible
const bars = $$('.bar > span');
const barObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.style.width = e.target.style.getPropertyValue('--w') || '80%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b=>barObs.observe(b));

// Theme toggle with localStorage
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Contact form validation (mock)
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();
  const status = $('#formStatus');
  if (!name || !email || !message) {
    status.textContent = 'Please fill all the fields.';
    return;
  }
  // Very basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    return;
  }
  status.textContent = 'Thanks! Your message has been queued. I will get back soon.';
  (e.target).reset();
});
const menubtn = document.querySelector(".menu-btn");
const navlinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Toggle icon between bars and X
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});
