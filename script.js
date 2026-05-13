// ============================================================
//  APEX WISHLIST — script.js
//  Full wishlist + Fuse.js browse + crafting rotation
// ============================================================

// ── CONFIG ──────────────────────────────────────────────────
const CATS = [
    { id: "legend",      label: "Legends" },
    { id: "legend_skin", label: "Legend Skins" },
    { id: "weapon_skin", label: "Weapon Skins" },
    { id: "melee",       label: "Heirlooms" },
    { id: "other",       label: "Other Cosmetics" },
];

const RARITY_COLORS = {
    Common: "#C8CAD6", Rare: "#4D9BFF",
    Epic: "#B040FF", Legendary: "#FFB830",
    Heirloom: "#00D4FF", Free: "#3AE870",
    Shards: "#00D4FF", Tokens: "#9AA0B8", Included: "#9AA0B8",
};
const RARITY_BG = {
    Common: "#1C1D22", Rare: "#0B1628",
    Epic: "#160B26", Legendary: "#221500", Heirloom: "#001622",
};
const PRIORITY_COLOR = { High: "#FF4444", Medium: "#FFB830", Low: "#4D9BFF" };
const PRIORITY_ICON  = { High: "▲", Medium: "●", Low: "▼" };
const CAT_ICONS = {
    legend: "👤", legend_skin: "✨", weapon_skin: "🎯",
    melee: "⚔️", other: "🎭",
};

// ── STATE ────────────────────────────────────────────────────
let API_KEY  = localStorage.getItem("awl_apikey") || "";
let items    = safeLoad("awl_items",   []);
let savings  = safeLoad("awl_savings", { AC: 0, CM: 0 });
let isFetching = false;
let fuseInstance = null;

function safeLoad(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
}

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();
    checkApiKey();
    renderStatsBar();
    renderWishlist();
    initBrowse();
    setupEvents();
    document.getElementById("dbCount").textContent = ITEMS_DB.length;
});

// ── API KEY GATE ─────────────────────────────────────────────
function checkApiKey() {
    const gate = document.getElementById("keyGatekeeper");
    if (!API_KEY) {
        gate.style.display = "flex";
    } else {
        gate.style.display = "none";
    }
}

// ── PERSIST ──────────────────────────────────────────────────
function save() {
    localStorage.setItem("awl_items",   JSON.stringify(items));
    localStorage.setItem("awl_savings", JSON.stringify(savings));
    renderWishlist();
    renderStatsBar();
}

// ── STATS BAR ────────────────────────────────────────────────
function renderStatsBar() {
    const totalAC  = items.filter(i => !i.obtained && i.currency === "AC") .reduce((s, i) => s + (i.cost || 0), 0);
    const totalCM  = items.filter(i => !i.obtained && i.currency === "CM") .reduce((s, i) => s + (i.cost || 0), 0);
    const acNeeded = Math.max(0, totalAC - savings.AC);
    const cmNeeded = Math.max(0, totalCM - savings.CM);
    const wanted   = items.filter(i => !i.obtained).length;
    const obtained = items.filter(i =>  i.obtained).length;

    document.getElementById("statsBar").innerHTML = `
        <div class="stat-box">
            <label>APEX COINS</label>
            <input type="number" value="${savings.AC}" onchange="updateSavings('AC', this.value)" />
            <span style="font-size:10px;color:var(--dim)">on hand</span>
        </div>
        <div class="stat-box">
            <label>CRAFTING METALS</label>
            <input type="number" value="${savings.CM}" onchange="updateSavings('CM', this.value)" />
            <span style="font-size:10px;color:var(--dim)">on hand</span>
        </div>
        <div class="stat-box" style="background:${acNeeded > 0 ? '#2A0D00' : '#0A1A0D'}; border-color:${acNeeded > 0 ? '#5A2000' : '#1A4020'}">
            <label>AC NEEDED</label>
            <div style="font-size:22px;font-weight:700;color:${acNeeded > 0 ? 'var(--primary)' : 'var(--green)'}">
                ${acNeeded > 0 ? '-' + acNeeded.toLocaleString() : '✓ COVERED'}
            </div>
            <span style="font-size:10px;color:var(--dim)">${totalAC.toLocaleString()} AC total</span>
        </div>
        <div class="stat-box" style="background:${cmNeeded > 0 ? '#1A1A30' : '#0A1A0D'}; border-color:${cmNeeded > 0 ? '#3A3A7A' : '#1A4020'}">
            <label>CM NEEDED</label>
            <div style="font-size:22px;font-weight:700;color:${cmNeeded > 0 ? 'var(--heirloom)' : 'var(--green)'}">
                ${cmNeeded > 0 ? '-' + cmNeeded.toLocaleString() : '✓ COVERED'}
            </div>
            <span style="font-size:10px;color:var(--dim)">${totalCM.toLocaleString()} CM total</span>
        </div>
        <div class="stat-box">
            <label>WISHLIST</label>
            <div style="font-size:22px;font-weight:700;color:var(--primary)">${wanted}</div>
            <span style="font-size:10px;color:var(--dim)">${obtained} obtained</span>
        </div>
    `;
}

