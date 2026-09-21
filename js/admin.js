/* ====================================================================
   ADMIN: AUTH, ITEM CRUD, RESTAURANT SETTINGS, QR CODE
   ==================================================================== */

// ---------- Authentication ----------
// Default password is "alankar123" (its SHA-256 hash is stored below, never the
// plaintext). Change it immediately from Restaurant Settings > Admin Password.
// NOTE: this is a client-side-only check (no server), so it deters casual visitors
// from opening the Admin Panel but is not strong protection against a determined,
// technically capable person — see the note shown in the Admin Password panel.
const DEFAULT_ADMIN_PASSWORD_HASH = '2f249f0e44b71b6c938ac6aebe9c925a8d45e16fa851c72aa7ac802ba0d79703';

async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getStoredAdminPasswordHash() {
    // Try Firebase first
    if (typeof loadAdminPasswordFromFirebase === 'function' && firebaseReady) {
        try {
            const fbPassword = await loadAdminPasswordFromFirebase();
            if (fbPassword) {
                localStorage.setItem('adminPasswordHash', fbPassword);
                return fbPassword;
            }
        } catch (err) {
            console.warn('Firebase password load failed:', err);
        }
    }

    // Fallback to localStorage
    return localStorage.getItem('adminPasswordHash') || DEFAULT_ADMIN_PASSWORD_HASH;
}

function isAdminAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

function showAdminLogin() {
    document.getElementById('adminLoginScreen').classList.add('active');
    document.getElementById('adminDashboard').classList.remove('active');
    document.getElementById('logoutBtn').classList.remove('show');
    setTimeout(() => {
        const input = document.getElementById('adminPasswordInput');
        if (input) input.focus();
    }, 150);
}

function showAdminDashboard() {
    document.getElementById('adminLoginScreen').classList.remove('active');
    document.getElementById('adminDashboard').classList.add('active');
    document.getElementById('logoutBtn').classList.add('show');
    replayEnterAnimation(document.getElementById('adminDashboard'));
    initRestaurantForm();
}

function enterAdminPanel() {
    if (isAdminAuthenticated()) {
        showAdminDashboard();
    } else {
        showAdminLogin();
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('adminAuthenticated');
    document.getElementById('adminPasswordInput').value = '';
    showAdminLogin();
    toast('Logged out of Admin Panel');
}

function changeAdminPassword() {
    const newPassword = document.getElementById('newAdminPassword').value;
    const confirmPassword = document.getElementById('confirmAdminPassword').value;

    if (newPassword.length < 6) {
        toast('New password must be at least 6 characters', 'error');
        return;
    }
    if (newPassword !== confirmPassword) {
        toast('Passwords do not match', 'error');
        return;
    }

    sha256Hex(newPassword).then(async hash => {
        localStorage.setItem('adminPasswordHash', hash);

        // Also save to Firebase
        if (typeof saveAdminPasswordToFirebase === 'function') {
            try {
                await saveAdminPasswordToFirebase(hash);
            } catch (err) {
                console.warn('Firebase password save failed:', err);
            }
        }

        document.getElementById('newAdminPassword').value = '';
        document.getElementById('confirmAdminPassword').value = '';
        showMessage('passwordMessage', 'Admin password updated successfully! ✓');
        toast('Admin password updated on all phones. Use it next time you log in.');
    });
}

function setupAdminLoginForm() {
    document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('adminPasswordInput');
        const errorEl = document.getElementById('loginError');
        const password = input.value;

        sha256Hex(password).then(async hash => {
            const storedHash = await getStoredAdminPasswordHash();
            if (hash === storedHash) {
                sessionStorage.setItem('adminAuthenticated', 'true');
                input.value = '';
                errorEl.classList.remove('show');
                showAdminDashboard();
                toast('Welcome back!');
            } else {
                errorEl.classList.remove('show');
                void errorEl.offsetWidth;
                errorEl.classList.add('show');
                input.value = '';
                input.focus();
            }
        });
    });

    document.getElementById('adminLoginScreen').addEventListener('click', () => {});
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeEditModal();
            closeQuickView();
        }
    });
}

// ---------- Restaurant Settings ----------
function initRestaurantForm() {
    document.getElementById('restaurantName').value = menuData.restaurant.name;
    document.getElementById('contactPhone').value = menuData.restaurant.phone;
    document.getElementById('restaurantTimings').value = menuData.restaurant.timings;
    document.getElementById('restaurantAddress').value = menuData.restaurant.address;
}

