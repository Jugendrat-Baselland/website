# Phase 7 – Wartung & Weiterentwicklung

## Ziel

Die live Website wird regelmässig geprüft, Inhalte aktualisiert und die
Codebasis verbessert. Diese Phase endet nie – sie läuft parallel zu neuen
Entwicklungszyklen.

## Dauer

Kontinuierlich (für die gesamte Lebensdauer der Website)

---

## Regelmäßige Aktivitäten

### Wöchentlich

| Aktivität | Beschreibung |
|-----------|-------------|
| Website prüfen | Live-Website in verschiedenen Browsern aufrufen |
| Issue-Triage | Neue Issues priorisieren und Labels vergeben |
| Inhalte aktualisieren | Team-Daten, Events, Projekte in `data.js` pflegen |

### Monatlich

| Aktivität | Beschreibung |
|-----------|-------------|
| Browser-Kompatibilität | In aktuellen Browser-Versionen testen |
| Security-Review | CodeQL-Ergebnisse prüfen, offene Security-Issues bearbeiten |
| Dokumentations-Review | Veraltete Dokumentation aktualisieren |
| Lighthouse-Audit | Performance und Accessibility in Chrome Lighthouse prüfen |

### Quartalsweise

| Aktivität | Beschreibung |
|-----------|-------------|
| Design-Review | Visuelle Konsistenz und Aktualität prüfen |
| Code-Review | CSS/JS auf Verbesserungspotential prüfen |
| Tech-Debt-Abbau | Technische Schulden gezielt abbauen |
| Team-Retrospektive | Prozesse und Workflow evaluieren |

---

## Inhalte aktualisieren

### Team-Mitglieder

Neue Mitglieder hinzufügen oder bestehende bearbeiten in `src/scripts/services/data.js`:

```javascript
window.teamMembers = [
    {
        name: "Vorname Nachname",
        roleFront: "Rolle",
        roleBack: "Beschreibung der Tätigkeit",
        age: "17",
        quote: "Persönliches Zitat",
        instagram: "benutzername",
        image: "pfad/zum/bild.jpg"
    },
    // ...
];
```

### Bento-Grid (Startseite)

Highlights, Events und Projekte auf der Startseite aktualisieren:

```javascript
window.bentoProjects = [
    {
        tag: "Highlight",
        title: "Titel",
        description: "Beschreibung",
        image: "pfad/zum/bild.jpg",
        link: "src/pages/seite.html"
    },
    // ...
];
```

---

## Incident-Management

### Typische Probleme bei statischen Websites

| Problem | Mögliche Ursache | Lösung |
|---------|------------------|--------|
| Seite zeigt 404 | Datei umbenannt/gelöscht | Links in allen HTML-Dateien prüfen |
| Styles fehlen | CSS-Pfad falsch | Relative Pfade korrigieren |
| JavaScript-Fehler | Syntax-Fehler oder fehlende Datei | Browser-Konsole prüfen |
| Bilder laden nicht | Bild-URL fehlerhaft oder Datei fehlt | Pfade prüfen, Bilder hochladen |
| HTTPS-Warnung | Mixed Content | Alle URLs auf HTTPS umstellen |

### Rollback bei Problemen

```bash
git checkout main
git revert HEAD --no-commit
git commit -m "revert: Letzte Änderung zurückgenommen – [Grund]"
git push origin main
# → GitHub Actions deployt automatisch die zurückgenommene Version
```

---

## Technische Schulden (Tech Debt)

Technische Schulden entstehen durch Kompromisse bei der Entwicklung.
Sie müssen aktiv verwaltet werden, um die Code-Qualität langfristig zu erhalten.

**Beispiele für Tech Debt in diesem Projekt:**
- Platzhalter-Bilder von picsum.photos durch eigene Bilder ersetzen
- Touch-Overrides für weitere Geräte optimieren
- CSS-Komponenten weiter modularisieren
- Accessibility (ARIA-Labels, Fokus-Management) verbessern

**Umgang:**
1. Tech-Debt als Issues erfassen (Label: `tech-debt`)
2. Bei jeder Planungsrunde Zeit für Tech-Debt reservieren
3. Grobe Regel: Für jede neue Funktion auch einen bestehenden Tech-Debt abbauen

---

## Checkliste (Wartung)

**Wöchentlich:**
- [ ] Live-Website kurz geprüft
- [ ] Neue Issues bearbeitet oder priorisiert

**Monatlich:**
- [ ] Browser-Kompatibilität getestet
- [ ] Lighthouse-Audit durchgeführt
- [ ] Dokumentation aktualisiert

**Quartalsweise:**
- [ ] Code / Design Review durchgeführt
- [ ] Tech-Debt-Abbau eingeplant
- [ ] Retrospektive abgehalten

---

Zurück: [Phase 6 – Deployment](06-deployment.md) | Zurück zum [Anfang](../../README.md)
