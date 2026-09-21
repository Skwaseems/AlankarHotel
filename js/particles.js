/* ====================================================================
   AMBIENT VISUAL EFFECTS
   Lightweight, dependency-free DOM/CSS particles: hero floating dust,
   rising steam wisps, a cursor-following glow, and subtle mouse
   parallax on the hero content. No canvas/WebGL — keeps this cheap
   enough to run smoothly on a phone during a QR-code table visit.
   ==================================================================== */

function spawnHeroParticles() {
    const layer = document.getElementById('heroParticles');
    if (!layer) return;
    const count = window.innerWidth < 600 ? 14 : 26;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'hero-particle';
        const size = 2 + Math.random() * 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (10 + Math.random() * 14) + 's';
        p.style.animationDelay = (Math.random() * -20) + 's';
        p.style.opacity = 0.25 + Math.random() * 0.4;
        layer.appendChild(p);
    }

    const steamCount = window.innerWidth < 600 ? 2 : 4;
    for (let i = 0; i < steamCount; i++) {
        const s = document.createElement('span');
        s.className = 'hero-steam';
        s.style.left = (15 + i * 22 + Math.random() * 8) + '%';
        s.style.animationDelay = (Math.random() * -5) + 's';
        s.style.animationDuration = (4 + Math.random() * 2) + 's';
        layer.appendChild(s);
    }
}

function setupCursorGlow() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    let raf = null;
    document.addEventListener('mousemove', (e) => {
        glow.classList.add('active');
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('active'));
}

function setupHeroParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    if (!hero || !content) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        content.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    });
    hero.addEventListener('mouseleave', () => {
        content.style.transform = 'translate(0, 0)';
    });
}

function setupMagneticButtons() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.hero-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}
