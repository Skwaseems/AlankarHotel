/* ====================================================================
   MENU DATA + RENDERING
   Holds the menu data model and everything that turns it into DOM:
   customer menu cards, admin item cards, and the quick-view modal.
   ==================================================================== */

const DEFAULT_DATA = {
    restaurant: {
        name: 'Alankar Restaurant',
        phone: '9404790786, 8793552786, 9420655881',
        timings: '09:00 AM - 11:30 AM (Breakfast) | 11:30 AM Onwards (Lunch/Dinner)',
        address: ''
    },
    categories: {},
    items: [
        // ---------- Breakfast ----------
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Pav', rate: '05', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Tea', rate: '20', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Coffee', rate: '30', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Poha', rate: '50', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Fried Egg (Single / Double) +2 Pav', rate: '50/80', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Egg Omelet (Single / Double) +2 Pav', rate: '50/100', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Masala Omelet (Single / Double) +2 Pav', rate: '50/100', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Egg Bhurji (Single / Double) +2 Pav', rate: '65/120', description: '' },
        { category: 'Breakfast (9.00 AM to 11.30 AM)', name: 'Boiled Egg', rate: '15', description: '' },

        // ---------- Veg Biryani & Rice ----------
        { category: 'Veg Biryani & Rice', name: 'Egg Biryani / Pulao', rate: '200', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Veg Biryani / Pulao', rate: '200', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Veg Kolhapuri Rice', rate: '180', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Mushroom Biryani', rate: '250', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Paneer Biryani', rate: '250', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Steam Rice', rate: '100', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Jeera Rice', rate: '120', description: '' },
        { category: 'Veg Biryani & Rice', name: 'Moghlai Basmati Rice', rate: '130', description: '' },

        // ---------- Moghlai (Chicken/Mutton) ----------
        { category: 'Moghlai (Chicken/Mutton)', name: 'Alankar Spl. Chicken/Mutton', rate: '400/450', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton (Handi)', rate: '600/700', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Kheema Plain', rate: '280', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Kheema Ghotala', rate: '325', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Kheema Fry', rate: '300', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Butter Chicken', rate: '320', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Masala', rate: '300/350', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Moghlai', rate: '300/350', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Kurma', rate: '300/350', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Dal Gosh', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Lasooni', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Lahori', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Peshawari', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Kolhapuri', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Khadai', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Shahi', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Hyderabadi', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Angara', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Handi (Small)', rate: '320/370', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Tawa Fry', rate: '340/400', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Tikka Masala', rate: '350/400', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken / Mutton Sukha', rate: '400/450', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Chicken Liver Fry', rate: '300', description: '' },
        { category: 'Moghlai (Chicken/Mutton)', name: 'Egg Masala', rate: '180', description: '' },

        // ---------- Pulaos & Biryani ----------
        { category: 'Pulaos & Biryani', name: 'Chicken / Mutton Biryani (Dum)', rate: '200/300', description: '' },
        { category: 'Pulaos & Biryani', name: 'Chicken Boneless Biryani', rate: '280', description: '' },
        { category: 'Pulaos & Biryani', name: 'Chicken Tikka Biryani', rate: '200', description: '' },
        { category: 'Pulaos & Biryani', name: 'Chicken Pulao', rate: '200', description: '' },
        { category: 'Pulaos & Biryani', name: 'Kheema Pulao', rate: '300', description: '' },
        { category: 'Pulaos & Biryani', name: 'Mutton Pulao', rate: '300', description: '' },
        { category: 'Pulaos & Biryani', name: 'Zam Zam Pulao', rate: '400', description: '' },
        { category: 'Pulaos & Biryani', name: 'Chicken / Mutton Hydrabadi Biryani', rate: '450/550', description: '' },

        // ---------- Punjabi (Veg) ----------
        { category: 'Punjabi (Veg)', name: 'Aloo Gobi', rate: '200', description: '' },
        { category: 'Punjabi (Veg)', name: 'Dum Aloo', rate: '200', description: '' },
        { category: 'Punjabi (Veg)', name: 'Channa Masala', rate: '220', description: '' },
        { category: 'Punjabi (Veg)', name: 'Aloo Mutter', rate: '220', description: '' },
        { category: 'Punjabi (Veg)', name: 'Mixed Vegetable', rate: '220', description: '' },
        { category: 'Punjabi (Veg)', name: 'Veg. Kolhapuri', rate: '250', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Mutter', rate: '250', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Kurma', rate: '250', description: '' },
        { category: 'Punjabi (Veg)', name: 'Spl. Veg Khadai', rate: '270', description: '' },
        { category: 'Punjabi (Veg)', name: 'Spl. Veg Handi (Small)', rate: '270', description: '' },
        { category: 'Punjabi (Veg)', name: 'Spl. Veg Hyderabadi', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Makhanwala', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Lazeez Paneer', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Achari', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Lasooni', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Kolhapuri', rate: '270', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Angara', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Bhurji', rate: '270', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Tikka Masala', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Tawa Fry', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Butter Masala', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Khadai', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Spl. Mushroom Masala', rate: '300', description: '' },
        { category: 'Punjabi (Veg)', name: 'Paneer Mushroom Masala', rate: '350', description: '' },
        { category: 'Punjabi (Veg)', name: 'Spl. Veg Handi (Big)', rate: '500', description: '' },

        // ---------- Dal ----------
        { category: 'Dal', name: 'Plain Dal', rate: '100', description: '' },
        { category: 'Dal', name: 'Dal Fry / Tadka', rate: '110/120/130', description: '' },
        { category: 'Dal', name: 'Dal Khichadi / Tadka', rate: '170/200', description: '' },

        // ---------- Roti 'N' Paratha ----------
        { category: "Roti 'N' Paratha", name: 'Tandoori Roti (Butter)', rate: '20/25', description: '' },
        { category: "Roti 'N' Paratha", name: 'Naan / Butter Naan', rate: '40/45', description: '' },
        { category: "Roti 'N' Paratha", name: 'Garlic Naan / Butter', rate: '70/80', description: '' },
        { category: "Roti 'N' Paratha", name: 'Cheese Naan / Butter', rate: '70/80', description: '' },
        { category: "Roti 'N' Paratha", name: 'Laccha Paratha / Butter Laccha Paratha', rate: '70/80', description: '' },
        { category: "Roti 'N' Paratha", name: 'Kulcha / Onion / Methi / Cheese', rate: '70/80', description: '' },

        // ---------- Salad 'N' More ----------
        { category: "Salad 'N' More", name: 'Basket of Roti (Butter Roti, Butter Nan, Garlic Nan, Butter Kulcha, Butter Paratha)', rate: '300', description: '' },
        { category: "Salad 'N' More", name: 'Papad Roasted / Fried Masala', rate: '20/30/50', description: '' },
        { category: "Salad 'N' More", name: 'Dahi', rate: '50', description: '' },
        { category: "Salad 'N' More", name: 'Boondi Raita / Veg Raita', rate: '100', description: '' },
        { category: "Salad 'N' More", name: 'Green Salad', rate: '100', description: '' },

        // ---------- Chinese Rice ----------
        { category: 'Chinese Rice', name: 'Egg. Fried Rice', rate: '180', description: '' },
        { category: 'Chinese Rice', name: 'Egg. Schezwan Rice', rate: '190', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Fried Rice', rate: '160/180', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Schezwan Fried Rice', rate: '170/190', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Shanghai Fried Rice', rate: '180/200', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Hongkong Fried Rice', rate: '180/200', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Combination Rice', rate: '180/200', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Triple Schezwan Rice', rate: '220/250', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Mushroom Fried Rice', rate: '200/220', description: '' },
        { category: 'Chinese Rice', name: 'Veg. / Chicken Manchurian Fried Rice', rate: '220/250', description: '' },
        { category: 'Chinese Rice', name: 'Veg. Paneer Fried Rice', rate: '250', description: '' },
        { category: 'Chinese Rice', name: 'Paneer Schezwan Rice', rate: '270', description: '' },

        // ---------- Soups ----------
        { category: 'Soups', name: 'Cream of Tomato Soup', rate: '150', description: '' },
        { category: 'Soups', name: 'Cream of Mushroom Soup', rate: '150', description: '' },
        { category: 'Soups', name: "Veg. / Chicken Clear Soup", rate: '100/120', description: '' },
        { category: 'Soups', name: "Veg. / Chicken Hot 'N' Sour Soup", rate: '100/120', description: '' },
        { category: 'Soups', name: 'Veg. / Chicken Manchow Soup', rate: '100/120', description: '' },
        { category: 'Soups', name: 'Veg. / Chicken Sweet Corn Soup', rate: '100/120', description: '' },
        { category: 'Soups', name: 'Veg. / Chicken Manderian Soup', rate: '100/120', description: '' },
        { category: 'Soups', name: 'Veg. / Chicken Noodle Soup', rate: '120/150', description: '' },

        // ---------- Noodles ----------
        { category: 'Noodles', name: 'Veg. / Chicken Hakka Noodles', rate: '170/200', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Schezwan Noodles', rate: '180/200', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Hongkong Noodles', rate: '200/250', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Singapore Noodles', rate: '200/250', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Chowmein Noodles', rate: '200/250', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Manchurian Noodles', rate: '200/250', description: '' },
        { category: 'Noodles', name: 'Veg. / Chicken Tripple Schezwan Noodles', rate: '220/300', description: '' },

        // ---------- Cool Drinks ----------
        { category: 'Cool Drinks', name: 'Mineral Water', rate: '25', description: '' },
        { category: 'Cool Drinks', name: 'Soft Drink', rate: '25/50', description: '' },
        { category: 'Cool Drinks', name: 'Sweets', rate: 'As Per Serving', description: '' },

        // ---------- Starters ----------
        { category: 'Starters', name: 'Veg Lolly Pop (8 Pcs.)', rate: '180', description: '' },
        { category: 'Starters', name: 'Chicken Lolly Pop (6 Pcs.)', rate: '220', description: '' },
        { category: 'Starters', name: 'Chicken Lolly Pop (Dry / Gravy)', rate: '300', description: '' },
        { category: 'Starters', name: 'Chicken Tandoori (Half / Full)', rate: '350/600', description: '' },
        { category: 'Starters', name: 'Chicken Tandoori Schezwan (Half / Full)', rate: '400/650', description: '' },
        { category: 'Starters', name: 'Potato Chips French Fries', rate: '120', description: '' },
        { category: 'Starters', name: 'Veg. / Chicken Chinese Bhel', rate: '170/200', description: '' },
        { category: 'Starters', name: 'Veg. / Chicken Crispy', rate: '200/250', description: '' },
        { category: 'Starters', name: 'Paneer Crispy', rate: '300', description: '' },

        // ---------- Kebabs ----------
        { category: 'Kebabs', name: 'Chicken Phadi Kabab (6 Pcs.)', rate: '250', description: '' },
        { category: 'Kebabs', name: 'Chicken Kali Miri (6 Pcs.)', rate: '250', description: '' },
        { category: 'Kebabs', name: 'Chicken Afgani Kebab', rate: '250', description: '' },
        { category: 'Kebabs', name: 'Chicken Banjara Kebab', rate: '250', description: '' },
        { category: 'Kebabs', name: 'Chicken Tikka (6 Pcs.)', rate: '250', description: '' },
        { category: 'Kebabs', name: 'Chicken Platter (15 Pcs.)', rate: '700', description: '' },

        // ---------- Appetizers ----------
        { category: 'Appetizers', name: 'Veg. / Chicken Garlic Sauce', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Ginger Sauce', rate: '200/250', description: '' },
        { category: 'Appetizers', name: "Veg. / Chicken Sweet 'N' Sour Sauce", rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Singapore', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Manchurian', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Mushroom', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Chicken 65', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Chilly', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg. / Chicken Chilly Gravy', rate: '200/250', description: '' },
        { category: 'Appetizers', name: 'Veg Babycorn Chilly', rate: '250', description: '' },
        { category: 'Appetizers', name: 'Mushroom Chilly', rate: '250', description: '' },
        { category: 'Appetizers', name: 'Paneer Manchurian', rate: '250', description: '' },
        { category: 'Appetizers', name: 'Paneer Shezwan', rate: '250', description: '' },
        { category: 'Appetizers', name: 'Paneer Hongkong', rate: '250', description: '' },
        { category: 'Appetizers', name: 'Paneer 65', rate: '250', description: '' },

        // ---------- Chop Sueys ----------
        { category: 'Chop Sueys', name: 'Veg. / Chicken Chinese Chop Suey', rate: '150/170', description: '' },
        { category: 'Chop Sueys', name: 'Veg. / Chicken American Chop Suey', rate: '180/220', description: '' },
        { category: 'Chop Sueys', name: 'Veg. / Chicken Chowmein Chop Suey', rate: '180/200', description: '' },
        { category: 'Chop Sueys', name: 'Veg. / Chicken Manchurian Chop Suey', rate: '180/200', description: '' },
        { category: 'Chop Sueys', name: 'Veg. / Chicken Mixed Chop Suey', rate: '180/200', description: '' }
    ].map((item, idx) => ({ id: idx + 1, ...item }))
};

function loadData() {
    const stored = localStorage.getItem('menuData');
    if (stored) return JSON.parse(stored);
    return DEFAULT_DATA;
}

function saveData(data) {
    localStorage.setItem('menuData', JSON.stringify(data));

    // Also save to Firebase (async, non-blocking)
    if (typeof saveDataToFirebase === 'function') {
        saveDataToFirebase(data).catch(err => console.warn('Firebase save failed:', err));
    }
}

let menuData = loadData();

// Sync with Firebase on page ready (pull latest data)
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof loadDataFromFirebase === 'function' && firebaseReady) {
        try {
            const fbData = await loadDataFromFirebase();
            if (fbData && JSON.stringify(fbData) !== JSON.stringify(menuData)) {
                menuData = fbData;
                localStorage.setItem('menuData', JSON.stringify(fbData));
                if (typeof updateCustomerMenu === 'function') {
                    updateCustomerMenu(true);
                }
            }
        } catch (err) {
            console.warn('Firebase sync failed:', err);
        }
    }
});

