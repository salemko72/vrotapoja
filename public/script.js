const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.apartment');

filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const floor = btn.dataset.floor;
  cards.forEach(card => {
    card.style.display = floor === 'all' || card.dataset.floor === floor ? '' : 'none';
  });
}));

const modal = document.getElementById('modal');
const modalPlan = document.getElementById('modalPlan');
const modalCode = document.getElementById('modalCode');
const modalArea = document.getElementById('modalArea');
const modalNet = document.getElementById('modalNet');
const modalFacts = document.getElementById('modalFacts');
const modalVariant = document.getElementById('modalVariant');

function openCard(card){
  modalCode.textContent = card.dataset.code;
  modalArea.textContent = `${card.dataset.area} m²`;
  modalNet.textContent = `${card.dataset.net} m² (neto)`;
  modalPlan.src = `floorplans/${card.dataset.code}.jpg`;
  modalPlan.alt = `Tlocrt stana ${card.dataset.code}`;
  modalFacts.innerHTML = [card.dataset.rooms, card.dataset.open, card.dataset.parking].filter(Boolean).map(x => `<div>${x}</div>`).join('');
  modalVariant.textContent = card.dataset.variants || '';
  modalVariant.className = card.dataset.variants ? 'variant' : '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

cards.forEach(card => card.addEventListener('click', () => openCard(card)));
document.querySelector('.close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
