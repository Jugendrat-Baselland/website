# Tests (`tests/`)

Dieses Verzeichnis dokumentiert die Test-Strategie für die Jugendrat Baselland Website.

## Verzeichnisstruktur

```
tests/
├── unit/          # Reserviert für zukünftige Unit-Tests
├── integration/   # Reserviert für zukünftige Integrations-Tests
├── e2e/           # Reserviert für zukünftige E2E-Tests (z. B. Playwright)
└── README.md      # Diese Datei
```

## Aktuelle Test-Strategie

Da es sich um eine **statische Website ohne Build-Prozess** handelt, werden
Tests aktuell wie folgt durchgeführt:

### Automatisiert (CI-Pipeline)

Die CI-Pipeline (`.github/workflows/ci.yml`) prüft automatisch:
- **Dateistruktur**: Alle HTML-, CSS- und JS-Dateien vorhanden
- **Link-Validierung**: Keine toten internen Links
- **CodeQL-Analyse**: Statische Sicherheitsanalyse des JavaScript-Codes

### Manuelles Browser-Testing

Für jede Änderung werden folgende manuelle Tests durchgeführt:
- Cross-Browser-Tests (Chrome, Firefox, Safari)
- Responsive Design (Mobile, Tablet, Desktop)
- Dark Mode / Light Mode
- Interaktive Elemente (Animationen, Navigation, Flip-Cards)

Details siehe: [Phase 4 – Testing](../docs/phases/04-testing.md)

## Zukünftige Erweiterungen

### E2E-Tests mit Playwright (geplant)

```javascript
// Beispiel: Navigation testen
test('Startseite zeigt Hero-Section und Bento-Grid', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await expect(page.locator('h1')).toContainText('Deine Stimme');
    await expect(page.locator('#bento-grid-container')).toBeVisible();
});

test('Navigation zur Team-Seite funktioniert', async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.click('text=Team');
    await expect(page).toHaveURL(/team\.html/);
});
```

### Lighthouse CI (geplant)

Automatisierte Performance- und Accessibility-Audits in der CI-Pipeline:
- Performance Score > 90
- Accessibility Score > 80
- Best Practices Score > 90