function updateSavings(key, val) {
    savings[key] = parseInt(val) || 0;
    save();
}

// ── WISHLIST RENDER ──────────────────────────────────────────
function renderWishlist() {
    const grid        = document.getElementById("wishlistGrid");
    const filterCat   = document.getElementById("filterCategory")?.value  || "all";
    const filterStatus= document.getElementById("filterStatus")?.value    || "all";
    const filterRarity= document.getElementById("filterRarity")?.value    || "all";

    const filtered = items.filter(i => {
        if (filterCat    !== "all" && i.category !== filterCat)           return false;
        if (filterRarity !== "all" && i.rarity   !== filterRarity)        return false;
        if (filterStatus === "obtained" &&  !i.obtained)                  return false;
        if (filterStatus === "wanted"   &&   i.obtained)                  return false;
        return true;
    });

    document.getElementById("filterCount").textContent =
        filtered.length + " item" + (filtered.length !== 1 ? "s" : "");

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1">
                <div class="empty-icon">◈</div>
                <div>${items.length === 0 ? 'Your wishlist is empty — hit ADD ITEM or browse the skin database' : 'No items match those filters'}</div>
            </div>`;
        return;
    }

    grid.innerHTML = filtered.map(item => buildItemCard(item, "wishlist")).join("");
}

// ── ITEM CARD BUILDER ────────────────────────────────────────
function buildItemCard(item, mode) {
    const rc      = RARITY_COLORS[item.rarity] || "#fff";
    const rbg     = RARITY_BG[item.rarity]     || "var(--surface)";
    const cat     = CATS.find(c => c.id === item.category);
    const catIcon = CAT_ICONS[item.category]   || "◈";
    const sub     = item.legend ? `for ${item.legend}` : (item.weapon ? item.weapon : (cat ? cat.label : ""));
    const alreadyInList = mode === "browse" && items.some(i => i.name === item.name && i.rarity === item.rarity);

    const imgHtml = buildImgHtml(item, rc, catIcon);
    const costHtml = buildCostHtml(item);

    if (mode === "wishlist") {
        const priColor = PRIORITY_COLOR[item.priority] || "var(--muted)";
        const priIcon  = PRIORITY_ICON[item.priority]  || "●";
        return `
        <div class="card ${item.obtained ? 'obtained' : ''} rarity-bg-${item.rarity.toLowerCase()}"
             style="border-left:3px solid ${rc}40; border-color:${item.obtained ? 'var(--border)' : rc + '40'}; background:${item.obtained ? 'var(--surface)' : rbg}">
            ${item.priority ? `<div class="priority-badge" style="color:${priColor}">${priIcon} ${item.priority.toUpperCase()}</div>` : ''}
            ${imgHtml}
            <div class="card-rarity-tag" style="color:${rc}">${item.rarity.toUpperCase()}</div>
            <div class="card-name">${item.name}</div>
            ${sub ? `<div class="card-sub">${sub}</div>` : ''}
            ${item.notes ? `<div class="card-sub" style="font-style:italic;color:var(--dim)">${item.notes}</div>` : ''}
            <div class="card-footer">
                <div class="card-cost">${costHtml}</div>
                <div class="card-actions">
                    <button class="btn-icon-alt ${item.obtained ? 'obtained' : ''}"
                            onclick="toggleObtained('${item.id}')"
                            title="${item.obtained ? 'Mark wanted' : 'Mark obtained'}">✓</button>
                    <button class="btn-icon-alt delete" onclick="deleteItem('${item.id}')" title="Remove">🗑</button>
                </div>
            </div>
        </div>`;
    }

    // Browse mode card
    return `
    <div class="card rarity-bg-${item.rarity.toLowerCase()}"
         style="border-left:3px solid ${rc}40; border-color:${rc}40; background:${rbg}">
        ${imgHtml}
        <div class="card-rarity-tag" style="color:${rc}">${item.rarity.toUpperCase()}</div>
        <div class="card-name">${item.name}</div>
        ${sub ? `<div class="card-sub">${sub}</div>` : ''}
        <div class="card-footer">
            <div class="card-cost">${costHtml}</div>
            <button class="browse-add-btn ${alreadyInList ? 'in-list' : ''}"
                    onclick="${alreadyInList ? '' : `addFromBrowse('${item.id}')`}"
                    ${alreadyInList ? 'disabled' : ''}>
                ${alreadyInList ? '✓ IN LIST' : '+ ADD'}
            </button>
        </div>
    </div>`;
}

function buildImgHtml(item, rc, catIcon) {
    if (item.img) {
        return `
        <div class="card-img-wrap" style="border-bottom:2px solid ${rc}30">
            <img src="${item.img}"
                 alt="${item.name}"
                 onerror="this.parentElement.innerHTML=buildPlaceholder('${catIcon}','${rc}')"
                 loading="lazy" />
        </div>`;
    }
    return `
    <div class="card-img-wrap" style="border-bottom:2px solid ${rc}30; background:${RARITY_BG[item.rarity]||'var(--elevated)'}">
        <div class="card-img-placeholder" style="color:${rc}">
            <div class="ph-icon">${catIcon}</div>
            <div class="ph-label">${item.rarity.toUpperCase()}</div>
        </div>
    </div>`;
}

// Called by onerror on img tags — must be global
window.buildPlaceholder = function(icon, color) {
    return `<div class="card-img-placeholder" style="color:${color}">
        <div class="ph-icon">${icon}</div>
    </div>`;
};

function buildCostHtml(item) {
    const currency = item.currency || "";
    if (currency === "Free" || currency === "Included") {
        return `<span style="color:var(--green);font-weight:700">FREE</span>`;
    }
    const clr = RARITY_COLORS[currency] || (
        currency === "AC" ? "var(--gold)" :
        currency === "CM" ? "#9AA0B8" :
        currency === "Shards" ? "var(--heirloom)" : "var(--muted)"
    );
    const cost = (item.cost || 0).toLocaleString();
    return `<span style="color:${clr};font-weight:700">${cost} ${currency}</span>`;
}

// ── WISHLIST ACTIONS ─────────────────────────────────────────
function toggleObtained(id) {
    items = items.map(i => i.id === id ? { ...i, obtained: !i.obtained } : i);
    save();
}

function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    save();
}

// ── BROWSE / FUSE.JS ─────────────────────────────────────────
function initBrowse() {
    fuseInstance = new Fuse(ITEMS_DB, {
        keys: [
            { name: "name",   weight: 2 },
            { name: "legend", weight: 1.5 },
            { name: "weapon", weight: 1.5 },
            { name: "tags",   weight: 1 },
            { name: "cat",    weight: 0.5 },
        ],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
    });

    // Populate browse category filter
    const browseFilterCat = document.getElementById("browseFilterCat");
    CATS.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id; opt.textContent = c.label;
        browseFilterCat.appendChild(opt);
    });

    // Show all items on load (sorted by rarity tier)
    renderBrowseResults(null);
}

function renderBrowseResults(query) {
    const grid       = document.getElementById("browseGrid");
    const hint       = document.getElementById("browseHint");
    const catFilter  = document.getElementById("browseFilterCat")?.value  || "all";
    const rarFilter  = document.getElementById("browseFilterRarity")?.value || "all";
    const clearBtn   = document.getElementById("clearSearch");

    clearBtn.style.display = query ? "block" : "none";

    let results;

    if (!query || query.trim() === "") {
        // Show all items in DB order (no query)
        results = ITEMS_DB;
        hint.style.display = "block";
    } else {
        hint.style.display = "none";
        results = fuseInstance.search(query.trim()).map(r => r.item);
    }

    // Apply filters
    results = results.filter(item => {
        if (catFilter !== "all" && item.cat !== catFilter)       return false;
        if (rarFilter !== "all" && item.rarity !== rarFilter)    return false;
        return true;
    });

    if (results.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1">
                <div class="empty-icon">🔍</div>
                <div>No results for "${query || ""}"</div>
            </div>`;
        return;
    }

    grid.innerHTML = results.map(item => buildItemCard(item, "browse")).join("");
}

