# Beitragsrichtlinien (Contributing Guide)

Vielen Dank für dein Interesse, zu diesem Projekt beizutragen! 🎉  
Bitte lies diese Richtlinien sorgfältig durch, bevor du mit der Arbeit beginnst.

---

## Inhaltsverzeichnis

1. [Verhaltenskodex](#verhaltenskodex)
2. [Wie kann ich beitragen?](#wie-kann-ich-beitragen)
3. [Entwicklungsumgebung einrichten](#entwicklungsumgebung-einrichten)
4. [Branch-Strategie](#branch-strategie)
5. [Commit-Konventionen](#commit-konventionen)
6. [Pull-Request-Prozess](#pull-request-prozess)
7. [Code-Stil](#code-stil)
8. [Dokumentation](#dokumentation)

---

## Verhaltenskodex

Dieses Projekt folgt unserem [Verhaltenskodex](CODE_OF_CONDUCT.md). Durch deine Teilnahme
verpflichtest du dich, diesen einzuhalten.

---

## Wie kann ich beitragen?

### 🐛 Fehler melden

Bevor du einen Bug meldest, prüfe bitte:
- Ob das Problem bereits in den [Issues](../../issues) bekannt ist
- Ob du den neuesten Stand des `main`-Branches verwendest
- Ob das Problem in mehreren Browsern auftritt

Falls nicht vorhanden, erstelle einen neuen Issue mit der **Bug Report**-Vorlage.  
Beschreibe das Problem so genau wie möglich mit:
- Schritten zur Reproduktion
- Erwartetem und tatsächlichem Verhalten
- Browser und Betriebssystem

### ✨ Neue Funktionen vorschlagen

Für Feature-Requests ebenfalls einen Issue erstellen – verwende die
**Feature Request**-Vorlage. Beschreibe:
- Den konkreten Anwendungsfall
- Die gewünschte Lösung
- Mögliche Alternativen

### 🔧 Code beitragen

1. Suche einen offenen Issue oder erstelle einen neuen
2. Kommentiere auf dem Issue, dass du daran arbeitest
3. Fork das Repository (bei externen Beiträgen) oder erstelle einen Branch
4. Implementiere die Änderung
5. Erstelle einen Pull Request

---

## Entwicklungsumgebung einrichten

Diese Website ist eine **statische Website** ohne Build-Prozess:

```bash
# Repository klonen
git clone https://github.com/Jugendrat-Baselland/website.git
cd website

# index.html direkt im Browser öffnen
# ODER einen lokalen Server starten:
python3 -m http.server 8000
# Alternative:
npx serve .
```

**Kein `npm install`, kein Webpack, kein Build nötig** – Änderungen sind sofort im Browser sichtbar.

### Empfohlene Werkzeuge

- **VS Code** mit der Erweiterung "Live Server" für automatisches Neuladen
- **Browser DevTools** (Chrome/Firefox) für CSS- und JavaScript-Debugging

---

## Branch-Strategie

Wir verwenden **Git Flow**:

| Branch | Beschreibung |
|--------|-------------|
| `main` | Stabiler, produktiver Code (läuft auf GitHub Pages) |
| `develop` | Integrations-Branch für neue Features |
| `feature/*` | Neue Funktionen (basiert auf `develop`) |
| `bugfix/*` | Fehlerbehebungen (basiert auf `develop`) |
| `hotfix/*` | Kritische Fixes direkt für `main` |

**Namensschema:**
```
feature/kurze-beschreibung-des-features
bugfix/issue-42-fehler-beim-formular
hotfix/kritischer-darstellungsfehler
```

---

## Commit-Konventionen

Wir folgen dem [Conventional Commits](https://www.conventionalcommits.org/de/) Standard:

```
<typ>(<bereich>): <kurze beschreibung im Imperativ>

[optionaler ausführlicher beschreibungstext]

[optionale fußzeile(n)]
```

**Typen:**

| Typ | Beschreibung |
|-----|-------------|
| `feat` | Neue Funktion |
| `fix` | Fehlerbehebung |
| `docs` | Nur Dokumentationsänderungen |
| `style` | Formatierung, CSS-Anpassungen (kein Logik-Code) |
| `refactor` | Code-Umstrukturierung ohne Featureänderung |
| `perf` | Performance-Verbesserungen |
| `ci` | CI/CD-Konfigurationsänderungen |
| `chore` | Maintenance (Abhängigkeiten, Konfiguration, etc.) |
| `revert` | Rückgängig machen eines Commits |

**Beispiele:**
```
feat(hero): Parallax-Effekt für Hero-Section hinzufügen
fix(carousel): Navigation springt auf Mobile nicht korrekt
style(base): Dark-Mode Farbwerte für besseren Kontrast anpassen
docs(readme): Deployment-Anleitung aktualisieren
refactor(app): Scroll-Handler mit Debouncing optimieren
```

---

## Pull-Request-Prozess

1. **Branch erstellen** aus `develop` (nicht aus `main`)
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/meine-neue-funktion
   ```

2. **Änderungen implementieren** und committen (Conventional Commits)

3. **Im Browser testen** – in mehreren Browsern und auf Mobile prüfen

4. **Branch pushen** und Pull Request öffnen
   ```bash
   git push origin feature/meine-neue-funktion
   ```

5. **PR-Template ausfüllen** – beschreibe alle Änderungen vollständig

6. **CI abwarten** – alle automatischen Prüfungen müssen grün sein

7. **Review einholen** – mindestens 1 Approval erforderlich

8. **Kommentare adressieren** – reagiere auf alle Review-Kommentare

9. **Merge** – nach Approval durch Maintainer

### Kriterien für einen guten Pull Request

- ✅ Fokussiert auf eine einzige Änderung / ein einziges Feature
- ✅ In verschiedenen Browsern getestet (Chrome, Firefox, Safari)
- ✅ Responsive Design auf Mobile geprüft
- ✅ Dokumentation aktualisiert (wenn nötig)
- ✅ CHANGELOG.md aktualisiert
- ✅ Keine Konflikte mit dem Ziel-Branch
- ✅ Alle CI-Checks bestanden

---

## Code-Stil

### HTML
- Semantische HTML5-Elemente verwenden (`<header>`, `<main>`, `<section>`, etc.)
- Attribute in Kleinbuchstaben
- Deutsche `lang="de"` Attribute beibehalten

### CSS
- **CSS Custom Properties** aus `base.css` verwenden (keine hardcoded Farben/Grössen)
- Modulare Struktur beibehalten – jede Komponente hat eine eigene CSS-Datei
- Mobile-First: Responsive Design mit Touch-Optimierungen
- GPU-beschleunigte Animationen bevorzugen (`transform`, `opacity`)

### JavaScript
- **Vanilla JS** – keine Frameworks oder Bibliotheken
- `escapeHTML()` für alle dynamisch eingefügten Inhalte verwenden (XSS-Prävention)
- Intersection Observer für Scroll-Animationen
- Event-Delegation für dynamisch erzeugte Elemente
- Daten in `data.js`, Logik in `app.js` (Separation of Concerns)

---

## Dokumentation

- Aktualisiere `README.md` bei Änderungen an der Projektstruktur
- Neue Features oder Seiten in `docs/` beschreiben
- Architekturentscheidungen als ADR in `docs/architecture/` festhalten

---

Fragen? Erstelle ein Issue oder wende dich an das Projektteam.  
Danke für deinen Beitrag! 🙏