// ==================== DIET & CATEGORY HELPERS ====================
const CATEGORY_ICONS = [
    [/breakfast/i, '🍳'],
    [/biryani|pulao|rice/i, '🍚'],
    [/moghlai|chicken|mutton/i, '🍗'],
    [/dal/i, '🥘'],
    [/roti|paratha/i, '🫓'],
    [/salad/i, '🥗'],
    [/chinese/i, '🥡'],
    [/soup/i, '🍲'],
    [/noodle/i, '🍜'],
    [/drink/i, '🥤'],
    [/starter/i, '🍢'],
    [/kebab/i, '🍖'],
    [/appetizer/i, '🧆'],
    [/chop suey/i, '🥡']
];

function getCategoryIcon(category) {
    for (const [pattern, icon] of CATEGORY_ICONS) {
        if (pattern.test(category)) return icon;
    }
    return '🍽️';
}

function classifyDiet(name) {
    const hasNonVeg = /chicken|mutton|egg|kheema|liver|fish|prawn|meat/i.test(name);
    const hasVegWord = /\bveg\.?\b/i.test(name);
    if (hasNonVeg && hasVegWord) return 'both';
    if (hasNonVeg) return 'nonveg';
    return 'veg';
}

function dietMarkup(name) {
    const diet = classifyDiet(name);
    if (diet === 'both') {
        return '<span class="diet-marks"><span class="diet-mark veg"></span><span class="diet-mark nonveg"></span></span>';
    }
    return `<span class="diet-marks"><span class="diet-mark ${diet}"></span></span>`;
}