function addFromBrowse(dbId) {
    const dbItem = ITEMS_DB.find(i => i.id === dbId);
    if (!dbItem) return;

    // Check duplicate
    if (items.some(i => i.name === dbItem.name && i.rarity === dbItem.rarity)) {
        alert(`"${dbItem.name}" is already in your wishlist.`);
        return;
    }

    items.push({
        id:       Date.now().toString() + Math.random().toString(36).slice(2),
        name:     dbItem.name,
        legend:   dbItem.legend  || "",
        weapon:   dbItem.weapon  || "",
        category: dbItem.cat,
        rarity:   dbItem.rarity,
        currency: dbItem.currency,
        cost:     dbItem.cost,
        notes:    "",
        priority: "Medium",
        img:      dbItem.img || "",
        obtained: false,
    });

    save();

    // Re-render browse so the button turns "IN LIST"
    renderBrowseResults(document.getElementById("browseInput")?.value || "");
}

// Pre-fill modal form from a DB item (called if user wants to customise before saving)
function prefillModal(dbId) {
    const dbItem = ITEMS_DB.find(i => i.id === dbId);
    if (!dbItem) return;

    document.getElementById("formName").value     = dbItem.name;
    document.getElementById("formLegend").value   = dbItem.legend  || dbItem.weapon || "";
    document.getElementById("formCategory").value = dbItem.cat;
    document.getElementById("formRarity").value   = dbItem.rarity;
    document.getElementById("formCurrency").value = dbItem.currency;
    document.getElementById("formCost").value     = dbItem.cost;

    // Show "pre-filled from" bar
    const bar = document.getElementById("modalFromDb");
    bar.style.display = "flex";
    bar.innerHTML = `
        ${dbItem.img ? `<img src="${dbItem.img}" onerror="this.style.display='none'" />` : ''}
        <div class="modal-fromdb-text">
            <strong>${dbItem.name}</strong>
            Pre-filled from database — adjust and save
        </div>`;

    document.getElementById("modalOverlay").classList.add("open");
}

