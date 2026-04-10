# Daten-Schnittstelle

Diese Website hat kein Backend und keine REST-API. Stattdessen werden alle dynamischen
Inhalte über die JavaScript-Datei `src/scripts/services/data.js` bereitgestellt.

## Datenquellen

### `window.bentoProjects` – Bento-Grid Einträge (Startseite)

```javascript
{
    tag: "Highlight",           // Kategorie-Label
    title: "Titel des Eintrags", // Überschrift
    description: "Beschreibung", // Kurzbeschreibung
    image: "pfad/zum/bild.jpg",  // Bild-URL
    link: "src/pages/seite.html" // Zielseite
}
```

### `window.teamMembers` – Team-Mitglieder

```javascript
{
    name: "Vorname Nachname",    // Vollständiger Name
    roleFront: "Rolle",          // Rolle (Vorderseite der Flip-Card)
    roleBack: "Beschreibung",    // Detaillierte Beschreibung (Rückseite)
    age: "17",                   // Alter
    quote: "Zitat",              // Persönliches Zitat
    instagram: "benutzername",   // Instagram-Handle
    image: "pfad/zum/bild.jpg"   // Profilbild-URL
}
```

## Inhalte ändern

Alle Inhalte können direkt in `src/scripts/services/data.js` geändert werden –
ohne HTML-Kenntnisse. Die Daten werden beim Laden der Seite automatisch in
die entsprechenden Sektionen gerendert.

## Sicherheitshinweis

Alle Daten aus `data.js` werden über die `escapeHTML()`-Funktion in `app.js`
sanitisiert, bevor sie ins DOM eingefügt werden (XSS-Prävention).
