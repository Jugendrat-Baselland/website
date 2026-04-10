# Entwicklungsanleitung

Diese Anleitung beschreibt den Entwicklungs-Workflow für die Jugendrat Baselland Website.

## Täglicher Workflow

### Morgens: Branch aktualisieren

```bash
# Sicherstellen, dass develop aktuell ist
git checkout develop
git pull origin develop

# Arbeitsbranch rebasen (falls bereits vorhanden)
git checkout feature/mein-feature
git rebase origin/develop
```

### Entwickeln: Kleine, fokussierte Commits

```bash
# Status prüfen
git status

# Dateien für Commit vorbereiten
git add src/styles/components/neue-komponente.css
git add src/pages/neue-seite.html

# Commit mit Conventional-Commit-Format
git commit -m "feat(events): Neue Event-Detailseite mit Bildergalerie hinzufügen"
```

### Vor dem Push: Manuell testen

```bash
# Lokalen Server starten und im Browser prüfen
python3 -m http.server 8000
# → http://localhost:8000

# Prüfe:
# - Alle Seiten laden korrekt
# - Navigation funktioniert
# - Responsive Design auf verschiedenen Breiten
# - Dark Mode / Light Mode
# - Browser-Konsole zeigt keine Fehler
```

### Pull Request erstellen

```bash
# Branch pushen
git push origin feature/mein-feature
```

Dann auf GitHub: **"Compare & pull request"** klicken und PR-Template ausfüllen.

---

## Branch-Konventionen

Erstelle immer einen neuen Branch für jede Aufgabe:

```bash
# Neues Feature
git checkout -b feature/neue-team-sektion

# Bugfix
git checkout -b bugfix/issue-42-carousel-springt

# Hotfix (direkt aus main)
git checkout main
git checkout -b hotfix/broken-link-kontakt
```

---

## Code-Stil

### HTML
- Semantische Elemente: `<header>`, `<main>`, `<section>`, `<footer>`
- Einrückung: **4 Spaces**
- Deutsche `lang="de"` Attribute beibehalten

### CSS
- **CSS Custom Properties** aus `base.css` verwenden (z. B. `var(--color-accent)`)
- Modulare Struktur: Jede Komponente hat eine eigene Datei in `src/styles/components/`
- GPU-beschleunigte Animationen bevorzugen (`transform`, `opacity`)
- Mobile-First Ansatz

### JavaScript
- **Vanilla JS** – keine externen Bibliotheken
- `escapeHTML()` für alle dynamisch eingefügten Inhalte (XSS-Prävention)
- Intersection Observer für Scroll-Animationen
- Daten in `data.js`, Logik in `app.js`

---

## Debugging

### Browser DevTools nutzen

- **Console-Tab**: JavaScript-Fehler und `console.log()`-Ausgaben
- **Elements-Tab**: HTML/CSS live inspizieren und ändern
- **Network-Tab**: Fehlende Dateien oder langsame Ladezeiten finden
- **Device-Toolbar** (Ctrl+Shift+M): Responsive Design testen

### Häufige Probleme

**Problem: Seite zeigt keine Styles**
- Prüfe die relativen Pfade zu CSS-Dateien (`../styles/` vs. `src/styles/`)
- `index.html` (Root) nutzt `src/styles/`, Unterseiten `../styles/`

**Problem: JavaScript-Fehler in der Konsole**
- Prüfe ob `data.js` vor `app.js` geladen wird (`defer`-Attribut beachten)
- Prüfe ob DOM-Elemente existieren bevor sie angesprochen werden

**Problem: Animationen ruckeln**
- Nutze `transform` und `opacity` statt `top`, `left`, `width`
- Prüfe ob `will-change` für animierte Elemente gesetzt ist

**Problem: Port bereits belegt**
```bash
# Prozess auf Port 8000 finden und beenden
lsof -i :8000
kill <PID>
```

---

## Weitere Ressourcen

- [Getting Started](getting-started.md)
- [Deployment-Anleitung](deployment.md)
- [Phase 3 – Entwicklung](../phases/03-entwicklung.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
