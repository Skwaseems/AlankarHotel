/* ====================================================================
   SEARCH SHEET + DIET FILTER
   ==================================================================== */

let searchQuery = '';
let dietFilter = 'all';

// Suggestion chips come from real dish names in the menu data.
function pickSuggestions() {
    const names = menuData.items.map(i => i.name.replace(/\(.*?\)/g, '').split('/')[0].replace(/^Veg\.?\s*/i, '').trim());
    const unique = [...new Set(names)].filter(n => n.length > 2 && n.length < 18);
    const picks = [];
    const seen = new Set();
    while (picks.length < 6 && seen.size < unique.length) {
        const idx = Math.floor(Math.random() * unique.length);
        if (!seen.has(idx)) { seen.add(idx); picks.push(unique[idx]); }
    }
    return picks;
}

function renderSearchResults() {
    const box = document.getElementById('searchResults');
    if (!box) return;
    const q = searchQuery.trim();

    if (!q) {
        box.innerHTML = `
            <p class="search-hint">Search by dish or category</p>
            <div class="suggest-row">
                ${pickSuggestions().map(s => `<button class="chip" type="button" data-suggest="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}
            </div>`;
        box.querySelectorAll('[data-suggest]').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById('searchInput');
                input.value = btn.dataset.suggest;
                input.dispatchEvent(new Event('input'));
                input.focus();
            });
        });
        return;
    }

    const needle = q.toLowerCase();
    const results = menuData.items.filter(item => dietAllows(item) && (
        item.name.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        (item.description && item.description.toLowerCase().includes(needle))));

    const filterNote = dietFilter === 'all' ? '' :
        ` · <button class="link-btn" type="button" onclick="setDietFilter('all')">${dietFilter === 'veg' ? 'Veg' : 'Non-Veg'} only — show all</button>`;

    if (results.length === 0) {
        box.innerHTML = `
            <div class="empty-state compact">
                <div class="empty-icon">🔎</div>
                <h3>No dishes match “${escapeHtml(q)}”</h3>
                <p>Try a different keyword${filterNote ? '' : '.'}${filterNote}</p>
            </div>`;
        return;
    }

    box.innerHTML = `<p class="search-count">${results.length} dish${results.length === 1 ? '' : 'es'} found${filterNote}</p>` +
        results.map((item, i) => `
            <button class="result-row" type="button" style="--i:${Math.min(i, 10)}" onclick="openQuickView(${item.id})">
                <span class="result-main">
                    <span class="result-name">${dietMarkup(item.name)}<span>${highlightMatch(item.name, q)}</span></span>
                    <span class="result-cat">${getCategoryIcon(item.category)} ${escapeHtml(splitCategory(item.category).title)}</span>
                </span>
                <span class="dish-price">₹ ${escapeHtml(item.rate)}</span>
            </button>`).join('');
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
            renderSearchResults();
        }, 120);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchBox.classList.remove('has-value');
        searchQuery = '';
        renderSearchResults();
        searchInput.focus();
    });

    document.querySelectorAll('.diet-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.diet !== dietFilter) setDietFilter(btn.dataset.diet);
        });
    });
}
