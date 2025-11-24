// app.js - Single-file client router for 30 pages (20 realestate + 10 rally)
// Usage: open index.html, change hash e.g. #/prop-01 or #/rally-01

const SIDEBAR = document.getElementById('sidebar');
const MAIN = document.getElementById('main');
const THEME_TOGGLE = document.getElementById('themeToggle');
const DESIGN_SELECT = document.getElementById('designSelect');

const pages = [];

/* --------- 20 RealEstate pages (prop-01 ... prop-20) ---------- */
for(let i=1;i<=20;i++){
  const id = `prop-${String(i).padStart(2,'0')}`;
  pages.push({
    id,
    group: 'realestate',
    title: i===1 ? 'Dashboard' : (i<=6 ? `Property ${i-1} Detail` : `Module ${i}`),
    content: generateRealEstateContent(i)
  });
}

/* --------- 10 Rally pages (rally-01 ... rally-10) ---------- */
for(let i=1;i<=10;i++){
  const id = `rally-${String(i).padStart(2,'0')}`;
  pages.push({
    id,
    group:'rally',
    title: i===1 ? 'Rally Overview' : `Rally Stage ${i}`,
    content: generateRallyContent(i)
  });
}

/* Render sidebar (grouped) */
function renderSidebar(){
  SIDEBAR.innerHTML = '';
  const sections = [
    {key:'realestate', label:'Immobilien (20)'},
    {key:'rally', label:'Rally (10)'}
  ];
  sections.forEach(sec=>{
    const s = document.createElement('div');
    s.className = 'side-section';
    s.innerHTML = `<h3>${sec.label}</h3><div class="nav-list"></div>`;
    const list = s.querySelector('.nav-list');
    pages.filter(p=>p.group===sec.key).forEach(p=>{
      const a = document.createElement('a');
      a.href = `#/${p.id}`;
      a.className = 'nav-item';
      a.innerText = p.title;
      a.dataset.pid = p.id;
      list.appendChild(a);
    });
    SIDEBAR.appendChild(s);
  });

  // mark active on load
  updateActiveNav();
}