// ── CRAFTING ROTATION ────────────────────────────────────────
async function fetchCrafting() {
    if (!API_KEY) { alert("No API key set. Click the ⚙ icon or refresh the page."); return; }
    if (isFetching) return;

    const icon = document.getElementById("refreshIcon");
    const grid = document.getElementById("craftingGrid");

    isFetching = true;
    icon.classList.add("loading-spin");
    grid.innerHTML = `<p style="text-align:center;color:var(--muted);padding:40px 0;">Contacting Apex API…</p>`;

    try {
        const url = `https://api.mozambiquehe.re/crafting?auth=${API_KEY.trim()}&cache_bust=${Date.now()}`;
        const res = await fetch(url);

        if (res.status === 429) throw new Error("Rate limit hit — wait a moment then try again.");
        if (res.status === 403) throw new Error("Invalid API key.");
        if (!res.ok)            throw new Error(`Server error ${res.status}`);

        const raw = await res.text();
        if (raw.includes("<!DOCTYPE") || raw.includes("<html")) {
            throw new Error("Received an HTML page instead of JSON. Try again in 30 seconds.");
        }

        const data = JSON.parse(raw);
        if (data.Error) throw new Error(data.Error);

        renderCrafting(data);

    } catch (e) {
        grid.innerHTML = `
            <div style="padding:15px;border:1px solid #ff4d4d;color:#ff4d4d;border-radius:4px;text-align:center;background:rgba(255,77,77,.05)">
                <div style="font-weight:800">⚠️ SYNC FAILED</div>
                <div style="font-size:12px;margin-top:6px">${e.message}</div>
            </div>`;
    } finally {
        setTimeout(() => {
            isFetching = false;
            icon.classList.remove("loading-spin");
        }, 800);
    }
}

