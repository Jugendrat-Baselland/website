# Erste Schritte (Getting Started)

Diese Anleitung führt dich durch die ersten Schritte mit der Jugendrat Baselland Website.

## Voraussetzungen

- [ ] **Git** (>= 2.x): [Download](https://git-scm.com/)
- [ ] **Texteditor** (empfohlen: [VS Code](https://code.visualstudio.com/) mit der Erweiterung "Live Server")
- [ ] **Webbrowser** (Chrome, Firefox oder Safari)
- [ ] Optional: **Python 3** (für lokalen HTTP-Server)

**Kein Build-Tool, kein npm, kein Framework nötig.**

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/Jugendrat-Baselland/website.git
cd website
```

### 2. Website im Browser öffnen

```bash
# Option A: Datei direkt öffnen
open index.html  # macOS

# Option B: Lokalen Server starten (empfohlen)
python3 -m http.server 8000
# → http://localhost:8000

# Option C: npx serve (falls Node.js installiert)
npx serve .
# → http://localhost:3000
```

### 3. Mit VS Code Live Server (bester Workflow)

1. Öffne das Projekt in VS Code
2. Installiere die Erweiterung "Live Server"
3. Rechtsklick auf `index.html` → **"Open with Live Server"**
4. Änderungen werden automatisch im Browser aktualisiert

## Projektstruktur verstehen

```
website/
├── index.html       → Startseite (Root für Hosting)
├── src/
│   ├── pages/       → Alle HTML-Unterseiten
│   ├── scripts/     → JavaScript (Logik & Daten)
│   ├── styles/      → CSS (modular aufgebaut)
│   └── assets/      → Bilder und Schriftarten
├── docs/            → Dokumentation
├── config/          → Konfigurationshinweise
├── tests/           → Testdokumentation
└── .github/         → CI/CD und GitHub-Templates
```

Detaillierte Erklärung: [README.md](../../README.md)

## Häufige Aufgaben

### Team-Mitglieder bearbeiten
Datei: `src/scripts/services/data.js` → `window.teamMembers`

### Bento-Grid Einträge ändern
Datei: `src/scripts/services/data.js` → `window.bentoProjects`

### CSS anpassen
- Farben/Schriften: `src/styles/base.css` (Custom Properties)
- Layout: `src/styles/layout.css`
- Komponenten: `src/styles/components/` (je eine Datei pro Komponente)

## Nächste Schritte

1. 📖 [Entwicklungsanleitung lesen](development.md)
2. 🔄 [Workflow für Beitragende verstehen](../../CONTRIBUTING.md)
3. 🏗️ [Architekturentscheidungen kennenlernen](../architecture/ADR-001-template.md)
4. 🔄 [Phasen-Dokumentation lesen](../phases/)
