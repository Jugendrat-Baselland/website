/* =====================================================================
 * loader.js – Initialer Page-Loader
 * ---------------------------------------------------------------------
 * Setzt sofort die `loading`-Klasse auf <html>, damit das Scrolling
 * blockiert wird, solange der Loader sichtbar ist. Nach dem Window-
 * Load-Event wird er nach kurzer Verzögerung sanft ausgeblendet.
 * ===================================================================== */

(function () {
    'use strict';

    const MIN_DISPLAY_MS = 600;   // mindeste Sichtbarkeit für saubere Animation
    const HIDE_DELAY_MS  = 2000;  // ursprüngliches Verhalten beibehalten

    document.documentElement.classList.add('loading');
    const startTime = performance.now();

    const hideLoader = () => {
        const loader = document.getElementById('loader');
        if (!loader) {
            document.documentElement.classList.remove('loading');
            return;
        }
        loader.classList.add('hidden');
        document.documentElement.classList.remove('loading');
    };

    window.addEventListener('load', () => {
        const elapsed = performance.now() - startTime;
        const delay   = Math.max(MIN_DISPLAY_MS, HIDE_DELAY_MS - elapsed);
        setTimeout(hideLoader, delay);
    });

    /* Sicherheits-Fallback: Loader spätestens nach 8 s entfernen,
       falls window.load aus irgendeinem Grund nicht feuert.        */
    setTimeout(hideLoader, 8000);
})();