function renderCrafting(data) {
    const grid = document.getElementById("craftingGrid");
    if (!grid) return;
    const arr = Array.isArray(data) ? data : [];

    if (arr.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⬡</div>
                <div>No crafting data returned — the rotation may be updating.</div>
            </div>`;
        return;
    }

    grid.className = "crafting-grid";
    grid.innerHTML = arr.map(bundle => {
        const contents = (bundle.bundleContent || []).map(c => {
            const name = (c.itemType?.name || c.itemType || "Item").replace(/_/g, " ");
            // Try to match to DB for Add button
            const dbMatch = ITEMS_DB.find(i =>
                i.name.toLowerCase().includes(name.toLowerCase().split(" ")[0]) &&
                i.currency === "CM"
            );
            return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);gap:8px">
                <div>
                    <div style="font-weight:600;text-transform:capitalize;font-size:14px">${name}</div>
                    ${c.asset ? `<div style="font-size:10px;color:var(--dim)">${c.asset.split("/").pop()}</div>` : ''}
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <span style="color:var(--gold);font-weight:700;font-size:14px">${c.cost} CM</span>
                    ${dbMatch ? `<button class="browse-add-btn" style="padding:4px 8px;font-size:11px"
                        onclick="addFromBrowse('${dbMatch.id}')">+ ADD</button>` : ''}
                </div>
            </div>`;
        }).join("");

        return `
        <div class="card" style="border-left:3px solid var(--primary)">
            <div style="color:var(--primary);font-family:var(--font-head);font-size:13px;font-weight:800;letter-spacing:1px;margin-bottom:12px">
                ${(bundle.bundleName || bundle.bundle || "ROTATION").toUpperCase()}
            </div>
            ${contents || '<div style="color:var(--muted);font-size:13px">No items in this bundle</div>'}
        </div>`;
    }).join("");
}

// ── DROPDOWNS ────────────────────────────────────────────────
function populateDropdowns() {
    const catHtml = CATS.map(c => `<option value="${c.id}">${c.label}</option>`).join("");

    const filterCat = document.getElementById("filterCategory");
    if (filterCat) filterCat.innerHTML = `<option value="all">All Categories</option>` + catHtml;

    const formCat = document.getElementById("formCategory");
    if (formCat) formCat.innerHTML = catHtml;
}

