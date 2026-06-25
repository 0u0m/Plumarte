// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxCerrar = document.getElementById('lightbox-cerrar');

function abrirLightbox(src, descripcion) {
  lightboxImg.src = src;
  lightboxDesc.textContent = descripcion;
  lightbox.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
  lightbox.classList.remove('abierto');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxCerrar.addEventListener('click', cerrarLightbox);

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) cerrarLightbox();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') cerrarLightbox();
});

// Conectar imágenes al lightbox
// Las fotos de espacios NO abren lightbox — abren su página propia con onclick
// Solo conectamos áreas y trabajos
document.querySelectorAll('.area-card img, .trabajo-card img').forEach(function(img) {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    const descripcion = img.closest('[data-desc]')?.getAttribute('data-desc')
      || img.getAttribute('alt')
      || '';
    abrirLightbox(img.src, descripcion);
  });
});
