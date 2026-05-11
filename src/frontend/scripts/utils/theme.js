/*theme.js*/

// Theme sofort anwenden (vor DOMContentLoaded, verhindert Flash)
const savedTheme = localStorage.getItem("moStudioTheme");
if (savedTheme === "dark") { document.documentElement.classList.add("dark-mode"); }

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle       = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");

    // Setzt den Label-Text beider Buttons synchron
    function updateToggleLabels(isDark) {
        const label = isDark ? "Light" : "Dark";
        if (themeToggle)       themeToggle.textContent       = label;
        if (themeToggleMobile) themeToggleMobile.textContent = label;
    }

    // Initialen Zustand setzen
    updateToggleLabels(document.documentElement.classList.contains("dark-mode"));

    // Gemeinsame Toggle-Logik
    function handleThemeToggle() {
        document.documentElement.classList.toggle("dark-mode");
        const isDark = document.documentElement.classList.contains("dark-mode");
        localStorage.setItem("moStudioTheme", isDark ? "dark" : "light");
        updateToggleLabels(isDark);
    }

    if (themeToggle)       themeToggle.addEventListener("click", handleThemeToggle);
    if (themeToggleMobile) themeToggleMobile.addEventListener("click", handleThemeToggle);

});