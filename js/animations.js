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

// ---------- Menu book intro (cinematic page-flip before landing on the menu) ----------
function playMenuBookIntro(onComplete) {
    const overlay = document.getElementById('bookOverlay');
    if (!overlay) { onComplete(); return; }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { onComplete(); return; }

    populateBookPages();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const TOTAL_DURATION = 3600; // ms — matches the CSS cover+page animation-delay/duration chain
    let done = false;

    const finish = () => {
        if (done) return;
        done = true;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        skipBtn.removeEventListener('click', finish);
        onComplete();
    };

    const skipBtn = document.getElementById('bookSkipBtn');
    skipBtn.addEventListener('click', finish);
    setTimeout(finish, TOTAL_DURATION);
}

document.addEventListener('DOMContentLoaded', () => {
    typewriterHeroSubtitle();
});