function saveRestaurantSettings() {
    const name = document.getElementById('restaurantName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const timings = document.getElementById('restaurantTimings').value.trim();

    if (!name || !phone) {
        toast('Restaurant Name and Phone Number are required', 'error');
        return;
    }

    menuData.restaurant.name = name;
    menuData.restaurant.phone = phone;
    menuData.restaurant.timings = timings;
    menuData.restaurant.address = document.getElementById('restaurantAddress').value.trim();

    saveData(menuData);
    updateCustomerMenu();
    showMessage('settingsMessage', 'Restaurant settings saved successfully! ✓');
    toast('Restaurant settings saved successfully!');
}

function resetSettingsForm() {
    initRestaurantForm();
}

// ---------- Menu Item CRUD ----------
function addMenuItem() {
    const category = document.getElementById('itemCategory').value.trim();
    const name = document.getElementById('itemName').value.trim();
    const rate = document.getElementById('itemRate').value.trim();
    const description = document.getElementById('itemDescription').value.trim();

    if (!category || !name || !rate) {
        toast('Please fill in Category, Item Name, and Rate', 'error');
        return;
    }

    const item = { id: Date.now(), category, name, rate, description };
    menuData.items.push(item);
    saveData(menuData);
    resetMenuForm();
    displayMenuItems();
    updateCustomerMenu();
    showMessage('itemMessage', 'Menu item added successfully! ✓');
    toast(`"${name}" added to the menu!`);
    generateQRCode();
}

function deleteMenuItem(id) {
    const item = menuData.items.find(i => i.id === id);
    if (!item) return;
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        menuData.items = menuData.items.filter(i => i.id !== id);
        saveData(menuData);
        displayMenuItems();
        updateCustomerMenu();
        toast(`"${item.name}" deleted`);
        generateQRCode();
    }
}

function resetMenuForm() {
    document.getElementById('itemCategory').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemRate').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('itemCategory').focus();
}

// ---------- Edit Item Modal (rate editing) ----------
function openEditModal(id) {
    const item = menuData.items.find(i => i.id === id);
    if (!item) {
        toast('Item not found', 'error');
        return;
    }
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemCategory').value = item.category;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemRate').value = item.rate;
    document.getElementById('editItemDescription').value = item.description || '';

    document.getElementById('editItemModal').classList.add('active');
    setTimeout(() => document.getElementById('editItemRate').focus(), 200);
}

function closeEditModal() {
    const modal = document.getElementById('editItemModal');
    if (modal) modal.classList.remove('active');
}

function saveEditedItem() {
    const id = Number(document.getElementById('editItemId').value);
    const category = document.getElementById('editItemCategory').value.trim();
    const name = document.getElementById('editItemName').value.trim();
    const rate = document.getElementById('editItemRate').value.trim();
    const description = document.getElementById('editItemDescription').value.trim();

    if (!category || !name || !rate) {
        toast('Please fill in Category, Item Name, and Rate', 'error');
        return;
    }

    const item = menuData.items.find(i => i.id === id);
    if (!item) {
        toast('Item not found', 'error');
        return;
    }

    item.category = category;
    item.name = name;
    item.rate = rate;
    item.description = description;

    saveData(menuData);
    closeEditModal();
    displayMenuItems();
    updateCustomerMenu();
    toast(`"${name}" updated successfully!`);
}

// ---------- QR Code ----------
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    if (!qrContainer) return;
    qrContainer.innerHTML = '';

    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const menuUrl = baseUrl + '?menu=view';
    document.getElementById('menuLink').textContent = menuUrl;

    if (typeof QRCode === 'undefined') {
        qrContainer.innerHTML = '<div class="qr-error">⚠️ QR code library failed to load (check your internet connection), but the link above still works — you can copy or share it directly.</div>';
        document.getElementById('downloadQrBtn').disabled = true;
        return;
    }

    document.getElementById('downloadQrBtn').disabled = false;
    new QRCode(qrContainer, {
        text: menuUrl,
        width: 200,
        height: 200,
        colorDark: '#0e0e0e',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function copyToClipboard() {
    const url = document.getElementById('menuLink').textContent;
    if (!navigator.clipboard) {
        toast('Clipboard not available in this browser', 'error');
        return;
    }
    navigator.clipboard.writeText(url).then(() => {
        toast('Menu link copied to clipboard!');
    }).catch(() => {
        toast('Could not copy link', 'error');
    });
}

function downloadQRCode() {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) {
        toast('QR code is not available to download', 'error');
        return;
    }
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = menuData.restaurant.name + '_QRCode.png';
    link.click();
}
