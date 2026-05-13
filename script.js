// --- CONFIG & STATE ---
const CATS = [
    { id: "legend_skin", label: "Legend Skins" },
    { id: "weapon_skin", label: "Weapon Skins" },
    { id: "melee", label: "Heirlooms" },
    { id: "other", label: "Other Cosmetics" }
];

let API_KEY = localStorage.getItem("awl_apikey") || null;
let items = JSON.parse(localStorage.getItem("awl_items")) || [];
let savings = JSON.parse(localStorage.getItem("awl_savings")) || { AC: 0, CM: 0 };
let isFetching = false;

function init() {
    checkApiKey();
    renderStatsBar();
    renderWishlist();
    populateDropdowns();
    setupEvents();
}

function checkApiKey() {
    const gate = document.getElementById("keyGatekeeper");
    if (!API_KEY) {
        if (gate) { gate.classList.add("open"); gate.style.display = "flex"; }
    } else {
        if (gate) { gate.classList.remove("open"); gate.style.display = "none"; }
    }
}

// --- CORE FETCH LOGIC ---
async function fetchCrafting() {
    if (!API_KEY || isFetching) return;
    
    const icon = document.getElementById("refreshIcon");
    const grid = document.getElementById("craftingGrid");
    
    isFetching = true;
    if (icon) icon.classList.add("loading-spin");
    grid.innerHTML = `<p style="text-align:center; color:var(--muted);">Contacting Apex API...</p>`;

    try {
        // According to docs: auth=YOUR_API_KEY is the standard GET parameter
        // We add &cache_bust= to prevent the browser from serving an old error page
        const url = `https://api.mozambiquehe.re/crafting?auth=${API_KEY.trim()}&cache_bust=${Date.now()}`;
        
        const response = await fetch(url);

        // Check if the server actually sent a successful response
        if (response.status === 429) throw new Error("Rate limit reached (1 request per 2s).");
        if (response.status === 403) throw new Error("Invalid API Key.");
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        // Get text first to ensure it's not HTML before parsing
        const rawText = await response.text();
        if (rawText.includes("<!DOCTYPE") || rawText.includes("<html")) {
            throw new Error("Received HTML instead of JSON. Try again in 30 seconds.");
        }

        const data = JSON.parse(rawText);
        if (data.Error) throw new Error(data.Error);
        
        renderCrafting(data);

    } catch (e) {
        console.error("Diagnostic:", e);
        grid.innerHTML = `
            <div style="padding:15px; border:1px solid #ff4d4d; color:#ff4d4d; border-radius:4px; text-align:center; background: rgba(255,77,77,0.05)">
                <div style="font-weight:800;">⚠️ SYNC FAILED</div>
                <div style="font-size:12px; margin-top:5px;">${e.message}</div>
            </div>`;
    } finally {
        setTimeout(() => {
            isFetching = false;
            if (icon) icon.classList.remove("loading-spin");
        }, 800); 
    }
}

function renderCrafting(data) {
    const grid = document.getElementById("craftingGrid");
    if (!grid) return;
    grid.innerHTML = "";
    
    const rotationArray = Array.isArray(data) ? data : [];

    rotationArray.forEach(bundle => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.cssText = "border-left: 4px solid var(--primary); background: var(--surface); padding: 15px; margin-bottom: 10px;";
        
        const contents = bundle.bundleContent.map(c => `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border);">
                <span style="font-weight:600; text-transform: capitalize;">${c.itemType.name.replace(/_/g, ' ')}</span>
                <span style="color: var(--gold); font-weight:700;">${c.cost} CM</span>
            </div>
        `).join("");

        card.innerHTML = `
            <div style="color:var(--primary); margin-bottom:10px; font-weight:800; font-size:11px; letter-spacing:1px;">
                ${(bundle.bundleName || "ROTATION").toUpperCase()}
            </div>
            ${contents}
        `;
        grid.appendChild(card);
    });
}

// --- APP LOGIC & UI ---
function save() {
    localStorage.setItem("awl_items", JSON.stringify(items));
    localStorage.setItem("awl_savings", JSON.stringify(savings));
    renderWishlist();
    renderStatsBar();
}