/* Router */
function route(){
  const hash = location.hash.replace(/^#\/?/,'') || 'prop-01';
  const page = pages.find(p=>p.id===hash) || pages[0];
  renderPage(page);
  updateActiveNav();
}

function updateActiveNav(){
  const items = document.querySelectorAll('.nav-item');
  items.forEach(it=>{
    it.classList.toggle('active', it.dataset.pid === (location.hash.replace(/^#\/?/,'') || 'prop-01'));
  });
}

/* Render page content */
function renderPage(page){
  document.title = `Template — ${page.title}`;
  MAIN.innerHTML = `<div class="card"><h2>${page.title}</h2>${page.content}</div>`;
  // attach any dynamic behaviors inside page (links are editable easily)
  attachPageBehaviors();
}

/* Utilities to generate sample content for pages */
function generateRealEstateContent(i){
  // create a few distinct templates by index
  if(i===1){
    return `
      <p class="muted">Property Management Dashboard</p>
      <div class="kv">
        <div class="k">Total properties</div><div class="v">128</div>
        <div class="k">Occupied</div><div class="v">102</div>
        <div class="k">Available</div><div class="v">26</div>
      </div>
      <hr/>
      <h3>Quick Actions</h3>
      <div class="hrow" style="margin-top:10px">
        <a class="rect-btn" href="#/prop-02">Property list</a>
        <a class="rect-btn" href="#/prop-05">Create invoice</a>
        <a class="rect-btn" href="#/prop-08">Open maintenance</a>
      </div>
      <p class="muted" style="margin-top:12px">Hinweis: Links sind Hash-Routen — wenn du echte URLs willst, ersetze hrefs.</p>
    `;
  }
  // property detail pages
  if(i<=6){
    const propId = i-1;
    return `
      <p class="muted">Immobilie: Objekt #${propId}</p>
      <div class="kv" style="margin-top:10px">
        <div class="k">Adresse</div><div class="v">Straße ${propId}, 12345 Stadt</div>
        <div class="k">Typ</div><div class="v">Mehrfamilienhaus</div>
        <div class="k">Größe</div><div class="v">${80+propId*5} m²</div>
      </div>
      <hr/>
      <h3>Wohnungen</h3>
      <ul>
        <li>Whg A – frei – <a class="rect-btn" href="#/prop-10">Details</a></li>
        <li>Whg B – vermietet – <a class="rect-btn" href="#/prop-11">Mieter</a></li>
      </ul>
      <h3>Dokumente</h3>
      <p class="muted">Rechnungen, Verträge, Fotos</p>
      <a class="rect-btn" href="#" data-edit-link>Editiere Link</a>
    `;
  }
  // modules (analytics, invoices, calendar, maintenance, contacts...)
  const modules = [
    'Instandhaltung & Workorders',
    'Mieter-Management',
    'Finanzen & Rechnungen',
    'Vertragsverwaltung',
    'Asset-Analytics',
    'Reporting & Exporte',
    'Kalender & Termine',
    'Dokumenten-Archiv',
    'Tasks & ToDos',
    'Energie & Verbrauch'
  ];
  const name = modules[(i-7) % modules.length] || `Modul ${i}`;
  return `
    <p class="muted">${name}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px">
      <div class="card">
        <h4>Übersicht</h4>
        <p class="muted">Kurzstatistiken und KPI.</p>
      </div>
      <div class="card">
        <h4>Letzte Einträge</h4>
        <ul>
          <li>Eintrag A</li>
          <li>Eintrag B</li>
          <li>Eintrag C</li>
        </ul>
      </div>
    </div>
    <div style="margin-top:12px">
      <a class="rect-btn" href="#/prop-01">Zurück zum Dashboard</a>
    </div>
  `;
}

/* Rally content generator - distinctive style in CSS when theme = rally */
function generateRallyContent(i){
  if(i===1){
    return `
      <p class="muted">Rally Übersicht – Teams, Stages, Leaderboard</p>
      <div class="hrow" style="margin-top:10px">
        <a class="rect-btn" href="#/rally-02">Stages</a>
        <a class="rect-btn" href="#/rally-03">Teams</a>
        <a class="rect-btn" href="#/rally-04">Live Telemetry</a>
      </div>
      <div style="margin-top:12px" class="card">
        <h4>Leaderboard</h4>
        <ol><li>Team A — 1:23:45</li><li>Team B — 1:24:11</li></ol>
      </div>
    `;
  }
  return `
    <p class="muted">Rally Stage ${i}</p>
    <div class="card" style="margin-top:10px">
      <h4>Stage Details</h4>
      <div class="kv">
        <div class="k">Distance</div><div class="v">${5 + i*2} km</div>
        <div class="k">Surface</div><div class="v">${i%2 ? 'Gravel' : 'Tarmac'}</div>
      </div>
      <div style="margin-top:10px">
        <a class="rect-btn" href="#/rally-01">Zurück zur Übersicht</a>
        <a class="rect-btn" href="#" data-edit-link>Edit Link</a>
      </div>
    </div>
  `;
}

/* attach behaviors (theme, link-editing, etc) */
function attachPageBehaviors(){
  // Edit-link buttons: open mini prompt to change href
  document.querySelectorAll('[data-edit-link]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault();
      const el = e.currentTarget;
      const current = el.getAttribute('href') || '#';
      const newUrl = prompt('Setze Ziel-URL (z. B. https://example.com) oder Hash (#/prop-02):', current);
      if(newUrl !== null){
        el.setAttribute('href', newUrl);
        alert('Link gesetzt: ' + newUrl);
      }
    });
  });
}

/* theme / design handling */
function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  DESIGN_SELECT.value = theme;
}

/* event listeners */
window.addEventListener('hashchange', route);
THEME_TOGGLE.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') || 'realestate';
  setTheme(current === 'realestate' ? 'rally' : 'realestate');
});
DESIGN_SELECT.addEventListener('change', (e)=>{
  setTheme(e.target.value);
});

/* initial render */
renderSidebar();
setTheme('realestate'); // default
route();
