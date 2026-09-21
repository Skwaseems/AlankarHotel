/* ====================================================================
   SEARCH, DIET FILTER, SCROLL REVEAL + SCROLLSPY
   ==================================================================== */

let searchQuery = '';
let dietFilter = 'all';
let revealObserver = null;
let spyObserver = null;

// Rotating search placeholder cycles through real dish names from the
// actual menu data (never fabricated examples).
function pickPlaceholderSamples() {
    const names = menuData.items.map(i => i.name.replace(/\(.*?\)/g, '').split('/')[0].trim());
    const unique = [...new Set(names)].filter(n => n.length > 2 && n.length < 20);
    const picks = [];
    const seen = new Set();
    while (picks.length < 4 && seen.size < unique.length) {
        const idx = Math.floor(Math.random() * unique.length);
        if (!seen.has(idx)) {
            seen.add(idx);
            picks.push(unique[idx]);
        }
    }
    return picks.length ? picks : ['Paneer', 'Biryani', 'Kebabs'];
}

function startPlaceholderTypewriter() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const samples = pickPlaceholderSamples().map(s => `Search ${s}...`);
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        if (document.activeElement === input || input.value) {
            setTimeout(tick, 400);
            return;
        }
        const current = samples[wordIndex];
        if (!deleting) {
            charIndex++;
            input.placeholder = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1400);
                return;
            }
        } else {
            charIndex--;
            input.placeholder = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % samples.length;
            }
        }
        setTimeout(tick, deleting ? 35 : 70);
    }
    tick();
}

function setupScrollObservers() {
    if (revealObserver) revealObserver.disconnect();
    if (spyObserver) spyObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.chip').forEach(chip => {
                    chip.classList.toggle('active', chip.dataset.target === id);
                });
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    document.querySelectorAll('.category-section').forEach(section => {
        revealObserver.observe(section);
        spyObserver.observe(section);
    });

    document.querySelectorAll('.category-strip-card').forEach(card => {
        revealObserver.observe(card);
    });
}

function updateStickyOffset() {
    const nav = document.querySelector('.navbar');
    const quickNav = document.querySelector('.quick-nav');
    const total = (nav ? nav.offsetHeight : 0) + (quickNav ? quickNav.offsetHeight : 0) + 16;
    document.documentElement.style.setProperty('--sticky-offset', total + 'px');
    if (quickNav && nav) {
        quickNav.style.top = nav.offsetHeight + 'px';
    }
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBox = document.getElementById('searchBox');
    const clearBtn = document.getElementById('searchClearBtn');
    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        searchBox.classList.toggle('has-value', e.target.value.length > 0);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchQuery = e.target.value;
            updateCustomerMenu();
        }, 150);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchBox.classList.remove('has-value');
        searchQuery = '';
        updateCustomerMenu();
        searchInput.focus();
    });

    document.querySelectorAll('.diet-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.diet-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dietFilter = btn.dataset.diet;
            updateCustomerMenu();
        });
    });

    startPlaceholderTypewriter();
}
