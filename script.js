// Constants
const C = {
    Common: "#C8CAD6", Rare: "#4D9BFF", Epic: "#B040FF", Legendary: "#FFB830", Heirloom: "#00D4FF",
};

const CATS = [
    { id: "legend_skin", label: "Legend Skins", icon: "sparkles" },
    { id: "weapon_skin", label: "Weapon Skins", icon: "target" },
    { id: "melee", label: "Melee / Heirlooms", icon: "sword" },
    // ... add others from JSX
];

const CURRENCIES = ["AC", "CM", "Shards", "Free"];
const DEF_COSTS = {
    AC: { Common: 400, Rare: 700, Epic: 1000, Legendary: 1800, Heirloom: 6500 },
    CM: { Common: 30, Rare: 60, Epic: 400, Legendary: 1200, Heirloom: 150 },
};

// State
let items = JSON.parse(localStorage.getItem("awl_items")) || [];
let savings = JSON.parse(localStorage.getItem("awl_savings")) || { AC: 0, CM: 0 };
let activeTab = "wishlist";
let currentForm = { rarity: "Legendary", currency: "AC", priority: "Medium" };

// Elements
const wishlistGrid = document.getElementById("wishlistGrid");
const statsBar = document.getElementById("statsBar");

// Initialize
function init() {
    renderStatsBar();
    renderWishlist();
    populateSelects();
    setupEventListeners();
    lucide.createIcons();
}

function populateSelects() {
    const catSelects = ["filterCategory", "formCategory"];
    catSelects.forEach(id => {
        const el = document.getElementById(id);
        if(id === "filterCategory") el.innerHTML = '<option value="all">All Items</option>';
        CATS.forEach(c => {
            el.innerHTML += `<option value="${c.id}">${c.label}</option>`;
        });
    });

    const currSelect = document.getElementById("formCurrency");
    CURRENCIES.forEach(c => currSelect.innerHTML += `<option value="${c}">${c}</option>`);
}

function renderStatsBar() {
    const totalAC = items.filter(i => !i.obtained && i.currency === "AC").reduce((s, i) => s + i.cost, 0);
    const totalCM = items.filter(i => !i.obtained && i.currency === "CM").reduce((s, i) => s + i.cost, 0);

    statsBar.innerHTML = `
        <div class="stat-box">
            <label class="label-mini">APEX COINS (OWNED)</label>
            <input type="number" value="${savings.AC}" onchange="updateSavings('AC', this.value)">
        </div>
        <div class="stat-box">
            <label class="label-mini">CRAFTING METALS (OWNED)</label>
            <input type="number" value="${savings.CM}" onchange="updateSavings('CM', this.value)">
        </div>
        <div class="stat-box">
            <label class="label-mini">AC NEEDED</label>
            <div style="color: var(--primary); font-size: 22px; font-weight: 700">
                ${Math.max(0, totalAC - savings.AC).toLocaleString()}
            </div>
        </div>
    `;
}

function updateSavings(key, val) {
    savings[key] = parseInt(val) || 0;
    localStorage.setItem("awl_savings", JSON.stringify(savings));
    renderStatsBar();
}

function renderWishlist() {
    const filterCat = document.getElementById("filterCategory").value;
    const filtered = items.filter(i => filterCat === "all" || i.category === filterCat);
    
    wishlistGrid.innerHTML = filtered.map(item => `
        <div class="card ${item.obtained ? 'obtained' : ''}" style="border-left-color: ${C[item.rarity]}">
            <div class="label-mini">${item.rarity}</div>
            <div style="font-size: 18px; font-weight: 700">${item.name}</div>
            <div style="margin-top: 8px; font-weight: 700; color: var(--gold)">
                ${item.cost} ${item.currency}
            </div>
            <div style="display: flex; gap: 5px; margin-top: 10px;">
                <button onclick="toggleItem('${item.id}')" class="btn-icon">✓</button>
                <button onclick="deleteItem('${item.id}')" class="btn-icon">🗑</button>
            </div>
        </div>
    `).join("");
}

function toggleItem(id) {
    items = items.map(i => i.id === id ? {...i, obtained: !i.obtained} : i);
    saveAndRefresh();
}

function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem("awl_items", JSON.stringify(items));
    renderWishlist();
    renderStatsBar();
}

function setupEventListeners() {
    document.getElementById("openAddBtn").onclick = () => document.getElementById("modalOverlay").classList.add("open");
    document.getElementById("closeModalBtn").onclick = () => document.getElementById("modalOverlay").classList.remove("open");
    
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".tab-btn, .tab-content").forEach(el => el.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
        };
    });

    document.getElementById("saveItemBtn").onclick = () => {
        const newItem = {
            id: Date.now().toString(),
            name: document.getElementById("formName").value,
            category: document.getElementById("formCategory").value,
            rarity: currentForm.rarity,
            currency: document.getElementById("formCurrency").value,
            cost: parseInt(document.getElementById("formCost").value) || 0,
            obtained: false
        };
        items.push(newItem);
        saveAndRefresh();
        document.getElementById("modalOverlay").classList.remove("open");
    };
}

init();