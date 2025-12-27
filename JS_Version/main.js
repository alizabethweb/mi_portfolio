// Configuramos la función cambio de idioma
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error al cargar traducciones:', error);
    }
}

function setLanguage(lang) {
    try {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        // Retrocompatibilidad con data-es y data-en
        document.querySelectorAll('[data-es], [data-en]').forEach(el => {
            el.textContent = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
        });
        // Resaltar botón activo
        document.getElementById('btn-es').classList.toggle('active', lang === 'es');
        document.getElementById('btn-en').classList.toggle('active', lang === 'en');
        localStorage.setItem('lang', lang);
    } catch (error) {
        console.error('Error al cambiar idioma:', error);
    }
}

// Configuramos la visualización de sub-pagina correspondiente
function showSubpagina(id) {
    // Ocultar todas las subpáginas
    document.querySelectorAll('.subpagina').forEach(sp => {
        sp.classList.remove('visible');
    });
    // Mostrar la subpágina objetivo
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('visible');
        target.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
    }
    // Actualizar la URL sin recargar la página
    history.replaceState(null, '', `#${id}`);
}

// Escuchar clics en enlaces de navegación y botones de la hero
document.querySelectorAll('nav a, .botones-navegacion a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').replace('#', '');
        showSubpagina(id);
    });
});

// Configuramos los botones de cambio de idioma y la selección automática
const btnEs = document.getElementById('btn-es');
const btnEn = document.getElementById('btn-en');

if (btnEs && btnEn) {
    btnEs.addEventListener('click', () => setLanguage('es'));
    btnEn.addEventListener('click', () => setLanguage('en'));
}

// Configuramos modos de color
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Validación del formulario
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulario enviado (funcionalidad de ejemplo).');
        contactForm.reset();
    });
}

// Establecer Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Establecer AOS
AOS.init({
    duration: 800,
    once: true,
});

// Cargar la subpágina inicial al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    // Verificar si hay un hash en la URL y mostrar esa subpágina
    const hash = window.location.hash.replace('#', '') || 'inicio';
    showSubpagina(hash);
    // Establecer idioma guardado o predeterminado
    const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en');
    setLanguage(savedLang);
    // Establecer tema guardado o predeterminado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Escuchar cambios en la URL (por ejemplo, al usar el botón "atrás" del navegador)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    showSubpagina(hash);
});