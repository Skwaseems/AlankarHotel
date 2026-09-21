/* ====================================================================
   APP BOOTSTRAP
   Wires up navigation, tabs, and all the module setup calls once the
   DOM is ready. This is the only file that assumes the others (menu.js,
   search.js, admin.js, particles.js, animations.js) have already run.
   ==================================================================== */

// ==================== UI NAVIGATION ====================
function switchView(view) {
    const adminPanel = document.getElementById('adminPanel');
    const customerMenu = document.getElementById('customerMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll(`.nav-link[data-view="${view}"]`).forEach(btn => btn.classList.add('active'));
    closeMobileNav();

    if (view === 'admin') {
        adminPanel.classList.add('active');
        customerMenu.classList.remove('active');
        enterAdminPanel();
        replayEnterAnimation(adminPanel);
    } else {
        customerMenu.classList.add('active');
        adminPanel.classList.remove('active');
        replayEnterAnimation(customerMenu);
        updateStickyOffset();
    }
    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
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

function closeMobileNav() {
    const links = document.getElementById('navLinks');
    if (links) links.classList.remove('mobile-open');
}

function scrollToMenu() {
    const target = document.getElementById('categorySection') || document.getElementById('quickNav');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    // Top nav links (customer / admin)
    document.querySelectorAll('.nav-link[data-view]').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Mobile hamburger
    const hamburger = document.getElementById('navHamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.getElementById('navLinks').classList.toggle('mobile-open');
        });
    }

    // Brand click -> scroll to top / customer view
    const brand = document.getElementById('navBrand');
    if (brand) {
        brand.addEventListener('click', () => {
            if (!document.getElementById('customerMenu').classList.contains('active')) {
                switchView('customer');
            } else {
                scrollToTop();
            }
        });
    }

    // Hero CTA
    const heroCta = document.getElementById('heroCta');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            playMenuBookIntro(() => scrollToMenu());
        });
    }

    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Edit item modal
    const editModal = document.getElementById('editItemModal');
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target.id === 'editItemModal') closeEditModal();
        });
    }

    // Quick view modal
    const quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target.id === 'quickViewModal') closeQuickView();
        });
    }

    setupAdminLoginForm();
    setupSearchAndFilters();

    // Scroll-to-top FAB
    const fabTop = document.getElementById('fabTop');
    if (fabTop) fabTop.addEventListener('click', scrollToTop);

    window.addEventListener('resize', () => updateStickyOffset());

    // Initial render
    initRestaurantForm();
    displayMenuItems();
    updateCustomerMenu();
    updateStickyOffset();

    // Direct QR-code link support (?menu=view)
    const params = new URLSearchParams(window.location.search);
    if (params.has('menu') && params.get('menu') === 'view') {
        switchView('customer');
    }
});