function slugify(text) {
    return 'cat-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function highlightMatch(text, query) {
    const safe = escapeHtml(text);
    if (!query || !query.trim()) return safe;
    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('(' + escapedQuery + ')', 'ig');
    return safe.replace(re, '<mark class="search-hit">$1</mark>');
}

// ==================== ADMIN ITEM LIST ====================
function refreshCategoryDatalist() {
    const list = document.getElementById('categoryList');
    if (!list) return;
    const categories = [...new Set(menuData.items.map(item => item.category))].sort();
    list.innerHTML = categories.map(c => `<option value="${escapeHtml(c)}">`).join('');
}

function displayMenuItems() {
    const container = document.getElementById('menuItemsList');
    const countBadge = document.getElementById('adminItemCount');
    if (countBadge) {
        countBadge.textContent = `${menuData.items.length} item${menuData.items.length === 1 ? '' : 's'}`;
    }

    if (menuData.items.length === 0) {
        container.innerHTML = '<div class="empty-message">No menu items added yet. Add one to get started!</div>';
        refreshCategoryDatalist();
        return;
    }

    container.innerHTML = menuData.items.map(item => `
        <div class="menu-item-card">
            <div class="item-category">${escapeHtml(item.category)}</div>
            <div class="item-name">${dietMarkup(item.name)} ${escapeHtml(item.name)}</div>
            <div class="item-rate">₹ ${escapeHtml(item.rate)}</div>
            ${item.description ? `<div class="item-description">${escapeHtml(item.description)}</div>` : ''}
            <div class="item-actions">
                <button class="btn btn-outline btn-small" onclick="openEditModal(${item.id})">✏️ Edit Rate</button>
                <button class="btn btn-danger btn-small" onclick="deleteMenuItem(${item.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');

    refreshCategoryDatalist();
}

// ==================== CUSTOMER MENU: PAGES ====================
// Each category is one "page" of the menu book. The diet filter (All / Veg /
// Non-Veg) decides which items — and therefore which pages — exist.
let currentCategory = null;
let leafFlipping = false;

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

function splitCategory(category) {
    const m = category.match(/^(.*?)\s*(\(.*\))\s*$/);
    return m && m[1] ? { title: m[1], sub: m[2] } : { title: category, sub: '' };
}

function dietAllows(item) {
    const filter = typeof dietFilter !== 'undefined' ? dietFilter : 'all';
    if (filter === 'all') return true;
    const diet = classifyDiet(item.name);
    return filter === 'veg' ? diet !== 'nonveg' : diet !== 'veg';
}

function getPages() {
    const grouped = new Map();
    menuData.items.filter(dietAllows).forEach(item => {
        if (!grouped.has(item.category)) grouped.set(item.category, []);
        grouped.get(item.category).push(item);
    });
    return [...grouped].map(([category, items]) => ({ category, items }));
}

function buildLeaf(page, index, total, extraClass) {
    const { title, sub } = splitCategory(page.category);
    const leaf = document.createElement('article');
    leaf.className = 'leaf' + (extraClass ? ' ' + extraClass : '');
    leaf.dataset.category = page.category;
    leaf.innerHTML = `
        <div class="leaf-front">
            <div class="leaf-head">
                <span class="leaf-icon" aria-hidden="true">${getCategoryIcon(page.category)}</span>
                <div class="leaf-titles">
                    <h2>${escapeHtml(title)}</h2>
                    ${sub ? `<span class="leaf-sub">${escapeHtml(sub)}</span>` : ''}
                </div>
                <span class="leaf-count">${page.items.length}<small>dish${page.items.length === 1 ? '' : 'es'}</small></span>
            </div>
            <div class="dish-grid">
                ${page.items.map((item, i) => `
                    <button class="dish" type="button" style="--i:${Math.min(i, 14)}" onclick="openQuickView(${item.id})">
                        <span class="dish-name">${dietMarkup(item.name)}<span>${escapeHtml(item.name)}</span></span>
                        <span class="dish-price">₹ ${escapeHtml(item.rate)}</span>
                    </button>
                `).join('')}
            </div>
            <div class="leaf-folio">— ${index + 1} of ${total} —</div>
        </div>
        <div class="leaf-back" aria-hidden="true"></div>
    `;
    return leaf;
}

function renderStageEmpty(stage) {
    const filtered = menuData.items.length > 0;
    stage.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">${filtered ? '🥗' : '🍽️'}</div>
            <h3>${filtered ? 'No dishes in this filter' : 'No dishes available yet'}</h3>
            <p>${filtered ? 'Try switching the filter back to All.' : "Please check back soon — we're updating our menu."}</p>
            ${filtered ? '<button class="btn btn-primary btn-small" type="button" onclick="setDietFilter(\'all\')">Show All</button>' : ''}
        </div>`;
}

// Re-draws the current page in place (no flip) — used after data/filter changes.
function renderCurrentLeaf(animated) {
    const stage = document.getElementById('leafStage');
    if (!stage) return;
    const pages = getPages();
    if (pages.length === 0) { renderStageEmpty(stage); return; }
    let index = pages.findIndex(p => p.category === currentCategory);
    if (index < 0) index = 0;
    currentCategory = pages[index].category;
    stage.replaceChildren(buildLeaf(pages[index], index, pages.length, animated ? 'leaf-fade' : ''));
}

function goToPage(index) {
    const pages = getPages();
    if (!pages.length || leafFlipping) return;
    index = Math.max(0, Math.min(pages.length - 1, index));
    const currentIndex = pages.findIndex(p => p.category === currentCategory);
    if (index === currentIndex) return;

    const forward = index > currentIndex;
    currentCategory = pages[index].category;
    updatePagerAndRail(pages);
    window.scrollTo({ top: 0, behavior: 'instant' });

    const stage = document.getElementById('leafStage');
    const oldLeaf = stage.querySelector('.leaf');
    const newLeaf = buildLeaf(pages[index], index, pages.length);

    if (!oldLeaf || currentIndex < 0 || REDUCED_MOTION.matches) {
        stage.replaceChildren(newLeaf);
        return;
    }

    leafFlipping = true;
    stage.style.minHeight = oldLeaf.offsetHeight + 'px';
    stage.classList.add('is-flipping');

    let flipper;
    if (forward) {
        // the current page lifts off to the left, revealing the next one beneath it
        newLeaf.classList.add('leaf-under');
        stage.appendChild(newLeaf);
        oldLeaf.classList.add('flipping', 'flip-out');
        flipper = oldLeaf;
    } else {
        // the previous page swings back in from the left, covering the current one
        newLeaf.classList.add('flipping', 'flip-in');
        stage.appendChild(newLeaf);
        flipper = newLeaf;
    }

    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        oldLeaf.remove();
        newLeaf.classList.remove('flipping', 'flip-in', 'leaf-under');
        stage.style.minHeight = '';
        stage.classList.remove('is-flipping');
        leafFlipping = false;
    };
    flipper.addEventListener('animationend', (e) => { if (e.target === flipper) finish(); });
    setTimeout(finish, 1100);
}

