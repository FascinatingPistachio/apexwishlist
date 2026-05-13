// ============================================================
//  APEX WISHLIST — SKIN DATABASE
//  Used by Fuse.js for fuzzy search in Browse tab
//  Portrait images: tracker.gg CDN (legend slug → lowercase)
// ============================================================

const LEGEND_IMG = (slug) =>
    `https://trackercdn.com/cdn/apex.tracker.gg/legends/small/${slug}.png`;

const ITEMS_DB = [

// ── LEGENDS (unlock) ──────────────────────────────────────
{id:"l_wraith",    name:"Wraith",       legend:"Wraith",       cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("wraith"),    tags:["phase","void","skirmisher"]},
{id:"l_lifeline",  name:"Lifeline",     legend:"Lifeline",     cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("lifeline"),  tags:["medic","heal","support","doc"]},
{id:"l_bloodhound",name:"Bloodhound",   legend:"Bloodhound",   cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("bloodhound"),tags:["tracker","hunter","recon"]},
{id:"l_pathfinder",name:"Pathfinder",   legend:"Pathfinder",   cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("pathfinder"),tags:["grapple","forward scout","robot"]},
{id:"l_gibraltar", name:"Gibraltar",    legend:"Gibraltar",    cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("gibraltar"), tags:["shield","dome","defensive"]},
{id:"l_bangalore", name:"Bangalore",    legend:"Bangalore",    cat:"legend", rarity:"Common",    cost:0,    currency:"Included",   img:LEGEND_IMG("bangalore"), tags:["smoke","soldier","offensive"]},
{id:"l_caustic",   name:"Caustic",      legend:"Caustic",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("caustic"),   tags:["gas","trap","defensive","toxic"]},
{id:"l_mirage",    name:"Mirage",       legend:"Mirage",       cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("mirage"),    tags:["decoy","bamboozle","skirmisher"]},
{id:"l_octane",    name:"Octane",       legend:"Octane",       cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("octane"),    tags:["speed","stim","skirmisher"]},
{id:"l_wattson",   name:"Wattson",      legend:"Wattson",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("wattson"),   tags:["fence","pylon","defensive","electricity"]},
{id:"l_crypto",    name:"Crypto",       legend:"Crypto",       cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("crypto"),    tags:["drone","hack","recon","surveillance"]},
{id:"l_revenant",  name:"Revenant",     legend:"Revenant",     cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("revenant"),  tags:["silence","totem","skirmisher","simulacrum"]},
{id:"l_loba",      name:"Loba",         legend:"Loba",         cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("loba"),      tags:["supply","teleport","support","thief"]},
{id:"l_rampart",   name:"Rampart",      legend:"Rampart",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("rampart"),   tags:["sheila","cover","defensive","turret"]},
{id:"l_horizon",   name:"Horizon",      legend:"Horizon",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("horizon"),   tags:["gravity","black hole","skirmisher","space"]},
{id:"l_fuse",      name:"Fuse",         legend:"Fuse",         cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("fuse"),      tags:["grenade","explosive","offensive","aussie"]},
{id:"l_valkyrie",  name:"Valkyrie",     legend:"Valkyrie",     cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("valkyrie"),  tags:["missile","fly","recon","valk"]},
{id:"l_seer",      name:"Seer",         legend:"Seer",         cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("seer"),      tags:["heartseeker","focus","recon"]},
{id:"l_ash",       name:"Ash",          legend:"Ash",          cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("ash"),       tags:["snare","phase","skirmisher","simulacrum"]},
{id:"l_maggie",    name:"Mad Maggie",   legend:"Mad Maggie",   cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("madmaggie"), tags:["wrecking ball","riot","offensive","aussie"]},
{id:"l_newcastle", name:"Newcastle",    legend:"Newcastle",    cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("newcastle"), tags:["shield","knight","defensive","support"]},
{id:"l_vantage",   name:"Vantage",      legend:"Vantage",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("vantage"),   tags:["sniper","bullet","recon"]},
{id:"l_catalyst",  name:"Catalyst",     legend:"Catalyst",     cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("catalyst"),  tags:["ferrofluid","wall","defensive"]},
{id:"l_ballistic", name:"Ballistic",    legend:"Ballistic",    cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("ballistic"), tags:["ammo","sling","support","old soldier"]},
{id:"l_conduit",   name:"Conduit",      legend:"Conduit",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("conduit"),   tags:["shield","recharge","support"]},
{id:"l_alter",     name:"Alter",        legend:"Alter",        cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("alter"),     tags:["void","phase","skirmisher"]},
{id:"l_sparrow",   name:"Sparrow",      legend:"Sparrow",      cat:"legend", rarity:"Rare",      cost:750,  currency:"AC",         img:LEGEND_IMG("sparrow"),   tags:["recon","trap"]},

// ── HEIRLOOMS ─────────────────────────────────────────────
{id:"h_wraith",    name:"Kunai",              legend:"Wraith",      cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("wraith"),    tags:["heirloom","knife","dagger","kunai"]},
{id:"h_lifeline",  name:"Shock Sticks",       legend:"Lifeline",    cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("lifeline"),  tags:["heirloom","shock","drum","sticks"]},
{id:"h_bloodhound",name:"Raven's Bite",       legend:"Bloodhound",  cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("bloodhound"),tags:["heirloom","axe","raven"]},
{id:"h_pathfinder",name:"Boxing Gloves",      legend:"Pathfinder",  cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("pathfinder"),tags:["heirloom","gloves","boxing","punch"]},
{id:"h_octane",    name:"Butterfly Knife",    legend:"Octane",      cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("octane"),    tags:["heirloom","butterfly","knife","balisong"]},
{id:"h_bangalore", name:"Cold Steel",         legend:"Bangalore",   cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("bangalore"), tags:["heirloom","knife","blade"]},
{id:"h_caustic",   name:"Death Hammer",       legend:"Caustic",     cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("caustic"),   tags:["heirloom","hammer"]},
{id:"h_mirage",    name:"Too Much Witt",      legend:"Mirage",      cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("mirage"),    tags:["heirloom","cocktail","shaker","witt"]},
{id:"h_gibraltar", name:"Shining Example",    legend:"Gibraltar",   cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("gibraltar"), tags:["heirloom","hammer","trophy"]},
{id:"h_wattson",   name:"Energy Reader",      legend:"Wattson",     cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("wattson"),   tags:["heirloom","device","energy"]},
{id:"h_crypto",    name:"Biwon Blade",        legend:"Crypto",      cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("crypto"),    tags:["heirloom","blade","sword","korean"]},
{id:"h_loba",      name:"Garra de Alanza",    legend:"Loba",        cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("loba"),      tags:["heirloom","whip","chain","garra"]},
{id:"h_revenant",  name:"Dead Man's Curve",   legend:"Revenant",    cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("revenant"),  tags:["heirloom","scythe","sickle"]},
{id:"h_rampart",   name:"Energy Skewer",      legend:"Rampart",     cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("rampart"),   tags:["heirloom","spear","energy"]},
{id:"h_horizon",   name:"Void Baton",         legend:"Horizon",     cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("horizon"),   tags:["heirloom","staff","baton","void"]},
{id:"h_fuse",      name:"The Motherlode",     legend:"Fuse",        cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("fuse"),      tags:["heirloom","grenade","bomb"]},
{id:"h_valkyrie",  name:"VALK",               legend:"Valkyrie",    cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("valkyrie"),  tags:["heirloom","fan","shuriken","valk"]},
{id:"h_seer",      name:"Showstopper",        legend:"Seer",        cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("seer"),      tags:["heirloom","staff","cane"]},
{id:"h_ash",       name:"War Club",           legend:"Ash",         cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("ash"),       tags:["heirloom","club","war","blade"]},
{id:"h_maggie",    name:"Wrecking Ball",      legend:"Mad Maggie",  cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("madmaggie"), tags:["heirloom","chain","ball","wrecking"]},
{id:"h_newcastle", name:"Whistler",           legend:"Newcastle",   cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("newcastle"), tags:["heirloom","whip","shield"]},
{id:"h_vantage",   name:"Sniper's Mark",      legend:"Vantage",     cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("vantage"),   tags:["heirloom","blade","knife","sniper"]},
{id:"h_catalyst",  name:"Death's Gambit",     legend:"Catalyst",    cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("catalyst"),  tags:["heirloom","scythe","ferrofluid"]},
{id:"h_ballistic", name:"The Highlife",       legend:"Ballistic",   cat:"melee", rarity:"Heirloom", cost:150, currency:"Shards", img:LEGEND_IMG("ballistic"), tags:["heirloom","cane","golf","club"]},

// ── LEGEND SKINS – LEGENDARY ──────────────────────────────
{id:"sk_wr_vp",  name:"Void Prowler",        legend:"Wraith",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["void","prowler","collection event"]},
{id:"sk_wr_q7",  name:"Quarantine 722",      legend:"Wraith",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["haz-mat","quarantine","blue"]},
{id:"sk_wr_ph",  name:"Phasewalker",         legend:"Wraith",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["phase","walker","gold"]},
{id:"sk_wr_eth", name:"Ethereal Hunter",     legend:"Wraith",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["ethereal","hunter"]},
{id:"sk_wr_aa",  name:"Airship Assassin",    legend:"Wraith",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["collection event","ship","assassin"]},

{id:"sk_ll_rr",  name:"Rapid Responder",     legend:"Lifeline",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("lifeline"),  tags:["rapid","responder","medic"]},
{id:"sk_ll_ahs", name:"Angels Have Sins",    legend:"Lifeline",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("lifeline"),  tags:["collection event","angel","sins"]},
{id:"sk_ll_cm",  name:"Cyber Medic",         legend:"Lifeline",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("lifeline"),  tags:["cyber","medic","neon"]},
{id:"sk_ll_th",  name:"True Healer",         legend:"Lifeline",    cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("lifeline"),  tags:["true","healer","craft"]},

{id:"sk_bh_iw",  name:"Imperial Warrior",    legend:"Bloodhound",  cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("bloodhound"),tags:["imperial","warrior","collection event"]},
{id:"sk_bh_cen", name:"The Centurion",       legend:"Bloodhound",  cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("bloodhound"),tags:["centurion","roman","collection event"]},
{id:"sk_bh_ownd",name:"Old Ways New Dawn",   legend:"Bloodhound",  cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("bloodhound"),tags:["old ways","new dawn","collection event"]},
{id:"sk_bh_pd",  name:"Plague Doctor",       legend:"Bloodhound",  cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("bloodhound"),tags:["plague","doctor","mask"]},

{id:"sk_pf_af",  name:"Alexander's Finest",  legend:"Pathfinder",  cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("pathfinder"),tags:["alexander","finest","collection event"]},
{id:"sk_pf_sw",  name:"Sweetheart",          legend:"Pathfinder",  cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("pathfinder"),tags:["sweetheart","pink","heart"]},

{id:"sk_gb_ox",  name:"Organdy X",           legend:"Gibraltar",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("gibraltar"), tags:["organdy","collection event"]},
{id:"sk_gb_td",  name:"Top Dog",             legend:"Gibraltar",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("gibraltar"), tags:["top dog","wolf"]},

{id:"sk_bg_ach", name:"Angel City Hustler",  legend:"Bangalore",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("bangalore"), tags:["angel city","hustler","collection event"]},
{id:"sk_bg_hs",  name:"Heat Sink",           legend:"Bangalore",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("bangalore"), tags:["heat sink","collection event","nuclear"]},
{id:"sk_bg_fmj", name:"Full Metal Jacket",   legend:"Bangalore",   cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("bangalore"), tags:["full metal jacket","military","camo"]},

{id:"sk_ca_bh",  name:"Blackheart",          legend:"Caustic",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("caustic"),   tags:["blackheart","collection event","black"]},
{id:"sk_ca_6s",  name:"Sixth Sense",         legend:"Caustic",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("caustic"),   tags:["sixth sense","purple"]},
{id:"sk_ca_ck",  name:"Chemical Knight",     legend:"Caustic",     cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("caustic"),   tags:["chemical","knight","medieval"]},

{id:"sk_mg_ls",  name:"Laguna Sunrise",      legend:"Mirage",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("mirage"),    tags:["laguna","sunrise","collection event","resort"]},
{id:"sk_mg_wc",  name:"Wisecracker",         legend:"Mirage",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("mirage"),    tags:["wisecracker","collection event","jester"]},
{id:"sk_mg_br",  name:"Birthright",          legend:"Mirage",      cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("mirage"),    tags:["birthright","craft","gold"]},

{id:"sk_oc_ed",  name:"El Diablo",           legend:"Octane",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("octane"),    tags:["el diablo","devil","collection event","red"]},
{id:"sk_oc_jt",  name:"Jade Tiger",          legend:"Octane",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("octane"),    tags:["jade","tiger","collection event","green"]},
{id:"sk_oc_lg",  name:"Lifeguard",           legend:"Octane",      cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("octane"),    tags:["lifeguard","beach","bay watch"]},

{id:"sk_wt_fg",  name:"Fool's Gold",         legend:"Wattson",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wattson"),   tags:["fool's gold","collection event","gold"]},
{id:"sk_wt_se",  name:"Static Electricity",  legend:"Wattson",     cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("wattson"),   tags:["static","electricity","neon","craft"]},

{id:"sk_cr_nn",  name:"Neural Network",      legend:"Crypto",      cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("crypto"),    tags:["neural network","neon","collection event","cyber"]},

{id:"sk_rv_ss",  name:"Shadow on the Sun",   legend:"Revenant",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("revenant"),  tags:["shadow","sun","collection event","fire"]},
{id:"sk_rv_dbd", name:"Death By Daylight",   legend:"Revenant",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("revenant"),  tags:["dead by daylight","collab","dbd"]},
{id:"sk_rv_as",  name:"Assimilated",         legend:"Revenant",    cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("revenant"),  tags:["assimilated","robot","craft"]},

{id:"sk_lb_me",  name:"Mistress of Evil",    legend:"Loba",        cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("loba"),      tags:["mistress","evil","collection event","horns"]},
{id:"sk_lb_of",  name:"Opulent Forces",      legend:"Loba",        cat:"legend_skin", rarity:"Legendary", cost:1200, currency:"CM", img:LEGEND_IMG("loba"),      tags:["opulent","forces","gold","craft"]},

{id:"sk_rp_kc",  name:"Kill Code",           legend:"Rampart",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("rampart"),   tags:["kill code","collection event","neon"]},
{id:"sk_hz_pv",  name:"Polar Vortex",        legend:"Horizon",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("horizon"),   tags:["polar vortex","collection event","ice"]},
{id:"sk_fz_ls",  name:"Last Soldier Standing",legend:"Fuse",       cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("fuse"),      tags:["last soldier","collection event","war"]},
{id:"sk_vk_kb",  name:"Killer Bee",          legend:"Valkyrie",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("valkyrie"),  tags:["killer bee","collection event","yellow"]},
{id:"sk_sr_az",  name:"Aztec",               legend:"Seer",        cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("seer"),      tags:["aztec","collection event","gold","ancient"]},
{id:"sk_ah_dg",  name:"Demon's Gambit",      legend:"Ash",         cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("ash"),       tags:["demon","gambit","collection event","red"]},
{id:"sk_mm_dbd", name:"Death Before Dishonor",legend:"Mad Maggie", cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("madmaggie"), tags:["death before dishonor","collection event","tattoo"]},
{id:"sk_nc_ti",  name:"Titan",               legend:"Newcastle",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("newcastle"), tags:["titan","mech","collection event"]},
{id:"sk_vg_aa",  name:"Ace of Aces",         legend:"Vantage",     cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("vantage"),   tags:["ace of aces","collection event","pilot"]},
{id:"sk_ct_hx",  name:"Hexadecimal",         legend:"Catalyst",    cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("catalyst"),  tags:["hexadecimal","collection event","cyber","neon"]},
{id:"sk_bl_ga",  name:"Gilded Age",          legend:"Ballistic",   cat:"legend_skin", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("ballistic"), tags:["gilded","age","collection event","gold","victorian"]},

// ── LEGEND SKINS – EPIC ───────────────────────────────────
{id:"sk_wr_e1",  name:"The Liberator",       legend:"Wraith",      cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("wraith"),    tags:["liberator","craft","purple"]},
{id:"sk_ll_e1",  name:"Vital Signs",         legend:"Lifeline",    cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("lifeline"),  tags:["vital","signs","teal"]},
{id:"sk_bh_e1",  name:"Apex Predator",       legend:"Bloodhound",  cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("bloodhound"),tags:["apex predator","purple"]},
{id:"sk_oc_e1",  name:"Speed Demon",         legend:"Octane",      cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("octane"),    tags:["speed","demon","red","craft"]},
{id:"sk_bg_e1",  name:"Outland Warrior",     legend:"Bangalore",   cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("bangalore"), tags:["outland","warrior","craft"]},
{id:"sk_pf_e1",  name:"Quicksilver",         legend:"Pathfinder",  cat:"legend_skin", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("pathfinder"),tags:["quicksilver","chrome","craft"]},

// ── WEAPON SKINS – LEGENDARY ──────────────────────────────
{id:"w_r301_gt", name:"Gold R-301",              weapon:"R-301",         cat:"weapon_skin", rarity:"Legendary", cost:1800, currency:"AC",  img:null, tags:["gold","r301","carbine","craft"]},
{id:"w_wm_tr",   name:"The Ramp",                weapon:"Wingman",       cat:"weapon_skin", rarity:"Legendary", cost:1800, currency:"AC",  img:null, tags:["wingman","ramp","gold","coloured"]},
{id:"w_wm_gd",   name:"Gold Wingman",            weapon:"Wingman",       cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["wingman","gold","craft"]},
{id:"w_pk_gd",   name:"Gold Peacekeeper",        weapon:"Peacekeeper",   cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["peacekeeper","gold","shotgun"]},
{id:"w_r99_gd",  name:"Gold R-99",               weapon:"R-99",         cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["r99","gold","smg","craft"]},
{id:"w_dev_gd",  name:"Gold Devotion",           weapon:"Devotion",      cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["devotion","gold","lmg","craft"]},
{id:"w_mst_gd",  name:"Gold Mastiff",            weapon:"Mastiff",       cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["mastiff","gold","shotgun","craft"]},
{id:"w_hem_gd",  name:"Gold Hemlock",            weapon:"Hemlock",       cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["hemlock","gold","ar","craft"]},
{id:"w_volt_gd", name:"Gold Volt",               weapon:"Volt SMG",      cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["volt","smg","gold","craft"]},
{id:"w_pro_gd",  name:"Gold Prowler",            weapon:"Prowler",       cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["prowler","smg","gold","craft"]},
{id:"w_car_gd",  name:"Gold C.A.R.",             weapon:"C.A.R. SMG",    cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["car","smg","gold","craft"]},
{id:"w_lstar_gd",name:"Gold L-STAR",             weapon:"L-STAR",        cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["lstar","emg","gold","craft"]},
{id:"w_mp_gd",   name:"Gold Mozambique",         weapon:"Mozambique",    cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["mozambique","pistol","gold","craft","cheeky"]},
{id:"w_30_gd",   name:"Gold 30-30 Repeater",     weapon:"30-30 Repeater",cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["3030","repeater","gold","craft"]},
{id:"w_ch_gd",   name:"Gold Charge Rifle",       weapon:"Charge Rifle",  cat:"weapon_skin", rarity:"Legendary", cost:1200, currency:"CM",  img:null, tags:["charge rifle","sniper","gold","craft"]},

// ── OTHER COSMETICS ────────────────────────────────────────
{id:"o_hs_ws_1", name:"Wraith - Phase Breach",   legend:"Wraith",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["holospray","spray","wraith"]},
{id:"o_hs_bh_1", name:"Bloodhound - For the Allfather",legend:"Bloodhound",cat:"other",rarity:"Epic",   cost:400,  currency:"CM", img:LEGEND_IMG("bloodhound"),tags:["holospray","spray","bloodhound"]},
{id:"o_hs_oc_1", name:"Octane - Stimming",       legend:"Octane",      cat:"other", rarity:"Epic",      cost:400,  currency:"CM", img:LEGEND_IMG("octane"),    tags:["holospray","spray","octane","stim"]},
{id:"o_em_wr_1", name:"Wraith - Phase Dance",    legend:"Wraith",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["emote","dance","wraith","skydive"]},
{id:"o_em_oc_1", name:"Octane - Backflip",       legend:"Octane",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("octane"),    tags:["emote","backflip","octane","skydive"]},
{id:"o_em_mg_1", name:"Mirage - Cup O' Joe",     legend:"Mirage",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("mirage"),    tags:["emote","coffee","mirage","victory"]},
{id:"o_mu_1",    name:"Apex Legends Main Theme", legend:"",            cat:"other", rarity:"Rare",       cost:700,  currency:"AC", img:null,                    tags:["music","pack","lobby","main theme"]},
{id:"o_mu_2",    name:"Stories from the Outlands",legend:"",           cat:"other", rarity:"Rare",       cost:700,  currency:"AC", img:null,                    tags:["music","pack","lobby","stories outlands"]},
{id:"o_bn_1",    name:"Champion Banner Frame",   legend:"",            cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:null,                    tags:["banner","frame","champion"]},
{id:"o_bn_2",    name:"Apex Predator Frame",     legend:"",            cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:null,                    tags:["banner","frame","predator","rank"]},
{id:"o_ch_1",    name:"Wraith Phase Charm",      legend:"Wraith",      cat:"other", rarity:"Epic",       cost:400,  currency:"CM", img:LEGEND_IMG("wraith"),    tags:["charm","weapon","wraith","phase"]},
{id:"o_ch_2",    name:"Heirloom Shard Charm",    legend:"",            cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:null,                    tags:["charm","heirloom","shard"]},
{id:"o_ld_1",    name:"Wraith Loading Screen",   legend:"Wraith",      cat:"other", rarity:"Rare",       cost:700,  currency:"AC", img:LEGEND_IMG("wraith"),    tags:["loading","screen","wraith"]},
{id:"o_ld_2",    name:"Bloodhound Loading Screen",legend:"Bloodhound", cat:"other", rarity:"Rare",       cost:700,  currency:"AC", img:LEGEND_IMG("bloodhound"),tags:["loading","screen","bloodhound"]},
{id:"o_fn_oc_1", name:"Octane - Freerunner",     legend:"Octane",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("octane"),    tags:["finisher","execute","octane"]},
{id:"o_fn_wr_1", name:"Wraith - Into the Void",  legend:"Wraith",      cat:"other", rarity:"Legendary", cost:1800, currency:"AC", img:LEGEND_IMG("wraith"),    tags:["finisher","execute","wraith","void"]},

];
