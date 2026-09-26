const defaults=[
[1,'RESERVED',57.35,44.16,94.91,1,4969.485615,285000],
[2,'AVAILABLE',65.12,47.20,82.49,1,4914.004914,320000],
[3,'AVAILABLE',66.30,47.56,61.16,1,4901.960784,325000],
[4,'AVAILABLE',131.04,95.09,131.68,2,4502.442002,590000],
[5,'AVAILABLE',56.53,43.89,102.48,1,4953.122236,280000],
[6,'AVAILABLE',49.20,40.30,11.31,1,4878.048780,240000],
[7,'AVAILABLE',104.36,77.48,29.45,2,4120.352626,430000],
[8,'AVAILABLE',113.53,85.89,31.59,2,4051.792478,460000],
[9,'AVAILABLE',37.29,31.63,9.29,1,4961.115581,185000],
[10,'AVAILABLE',45.90,39.64,5.20,1,4901.960784,225000],
[11,'AVAILABLE',91.91,77.48,27.56,2,4569.687738,420000],
[12,'SOLD',100.19,85.85,27.29,2,4192.035133,420000],
[13,'SOLD',35.90,29.99,5.64,1,4874.651811,175000]
];
const key='vp-apartments';
const makeRows=()=>defaults.map(r=>({n:r[0],status:r[1],net:r[2],indoor:r[3],outdoorBrutto:r[4],price:r[7]}));
let rows=(()=>{try{const x=JSON.parse(localStorage.getItem(key));return Array.isArray(x)&&x.length?x:makeRows()}catch(e){return makeRows()}})();
const login=document.getElementById('login'), editor=document.getElementById('editor'), tbody=document.getElementById('editorRows');
const PASSWORD_HASH='2126b318aa3031b3db46b43d69d0197c73fd5fb3b19127601ef6455598ac8cb7';
async function sha256(value){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
document.getElementById('loginBtn').onclick=async()=>{const ok=await sha256(document.getElementById('password').value)===PASSWORD_HASH;if(ok){sessionStorage.setItem('vp-admin','1');showEditor()}else document.getElementById('loginMsg').textContent='Pogrešna lozinka.'};
function showEditor(){login.hidden=true;editor.hidden=false;render()}
if(sessionStorage.getItem('vp-admin')==='1')showEditor();
function render(){tbody.innerHTML=rows.map((r,i)=>`<tr><td><select data-i="${i}" data-k="status" class="status-select"><option value="AVAILABLE">AVAILABLE</option><option value="RESERVED">RESERVED</option><option value="SOLD">SOLD</option></select></td><td><strong>Stan ${r.n}</strong></td><td><input data-i="${i}" data-k="net" type="number" step="0.01" value="${r.net}"></td><td><input data-i="${i}" data-k="indoor" type="number" step="0.01" value="${r.indoor}"></td><td><input data-i="${i}" data-k="outdoorBrutto" type="number" step="0.01" value="${r.outdoorBrutto}"></td><td><input data-i="${i}" data-k="price" type="number" step="1000" value="${r.price}"></td></tr>`).join('');tbody.querySelectorAll('select').forEach(x=>x.value=rows[x.dataset.i].status);tbody.querySelectorAll('input,select').forEach(x=>x.onchange=()=>{rows[x.dataset.i][x.dataset.k]=x.type==='number'?Number(x.value):x.value;if(x.dataset.k==='status')x.className='status-select status-'+x.value.toLowerCase()})}
document.getElementById('saveBtn').onclick=()=>{localStorage.setItem(key,JSON.stringify(rows));document.querySelector('.notice').textContent='✓ Promjene su spremljene u ovom pregledniku.';setTimeout(()=>document.querySelector('.notice').textContent='Promjene se trenutno čuvaju u ovom pregledniku. U sljedećem koraku editor možemo spojiti na udaljenu bazu.',2500)};
document.getElementById('resetBtn').onclick=()=>{rows=makeRows();localStorage.setItem(key,JSON.stringify(rows));render()};
