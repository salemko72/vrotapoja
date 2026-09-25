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
    'hero.eyebrow':'VROTA POJA / STARI GRAD','hero.title':'Apartments','hero.slogan':'Modern living<br>in the heart of history.','hero.intro':'Thoughtfully designed apartments with contemporary architecture, private outdoor spaces and a Mediterranean way of life.',
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

const priceRows = [
  {n:1,status:'',net:57.35,indoor:44.16,outdoor:13.19,parking:1,parkingM2:18.50,price:285000},
  {n:2,status:'',net:65.12,indoor:47.20,outdoor:17.92,parking:1,parkingM2:12.00,price:320000},
  {n:3,status:'',net:66.30,indoor:47.56,outdoor:18.74,parking:1,parkingM2:12.00,price:325000},
  {n:4,status:'',net:131.04,indoor:95.09,outdoor:35.95,parking:2,parkingM2:24.00,price:590000},
  {n:5,status:'',net:56.53,indoor:43.89,outdoor:12.64,parking:1,parkingM2:12.00,price:280000},
  {n:6,status:'',net:49.20,indoor:40.30,outdoor:8.80,parking:1,parkingM2:12.00,price:240000},
  {n:7,status:'',net:104.36,indoor:77.48,outdoor:26.88,parking:2,parkingM2:24.00,price:430000},
  {n:8,status:'',net:113.53,indoor:85.89,outdoor:27.64,parking:2,parkingM2:24.00,price:460000},
  {n:9,status:'',net:37.29,indoor:31.63,outdoor:6.65,parking:1,parkingM2:12.00,price:185000},
  {n:10,status:'',net:45.90,indoor:39.64,outdoor:5.90,parking:1,parkingM2:12.00,price:225000},
  {n:11,status:'',net:91.91,indoor:77.48,outdoor:14.43,parking:2,parkingM2:24.00,price:420000},
  {n:12,status:'SOLD',net:100.19,indoor:85.85,outdoor:14.34,parking:2,parkingM2:24.00,price:420000},
  {n:13,status:'SOLD',net:35.90,indoor:29.99,outdoor:5.90,parking:1,parkingM2:12.00,price:175000}
];

let currentLang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : (localStorage.getItem('vp-lang') || 'hr');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.apartment');
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
const priceClose = document.getElementById('priceClose');
const priceRowsEl = document.getElementById('priceRows');

function t(key){ return translations[currentLang][key] || key; }
function formatNumber(value, decimals=2){ return value.toFixed(decimals).replace('.',','); }
function formatPrice(value){ return new Intl.NumberFormat(currentLang==='hr'?'hr-HR':'en-GB').format(value); }

function applyTranslations(){
  document.documentElement.lang=currentLang;
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
    const eur=Math.round(row.price/row.net);
    const soldText = value => sold ? `<span class="price-sold-text">${value}</span>` : value;
    return `<tr class="${sold?'price-sold':''}">\n      <td>${sold?soldText('<span class="price-sold-label">SOLD</span>'):''}</td>\n      <td>${soldText(`<strong>Stan ${row.n}</strong>`)}</td>\n      <td>${soldText(formatNumber(row.net))}</td>\n      <td>${soldText(formatNumber(row.indoor))}</td>\n      <td>${soldText(formatNumber(row.outdoor))}</td>\n      <td>${soldText(row.parking)}</td>\n      <td>${soldText(formatNumber(row.parkingM2))}</td>\n      <td>${soldText(formatPrice(eur))}</td>\n      <td class="price-value">${soldText(formatPrice(row.price))}</td>\n    </tr>`;
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
