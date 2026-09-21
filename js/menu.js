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
}

let menuData = loadData();

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

// ==================== CUSTOMER MENU: FILTER + RENDER ====================
function getFilteredGroupedItems() {
    const q = (typeof searchQuery !== 'undefined' ? searchQuery : '').trim().toLowerCase();
    const filter = typeof dietFilter !== 'undefined' ? dietFilter : 'all';

    const filtered = menuData.items.filter(item => {
        const matchesSearch = !q ||
            item.name.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q));
        if (!matchesSearch) return false;

        if (filter === 'all') return true;
        const diet = classifyDiet(item.name);
        if (filter === 'veg') return diet === 'veg' || diet === 'both';
        if (filter === 'nonveg') return diet === 'nonveg' || diet === 'both';
        return true;
    });

    const grouped = {};
    filtered.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
    });
    return grouped;
}

function renderCategoryStrip() {
    const container = document.getElementById('categoryStrip');
    if (!container) return;
    const categories = [...new Set(menuData.items.map(item => item.category))];
    const counts = {};
    menuData.items.forEach(item => { counts[item.category] = (counts[item.category] || 0) + 1; });

    container.innerHTML = categories.map(cat => `
        <div class="category-strip-card reveal anim-scale" data-target="${slugify(cat)}">
            <span class="category-strip-icon">${getCategoryIcon(cat)}</span>
            <div class="category-strip-name">${escapeHtml(cat)}</div>
            <div class="category-strip-count">${counts[cat]} dishes</div>
        </div>
    `).join('');

    container.querySelectorAll('.category-strip-card').forEach(card => {
        card.addEventListener('click', () => jumpToCategory(card.dataset.target));
    });
}

function renderCategoryChips() {
    const container = document.getElementById('categoryChips');
    if (!container) return;
    const categories = [...new Set(menuData.items.map(item => item.category))];
    container.innerHTML = categories.map(cat =>
        `<button class="chip" data-target="${slugify(cat)}"><span>${getCategoryIcon(cat)}</span>${escapeHtml(cat)}</button>`
    ).join('');

    container.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => jumpToCategory(chip.dataset.target));
    });
}

function jumpToCategory(targetId) {
    const hadFilters = searchQuery !== '' || dietFilter !== 'all';
    if (hadFilters) {
        clearAllFilters(false);
    }
    const target = document.getElementById(targetId);
    if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
}

function updateCustomerMenu() {
    document.getElementById('displayName').textContent = menuData.restaurant.name;
    document.getElementById('footerName').textContent = menuData.restaurant.name;
    document.getElementById('footerYearName').textContent = menuData.restaurant.name;

    const phoneNumbers = menuData.restaurant.phone.split(',').map(p => p.trim()).filter(Boolean);
    const phoneHtml = phoneNumbers.map(num =>
        `<a href="tel:${escapeHtml(num)}">${escapeHtml(num)}</a>`
    ).join(' &nbsp;|&nbsp; ');
    document.getElementById('displayPhone').innerHTML = '📱 ' + phoneHtml;
    document.getElementById('footerPhone').innerHTML = '📱 ' + phoneHtml;

    document.getElementById('displayTimings').textContent = '⏰ ' + menuData.restaurant.timings;
    document.getElementById('footerTimings').textContent = '⏰ ' + menuData.restaurant.timings;

    const addressEl = document.getElementById('footerAddress');
    if (menuData.restaurant.address && menuData.restaurant.address.trim()) {
        addressEl.textContent = '📍 ' + menuData.restaurant.address.trim();
        addressEl.style.display = 'block';
    } else {
        addressEl.style.display = 'none';
    }

    updateFloatingContacts(phoneNumbers);
    renderCategoryChips();
    renderCategoryStrip();

    const grouped = getFilteredGroupedItems();
    const display = document.getElementById('menuItemsDisplay');

    if (menuData.items.length === 0) {
        display.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>
                <h3>No dishes available yet</h3>
                <p>Please check back soon — we're updating our menu.</p>
            </div>`;
        return;
    }

    if (Object.keys(grouped).length === 0) {
        display.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔎</div>
                <h3>No dishes match your search</h3>
                <p>Try a different keyword or clear the filters.</p>
                <button class="btn btn-primary btn-small" onclick="clearAllFilters(true)">Clear Filters</button>
            </div>`;
        return;
    }

    const q = (typeof searchQuery !== 'undefined' ? searchQuery : '').trim();
    const animTypes = ['anim-up', 'anim-left', 'anim-right', 'anim-scale'];

    display.innerHTML = Object.entries(grouped).map(([category, items], sectionIdx) => `
        <div class="category-section reveal ${animTypes[sectionIdx % animTypes.length]}" id="${slugify(category)}">
            <div class="category-header">
                <span class="category-icon">${getCategoryIcon(category)}</span>
                <span class="category-name">${escapeHtml(category)}</span>
                <span class="category-count">${items.length} item${items.length === 1 ? '' : 's'}</span>
            </div>
            <div class="category-items">
                ${items.map(item => `
                    <div class="menu-item" onclick="openQuickView(${item.id})">
                        <div class="item-info">
                            <div class="item-title-row">
                                ${dietMarkup(item.name)}
                                <div class="item-title">${highlightMatch(item.name, q)}</div>
                            </div>
                            ${item.description ? `<div class="item-description">${highlightMatch(item.description, q)}</div>` : ''}
                        </div>
                        <div class="item-leader"></div>
                        <div class="item-price">₹ ${escapeHtml(item.rate)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    setupScrollObservers();
    updateStickyOffset();
}

function clearAllFilters(rerender) {
    searchQuery = '';
    dietFilter = 'all';
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
    const box = document.getElementById('searchBox');
    if (box) box.classList.remove('has-value');
    document.querySelectorAll('.diet-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.diet === 'all'));
    if (rerender !== false) updateCustomerMenu();
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

    const callBtn = document.getElementById('quickViewCallBtn');
    const firstPhone = menuData.restaurant.phone.split(',')[0].trim();
    callBtn.href = 'tel:' + firstPhone;

    document.getElementById('quickViewModal').classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

function updateFloatingContacts(phoneNumbers) {
    const callFab = document.getElementById('fabCall');
    const whatsappFab = document.getElementById('fabWhatsapp');
    if (!phoneNumbers || phoneNumbers.length === 0) return;

    const firstPhone = phoneNumbers[0].replace(/[^\d+]/g, '');
    if (callFab) callFab.href = 'tel:' + firstPhone;
    if (whatsappFab) {
        const waNumber = firstPhone.replace(/^\+/, '').replace(/^0/, '91');
        whatsappFab.href = 'https://wa.me/' + waNumber;
    }
}
