const translations = {
  hr: {
    'brand.name':'VROTA POJA','nav.project':'O PROJEKTU','nav.apartments':'STANOVI','nav.location':'LOKACIJA','nav.contact':'KONTAKT',
    'hero.eyebrow':'VROTA POJA / STARI GRAD','hero.title':'Stanovi','hero.slogan':'Moderno stanovanje –<br>u srcu povijesti.','hero.intro':'Pažljivo osmišljeni stanovi sa suvremenom arhitekturom, privatnim vanjskim prostorima i mediteranskim načinom života.',
    'filters.all':'SVI STANOVI','filters.ground':'PRIZEMLJE','filters.first':'1. KAT','filters.second':'2. KAT','filters.location':'LOKACIJA',
    'floor.ground':'PRIZEMLJE','floor.first':'1. KAT','floor.second':'2. KAT','net':'(neto)','view':'POGLEDAJ TLOCRT','variants':'2 varijante tlocrta','sold':'PRODANO',
    'break.bedroom':'Mir u<br>svakom detalju.','break.bathroom':'Suvremena<br>udobnost.','location.eyebrow':'LOKACIJA','location.title':'Stari Grad,<br>Hvar','location.text':'Na ulazu u Stari Gradsko polje, nekoliko minuta hoda od rive i povijesne jezgre.',
    'contact.eyebrow':'KONTAKT','contact.title':'Kontaktirajte nas','contact.text':'Rado ćemo odgovoriti na vaša pitanja i pomoći vam pronaći savršen stan.','contact.phone':'TELEFON','contact.email':'E-MAIL',
    'closing.text':'Mjesto gdje<br>povijest i more<br>žive zajedno.','footer.rights':'Sva prava pridržana.','modal.floorplan':'TLOCRT','modal.apartment':'STAN','modal.download':'DOWNLOAD PDF KATALOG','modal.variant':'VARIJANTA','modal.zoom':'POVEĆAJ TLOCRT',
    'sold.apartment12':'Stan 12','sold.apartment13':'Stan 13'
  },
  en: {
    'brand.name':'FIELD GATE','nav.project':'THE PROJECT','nav.apartments':'APARTMENTS','nav.location':'LOCATION','nav.contact':'CONTACT',
    'hero.eyebrow':'VROTA POJA / STARI GRAD','hero.title':'Apartments','hero.slogan':'Modern living<br>in the heart of history.','hero.intro':'Thoughtfully designed apartments with contemporary architecture, private outdoor spaces and a Mediterranean way of life.',
    'filters.all':'ALL APARTMENTS','filters.ground':'GROUND FLOOR','filters.first':'1ST FLOOR','filters.second':'2ND FLOOR','filters.location':'LOCATION',
    'floor.ground':'GROUND FLOOR','floor.first':'1ST FLOOR','floor.second':'2ND FLOOR','net':'(net)','view':'VIEW FLOOR PLAN','variants':'2 floor plan variants','sold':'SOLD',
    'break.bedroom':'Peace in<br>every detail.','break.bathroom':'Contemporary<br>comfort.','location.eyebrow':'LOCATION','location.title':'Stari Grad,<br>Hvar','location.text':'At the entrance to Stari Gradsko polje, a short walk from the waterfront and historic centre.',
    'contact.eyebrow':'CONTACT','contact.title':'Get in touch','contact.text':'We will be happy to answer your questions and help you find the right apartment.','contact.phone':'PHONE','contact.email':'E-MAIL',
    'closing.text':'A place where<br>history and the sea<br>live together.','footer.rights':'All rights reserved.','modal.floorplan':'FLOOR PLAN','modal.apartment':'APARTMENT','modal.download':'DOWNLOAD PDF CATALOGUE','modal.variant':'VARIANT','modal.zoom':'ZOOM FLOOR PLAN',
    'sold.apartment12':'Apartment 12','sold.apartment13':'Apartment 13'
  }
};

const variantPlans = {
  S3:['floorplans/S3.jpg','floorplans/S3-variant2.jpg'],
  S4:['floorplans/S4.jpg','floorplans/S4-variant2.jpg'],
  S7:['floorplans/S7.jpg','floorplans/S7-variant2.jpg'],
  S8:['floorplans/S8.jpg','floorplans/S8-variant2.jpg']
};

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
const planLightbox = document.getElementById('planLightbox');
const planLightboxImage = document.getElementById('planLightboxImage');
const planLightboxStage = document.getElementById('planLightboxStage');
const planLightboxTitle = document.getElementById('planLightboxTitle');
const planZoomValue = document.getElementById('planZoomValue');
let planZoom = 1;
function setPlanZoom(value){
  planZoom=Math.max(1,Math.min(4,value));
  planLightboxImage.style.transform=`scale(${planZoom})`;
  planZoomValue.textContent=`${Math.round(planZoom*100)}%`;
}
function openPlanLightbox(){
  planLightboxImage.src=modalPlan.src;
  planLightboxImage.alt=modalPlan.alt;
  planLightboxTitle.textContent=modalName.textContent;
  setPlanZoom(1);
  planLightbox.classList.add('open');
  planLightbox.setAttribute('aria-hidden','false');
}
function closePlanLightbox(){
  planLightbox.classList.remove('open');
  planLightbox.setAttribute('aria-hidden','true');
}


