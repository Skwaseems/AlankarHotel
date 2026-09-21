/* ====================================================================
   MOTION SYSTEM: navbar behavior, hero typewriter, toasts, GSAP hooks
   Everything here degrades gracefully — if the GSAP CDN is blocked,
   the site still works via the plain CSS/IntersectionObserver reveal
   already wired in search.js.
   ==================================================================== */

// ---------- Toasts ----------
function toast(message, type) {
    type = type || 'success';
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.innerHTML = `<span>${type === 'error' ? '⚠️' : '✓'}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 400);
    }, 3200);
}

function showMessage(elementId, message) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

function replayEnterAnimation(el) {
    if (!el) return;
    el.classList.remove('view-enter');
    void el.offsetWidth;
    el.classList.add('view-enter');
}

// ---------- Hero typewriter subtitle ----------
function typewriterHeroSubtitle() {
    const el = document.getElementById('heroSubtitle');
    if (!el) return;
    const phrases = [
        'Authentic Flavors, Cooked With Tradition',
        'A Menu Crafted For Every Craving',
        'Fine Dining, Table-Side Simplicity'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typed-cursor';
    el.innerHTML = '';
    el.appendChild(textSpan);
    el.appendChild(cursorSpan);

    function tick() {
        const current = phrases[phraseIndex];
        if (!deleting) {
            charIndex++;
            textSpan.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            charIndex--;
            textSpan.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        setTimeout(tick, deleting ? 30 : 55);
    }
    tick();
}

// ---------- Navbar scroll behavior ----------
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastY = window.scrollY;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('shrink', y > 60);

        if (y > lastY && y > 140) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastY = y;

        const fabTop = document.getElementById('fabTop');
        if (fabTop) fabTop.classList.toggle('show', y > 400);
    }, { passive: true });
}

// ---------- Optional GSAP enhancement layer ----------
function setupGsapEnhancements() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    gsap.timeline()
        .from('.hero-icon', { y: -20, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' });

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.category-strip-card').forEach((card, i) => {
            gsap.fromTo(card, { y: 30, opacity: 0.001 }, {
                y: 0, opacity: 1, duration: 0.6, delay: (i % 6) * 0.05, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 92%', once: true }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    spawnHeroParticles();
    setupCursorGlow();
    setupHeroParallax();
    setupMagneticButtons();
    setupNavbarScroll();
    typewriterHeroSubtitle();
    setupGsapEnhancements();
});
