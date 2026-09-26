const translations = {
  hr: {
    'brand.name':'VROTA POJA','nav.apartments':'STANOVI','nav.pricelist':'CJENIK','nav.location':'LOKACIJA','nav.contact':'KONTAKT',
    'hero.eyebrow':'VROTA POJA / STARI GRAD','hero.title':'Stanovi','hero.slogan':'Moderno stanovanje<br>u srcu povijesti.','hero.intro':'Pažljivo osmišljeni stanovi sa suvremenom arhitekturom, privatnim vanjskim prostorima i mediteranskim načinom života.',
    'filters.all':'SVI STANOVI','filters.ground':'PRIZEMLJE','filters.first':'1. KAT','filters.second':'2. KAT','filters.location':'LOKACIJA',
    'floor.ground':'PRIZEMLJE','floor.first':'1. KAT','floor.second':'2. KAT','net':'(neto)','view':'POGLEDAJ TLOCRT','variants':'2 varijante tlocrta','sold':'PRODANO',
    'break.bedroom':'Mir u<br>svakom detalju.','break.bathroom':'Suvremena<br>udobnost.','location.eyebrow':'LOKACIJA','location.title':'Stari Grad,<br>Hvar','location.text':'Na ulazu u starogradsko polje, nekoliko minuta hoda od rive i povijesne jezgre.',
    'pricelist.eyebrow':'CJENIK','pricelist.title':'Cjenik','pricelist.open':'OTVORI CJENIK','price.status':'STATUS','price.apartment':'STAN','price.parking':'PARKING',
    'contact.eyebrow':'KONTAKT','contact.title':'Kontaktirajte nas','contact.text':'Rado ćemo odgovoriti na vaša pitanja i pomoći vam pronaći savršen stan.','contact.email':'E-MAIL',
    'footer.rights':'Sva prava pridržana.','modal.floorplan':'TLOCRT','modal.apartment':'STAN','modal.download':'PREUZMI PDF KATALOG','modal.variant':'VARIJANTA','modal.zoom':'POVEĆAJ TLOCRT',
    'sold.apartment12':'Stan 12','sold.apartment13':'Stan 13'
  },
  en: {
    'brand.name':'FIELD GATE','nav.apartments':'APARTMENTS','nav.pricelist':'PRICE LIST','nav.location':'LOCATION','nav.contact':'CONTACT',
    'hero.eyebrow':'VROTA POJA / STARI GRAD','hero.title':'Apartments','hero.slogan':'Modern living in<br>the heart of history.','hero.intro':'Thoughtfully designed apartments with contemporary architecture, private outdoor spaces and a Mediterranean way of life.',
    'filters.all':'ALL APARTMENTS','filters.ground':'GROUND FLOOR','filters.first':'1ST FLOOR','filters.second':'2ND FLOOR','filters.location':'LOCATION',
    'floor.ground':'GROUND FLOOR','floor.first':'1ST FLOOR','floor.second':'2ND FLOOR','net':'(net)','view':'VIEW FLOOR PLAN','variants':'2 floor plan variants','sold':'SOLD',
    'break.bedroom':'Peace in<br>every detail.','break.bathroom':'Contemporary<br>comfort.','location.eyebrow':'LOCATION','location.title':'Stari Grad,<br>Hvar','location.text':'At the entrance to Stari Gradsko polje, a short walk from the waterfront and historic centre.',
    'pricelist.eyebrow':'PRICE LIST','pricelist.title':'Price list','pricelist.open':'OPEN PRICE LIST','price.status':'STATUS','price.apartment':'APARTMENT','price.parking':'PARKING',
    'contact.eyebrow':'CONTACT','contact.title':'Get in touch','contact.text':'We will be happy to answer your questions and help you find the right apartment.','contact.email':'E-MAIL',
    'closing.text':'A place where<br>history and the sea<br>live together.','footer.rights':'All rights reserved.','modal.floorplan':'FLOOR PLAN','modal.apartment':'APARTMENT','modal.download':'DOWNLOAD PDF CATALOGUE','modal.variant':'VARIANT','modal.zoom':'ZOOM FLOOR PLAN',
    'sold.apartment12':'Apartment 12','sold.apartment13':'Apartment 13'
  }
};

