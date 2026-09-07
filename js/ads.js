/* ============================================================
   IA Empresas — Cargador de anuncios (AdSense-ready)
   ------------------------------------------------------------
   Los slots están en el HTML como <div class="ad-slot" data-ad-slot="xxx"></div>.
   Para activar publicidad real:
     1) Configura window.IaEmpresasAds = { client: "ca-pub-XXXX" }
        (o edita CONFIG.client abajo tras aprobación de AdSense).
     2) Añade el data-ad-slot correspondiente a cada div.
   Sin configuración, los slots permanecen como placeholders (sin CLS).
   ============================================================ */
(function () {
    'use strict';

    var CONFIG = {
        client: null,                 // "ca-pub-XXXXXXXXXXXXXXXX" cuando aprueben AdSense
        respectConsent: true          // no cargar hasta consentimiento explícito
    };

    var AD_TAG_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

    function adEnabled() {
        return typeof CONFIG.client === 'string' && CONFIG.client.length > 0;
    }

    function getConsent() {
        // Si no respetamos consentimiento, se considera aprobado.
        if (!CONFIG.respectConsent) return true;
        // Mínima gestión de consentimiento: localStorage 'ia_empresas_consent_ads'
        try {
            return localStorage.getItem('ia_empresas_consent_ads') === '1';
        } catch (e) {
            return false;
        }
    }

    function injectScript(cb) {
        if (document.querySelector('script[data-ads-loaded]')) {
            if (cb) cb();
            return;
        }
        var s = document.createElement('script');
        s.src = AD_TAG_SRC;
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.setAttribute('data-ads-loaded', '1');
        s.onload = cb || null;
        s.onerror = cb || null;
        document.head.appendChild(s);
    }

    function renderSlots() {
        var slots = document.querySelectorAll('.ad-slot[data-ad-slot]');
        if (!slots.length) return;
        if (!adEnabled() || !getConsent()) {
            // Modo placeholder: no hacer nada, el CSS mantiene el hueco.
            return;
        }
        injectScript(function () {
            try {
                if (window.adsbygoogle) {
                    Array.prototype.forEach.call(slots, function (el) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        el.classList.add('has-ad');
                    });
                }
            } catch (e) {
                /* noop: sin anuncios no debe romper la página */
            }
        });
    }

    // Exponer API para el banner de consentimiento (cuando exista)
    window.IaEmpresasAds = {
        config: CONFIG,
        enabled: adEnabled,
        setConsent: function (ok) {
            try {
                localStorage.setItem('ia_empresas_consent_ads', ok ? '1' : '0');
            } catch (e) { /* noop */ }
            if (ok) renderSlots();
        },
        render: renderSlots
    };

    // Intentar render en DOMContentLoaded (si ya hay consentimiento guardado)
    document.addEventListener('DOMContentLoaded', renderSlots);
})();