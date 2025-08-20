
(() => {
  const DB = window.EDUCANET_DATA || {};
  const cardsEl = document.getElementById('cards');
  const featuredEl = document.getElementById('featured');
  const searchEl = document.getElementById('search');
  const sortEl = document.getElementById('sort');
  const filters = [...document.querySelectorAll('.filter')];
  const btnTheme = document.getElementById('btn-theme');
  const btnAccent = document.getElementById('btn-accent');
  const toTop = document.getElementById('toTop');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBadge = document.getElementById('modalBadge');
  const modalLink = document.getElementById('modalLink');
  const favBtn = document.getElementById('favBtn');

  const meta = {
    "Aritmética": {cat:["Ciencias"], badge:"Cálculo"},
    "Álgebra": {cat:["Ciencias"], badge:"Ecuaciones"},
    "Geometría": {cat:["Ciencias"], badge:"Figuras"},
    "Trigonometría": {cat:["Ciencias"], badge:"Ángulos"},
    "Razonamiento Matemático": {cat:["Razonamiento","Ciencias"], badge:"Heurísticas"},
    "Razonamiento Lógico": {cat:["Razonamiento","Letras"], badge:"Lógica"},
    "Física": {cat:["Ciencias"], badge:"Fenómenos"},
    "Química": {cat:["Ciencias"], badge:"Reacciones"},
    "Biología": {cat:["Ciencias"], badge:"Vida"},
    "Razonamiento Verbal": {cat:["Razonamiento","Letras"], badge:"Comprensión"},
    "Gramática": {cat:["Letras"], badge:"Normas"},
    "Literatura": {cat:["Letras"], badge:"Obras"},
    "Economía": {cat:["Ciencias"], badge:"Recursos"},
    "Geografía y Cívica": {cat:["Letras"], badge:"Ciudadanía"},
    "Historia del Perú": {cat:["Letras"], badge:"Historia"},
    "Obras Literarias (Resúmenes)": {cat:["Letras"], badge:"Resúmenes"}
  };

  const desc = {
    "Aritmética":"Operaciones, problemas y trucos de cálculo para dominar la base numérica.",
    "Álgebra":"Ecuaciones, polinomios y técnicas para modelar y resolver.",
    "Geometría":"Figuras, áreas y teoremas con enfoque visual.",
    "Trigonometría":"Razones trigonométricas, identidades y aplicaciones.",
    "Razonamiento Matemático":"Estrategias y heurísticas para pensar matemáticamente.",
    "Razonamiento Lógico":"Lógica proposicional, tablas de verdad y argumentos.",
    "Física":"Mecánica, ondas, electricidad y más con ejercicios.",
    "Química":"Estructura, reacciones y resolución de problemas.",
    "Biología":"Procesos biológicos y comprensión de la vida.",
    "Razonamiento Verbal":"Comprensión lectora, sinónimos, antónimos e inferencias.",
    "Gramática":"Normas, sintaxis y morfología del español.",
    "Literatura":"Géneros, autores y análisis de obras.",
    "Economía":"Conceptos y problemas económicos aplicados.",
    "Geografía y Cívica":"Espacio geográfico, ciudadanía y normas.",
    "Historia del Perú":"Procesos históricos y personajes clave.",
    "Obras Literarias (Resúmenes)":"Resúmenes descargables de obras clásicas."
  };

  const icons = {
    "Aritmética":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f522.svg",
    "Álgebra":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ee.svg",
    "Geometría":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d0.svg",
    "Trigonometría":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c8.svg",
    "Razonamiento Matemático":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e0.svg",
    "Razonamiento Lógico":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5a5.svg",
    "Física":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26a1.svg",
    "Química":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2697.svg",
    "Biología":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f331.svg",
    "Razonamiento Verbal":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4ac.svg",
    "Gramática":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58a.svg",
    "Literatura":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg",
    "Economía":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b0.svg",
    "Geografía y Cívica":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30e.svg",
    "Historia del Perú":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ed.svg",
    "Obras Literarias (Resúmenes)":"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d3.svg"
  };

  const storageKey = 'educanet:favs';
  const getFavs = () => new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  const saveFavs = set => localStorage.setItem(storageKey, JSON.stringify([...set]));

  function createCard(name, url){
    const article = document.createElement('article');
    article.className = 'card';
    article.tabIndex = 0;
    article.setAttribute('role','button');
    article.setAttribute('aria-label', `Abrir detalle: ${name}`);
    article.innerHTML = `
      <span class="badge">${(meta[name]?.badge) || 'Curso'}</span>
      <img alt="${name}" width="36" height="36" loading="lazy" src="${icons[name] || icons['Razonamiento Verbal']}" />
      <h3>${name}</h3>
      <p>${desc[name] || 'Recurso académico'}</p>
      <div class="actions">
        <a class="btn" href="${url}" target="_blank" rel="noopener">Abrir carpeta</a>
        <button class="btn btn--ghost btn-detail">Detalle</button>
      </div>
    `;
    function openDetail(){ openModal(name, url); }
    article.addEventListener('click', (e)=>{ if(!(e.target.closest('a'))) openDetail(); });
    article.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') openDetail(); });
    return article;
  }

  function render(list){
    cardsEl.innerHTML = "";
    list.forEach(([name, url]) => cardsEl.appendChild(createCard(name, url)));
    attachReveal();
  }

  const entries = Object.entries(DB);
  render(entries);

  function renderFeatured(){
    const favs = getFavs();
    const favItems = entries.filter(([k]) => favs.has(k));
    const initial = entries.slice(0,4);
    const combined = [...new Map([...favItems, ...initial]).entries()].slice(0,6);
    featuredEl.innerHTML = "";
    combined.forEach(([name, url]) => {
      const mini = document.createElement('article');
      mini.className = 'card';
      mini.innerHTML = `
        <span class="badge">Destacado</span>
        <h3>${name}</h3>
        <p>${desc[name]}</p>
        <div class="actions"><a class="btn" href="${url}" target="_blank" rel="noopener">Ir</a></div>
      `;
      featuredEl.appendChild(mini);
    });
  }
  renderFeatured();

  function normalize(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
  function applyFilters(){
    let list = entries.slice();
    const q = normalize(searchEl.value || '');
    if(q) list = list.filter(([k]) => normalize(k).includes(q));
    const active = filters.filter(f=>f.checked).map(f=>f.value);
    if(active.length){
      list = list.filter(([k]) => (meta[k]?.cat || []).some(c=>active.includes(c)));
    }
    const sort = sortEl.value;
    list.sort((a,b)=> a[0].localeCompare(b[0]));
    if(sort==='za') list.reverse();
    render(list);
  }
  searchEl.addEventListener('input', applyFilters);
  filters.forEach(f=>f.addEventListener('change', applyFilters));
  sortEl.addEventListener('change', applyFilters);

  let light = window.matchMedia('(prefers-color-scheme: light)').matches;
  function setTheme(val){
    document.documentElement.classList.toggle('light', val);
    btnTheme.textContent = val ? 'Modo oscuro' : 'Modo claro';
  }
  setTheme(light);
  btnTheme.addEventListener('click', ()=>{ light = !light; setTheme(light); });

  const accents = ['#22d3ee','#60a5fa','#a78bfa','#34d399','#f59e0b','#f43f5e'];
  let idx = 0;
  function setAccent(c){ document.documentElement.style.setProperty('--accent', c); }
  btnAccent.addEventListener('click', ()=>{ idx = (idx+1)%accents.length; setAccent(accents[idx]); });

  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) toTop.classList.add('show'); else toTop.classList.remove('show');
  });
  toTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

  function openModal(name, url){
    modalTitle.textContent = name;
    modalDesc.textContent = desc[name] || 'Recurso académico';
    modalBadge.textContent = (meta[name]?.cat || []).join(' · ') || 'Curso';
    modalLink.href = url;
    const favs = getFavs();
    favBtn.textContent = favs.has(name) ? '★ Quitar de Favoritos' : '★ Favorito';
    modal.showModal();
  }
  modalClose.addEventListener('click', ()=>modal.close());
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.close(); });
  favBtn.addEventListener('click', ()=>{
    const name = modalTitle.textContent;
    const favs = getFavs();
    if(favs.has(name)) favs.delete(name); else favs.add(name);
    saveFavs(favs);
    favBtn.textContent = favs.has(name) ? '★ Quitar de Favoritos' : '★ Favorito';
    renderFeatured();
  });

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.style.transform='translateY(0)'; e.target.style.opacity='1'; observer.unobserve(e.target); }
    });
  }, {threshold:.06});
  function attachReveal(){
    document.querySelectorAll('.card').forEach(el=>{
      el.style.transform='translateY(14px)'; el.style.opacity='.001'; el.style.transition='all .5s ease';
      observer.observe(el);
    });
  }
  attachReveal();

})();
