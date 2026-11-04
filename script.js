const altarTrack = document.getElementById('altarTrack');

// Cada homenaje se carga desde personas.json para facilitar su edición.
function crearAltar(p) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'altar-item';
  el.dataset.id = p.id;
  el.setAttribute('aria-label', `Ver homenaje de ${p.nom}`);
  const placeholder = document.createElement('span');
  placeholder.className = 'foto-placeholder';
  placeholder.textContent = p.mono;
  placeholder.hidden = Boolean(p.imagen);
  const foto = document.createElement('img');
  foto.className = 'foto';
  foto.alt = `Retrato de ${p.nom}`;
  if (p.imagen) {
    foto.src = p.imagen;
    foto.addEventListener('error', () => { foto.hidden = true; placeholder.hidden = false; }, { once: true });
  } else {
    foto.hidden = true;
  }
  const marco = document.createElement('img');
  marco.className = 'altar-svg';
  marco.src = 'Altar.svg';
  marco.alt = '';
  const nombre = document.createElement('span');
  nombre.className = 'altar-nombre';
  nombre.textContent = p.nom;
  el.append(placeholder, foto, marco, nombre);
  el.addEventListener('click', () => abrirHomenaje(p));
  return el;
}

// Duplicar una secuencia completa y medirla evita cortes con cualquier cantidad
// de altares o tamaño de pantalla.
function renderizarAltares(fallecidos) {
  const primeraSecuencia = fallecidos.map(crearAltar);
  [...primeraSecuencia, ...fallecidos.map(crearAltar)].forEach(altar => altarTrack.appendChild(altar));
  const recalcular = () => ajustarRecorridoAltar(primeraSecuencia.length);
  requestAnimationFrame(recalcular);
  window.addEventListener('resize', recalcular);
}
function ajustarRecorridoAltar(cantidad) {
  const gap = parseFloat(getComputedStyle(altarTrack).gap) || 0;
  const anchoSecuencia = Array.from(altarTrack.children).slice(0, cantidad)
    .reduce((total, item) => total + item.getBoundingClientRect().width, 0)
    + cantidad * gap;
  altarTrack.style.setProperty('--altar-recorrido', `${-anchoSecuencia}px`);
}
fetch('personas.json')
  .then(respuesta => {
    if (!respuesta.ok) throw new Error(`No se pudo cargar personas.json (${respuesta.status})`);
    return respuesta.json();
  })
  .then(renderizarAltares)
  .catch(error => console.error('Error al cargar los homenajes:', error));

function abrirHomenaje(p) {
  document.getElementById('modalMono').textContent = p.mono;
  document.getElementById('modalTitle').textContent = p.nom;
  document.getElementById('modalApodo').textContent = p.apodo;
  document.getElementById('modalFechas').textContent = `${p.f} — ${p.m}`;
  document.getElementById('modalTexto').textContent = p.texto;
  document.getElementById('modalGustos').innerHTML = p.gustos.map(g=>`<span>${g}</span>`).join('');
  const retrato = document.getElementById('modalRetrato');
  retrato.replaceChildren();
  if (p.imagen) {
    const imagen = document.createElement('img');
    imagen.src = p.imagen;
    imagen.alt = `Retrato de ${p.nom}`;
    imagen.addEventListener('error', () => {
      const iniciales = document.createElement('div');
      iniciales.className = 'monogram-modal';
      iniciales.textContent = p.mono;
      retrato.replaceChildren(iniciales);
    }, { once: true });
    retrato.appendChild(imagen);
  } else {
    const iniciales = document.createElement('div');
    iniciales.className = 'monogram-modal';
    iniciales.textContent = p.mono;
    retrato.appendChild(iniciales);
  }
  modal.classList.add('open');
}

const modal=document.getElementById('modal');

// estrellas
const starsEl=document.getElementById('stars');
for(let i=0;i<80;i++){
  const s=document.createElement('div');s.className='star';
  s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';
  const sz=Math.random()*2+1;s.style.width=sz+'px';s.style.height=sz+'px';
  s.style.setProperty('--d',(Math.random()*3+2)+'s');
  starsEl.appendChild(s);
}
// Se eliminan los efectos flotantes globales que cubrían la parte superior.

// modal close
document.getElementById('modalClose').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',e=>{if(e.target.id==='modal')modal.classList.remove('open');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open');});

// oferta
document.getElementById('offerBtn').addEventListener('click',()=>{
  const v=document.getElementById('nameInput').value.trim();
  if(!v)return;
  const m=document.createElement('div');m.className='memoria';
  m.innerHTML='<div class="fl"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#FF8C00"/><circle cx="12" cy="12" r="5" fill="#F4D03F"/></svg></div><span>'+v+'</span>';
  document.getElementById('memorias').appendChild(m);
  document.getElementById('nameInput').value='';
  const t=document.createElement('div');
  t.textContent='Tu recuerdo florece en este altar';
  t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#FF8C00,#C13584);color:#fff;padding:14px 28px;border-radius:30px;z-index:300;font-family:Playfair Display,serif;animation:popin .4s ease';
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),3000);
});

// cta scroll
document.getElementById('ctaAltar').addEventListener('click',()=>document.getElementById('altar').scrollIntoView({behavior:'smooth'}));

// reveal on scroll
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