const pdfPages = Object.fromEntries(Array.from({length:13},(_,i)=>[`S${i+1}`,i+1]));

const defaultPriceRows = [
  {n:1,status:'RESERVED',net:57.35,indoor:44.16,outdoorBrutto:94.91,parking:1,eurM2:4969.485615,price:285000},
  {n:2,status:'AVAILABLE',net:65.12,indoor:47.20,outdoorBrutto:82.49,parking:1,eurM2:4914.004914,price:320000},
  {n:3,status:'AVAILABLE',net:66.30,indoor:47.56,outdoorBrutto:61.16,parking:1,eurM2:4901.960784,price:325000},
  {n:4,status:'AVAILABLE',net:131.04,indoor:95.09,outdoorBrutto:131.68,parking:2,eurM2:4502.442002,price:590000},
  {n:5,status:'AVAILABLE',net:56.53,indoor:43.89,outdoorBrutto:102.48,parking:1,eurM2:4953.122236,price:280000},
  {n:6,status:'AVAILABLE',net:49.20,indoor:40.30,outdoorBrutto:11.31,parking:1,eurM2:4878.048780,price:240000},
  {n:7,status:'AVAILABLE',net:104.36,indoor:77.48,outdoorBrutto:29.45,parking:2,eurM2:4120.352626,price:430000},
  {n:8,status:'AVAILABLE',net:113.53,indoor:85.89,outdoorBrutto:31.59,parking:2,eurM2:4051.792478,price:460000},
  {n:9,status:'AVAILABLE',net:37.29,indoor:31.63,outdoorBrutto:9.29,parking:1,eurM2:4961.115581,price:185000},
  {n:10,status:'AVAILABLE',net:45.90,indoor:39.64,outdoorBrutto:5.20,parking:1,eurM2:4901.960784,price:225000},
  {n:11,status:'AVAILABLE',net:91.91,indoor:77.48,outdoorBrutto:27.56,parking:2,eurM2:4569.687738,price:420000},
  {n:12,status:'SOLD',net:100.19,indoor:85.85,outdoorBrutto:27.29,parking:2,eurM2:4192.035133,price:420000},
  {n:13,status:'SOLD',net:35.90,indoor:29.99,outdoorBrutto:5.64,parking:1,eurM2:4874.651811,price:175000}
];
const priceRows = (()=>{ try { const x=JSON.parse(localStorage.getItem('vp-apartments')); return Array.isArray(x)&&x.length ? x : defaultPriceRows; } catch(e){ return defaultPriceRows; } })();


let currentLang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : (localStorage.getItem('vp-lang') || 'hr');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.apartment');
priceRows.forEach(row=>{
  const card=document.querySelector(`.apartment[data-code="S${row.n}"]`);
  if(!card) return;
  const strong=card.querySelector('.card-copy strong');
  const em=card.querySelector('.card-copy em');
  if(strong) strong.textContent=`${formatNumber(row.net)} m²`;
  if(em) em.innerHTML=`${formatNumber(row.indoor)} m² <span data-i18n="net">(neto)</span>`;
});

const modal = document.getElementById('modal');
const modalPlan = document.getElementById('modalPlan');
const modalName = document.getElementById('modalName');
const modalCode = document.getElementById('modalCode');
const modalArea = document.getElementById('modalArea');
const modalNet = document.getElementById('modalNet');
const modalFacts = document.getElementById('modalFacts');
const modalVariant = document.getElementById('modalVariant');
const modalVariants = document.getElementById('modalVariants');
const zoomPlanBtn = document.getElementById('zoomPlan');
const priceModal = document.getElementById('priceModal');
const priceOpen = document.getElementById('priceOpen');
const navPrice = document.querySelector('nav a[href="#cjenik"]');
const priceClose = document.getElementById('priceClose');
const priceRowsEl = document.getElementById('priceRows');

