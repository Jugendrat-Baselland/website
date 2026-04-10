# Sicherheitsrichtlinien (Security Policy)

## Unterstützte Versionen

| Version | Sicherheitsupdates |
|---------|-------------------|
| 1.x.x   | ✅ Aktiv unterstützt |
| < 1.0   | ❌ Keine Updates mehr |

## Sicherheitslücke melden

**Bitte melde Sicherheitslücken NICHT als öffentliche GitHub Issues.**

Sicherheitslücken sollen verantwortungsvoll offengelegt werden, um Nutzern die
Möglichkeit zu geben, sich zu schützen, bevor Details öffentlich bekannt werden.

### So meldest du eine Sicherheitslücke

1. **E-Mail** an: **[security@jugendrat-bl.ch](mailto:security@jugendrat-bl.ch)**
2. **Betreff**: `[SECURITY] Kurze Beschreibung des Problems`
3. **Inhalt** der Meldung:
   - Beschreibung der Sicherheitslücke
   - Schritte zur Reproduktion
   - Mögliche Auswirkungen (Impact)
   - Betroffene Seiten / Dateien
   - Mögliche Lösung (optional)

### Was du erwarten kannst

- **Innerhalb von 48 Stunden**: Bestätigung des Eingangs deiner Meldung
- **Innerhalb von 7 Tagen**: Erste Einschätzung der Schwere und des Handlungsbedarfs
- **Innerhalb von 90 Tagen**: Veröffentlichung des Fixes (bei Bestätigung der Lücke)

Wir werden dich über den Fortschritt auf dem Laufenden halten und dich nach
Möglichkeit im Changelog und/oder Release-Notes nennen (wenn du das möchtest).

## Sicherheits-Best-Practices für Entwickler

### Allgemeines

- **Niemals** API-Keys, Passwörter oder Tokens in den Code committen
- Keine sensiblen Daten in HTML, CSS oder JavaScript-Dateien hinterlegen
- Externe Ressourcen (Bilder, Fonts, Skripte) nur von vertrauenswürdigen Quellen laden

### Code-Sicherheit (Frontend)

- **XSS-Prävention**: Benutzereingaben immer mit `escapeHTML()` (siehe `app.js`) sanitisieren
- **Keine `innerHTML`** mit unkontrollierten Daten – stattdessen `textContent` oder die `escapeHTML()`-Funktion verwenden
- **Externe Links**: `rel="noopener noreferrer"` bei `target="_blank"` verwenden
- **Formulare**: Eingaben clientseitig validieren (serverseitige Validierung beim Formular-Empfänger sicherstellen)
- **HTTPS**: Website immer über HTTPS ausliefern (GitHub Pages erzwingt dies automatisch)

### Statische Inhalte

- Keine sensiblen Informationen in `data.js` oder anderen JavaScript-Dateien speichern
- Bilderquellen prüfen – keine externen URLs verwenden, die manipuliert werden könnten
- Content Security Policy (CSP) via Meta-Tags oder Server-Header in Betracht ziehen

### GitHub Actions / CI/CD

- Nur vertrauenswürdige Actions aus verifizierten Quellen verwenden
- Actions auf spezifische Commits pinnen (nicht `@latest`)
- Secrets nur über GitHub Secrets, nie in YAML-Dateien

## Automatisierte Sicherheits-Scans

Dieses Projekt enthält einen automatisierten Security-Workflow:
- **CodeQL**: Statische Code-Analyse der JavaScript-Dateien auf Sicherheitslücken
- **Secret Scanning**: Automatisches Erkennen von versehentlich committeten Secrets
