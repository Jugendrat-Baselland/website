# Jugendrat Baselland Website

Statische Website für den Jugendrat Baselland, ohne Build-System, rein mit HTML, CSS und JavaScript.

## Projektstruktur

Das Repository folgt einer professionellen Frontend-Struktur:

```
/
├── index.html                  # Haupt-Einstiegspunkt (Root für Hosting)
├── README.md                   # Diese Datei
└── src/                        # Source-Code
    ├── assets/                 # Statische Ressourcen
    │   ├── images/            # Bilder und Grafiken
    │   └── fonts/             # Schriftarten
    │
    ├── pages/                  # Alle HTML-Seiten
    │   ├── index.html         # Startseite (Duplikat für Referenz)
    │   ├── ueber-uns.html     # Über uns Seite
    │   ├── projekte.html      # Projektübersicht
    │   ├── events.html        # Event-Kalender
    │   ├── team.html          # Team-Mitglieder
    │   ├── kontakt.html       # Kontaktformular
    │   ├── impressum.html     # Rechtliche Informationen
    │   ├── disclaimer.html    # Haftungsausschluss
    │   └── 404.html           # Fehlerseite
    │
    ├── scripts/                # JavaScript-Dateien
    │   ├── app.js             # Haupt-Anwendungslogik
    │   ├── services/          # Daten-Services
    │   │   └── data.js        # Datenbank (Bento-Grid, Team-Mitglieder)
    │   └── utils/             # Hilfsfunktionen
    │       ├── theme.js       # Theme-Switcher (Dark/Light Mode)
    │       └── loader.js      # Page Loader Animation
    │
    └── styles/                 # CSS-Dateien
        ├── base.css           # Reset & CSS-Variablen
        ├── layout.css         # Layout-Struktur (Header, Footer, Grid)
        ├── components.css     # Import aller Komponenten
        └── components/        # Modulare Komponenten-Styles
            ├── cursor.css     # Custom Cursor
            ├── loader.css     # Loading Animation
            ├── hero.css       # Hero-Sections
            ├── cards.css      # Card-Komponenten
            ├── bento.css      # Bento-Grid Layout
            ├── flip-cards.css # Flip-Card Animationen
            ├── carousel.css   # Bild-Karussell
            ├── film-roll.css  # Horizontaler Film-Roll Effekt
            ├── horizontal-scroll.css  # Horizontal-Scroll Container
            ├── events.css     # Event-spezifische Styles
            ├── team-grid.css  # Team-Grid Layout
            ├── contact.css    # Kontaktformular
            ├── form.css       # Allgemeine Formular-Styles
            ├── marquee.css    # Lauftext-Animation
            ├── portrait.css   # Portrait-Komponente
            ├── legal.css      # Legal-Seiten (Impressum, Disclaimer)
            ├── error.css      # 404-Seite Styles
            └── touch-overrides.css  # Mobile/Touch Optimierungen
```

## Datei-Funktionen im Detail

### Root-Ebene
- **`index.html`**: Die Hauptseite, die im Root liegt (erforderlich für Standard-Webhosting und GitHub Pages)

### `/src/pages/`
Enthält alle HTML-Seiten der Website:
- **`index.html`**: Startseite mit Hero-Section und Bento-Grid
- **`ueber-uns.html`**: Informationen über den Jugendrat
- **`projekte.html`**: Übersicht aller Projekte mit Film-Roll Effekt
- **`events.html`**: Event-Kalender mit interaktiven Bild-Overlays
- **`team.html`**: Team-Mitglieder mit Flip-Card Animationen
- **`kontakt.html`**: Kontaktformular mit magnetischen Buttons
- **`impressum.html`**: Rechtliche Informationen
- **`disclaimer.html`**: Haftungsausschluss
- **`404.html`**: Fehlerseite

### `/src/scripts/`

#### `app.js` - Haupt-Anwendungslogik
Enthält alle interaktiven Features:
- Custom Cursor mit Hover-Effekten
- Scroll-Reveal Animationen (Intersection Observer)
- Auto-Hide Header beim Scrollen
- Horizontale Scroll-Logik (Apple-Style)
- Kontaktformular-Animation
- Event-Portal Image-Reveal
- Bento-Grid Generator (dynamisch aus `data.js`)
- Team-Karten Generator (dynamisch aus `data.js`)
- Film-Roll Horizontal-Scroll
- Magnetische Button-Effekte
- Karussell-Navigation

#### `services/data.js` - Datenbank
Zentrale Datenverwaltung (Separation of Concerns):
- **`window.bentoProjects`**: Array mit Bento-Grid Einträgen (Startseite)
- **`window.teamMembers`**: Array mit Team-Mitgliedern

Ermöglicht einfaches Hinzufügen/Ändern von Inhalten ohne HTML-Kenntnisse.

#### `utils/theme.js` - Theme-Switcher
- Dark/Light Mode Umschaltung
- LocalStorage-Persistierung
- CSS Custom Properties Integration

#### `utils/loader.js` - Page Loader
- Lade-Animation beim Seitenwechsel
- Smooth Fade-Out Effekt

### `/src/styles/`