function t(key){ return translations[currentLang][key] || key; }
function formatNumber(value, decimals=2){ return value.toFixed(decimals).replace('.',','); }
function formatPrice(value){ return new Intl.NumberFormat(currentLang==='hr'?'hr-HR':'en-GB').format(value); }

function syncCardStatuses(){
  priceRows.forEach(row=>{
    const card=document.querySelector(`.apartment[data-code="S${row.n}"]`);
    if(!card) return;
    card.classList.toggle('sold',row.status==='SOLD');
    card.classList.toggle('reserved',row.status==='RESERVED');
    card.dataset.sold=row.status==='SOLD'?'true':'false';
    const nameTarget=card.querySelector('[data-name-target]');
    if(!nameTarget) return;
    nameTarget.querySelectorAll('.sold-inline,.reserved-inline').forEach(x=>x.remove());
    if(row.status==='SOLD'){ const b=document.createElement('span'); b.className='sold-inline'; b.textContent='SOLD'; nameTarget.appendChild(b); }
    if(row.status==='RESERVED'){ const b=document.createElement('span'); b.className='reserved-inline'; b.textContent='RESERVED'; nameTarget.appendChild(b); }
  });
}

function applyTranslations(){
  document.documentElement.lang=currentLang;
  document.documentElement.classList.toggle('lang-en',currentLang==='en');
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.innerHTML=t(el.dataset.i18n); });
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
  cards.forEach(card=>{
    const nameTarget=card.querySelector('[data-name-target]');
    if(nameTarget){
      const sold=nameTarget.querySelector('.sold-inline');
      const label=currentLang==='hr'?card.dataset.name:card.dataset.nameEn;
      nameTarget.textContent=label;
      if(sold) nameTarget.appendChild(sold);
    }
    card.querySelector('[data-card="rooms"]').textContent=card.dataset[`rooms${currentLang==='hr'?'Hr':'En'}`];
    card.querySelector('[data-card="open"]').textContent=card.dataset[`open${currentLang==='hr'?'Hr':'En'}`];
    card.querySelector('[data-card="parking"]').textContent=card.dataset[`parking${currentLang==='hr'?'Hr':'En'}`];
  });
  document.querySelector('.close').setAttribute('aria-label',currentLang==='hr'?'Zatvori':'Close');
  document.querySelector('#priceClose').setAttribute('aria-label',currentLang==='hr'?'Zatvori':'Close');
  document.title=currentLang==='hr'?'Vrota Poja | Novi stanovi i novogradnja u Starom Gradu, Hvar':'FIELD GATE | New apartments in Stari Grad, Hvar';
  const meta=document.querySelector('meta[name="description"]');
  meta.content=currentLang==='hr'?'Vrota Poja — novi stanovi u Starom Gradu na Hvaru. Moderna novogradnja u srcu povijesti, s terasama, vrtovima i parkingom. Pogledajte dostupne stanove.':'FIELD GATE — new apartments in Stari Grad, Hvar. Contemporary new-build homes in the heart of history, with terraces, gardens and parking.';
  document.querySelector('meta[property="og:title"]').content=document.title;
  document.querySelector('meta[property="og:site_name"]').content=currentLang==='hr'?'Vrota Poja':'FIELD GATE';
  document.querySelector('.brand').setAttribute('aria-label',currentLang==='hr'?'Vrota Poja':'Field Gate');
  document.querySelector('meta[property="og:description"]').content=meta.content;
  document.querySelector('meta[name="twitter:title"]').content=document.title;
  document.querySelector('meta[name="twitter:description"]').content=meta.content;
  renderPriceRows();
  syncCardStatuses();
}

document.querySelectorAll('.lang').forEach(btn=>btn.addEventListener('click',()=>{ currentLang=btn.dataset.lang; localStorage.setItem('vp-lang',currentLang); applyTranslations(); }));

filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const floor=btn.dataset.floor;
  cards.forEach(card=>card.style.display=(floor==='all'||card.dataset.floor===floor)?'':'none');
}));

function openCard(card){
  modalName.textContent=currentLang==='hr'?card.dataset.name:card.dataset.nameEn;
  modalCode.textContent=card.dataset.code;
  modalArea.textContent=`${card.dataset.area} m²`;
  modalNet.textContent=`${card.dataset.net} m² ${t('net')}`;
  modalPlan.src=`fullplans/${card.dataset.code}.jpg`;
  modalPlan.alt=`${t('modal.floorplan')} ${currentLang==='hr'?card.dataset.name:card.dataset.nameEn}`;
  const pdfPage=pdfPages[card.dataset.code];
  if(pdfPage) zoomPlanBtn.href=`docs/katalog-stanova-2026-2027-v2.pdf#page=${pdfPage}`;
  zoomPlanBtn.setAttribute('aria-label', currentLang==='hr'?`Otvori tlocrt za ${card.dataset.name} u novom tabu`:`Open the floor plan for ${card.dataset.nameEn} in a new tab`);
  const suffix=currentLang==='hr'?'Hr':'En';
  modalFacts.innerHTML=[card.dataset[`rooms${suffix}`],card.dataset[`open${suffix}`],card.dataset[`parking${suffix}`]].filter(Boolean).map(x=>`<div>${x}</div>`).join('');
  modalVariant.innerHTML=card.dataset.variants?`<span class="variant">${t('variants')}</span>`:'';
  modalVariants.innerHTML='';
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}

cards.forEach(card=>card.addEventListener('click',e=>openCard(card)));
document.querySelector('.modal .close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true'); if(!priceModal.classList.contains('open')) document.body.style.overflow='';}

function renderPriceRows(){
  if(!priceRowsEl) return;
  priceRowsEl.innerHTML=priceRows.map(row=>{
    const sold=row.status==='SOLD';
    const soldText = value => sold ? `<span class="price-sold-text">${value}</span>` : value;
    const statusLabel = row.status==='SOLD' ? 'SOLD' : (row.status==='RESERVED' ? 'RESERVED' : 'AVAILABLE');
    return `<tr class="${sold?'price-sold':''}">\n      <td><span class="price-status price-status-${String(row.status).toLowerCase()}">${statusLabel}</span></td>\n      <td>${soldText(`<strong>Stan ${row.n}</strong>`)}</td>\n      <td>${soldText(formatNumber(Number(row.net)||0))}</td>\n      <td>${soldText(formatNumber(Number(row.indoor)||0))}</td>\n      <td>${soldText(formatNumber(Number(row.outdoorBrutto)||0))}</td>\n      <td class="price-value">${soldText(formatPrice(Number(row.price)||0))}</td>\n    </tr>`;
  }).join('');
}

function openPriceModal(){
  renderPriceRows();
  priceModal.classList.add('open'); priceModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closePriceModal(){
  priceModal.classList.remove('open'); priceModal.setAttribute('aria-hidden','true'); if(!modal.classList.contains('open')) document.body.style.overflow='';
}
priceOpen?.addEventListener('click',openPriceModal);
navPrice?.addEventListener('click',e=>{e.preventDefault();openPriceModal();});
priceClose?.addEventListener('click',closePriceModal);
priceModal?.addEventListener('click',e=>{if(e.target===priceModal)closePriceModal();});

document.addEventListener('keydown',e=>{
  if(e.key!=='Escape') return;
  if(priceModal.classList.contains('open')) { closePriceModal(); return; }
  if(modal.classList.contains('open')) closeModal();
});

// Hero crossfade: exactly one image change every 2 seconds, continuously looping.
const slides=[...document.querySelectorAll('.hero-slide')]; let slideIndex=0;
setInterval(()=>{ slides[slideIndex].classList.remove('active'); slideIndex=(slideIndex+1)%slides.length; slides[slideIndex].classList.add('active'); },2000);

applyTranslations();