function t(key){ return translations[currentLang][key] || key; }
function applyTranslations(){
  document.documentElement.lang=currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.innerHTML=t(el.dataset.i18n); });
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
  cards.forEach(card=>{
    const nameTarget=card.querySelector('[data-name-target]');
    if(nameTarget){ const sold=nameTarget.querySelector('.sold-inline'); const label=currentLang==='hr'?card.dataset.name:card.dataset.nameEn; nameTarget.textContent=label; if(sold) nameTarget.appendChild(sold); }
    card.querySelector('[data-card="rooms"]').textContent=card.dataset[`rooms${currentLang==='hr'?'Hr':'En'}`];
    card.querySelector('[data-card="open"]').textContent=card.dataset[`open${currentLang==='hr'?'Hr':'En'}`];
    card.querySelector('[data-card="parking"]').textContent=card.dataset[`parking${currentLang==='hr'?'Hr':'En'}`];
  });
  document.querySelector('.close').setAttribute('aria-label',currentLang==='hr'?'Zatvori':'Close');
  document.title=currentLang==='hr'?'Vrota Poja | Stanovi u Starom Gradu na Hvaru':'FIELD GATE | Apartments in Stari Grad, Hvar';
  const meta=document.querySelector('meta[name="description"]');
  meta.content=currentLang==='hr'?'Vrota Poja — moderno stanovanje u srcu povijesti. Novi stanovi u Starom Gradu na Hvaru, s terasama, vrtovima i parkingom.':'FIELD GATE — modern living in the heart of history. Apartments in Stari Grad, Hvar, with terraces, gardens and parking.';
  document.querySelector('meta[property="og:title"]').content=document.title;
  document.querySelector('meta[property="og:site_name"]').content=currentLang==='hr'?'Vrota Poja':'FIELD GATE';
  document.querySelector('.brand').setAttribute('aria-label',currentLang==='hr'?'Vrota Poja':'Field Gate');
  document.querySelector('meta[property="og:description"]').content=meta.content;
  document.querySelector('meta[name="twitter:title"]').content=document.title;
  document.querySelector('meta[name="twitter:description"]').content=meta.content;
}

document.querySelectorAll('.lang').forEach(btn=>btn.addEventListener('click',()=>{ currentLang=btn.dataset.lang; localStorage.setItem('vp-lang',currentLang); applyTranslations(); }));

filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const floor=btn.dataset.floor;
  cards.forEach(card=>card.style.display=(floor==='all'||card.dataset.floor===floor)?'':'none');
}));

function openCard(card){
  modalName.textContent=card.dataset.name;
  modalCode.textContent=card.dataset.code;
  modalArea.textContent=`${card.dataset.area} m²`;
  modalNet.textContent=`${card.dataset.net} m² ${t('net')}`;
  modalPlan.src=`fullplans/${card.dataset.code}.jpg`;
  modalPlan.alt=`${t('modal.floorplan')} ${card.dataset.name}`;
  const suffix=currentLang==='hr'?'Hr':'En';
  modalFacts.innerHTML=[card.dataset[`rooms${suffix}`],card.dataset[`open${suffix}`],card.dataset[`parking${suffix}`]].filter(Boolean).map(x=>`<div>${x}</div>`).join('');
  modalVariant.innerHTML=card.dataset.variants?`<span class="variant">${t('variants')}</span>`:'';
  // The modal uses the complete catalog page, including any plan variants shown on that page.
  modalVariants.innerHTML='';
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}

cards.forEach(card=>card.addEventListener('click',e=>openCard(card)));
zoomPlanBtn.addEventListener('click',openPlanLightbox);
document.getElementById('planLightboxClose').addEventListener('click',closePlanLightbox);
document.getElementById('planZoomIn').addEventListener('click',()=>setPlanZoom(planZoom+0.5));
document.getElementById('planZoomOut').addEventListener('click',()=>setPlanZoom(planZoom-0.5));
document.getElementById('planZoomReset').addEventListener('click',()=>setPlanZoom(1));
planLightbox.addEventListener('click',e=>{if(e.target===planLightbox)closePlanLightbox();});
planLightboxImage.addEventListener('dblclick',()=>setPlanZoom(planZoom===1?2:1));
planLightboxStage.addEventListener('wheel',e=>{if(e.ctrlKey||Math.abs(e.deltaY)>0){e.preventDefault();setPlanZoom(planZoom+(e.deltaY<0?0.25:-0.25));}},{passive:false});
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){ if(planLightbox.classList.contains('open')) closePlanLightbox(); else closeModal(); }});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}

// Hero crossfade: exactly one image change every 2 seconds, continuously looping.
const slides=[...document.querySelectorAll('.hero-slide')]; let slideIndex=0;
setInterval(()=>{ slides[slideIndex].classList.remove('active'); slideIndex=(slideIndex+1)%slides.length; slides[slideIndex].classList.add('active'); },2000);

applyTranslations();
