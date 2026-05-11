/**
 * error-handler.js
 * Globaler Fehler-Handler für die Jugendrat Baselland Website.
 *
 * Funktionen:
 *  1. Abfangen von internen Link-Klicks → HEAD-Request → bei Fehler zu 404 weiterleiten
 *  2. Abfangen von fehlgeschlagenen fetch()-Aufrufen (via globalem Wrapper)
 *  3. Abfangen von kritischen JavaScript-Fehlern (window.onerror)
 *  4. Abfangen von nicht behandelten Promise-Rejections
 *
 * Einbinden (vor </body> oder im <head> mit defer):
 *   <script src="../scripts/utils/error-handler.js"></script>
 */

(function () {
  'use strict';

  /* ─── Konfiguration ────────────────────────────────────────────────────── */

  const CONFIG = {
    // Pfad zur 404-Seite relativ zum Site-Root (ohne führenden Slash)
    errorPage: 'pages/404.html',

    // Nur bei diesen HTTP-Status-Codes zur Fehlerseite weiterleiten
    redirectOnStatus: [404, 403, 410, 500, 502, 503],

    // Fehlerseite auch bei JS-Fehlern aufrufen?
    // false = nur loggen, true = weiterleiten
    redirectOnJSError: false,

    // Debug-Ausgaben in der Konsole aktivieren?
    debug: false,
  };

  /* ─── Hilfsfunktionen ──────────────────────────────────────────────────── */

  /**
   * Berechnet den relativen Pfad zur 404-Seite ausgehend vom aktuellen Pfad.
   * Funktioniert unabhängig von der Ordnertiefe der aktuellen Seite.
   */
  function getErrorPageUrl() {
    const pathname = window.location.pathname;

    // Anzahl der Verzeichnisebenen unterhalb des Root ermitteln
    // Beispiel: /pages/subdir/page.html → 2 Ebenen → ../../pages/404.html
    const segments = pathname.split('/').filter(Boolean); // entfernt leere Strings
    const depth = segments.length > 0 ? segments.length - 1 : 0; // -1 für die Datei selbst

    const prefix = '../'.repeat(depth) || './';
    return prefix + CONFIG.errorPage;
  }

  /** Weiterleitung zur Fehlerseite – verhindert Endlos-Schleifen */
  function redirectToError() {
    const currentPath = window.location.pathname;
    // Kein Redirect, wenn wir bereits auf der Fehlerseite sind
    if (currentPath.includes('404')) return;

    const errorUrl = getErrorPageUrl();
    log('Weiterleitung zur Fehlerseite:', errorUrl);
    window.location.href = errorUrl;
  }

  function log(...args) {
    if (CONFIG.debug) console.warn('[ErrorHandler]', ...args);
  }

  /* ─── 1. Interne Link-Klicks abfangen ─────────────────────────────────── */

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Externe Links, Anker, mailto, tel und _blank-Links überspringen
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank'
    ) {
      return;
    }

    // Absoluten URL aus dem relativen Pfad berechnen
    let absoluteUrl;
    try {
      absoluteUrl = new URL(href, window.location.href);
    } catch {
      log('Ungültiger URL:', href);
      return;
    }

    // Nur Same-Origin-Links prüfen
    if (absoluteUrl.origin !== window.location.origin) return;

    // Standard-Navigation verhindern und erst prüfen
    e.preventDefault();

    log('Prüfe Link:', absoluteUrl.href);

    fetch(absoluteUrl.href, {
      method: 'HEAD',
      cache: 'no-cache',
    })
      .then(function (response) {
        if (response.ok) {
          // Seite existiert → normal navigieren
          window.location.href = absoluteUrl.href;
        } else if (CONFIG.redirectOnStatus.includes(response.status)) {
          log('HTTP', response.status, '→ Fehlerseite');
          redirectToError();
        } else {
          // Unbekannter Status → trotzdem normal navigieren
          window.location.href = absoluteUrl.href;
        }
      })
      .catch(function (err) {
        // Netzwerkfehler (offline, DNS-Fehler, etc.)
        log('Netzwerkfehler:', err);
        redirectToError();
      });
  });

  /* ─── 2. Globaler fetch()-Wrapper ─────────────────────────────────────── */
  // Überschreibt window.fetch, um fehlgeschlagene API-Aufrufe zentral zu loggen.
  // Eine Weiterleitung erfolgt hier NICHT automatisch, da fetch() oft für
  // Hintergrund-Anfragen genutzt wird – stattdessen wird der Fehler geworfen,
  // damit der aufrufende Code selbst entscheiden kann.

  const _originalFetch = window.fetch;
  window.fetch = function (...args) {
    return _originalFetch.apply(this, args).then(function (response) {
      if (!response.ok) {
        log('fetch() Fehler:', response.status, response.url);
        // Fehler wird weitergegeben; aufrufender Code kann reagieren
      }
      return response;
    }).catch(function (err) {
      log('fetch() Netzwerkfehler:', err);
      throw err; // Fehler nicht schlucken
    });
  };

  /* ─── 3. JavaScript-Fehler abfangen ───────────────────────────────────── */

  window.addEventListener('error', function (e) {
    // Ressourcen-Ladefehler (Bilder, CSS, Scripts) abfangen
    if (e.target && e.target !== window) {
      const tag = e.target.tagName ? e.target.tagName.toLowerCase() : 'unknown';
      const src = e.target.src || e.target.href || '(unbekannt)';
      log('Ressource konnte nicht geladen werden:', tag, src);
      // Keine Weiterleitung bei fehlenden Ressourcen, um die UX nicht zu stören
      return;
    }

    // Echte JS-Fehler
    log('JavaScript-Fehler:', e.message, 'in', e.filename, 'Zeile', e.lineno);

    if (CONFIG.redirectOnJSError) {
      redirectToError();
    }
  }, true /* capture: true, um auch Ressourcen-Fehler zu erwischen */);

  /* ─── 4. Nicht behandelte Promise-Rejections ───────────────────────────── */

  window.addEventListener('unhandledrejection', function (e) {
    log('Unbehandelte Promise-Rejection:', e.reason);

    if (CONFIG.redirectOnJSError) {
      e.preventDefault(); // Browser-Konsolenfehler unterdrücken
      redirectToError();
    }
  });

  log('Error-Handler aktiv.');
})();