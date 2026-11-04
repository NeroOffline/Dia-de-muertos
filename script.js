const altarTrack = document.getElementById('altarTrack');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');


// ==========================================
// CREAR CADA ALTAR
// ==========================================

function crearAltar(p) {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'altar-item';
  el.dataset.id = p.id;
  el.setAttribute('aria-label', `Ver homenaje de ${p.nom || 'persona'}`);

  const placeholder = document.createElement('span');
  placeholder.className = 'foto-placeholder';
  placeholder.textContent = p.mono || '';
  placeholder.hidden = Boolean(p.imagen);

  const foto = document.createElement('img');
  foto.className = 'foto';
  foto.alt = `Retrato de ${p.nom || 'persona'}`;

  if (p.imagen) {
    foto.src = p.imagen;

    foto.addEventListener('error', () => {
      foto.hidden = true;
      placeholder.hidden = false;
    }, { once: true });
  } else {
    foto.hidden = true;
  }

  const marco = document.createElement('img');
  marco.className = 'altar-svg';
  marco.src = 'Altar.svg';
  marco.alt = '';

  const nombre = document.createElement('span');
  nombre.className = 'altar-nombre';
  nombre.textContent = p.nom || '';

  el.append(placeholder, foto, marco, nombre);

  el.addEventListener('click', () => {
    abrirHomenaje(p);
  });

  return el;
}


// ==========================================
// MOSTRAR LOS ALTARES
// ==========================================

function renderizarAltares(fallecidos) {
  if (!altarTrack || !Array.isArray(fallecidos) || fallecidos.length === 0) {
    console.warn('No hay homenajes para mostrar.');
    return;
  }

  altarTrack.replaceChildren();

  const primeraSecuencia = fallecidos.map(crearAltar);
  const segundaSecuencia = fallecidos.map(crearAltar);

  [...primeraSecuencia, ...segundaSecuencia].forEach(altar => {
    altarTrack.appendChild(altar);
  });

  const recalcular = () => {
    ajustarRecorridoAltar(primeraSecuencia.length);
  };

  requestAnimationFrame(recalcular);
  window.addEventListener('resize', recalcular);
}


function ajustarRecorridoAltar(cantidad) {
  if (!altarTrack || cantidad <= 0) return;

  const gap = parseFloat(getComputedStyle(altarTrack).gap) || 0;

  const primeraParte = Array.from(altarTrack.children).slice(0, cantidad);

  const anchoSecuencia = primeraParte.reduce((total, item) => {
    return total + item.getBoundingClientRect().width;
  }, 0) + cantidad * gap;

  altarTrack.style.setProperty(
    '--altar-recorrido',
    `${-anchoSecuencia}px`
  );
}


fetch('personas.json')
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar personas.json (${respuesta.status})`);
    }

    return respuesta.json();
  })
  .then(renderizarAltares)
  .catch(error => {
    console.error('Error al cargar los homenajes:', error);
  });


function abrirHomenaje(p) {
  if (!modal) return;

  const modalMono = document.getElementById('modalMono');
  const modalTitle = document.getElementById('modalTitle');
  const modalApodo = document.getElementById('modalApodo');
  const modalFechas = document.getElementById('modalFechas');
  const modalTexto = document.getElementById('modalTexto');
  const modalGustos = document.getElementById('modalGustos');
  const modalRetrato = document.getElementById('modalRetrato');

  if (modalMono) modalMono.textContent = p.mono || '';
  if (modalTitle) modalTitle.textContent = p.nom || '';
  if (modalApodo) modalApodo.textContent = p.apodo || '';

  if (modalFechas) {
    modalFechas.textContent = `${p.f || ''} — ${p.m || ''}`;
  }

  if (modalTexto) {
    modalTexto.textContent = p.texto || '';
  }

  // Mostrar gustos.
  if (modalGustos) {
    modalGustos.replaceChildren();

    (Array.isArray(p.gustos) ? p.gustos : []).forEach(gusto => {
      const etiqueta = document.createElement('span');
      etiqueta.textContent = gusto;
      modalGustos.appendChild(etiqueta);
    });
  }

  // Mostrar retrato o monograma.
  if (modalRetrato) {
    modalRetrato.replaceChildren();

    if (p.imagen) {
      const imagen = document.createElement('img');

      imagen.src = p.imagen;
      imagen.alt = `Retrato de ${p.nom || 'la persona homenajeada'}`;

      imagen.addEventListener('error', () => {
        const iniciales = document.createElement('div');
        iniciales.className = 'monogram-modal';
        iniciales.textContent = p.mono || '';

        modalRetrato.replaceChildren(iniciales);
      }, { once: true });

      modalRetrato.appendChild(imagen);
    } else {
      const iniciales = document.createElement('div');
      iniciales.className = 'monogram-modal';
      iniciales.textContent = p.mono || '';

      modalRetrato.appendChild(iniciales);
    }
  }

  // Quitar cualquier estado de cierre anterior.
  modal.classList.remove('open');

  // Forzar actualización del estado visual antes de abrir.
  void modal.offsetWidth;

  // Abrir modal.
  modal.classList.add('open');

  // Pausar la galería.
  if (altarTrack) {
    altarTrack.classList.add('paused');
  }

  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  if (!modal) return;

  modal.classList.remove('open');

  if (altarTrack) {
    altarTrack.classList.remove('paused');
  }

  document.body.style.overflow = '';
}


// Cerrar con la X.
if (modalClose) {
  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    cerrarModal();
  });
}

// Cerrar al pulsar fuera de la ventana.
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });
}

// Cerrar con Escape.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('open')) {
    cerrarModal();
  }
});

const starsEl = document.getElementById('stars');

if (starsEl) {
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');

    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';

    const sz = Math.random() * 2 + 1;

    s.style.width = sz + 'px';
    s.style.height = sz + 'px';

    s.style.setProperty(
      '--d',
      (Math.random() * 3 + 2) + 's'
    );

    starsEl.appendChild(s);
  }
}

const offerBtn = document.getElementById('offerBtn');

if (offerBtn) {
  offerBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('nameInput');
    const memorias = document.getElementById('memorias');

    if (!nameInput || !memorias) return;

    const valor = nameInput.value.trim();

    if (!valor) return;

    const memoria = document.createElement('div');
    memoria.className = 'memoria';

    const flor = document.createElement('div');
    flor.className = 'fl';

    flor.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="#FF8C00"/>
        <circle cx="12" cy="12" r="5" fill="#F4D03F"/>
      </svg>
    `;

    const nombre = document.createElement('span');
    nombre.textContent = valor;

    memoria.append(flor, nombre);
    memorias.appendChild(memoria);

    nameInput.value = '';

    // Mensaje de confirmación.
    const toast = document.createElement('div');

    toast.textContent = 'Tu recuerdo florece en este altar';

    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #FF8C00, #C13584);
      color: #fff;
      padding: 14px 28px;
      border-radius: 30px;
      z-index: 400;
      font-family: 'Playfair Display', serif;
      animation: popin .4s ease;
      text-align: center;
      max-width: calc(100% - 32px);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  });
}

const ctaAltar = document.getElementById('ctaAltar');

if (ctaAltar) {
  ctaAltar.addEventListener('click', () => {
    document.getElementById('altar')?.scrollIntoView({
      behavior: 'smooth'
    });
  });
}

const elementosReveal = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elementosReveal.forEach(el => obs.observe(el));
} else {
  elementosReveal.forEach(el => el.classList.add('in'));
}
