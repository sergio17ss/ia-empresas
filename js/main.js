// IA Empresas - JavaScript principal
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // TODO: Integrar con servicio de newsletter
            alert('Gracias por suscribirte. Recibirás nuestro próximo newsletter en ' + email);
            this.reset();
        });
    }

    // Búsqueda del sitio (solo en la home, donde existen .search-input y .search-results)
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.getElementById('search-results');

    // Índice de artículos publicados (se actualiza a medida que se publican)
    const articleIndex = [
        { title: 'ChatGPT Enterprise: Precio, Funciones y Opiniones 2026', url: 'herramientas-ia/chatgpt-enterprise/', keywords: 'chatgpt openai enterprise gpt-4' },
        { title: 'Claude AI para Empresas: Precio, Funciones y Opiniones', url: 'herramientas-ia/claude-ai-empresas/', keywords: 'claude anthropic escritura analisis' },
        { title: 'Google Gemini for Workspace: Funciones, Precios y Review', url: 'herramientas-ia/gemini-workspace/', keywords: 'google gemini workspace gmail docs sheets' },
        { title: 'Jasper AI: La Herramienta de IA para Marketing 2026', url: 'herramientas-ia/jasper-ai/', keywords: 'jasper marketing contenido plantillas' },
        { title: 'Los 8 Mejores Chatbots IA para Atención al Cliente', url: 'herramientas-ia/chatbots-atencion-cliente/', keywords: 'zendesk intercom tidio chatbot soporte' },
        { title: 'ChatGPT vs Claude vs Gemini: Comparativa Completa 2026', url: 'comparativas/chatgpt-vs-claude-vs-gemini/', keywords: 'comparativa chatgpt claude gemini' },
        { title: 'Las 10 Mejores Herramientas IA Gratuitas para Empresas', url: 'comparativas/herramientas-ia-gratuitas/', keywords: 'gratis gratuitas herramientas ia' },
        { title: 'Guía Completa para Implementar IA en tu Pyme', url: 'guias/guia-implementar-ia-pyme/', keywords: 'guia implementar pyme paso a paso' }
    ];

    function runSearch(query) {
        if (!searchResults) return;
        if (!query) {
            searchResults.hidden = true;
            return;
        }
        const q = query.toLowerCase();
        const results = articleIndex.filter(function(a) {
            return (a.title + ' ' + a.keywords).toLowerCase().indexOf(q) !== -1;
        });
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="search-no-results">No se encontraron artículos para "' + query + '".</p>';
        } else {
            searchResults.innerHTML = results.map(function(a) {
                return '<a class="search-result-item" href="' + a.url + '">' + a.title + '</a>';
            }).join('');
        }
        searchResults.hidden = false;
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            runSearch(searchInput.value.trim());
        });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                runSearch(searchInput.value.trim());
            }
        });
        searchInput.addEventListener('input', function() {
            runSearch(searchInput.value.trim());
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});