function renderWishlist() {
    const grid = document.getElementById("wishlistGrid");
    if (!grid) return;
    const filterCat = document.getElementById("filterCategory")?.value || "all";
    const filterStatus = document.getElementById("filterStatus")?.value || "all";

    let filtered = items.filter(i => {
        const catMatch = filterCat === "all" || i.category === filterCat;
        const statusMatch = filterStatus === "all" || (filterStatus === "obtained" ? i.obtained : !i.obtained);
        return catMatch && statusMatch;
    });

    grid.innerHTML = filtered.map(item => `
        <div class="card ${item.obtained ? 'obtained' : ''}" style="border-left: 4px solid var(--${item.rarity.toLowerCase()}); padding: 15px; background: var(--surface); margin-bottom: 10px;">
            <div class="label-mini" style="color: var(--${item.rarity.toLowerCase()}); font-size: 10px; font-weight:800;">${item.rarity.toUpperCase()}</div>
            <div style="font-size: 18px; font-weight: 700; margin: 4px 0;">${item.name}</div>
            <div style="color: var(--gold); font-weight: 800;">${item.cost.toLocaleString()} ${item.currency}</div>
            <div style="display: flex; gap: 8px; margin-top: 15px;">
                <button onclick="toggleObtained('${item.id}')" class="btn-icon-alt">✓</button>
                <button onclick="deleteItem('${item.id}')" class="btn-icon-alt">🗑</button>
            </div>
        </div>
    `).join("");
}

function renderStatsBar() {
    const totalAC = items.filter(i => !i.obtained && i.currency === "AC").reduce((s, i) => s + i.cost, 0);
    const totalCM = items.filter(i => !i.obtained && i.currency === "CM").reduce((s, i) => s + i.cost, 0);
    const bar = document.getElementById("statsBar");
    if (!bar) return;
    bar.innerHTML = `
        <div class="stat-box"><label>OWNED AC</label><input type="number" value="${savings.AC}" onchange="updateSavings('AC', this.value)"></div>
        <div class="stat-box"><label>OWNED CM</label><input type="number" value="${savings.CM}" onchange="updateSavings('CM', this.value)"></div>
        <div class="stat-box">
            <label>AC NEEDED</label>
            <div style="color:var(--primary); font-size:20px; font-weight:800;">${Math.max(0, totalAC - savings.AC).toLocaleString()}</div>
        </div>
    `;
}

function updateSavings(key, val) { savings[key] = parseInt(val) || 0; save(); }
function toggleObtained(id) { items = items.map(i => i.id === id ? {...i, obtained: !i.obtained} : i); save(); }
function deleteItem(id) { items = items.filter(i => i.id !== id); save(); }

function populateDropdowns() {
    const catHtml = CATS.map(c => `<option value="${c.id}">${c.label}</option>`).join("");
    const fCat = document.getElementById("filterCategory");
    const mCat = document.getElementById("formCategory");
    if (fCat) fCat.innerHTML = `<option value="all">All Categories</option>` + catHtml;
    if (mCat) mCat.innerHTML = catHtml;
}

function setupEvents() {
    document.getElementById("saveGatekeeperKey").onclick = () => {
        const val = document.getElementById("gatekeeperInput")?.value.trim();
        if (val) { API_KEY = val; localStorage.setItem("awl_apikey", val); location.reload(); }
    };
    document.getElementById("openAddBtn").onclick = () => document.getElementById("modalOverlay")?.classList.add("open");
    document.getElementById("closeModalBtn").onclick = () => document.getElementById("modalOverlay")?.classList.remove("open");
    document.getElementById("fetchCraftingBtn").onclick = fetchCrafting;
    
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".tab-btn, .tab-content").forEach(el => el.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
        };
    });

    document.getElementById("saveItemBtn").onclick = () => {
        const nameInput = document.getElementById("formName");
        if(!nameInput.value.trim()) return alert("Enter item name");
        items.push({
            id: Date.now().toString(), name: nameInput.value.trim(),
            category: document.getElementById("formCategory").value,
            rarity: document.getElementById("formRarity").value,
            currency: document.getElementById("formCurrency").value,
            cost: parseInt(document.getElementById("formCost").value) || 0,
            obtained: false
        });
        save();
        nameInput.value = "";
        document.getElementById("modalOverlay")?.classList.remove("open");
    };
}

window.addEventListener('DOMContentLoaded', init);