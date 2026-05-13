/**
 * error-handler.js
 * Globaler Fehler-Handler für die Jugendrat-Baselland-Website.
 *
 * Aufgaben (bewusst minimalistisch gehalten):
 *   1. Loggen von JavaScript-Fehlern und unbehandelten Promise-Rejections.
 *   2. Loggen von fehlgeschlagenen fetch()-Aufrufen.
 *   3. Optional: Weiterleitung zur 404-Seite bei kritischen JS-Fehlern.
 *
 * WICHTIG:
 *  • Es findet KEIN präemptives Abfangen von Link-Klicks mehr statt.
 *    Die ursprüngliche HEAD-Prüfung verursachte spürbare Latenz auf
 *    jedem Klick und brach komplett beim Aufruf via file://-Protokoll.
 *    Für saubere 404-Routen sollte die Server-Konfiguration genutzt
 *    werden (z. B. Apache `ErrorDocument 404 /src/frontend/pages/404.html`).
 */

(function () {
    'use strict';

    /* ─── Konfiguration ────────────────────────────────────────────── */

    const CONFIG = {
        // Pfad zur 404-Seite relativ zum Site-Root (führender Slash erforderlich).
        errorPagePath: '/src/frontend/pages/404.html',

        // Fehlerseite bei JS-Fehlern aufrufen? (false = nur loggen)
        redirectOnJSError: false,

        // Konsolen-Logging aktivieren?
        debug: false
    };

    /* ─── Hilfsfunktionen ──────────────────────────────────────────── */

    const log = (...args) => {
        if (CONFIG.debug) console.warn('[ErrorHandler]', ...args);
    };

    /**
     * Berechnet die URL der 404-Seite robust:
     *   • Bei http(s)-Auslieferung wird der absolute Pfad genutzt.
     *   • Bei file:// wird die Berechnung übersprungen (keine Umleitung),
     *     weil ein Redirect dort sinnlos und schadhaft wäre.
     */
    const buildErrorUrl = () => {
        if (!/^https?:$/.test(window.location.protocol)) return null;
        return CONFIG.errorPagePath;
    };

    const redirectToError = () => {
        // Endlosschleife verhindern: Sind wir bereits auf der 404-Seite?
        if (window.location.pathname.endsWith('/404.html')) return;

        const url = buildErrorUrl();
        if (!url) return;

        log('Weiterleitung zur Fehlerseite:', url);
        window.location.href = url;
    };

    /* ─── 1. Globaler fetch()-Wrapper ──────────────────────────────── */
    // Loggt fehlgeschlagene Requests, leitet aber NICHT um – Aufrufer
    // sollen selbst entscheiden, wie sie auf Fehler reagieren.

    const originalFetch = window.fetch.bind(window);
    window.fetch = function patchedFetch(...args) {
        return originalFetch(...args)
            .then((response) => {
                if (!response.ok) log('fetch() Fehlerstatus', response.status, response.url);
                return response;
            })
            .catch((err) => {
                log('fetch() Netzwerkfehler:', err);
                throw err; // Fehler nicht verschlucken
            });
    };

    /* ─── 2. JavaScript-Fehler abfangen ────────────────────────────── */

    window.addEventListener('error', (e) => {
        // Ressourcen-Ladefehler (Bilder, CSS, Scripts) sollen die UX
        // nicht stören; nur loggen.
        if (e.target && e.target !== window) {
            const tag = e.target.tagName ? e.target.tagName.toLowerCase() : 'unknown';
            const src = e.target.src || e.target.href || '(unbekannt)';
            log('Ressource konnte nicht geladen werden:', tag, src);
            return;
        }

        log('JavaScript-Fehler:', e.message, 'in', e.filename, 'Zeile', e.lineno);
        if (CONFIG.redirectOnJSError) redirectToError();
    }, /* capture */ true);

    /* ─── 3. Nicht behandelte Promise-Rejections ──────────────────── */

    window.addEventListener('unhandledrejection', (e) => {
        log('Unbehandelte Promise-Rejection:', e.reason);
        if (CONFIG.redirectOnJSError) {
            e.preventDefault();
            redirectToError();
        }
    });

    log('Error-Handler aktiv.');
})();
