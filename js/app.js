/* ====================================================================
   APP BOOTSTRAP
   Screens (home / menu book), bottom navigation, bottom sheets,
   page-turn gestures and the customer <-> admin view switch.
   ==================================================================== */

let currentScreen = 'home';
let screenTimer = null;
let openSheetId = null;

// ==================== VIEW SWITCH (customer / admin) ====================
function switchView(view) {
    const adminPanel = document.getElementById('adminPanel');
    const customerMenu = document.getElementById('customerMenu');
    closeSheets();

    if (view === 'admin') {
        adminPanel.classList.add('active');
        customerMenu.classList.remove('active');
        enterAdminPanel();
        replayEnterAnimation(adminPanel);
    } else {
        customerMenu.classList.add('active');
        adminPanel.classList.remove('active');
        replayEnterAnimation(customerMenu);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const tabEl = document.getElementById(tabName + 'Tab');
    tabEl.classList.add('active');
    document.querySelectorAll(`.tab-btn[data-tab="${tabName}"]`).forEach(btn => btn.classList.add('active'));
    replayEnterAnimation(tabEl);

    if (tabName === 'qrcode') {
        setTimeout(() => generateQRCode(), 100);
    }
}

// ==================== SCREENS ====================
function setScreen(name) {
    if (name === currentScreen) { syncBottomNav(); return; }
    const from = document.getElementById(currentScreen === 'home' ? 'screenHome' : 'screenMenu');
    const to = document.getElementById(name === 'home' ? 'screenHome' : 'screenMenu');
    const goingForward = name === 'menu';
    currentScreen = name;

    clearTimeout(screenTimer);
    from.classList.remove('entering-fwd', 'entering-back');
    from.classList.add('leaving');
    screenTimer = setTimeout(() => {
        from.classList.remove('active', 'leaving');
        to.classList.add('active', goingForward ? 'entering-fwd' : 'entering-back');
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, REDUCED_MOTION.matches ? 0 : 200);

    syncBottomNav();
}

function syncBottomNav() {
    const active = openSheetId ? { sheetCategories: 'categories', sheetSearch: 'search', sheetCall: 'call' }[openSheetId] : currentScreen;
    const items = document.querySelectorAll('.bn-item');
    items.forEach(btn => btn.classList.toggle('active', btn.dataset.nav === active));
    document.getElementById('bottomNav').dataset.active = active;
}

// ==================== SHEETS ====================
function openSheet(id) {
    if (openSheetId === id) return;
    if (openSheetId) document.getElementById(openSheetId).classList.remove('open');
    openSheetId = id;
    document.getElementById('sheetOverlay').classList.add('open');
    document.getElementById(id).classList.add('open');
    document.body.classList.add('sheet-open');
    syncBottomNav();
    if (id === 'sheetSearch') {
        renderSearchResults();
        setTimeout(() => document.getElementById('searchInput').focus({ preventScroll: true }), 350);
    }
}

function closeSheets() {
    if (!openSheetId) return;
    document.getElementById(openSheetId).classList.remove('open');
    document.getElementById('sheetOverlay').classList.remove('open');
    document.body.classList.remove('sheet-open');
    openSheetId = null;
    syncBottomNav();
}

function onBottomNav(target) {
    if (target === 'home') { closeSheets(); setScreen('home'); }
    else if (target === 'menu') { closeSheets(); setScreen('menu'); }
    else if (target === 'categories') openSheet('sheetCategories');
    else if (target === 'search') openSheet('sheetSearch');
    else if (target === 'call') openSheet('sheetCall');
}

// ==================== PAGE-TURN GESTURES ====================
function setupPageGestures() {
    const stage = document.getElementById('leafStage');
    let startX = 0, startY = 0, tracking = false;

    stage.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        tracking = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) stepPage(dx < 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (currentScreen !== 'menu' || openSheetId || !document.getElementById('customerMenu').classList.contains('active')) return;
        if (document.getElementById('quickViewModal').classList.contains('active')) return;
        if (e.key === 'ArrowRight') stepPage(1);
        if (e.key === 'ArrowLeft') stepPage(-1);
    });

    document.getElementById('pagerPrev').addEventListener('click', () => stepPage(-1));
    document.getElementById('pagerNext').addEventListener('click', () => stepPage(1));
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    document.querySelectorAll('.bn-item').forEach(btn => {
        btn.addEventListener('click', () => onBottomNav(btn.dataset.nav));
    });

    document.getElementById('sheetOverlay').addEventListener('click', closeSheets);
    document.querySelectorAll('[data-close-sheet]').forEach(btn => btn.addEventListener('click', closeSheets));

    document.getElementById('heroCta').addEventListener('click', () => {
        playMenuBookIntro(() => setScreen('menu'));
    });

    document.getElementById('staffLink').addEventListener('click', () => switchView('admin'));

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    ['editItemModal', 'quickViewModal'].forEach(id => {
        const modal = document.getElementById(id);
        modal.addEventListener('click', (e) => {
            if (e.target.id !== id) return;
            if (id === 'editItemModal') closeEditModal(); else closeQuickView();
        });
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheets(); });

    setupAdminLoginForm();
    setupSearchAndFilters();
    setupPageGestures();

    initRestaurantForm();
    displayMenuItems();
    updateCustomerMenu();
    syncBottomNav();

    // Direct QR-code link support (?menu=view)
    const params = new URLSearchParams(window.location.search);
    if (params.get('menu') === 'view') switchView('customer');
});