function stepPage(delta) {
    const pages = getPages();
    const i = pages.findIndex(p => p.category === currentCategory);
    goToPage(i + delta);
}

function updatePagerAndRail(pages) {
    pages = pages || getPages();
    const index = pages.findIndex(p => p.category === currentCategory);

    const label = document.getElementById('pagerLabel');
    if (label) {
        label.innerHTML = index < 0 ? '' :
            `<b>${escapeHtml(splitCategory(currentCategory).title)}</b><small>Page ${index + 1} of ${pages.length}</small>`;
    }
    const prev = document.getElementById('pagerPrev');
    const next = document.getElementById('pagerNext');
    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index < 0 || index >= pages.length - 1;

    const rail = document.getElementById('catRail');
    if (rail) {
        let activeChip = null;
        rail.querySelectorAll('.chip').forEach(chip => {
            const on = chip.dataset.category === currentCategory;
            chip.classList.toggle('active', on);
            chip.setAttribute('aria-selected', on ? 'true' : 'false');
            if (on) activeChip = chip;
        });
        if (activeChip) {
            rail.scrollTo({
                left: activeChip.offsetLeft - (rail.clientWidth - activeChip.offsetWidth) / 2,
                behavior: REDUCED_MOTION.matches ? 'auto' : 'smooth'
            });
        }
    }
    document.querySelectorAll('#catGrid .cat-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === currentCategory);
    });
}

