// Navegación entre páginas
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.getElementById('header');
    const btnContactar = document.getElementById('btnContactar');

    // Función para cambiar de página
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId === 'servicio' || pageId === 'precio') {
                // Primero cambiar a la página de inicio
                showPage('inicio');
                // Luego hacer scroll a la sección de precio después de un pequeño delay
                setTimeout(() => {
                    const priceSection = document.querySelector('.price-section');
                    if (priceSection) {
                        priceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else if (pageId) {
                showPage(pageId);
            }
        });
    });

    // Event listeners para los enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-link[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId === 'precio' || pageId === 'servicio') {
                // Primero cambiar a la página de inicio
                showPage('inicio');
                // Luego hacer scroll a la sección de precio después de un pequeño delay
                setTimeout(() => {
                    const priceSection = document.querySelector('.price-section');
                    if (priceSection) {
                        priceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else if (pageId) {
                showPage(pageId);
            }
        });
    });

    // Manejo del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header transparente que se vuelve sólido al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const isMobile = window.innerWidth <= 768;
        const currentScroll = window.pageYOffset;
        
        if (isMobile) {
            // En móvil: ocultar header al hacer scroll hacia abajo, mostrar al hacer scroll hacia arriba
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scroll hacia abajo - ocultar header
                header.classList.add('hidden');
            } else if (currentScroll < lastScroll) {
                // Scroll hacia arriba - mostrar header
                header.classList.remove('hidden');
            }
        } else {
            // En desktop: solo cambiar el estilo al hacer scroll
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Botón de contactar en hero
    if (btnContactar) {
        btnContactar.addEventListener('click', function(e) {
            e.preventDefault();
            // Primero cambiar a la página de inicio
            showPage('inicio');
            // Luego hacer scroll a la sección de contacto
            setTimeout(() => {
                const contactSection = document.querySelector('.contact-section');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }

    // Manejar todos los enlaces que apuntan a #contacto
    document.querySelectorAll('a[href="#contacto"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Primero cambiar a la página de inicio
            showPage('inicio');
            // Luego hacer scroll a la sección de contacto
            setTimeout(() => {
                const contactSection = document.querySelector('.contact-section');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });

    // Manejar todos los enlaces que apuntan a #quienes-somos
    document.querySelectorAll('a[href="#quienes-somos"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('quienes-somos');
        });
    });


    // Manejo de hash en la URL
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            if (hash === 'servicio' || hash === 'precio' || hash === 'contacto') {
                // Primero cambiar a la página de inicio
                showPage('inicio');
                // Luego hacer scroll a la sección correspondiente
                setTimeout(() => {
                    let targetSection;
                    if (hash === 'servicio' || hash === 'precio') {
                        targetSection = document.querySelector('.price-section');
                    } else if (hash === 'contacto') {
                        targetSection = document.querySelector('.contact-section');
                    }
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                const pageMap = {
                    'inicio': 'inicio',
                    'quienes-somos': 'quienes-somos',
                    'aviso-legal': 'aviso-legal'
                };
                if (pageMap[hash]) {
                    showPage(pageMap[hash]);
                } else {
                    // Si el hash no coincide con ninguna página conocida, mostrar inicio
                    showPage('inicio');
                }
            }
        } else {
            // Si no hay hash, mostrar la página de inicio
            showPage('inicio');
        }
    });

    // Inicializar página según hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        if (initialHash === 'servicio' || initialHash === 'precio' || initialHash === 'contacto') {
            // Primero cambiar a la página de inicio
            showPage('inicio');
            // Luego hacer scroll a la sección correspondiente
            setTimeout(() => {
                let targetSection;
                if (initialHash === 'servicio' || initialHash === 'precio') {
                    targetSection = document.querySelector('.price-section');
                } else if (initialHash === 'contacto') {
                    targetSection = document.querySelector('.contact-section');
                }
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const pageMap = {
                'inicio': 'inicio',
                'quienes-somos': 'quienes-somos',
                'aviso-legal': 'aviso-legal'
            };
            if (pageMap[initialHash]) {
                showPage(pageMap[initialHash]);
            } else {
                // Si el hash no coincide con ninguna página conocida, mostrar inicio
                showPage('inicio');
            }
        }
    } else {
        // Si no hay hash, mostrar la página de inicio por defecto
        showPage('inicio');
    }
});

