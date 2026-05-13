/* =====================================================================
 * theme.js – Dark/Light-Mode-Steuerung
 * ---------------------------------------------------------------------
 * Wird OHNE defer im <head> geladen, damit das Theme angewandt wird,
 * bevor der erste Frame gerendert wird (vermeidet "Flash of Light").
 * Bedient SOWOHL den Desktop- als auch den Mobile-Toggle-Button.
 * ===================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'moStudioTheme';

    /** localStorage-Zugriff mit Fallback (z. B. Inkognito-Modus). */
    const storage = {
        get(key) {
            try { return window.localStorage.getItem(key); }
            catch (_) { return null; }
        },
        set(key, value) {
            try { window.localStorage.setItem(key, value); }
            catch (_) { /* still kein Crash, falls Speicherzugriff verweigert wird */ }
        }
    };

    /* Theme sofort anwenden (vor DOMContentLoaded) – verhindert Flash. */
    if (storage.get(STORAGE_KEY) === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    document.addEventListener('DOMContentLoaded', () => {

        const themeToggle       = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');

        const updateLabels = (isDark) => {
            const label = isDark ? 'Light' : 'Dark';
            if (themeToggle)       themeToggle.textContent       = label;
            if (themeToggleMobile) themeToggleMobile.textContent = label;
        };

        updateLabels(document.documentElement.classList.contains('dark-mode'));

        const handleThemeToggle = () => {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            storage.set(STORAGE_KEY, isDark ? 'dark' : 'light');
            updateLabels(isDark);
        };

        if (themeToggle)       themeToggle.addEventListener('click', handleThemeToggle);
        if (themeToggleMobile) themeToggleMobile.addEventListener('click', handleThemeToggle);
    });
})();