function renderCategoryRail(pages) {
    const rail = document.getElementById('catRail');
    if (!rail) return;
    rail.innerHTML = pages.map(p => `
        <button class="chip" type="button" role="tab" data-category="${escapeHtml(p.category)}">
            <span aria-hidden="true">${getCategoryIcon(p.category)}</span>${escapeHtml(splitCategory(p.category).title)}
        </button>
    `).join('');
    rail.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const i = getPages().findIndex(p => p.category === chip.dataset.category);
            goToPage(i);
        });
    });
}

function renderCategoryGrid(pages) {
    const grid = document.getElementById('catGrid');
    if (!grid) return;
    grid.innerHTML = pages.map((p, i) => `
        <button class="cat-card" type="button" data-category="${escapeHtml(p.category)}" style="--i:${i}">
            <span class="cat-card-icon" aria-hidden="true">${getCategoryIcon(p.category)}</span>
            <span class="cat-card-name">${escapeHtml(splitCategory(p.category).title)}</span>
            <span class="cat-card-count">${p.items.length} dishes</span>
        </button>
    `).join('');
    grid.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('click', () => {
            const i = getPages().findIndex(p => p.category === card.dataset.category);
            closeSheets();
            setScreen('menu');
            setTimeout(() => goToPage(i), 260);
        });
    });
}