#### Core Styles
- **`base.css`**: CSS Reset, Custom Properties (Farben, Schriften, Abstände)
- **`layout.css`**: Layout-Struktur (Header, Footer, Container, Grid-System)
- **`components.css`**: Import-Datei für alle modularen Komponenten

#### Component Styles (modular)
Jede Komponente hat eine eigene CSS-Datei für bessere Wartbarkeit:
- **UI-Komponenten**: `cursor.css`, `loader.css`, `hero.css`, `cards.css`
- **Layout-Komponenten**: `bento.css`, `team-grid.css`, `film-roll.css`
- **Interaktive Elemente**: `flip-cards.css`, `carousel.css`, `horizontal-scroll.css`
- **Seiten-spezifisch**: `events.css`, `contact.css`, `legal.css`, `error.css`
- **Animationen**: `marquee.css`, `portrait.css`
- **Mobile-Optimierung**: `touch-overrides.css`

## Design-Prinzipien

### CSS-Architektur
- **Modularität**: Jede Komponente hat eigene CSS-Datei
- **CSS Custom Properties**: Zentrale Design-Tokens in `base.css`
- **Mobile-First**: Responsive Design mit Touch-Optimierungen
- **Performance**: GPU-beschleunigte Animationen (transform, opacity)

### JavaScript-Architektur
- **Vanilla JS**: Keine Frameworks, maximale Performance
- **Event Delegation**: Effiziente Event-Handler
- **Intersection Observer**: Moderne Scroll-Animationen
- **Separation of Concerns**: Daten getrennt von Logik (`data.js`)

## Features

### Performance-Optimierungen
- GPU-beschleunigte Transformationen
- Debounced Scroll-Handler
- Lazy-Loading Konzept (defer Scripts)
- Minimale DOM-Manipulationen
- Effiziente CSS-Selektoren

## Entwicklung

### Kein Build-System erforderlich
Diese Website ist eine **statische Website** ohne Build-Prozess:
- Direkt im Browser öffnen
- Keine npm install, webpack, etc.
- Sofortige Änderungen sichtbar

### Lokale Entwicklung
1. Repository klonen
2. `index.html` im Browser öffnen
3. Für lokalen Server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (npx)
   npx http-server
   ```
Alternativ kann ein GitHub Codespace verwendet werden.

### Inhalte ändern

#### Team-Mitglieder hinzufügen/bearbeiten
Datei: `src/scripts/services/data.js`
```javascript
window.teamMembers = [
    {
        name: "Max Mustermann",
        roleFront: "Präsident",
        roleBack: "Leitung & Koordination",
        age: "18",
        quote: "Gemeinsam sind wir stärker!",
        instagram: "max_mustermann",
        image: "https://example.com/image.jpg"
    }
    // Weitere Mitglieder...
];
```

#### Bento-Grid Einträge ändern
Datei: `src/scripts/services/data.js`
```javascript
window.bentoProjects = [
    {
        tag: "Highlight",
        title: "Projekt-Titel",
        description: "Kurze Beschreibung",
        image: "https://example.com/bild.jpg",
        link: "src/pages/zielseite.html"
    }
    // Weitere Einträge...
];
```

## Deployment

### GitHub Pages
Die Website wird automatisch über GitHub Actions auf GitHub Pages deployt,
wenn Änderungen auf den `main`-Branch gepusht werden.

Der CD-Workflow (`.github/workflows/cd.yml`) übernimmt das Deployment vollautomatisch.

### Alternativ: Hosting-Anbieter
Einfach alle Dateien hochladen:
- `index.html` muss im Root bleiben
- `src/` Ordner mit allen Unterordnern hochladen

## Navigation & Pfade

### Von Root (`index.html`)
- CSS: `src/styles/*.css`
- JS: `src/scripts/**/*.js`
- Seiten: `src/pages/*.html`

### Von Seiten (`src/pages/*.html`)
- CSS: `../styles/*.css`
- JS: `../scripts/**/*.js`
- Andere Seiten: `./*.html`
- Zurück zur Startseite: `../../index.html`

## Technologie-Stack

- **HTML5**: Semantisches Markup
- **CSS3**: Custom Properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: ES6+, Intersection Observer, LocalStorage
- **Keine Dependencies**: Reine Web-Standards

## Browser-Unterstützung

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Desktop & Mobile)
- ✅ Mobile Browsers (iOS, Android)

## Lizenz

Open Source - Code kann für weitere Programmierung verwendet werden.

## Kontakt

**Jugendrat Baselland**

Mail: **[it@jugendrat-bl.ch](mailto:it@jugendrat-bl.ch)**

Website: [jugendrat-bl.ch](https://jugendrat-bl.ch)

Discord: [Jugendrat Baselland](https://discord.gg/4xXfGcHEs3)

Instagram: [@jugendrat_bl](https://instagram.com/jugendrat_bl)

TikTok: [@jugendrat_bl](https://tiktok.com/@jugendrat_bl)

Whatsapp: [Jugendrat Baselland](https://whatsapp.com/channel/0029Vb7c1agIXnlrqLpHZU0R)

---

**Statische Website (reines Frontend)** — Jugendrat Baselland