// ── EVENT LISTENERS ──────────────────────────────────────────
function setupEvents() {

    // API Key gate
    document.getElementById("saveGatekeeperKey").onclick = () => {
        const val = document.getElementById("gatekeeperInput")?.value.trim();
        if (!val) return;
        API_KEY = val;
        localStorage.setItem("awl_apikey", val);
        document.getElementById("keyGatekeeper").style.display = "none";
    };
    document.getElementById("skipGateBtn").onclick = () => {
        document.getElementById("keyGatekeeper").style.display = "none";
    };

    // Tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
            btn.classList.add("active");
            const target = document.getElementById(`${btn.dataset.tab}-tab`);
            if (target) target.classList.add("active");
        };
    });

    // Filters (wishlist)
    ["filterCategory", "filterStatus", "filterRarity"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.onchange = renderWishlist;
    });

    // Browse search
    const browseInput = document.getElementById("browseInput");
    let browseDebounce;
    browseInput.addEventListener("input", () => {
        clearTimeout(browseDebounce);
        browseDebounce = setTimeout(() => renderBrowseResults(browseInput.value), 180);
    });
    document.getElementById("clearSearch").onclick = () => {
        browseInput.value = "";
        renderBrowseResults("");
        browseInput.focus();
    };
    document.getElementById("browseFilterCat").onchange    = () => renderBrowseResults(browseInput.value);
    document.getElementById("browseFilterRarity").onchange = () => renderBrowseResults(browseInput.value);

    // Modal open / close
    document.getElementById("openAddBtn").onclick = () => {
        // Clear the "from DB" bar when opening fresh
        const bar = document.getElementById("modalFromDb");
        bar.style.display = "none";
        document.getElementById("modalOverlay").classList.add("open");
    };
    document.getElementById("closeModalBtn").onclick  = () => document.getElementById("modalOverlay").classList.remove("open");
    document.getElementById("modalOverlay").onclick   = (e) => {
        if (e.target === document.getElementById("modalOverlay"))
            document.getElementById("modalOverlay").classList.remove("open");
    };

    // Rarity → cost auto-fill
    const DEF_COSTS = {
        AC: { Common: 400, Rare: 700, Epic: 1000, Legendary: 1800, Heirloom: 6500 },
        CM: { Common: 30,  Rare: 60,  Epic: 400,  Legendary: 1200, Heirloom: 150  },
        Shards: { Common: 0, Rare: 0, Epic: 0, Legendary: 0, Heirloom: 150 },
        Free: { Common: 0, Rare: 0, Epic: 0, Legendary: 0, Heirloom: 0 },
    };
    function autoFillCost() {
        const rarity   = document.getElementById("formRarity").value;
        const currency = document.getElementById("formCurrency").value;
        const costEl   = document.getElementById("formCost");
        const suggested = DEF_COSTS[currency]?.[rarity];
        if (suggested !== undefined) costEl.value = suggested;
        costEl.disabled = (currency === "Free");
    }
    document.getElementById("formRarity").onchange   = autoFillCost;
    document.getElementById("formCurrency").onchange = autoFillCost;

    // Save item from modal
    document.getElementById("saveItemBtn").onclick = () => {
        const nameEl = document.getElementById("formName");
        if (!nameEl.value.trim()) { nameEl.focus(); return; }

        items.push({
            id:       Date.now().toString() + Math.random().toString(36).slice(2),
            name:     nameEl.value.trim(),
            legend:   document.getElementById("formLegend").value.trim(),
            category: document.getElementById("formCategory").value,
            rarity:   document.getElementById("formRarity").value,
            currency: document.getElementById("formCurrency").value,
            cost:     parseInt(document.getElementById("formCost").value) || 0,
            priority: document.getElementById("formPriority").value,
            notes:    document.getElementById("formNotes").value.trim(),
            obtained: false,
        });

        save();

        // Reset form
        nameEl.value = "";
        document.getElementById("formLegend").value = "";
        document.getElementById("formNotes").value  = "";
        document.getElementById("formRarity").value   = "Legendary";
        document.getElementById("formCurrency").value = "AC";
        document.getElementById("formCost").value     = "1800";
        document.getElementById("formPriority").value = "Medium";
        document.getElementById("modalFromDb").style.display = "none";
        document.getElementById("modalOverlay").classList.remove("open");
    };

    // Crafting fetch
    document.getElementById("fetchCraftingBtn").onclick = fetchCrafting;

    // Enter key in API key gate
    document.getElementById("gatekeeperInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("saveGatekeeperKey").click();
    });
}