function setDietFilter(value) {
    dietFilter = value;
    document.querySelectorAll('.diet-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.diet === value));
    updateCustomerMenu(true);
}

function updateCustomerMenu(animateLeaf) {
    const { name, phone, timings, address } = menuData.restaurant;
    document.getElementById('displayName').textContent = name;
    document.getElementById('menuBrandName').textContent = name;
    document.getElementById('footerYearName').textContent = name;

    const phoneNumbers = phone.split(',').map(p => p.trim()).filter(Boolean);
    document.getElementById('displayPhone').innerHTML = phoneNumbers
        .map(num => `<a href="tel:${escapeHtml(num.replace(/[^\d+]/g, ''))}">${escapeHtml(num)}</a>`).join('');
    document.getElementById('displayTimings').textContent = timings;

    const addressEl = document.getElementById('footerAddress');
    if (address && address.trim()) {
        addressEl.textContent = '📍 ' + address.trim();
        addressEl.style.display = 'block';
    } else {
        addressEl.style.display = 'none';
    }

    updateContactSheet(phoneNumbers);

    const pages = getPages();
    if (!pages.some(p => p.category === currentCategory)) currentCategory = pages.length ? pages[0].category : null;

    renderCategoryRail(pages);
    renderCategoryGrid(pages);
    renderCurrentLeaf(animateLeaf === true);
    updatePagerAndRail(pages);
    document.getElementById('pager').classList.toggle('hidden', pages.length === 0);

    if (typeof renderSearchResults === 'function') renderSearchResults();
}

// ==================== QUICK VIEW MODAL ====================
function openQuickView(id) {
    const item = menuData.items.find(i => i.id === id);
    if (!item) return;

    document.getElementById('quickViewCategory').innerHTML = `${getCategoryIcon(item.category)} ${escapeHtml(item.category)}`;
    document.getElementById('quickViewTitle').innerHTML = `${dietMarkup(item.name)} ${escapeHtml(item.name)}`;
    document.getElementById('quickViewPrice').textContent = '₹ ' + item.rate;
    const descEl = document.getElementById('quickViewDescription');
    if (item.description) {
        descEl.textContent = item.description;
        descEl.style.display = 'block';
    } else {
        descEl.style.display = 'none';
    }

    const firstPhone = menuData.restaurant.phone.split(',')[0].trim().replace(/[^\d+]/g, '');
    document.getElementById('quickViewCallBtn').href = 'tel:' + firstPhone;
    document.getElementById('quickViewModal').classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

// ==================== MENU BOOK INTRO CONTENT ====================
function populateBookPages() {
    document.getElementById('bookCoverName').textContent = menuData.restaurant.name;

    const categories = [...new Set(menuData.items.map(item => item.category))];
    const faces = document.querySelectorAll('#menuBook .page-face.front');
    faces.forEach((face, i) => {
        const cat = categories[i];
        if (cat) {
            face.innerHTML = `
                <span class="page-icon">${getCategoryIcon(cat)}</span>
                <span class="page-title">${escapeHtml(splitCategory(cat).title)}</span>
                <span class="page-sub">and more...</span>
            `;
        } else {
            face.innerHTML = `
                <span class="page-icon">✨</span>
                <span class="page-title">Full Menu</span>
                <span class="page-sub">Awaits</span>
            `;
        }
    });
}

// ==================== CONTACT SHEET ====================
function updateContactSheet(phoneNumbers) {
    const list = document.getElementById('callList');
    if (!list || !phoneNumbers || phoneNumbers.length === 0) return;

    list.innerHTML = phoneNumbers.map(num => `
        <a class="call-row" href="tel:${escapeHtml(num.replace(/[^\d+]/g, ''))}">
            <span class="call-ico">📞</span><span>Call ${escapeHtml(num)}</span>
        </a>`).join('');

    const firstPhone = phoneNumbers[0].replace(/[^\d+]/g, '');
    const waNumber = firstPhone.replace(/^\+/, '').replace(/^0/, '91');
    document.getElementById('callWhatsapp').href = 'https://wa.me/' + (waNumber.length === 10 ? '91' + waNumber : waNumber);

    const { timings, address } = menuData.restaurant;
    document.getElementById('callMeta').innerHTML =
        `<div>⏰ ${escapeHtml(timings)}</div>` + (address && address.trim() ? `<div>📍 ${escapeHtml(address.trim())}</div>` : '');
}
