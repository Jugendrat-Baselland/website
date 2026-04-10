# Phase 4 – Testing

## Ziel

Die Website wird systematisch auf Korrektheit, visuelle Qualität und Funktionsfähigkeit
geprüft. Da dies eine statische Website ohne Build-Prozess ist, liegt der Fokus auf
manuellem Browser-Testing und automatisierten CI-Checks.

## Dauer

Kontinuierlich während Phase 3; ca. 15–20 % der Entwicklungszeit

---

## Test-Strategie für statische Websites

```
       ┌───────────────────┐
       │   E2E / Visuell   │  Browser-übergreifende Tests
       │                   │  (Playwright, manuell)
       └─────────┬─────────┘
    ┌────────────┴────────────┐
    │    Funktionale Tests    │  JavaScript-Logik prüfen
    │                         │  (Browser-Konsole, manuell)
    └────────────┬────────────┘
  ┌──────────────┴──────────────┐
  │   Struktur & Validierung    │  HTML/CSS Validität, Links
  │                             │  (CI-Pipeline, automatisch)
  └─────────────────────────────┘
```

---

## Automatisierte Tests (CI-Pipeline)

Die CI-Pipeline (`.github/workflows/ci.yml`) prüft automatisch:
- **Dateistruktur**: Alle HTML-, CSS- und JS-Dateien vorhanden
- **Interne Links**: Keine toten Links zwischen Seiten
- **CodeQL**: Statische Sicherheitsanalyse des JavaScript-Codes

---

## Manuelles Browser-Testing

### Cross-Browser-Tests

Jede Änderung sollte in den folgenden Browsern getestet werden:

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ (Android) |
| Firefox | ✅ | ✅ |
| Safari | ✅ (macOS) | ✅ (iOS) |
| Edge | ✅ | – |

### Responsive Design testen

1. Browser DevTools öffnen (F12)
2. **Device Toolbar** aktivieren (Ctrl+Shift+M / Cmd+Shift+M)
3. Folgende Breakpoints prüfen:
   - **Mobile**: 375px (iPhone SE), 390px (iPhone 14)
   - **Tablet**: 768px (iPad), 1024px (iPad Pro)
   - **Desktop**: 1280px, 1920px

### Funktionale Test-Checkliste

**Navigation:**
- [ ] Alle Links in Header und Footer funktionieren
- [ ] Logo-Link führt zur Startseite
- [ ] Header versteckt sich beim Scrollen und erscheint wieder

**Startseite:**
- [ ] Hero-Section wird korrekt angezeigt
- [ ] Bento-Grid wird dynamisch aus `data.js` generiert
- [ ] Scroll-Reveal Animationen funktionieren

**Unterseiten:**
- [ ] Alle Seiten laden ohne Fehler
- [ ] Pfade zu CSS/JS stimmen (relative Pfade)
- [ ] Navigation zwischen Seiten funktioniert

**Interaktive Elemente:**
- [ ] Custom Cursor folgt der Maus (Desktop)
- [ ] Custom Cursor ist auf Touch-Geräten ausgeblendet
- [ ] Dark Mode / Light Mode wechselt korrekt
- [ ] Theme-Einstellung wird im LocalStorage gespeichert
- [ ] Flip-Cards auf der Team-Seite funktionieren
- [ ] Karussell-Navigation funktioniert
- [ ] Horizontaler Scroll funktioniert (Desktop)

**Animationen:**
- [ ] Scroll-Reveal Animationen laufen flüssig
- [ ] Page Loader wird angezeigt und verschwindet
- [ ] Keine visuellen Glitches oder Flackern

---

## Sicherheits-Tests

- **XSS-Prävention**: Prüfen, dass `escapeHTML()` für alle dynamischen Inhalte verwendet wird
- **CodeQL**: Automatische statische Analyse in `.github/workflows/security.yml`
- **Browser-Konsole**: Keine Sicherheitswarnungen oder Mixed-Content-Fehler

---

## Performance-Tests

Empfohlene Tools für Performance-Analyse:
- **Lighthouse** (in Chrome DevTools → Tab "Lighthouse")
  - Performance Score > 90 anstreben
  - Best Practices Score > 90
  - Accessibility Score > 80
- **Browser DevTools Network-Tab**: Ladezeiten prüfen

---

## Checkliste (Testing-Phase)

- [ ] In Chrome, Firefox und Safari getestet
- [ ] Responsive Design auf Mobile und Tablet geprüft
- [ ] Dark Mode und Light Mode funktionieren
- [ ] Alle interaktiven Elemente funktionieren
- [ ] Browser-Konsole zeigt keine Fehler
- [ ] CI-Pipeline ist grün (Dateistruktur, Links)
- [ ] CodeQL-Scan ohne kritische Findings
- [ ] Lighthouse Performance > 90

---

Zurück: [Phase 3 – Entwicklung](03-entwicklung.md) | Weiter: [Phase 5 – Review](05-review.md)
