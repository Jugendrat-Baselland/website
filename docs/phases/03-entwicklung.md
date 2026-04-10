# Phase 3 – Entwicklung

## Ziel

Der eigentliche Quellcode wird geschrieben. Diese Phase folgt klaren Konventionen,
um Qualität, Lesbarkeit und Wartbarkeit sicherzustellen.

## Dauer

Variabel – Kernphase des Projekts (Sprints)

---

## Entwicklungs-Workflow

### Schritt-für-Schritt

```
1. Issue auswählen (aus Sprint-Backlog)
     ↓
2. Branch erstellen (aus develop)
     ↓
3. Code schreiben (kleine, fokussierte Commits)
     ↓
4. Im Browser testen (Desktop + Mobile, Dark/Light Mode)
     ↓
5. Pull Request öffnen
     ↓
6. CI-Pipeline abwarten
     ↓
7. Code-Review (→ Phase 5)
     ↓
8. Merge in develop
```

---

## Branch-Strategie (Git Flow)

```
main          ●────────────────────────────────────────► Produktion
              │
develop       ●────────●────────────●───────────────►  Integration
                       │            │
feature/login          ●───────────►│
                                    │
feature/dashboard                   ●────────►
```

### Branch erstellen

```bash
# Immer von develop abzweigen
git checkout develop
git pull origin develop
git checkout -b feature/beschreibung-des-features

# Oder für Bugfixes:
git checkout -b bugfix/issue-42-fehler-beschreibung
```

### Branch-Namenskonventionen

| Typ | Schema | Beispiel |
|-----|--------|---------|
| Feature | `feature/kurze-beschreibung` | `feature/benutzer-anmeldung` |
| Bugfix | `bugfix/issue-NR-beschreibung` | `bugfix/issue-42-login-fehler` |
| Hotfix | `hotfix/beschreibung` | `hotfix/xss-in-kommentaren` |
| Release | `release/vX.Y.Z` | `release/v1.2.0` |
| Docs | `docs/beschreibung` | `docs/api-dokumentation` |
| Chore | `chore/beschreibung` | `chore/abhaengigkeiten-aktualisieren` |

---

## Commit-Konventionen (Conventional Commits)

### Format

```
<typ>(<bereich>): <kurze beschreibung im Präsens>

[optionaler langer Beschreibungstext]

[optionale Fußzeilen: BREAKING CHANGE, Closes #123]
```

### Commit-Typen

| Typ | Beschreibung | Versionserhöhung |
|-----|-------------|-----------------|
| `feat` | Neue Funktion | Minor (1.x.0) |
| `fix` | Fehlerbehebung | Patch (1.0.x) |
| `docs` | Nur Dokumentation | – |
| `style` | Formatierung (kein Code) | – |
| `refactor` | Code-Umstrukturierung | – |
| `test` | Tests hinzufügen/ändern | – |
| `chore` | Maintenance, Build | – |
| `perf` | Performance-Verbesserung | Patch |
| `ci` | CI/CD-Konfiguration | – |
| `revert` | Commit rückgängig machen | – |

### Gute Commit-Beispiele

```bash
# Neue Funktion
git commit -m "feat(hero): Parallax-Scroll-Effekt für Hero-Section implementieren"

# Bugfix mit Issue-Referenz
git commit -m "fix(carousel): Navigation springt auf Mobile nicht korrekt

Der Touch-Handler hat das Scroll-Event nicht korrekt abgefangen,
was zu Sprüngen bei Swipe-Gesten führte.

Closes #42"

# CSS-Änderung
git commit -m "style(base): Dark-Mode Farbwerte für besseren Kontrast anpassen"

# Dokumentation
git commit -m "docs(readme): Deployment-Anleitung für GitHub Pages ergänzen"
```

### Schlechte Commits (vermeiden)

```bash
# ❌ Zu vage
git commit -m "fix"
git commit -m "changes"
git commit -m "update"
git commit -m "WIP"

# ❌ Zu groß – lieber aufteilen
git commit -m "feat: Alles implementiert"

# ❌ Falsches Tempus
git commit -m "fixed the bug"  # Stattdessen: "fix: Fehler beheben"
```

---

## Code-Qualität

### Allgemeine Prinzipien

| Prinzip | Beschreibung |
|---------|-------------|
| **SOLID** | Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion |
| **DRY** | Don't Repeat Yourself – keine Code-Duplizierung |
| **KISS** | Keep It Simple, Stupid – einfachste Lösung bevorzugen |
| **YAGNI** | You Aren't Gonna Need It – keine unnötigen Features vorab |

### Regeln für lesbaren Code

- Selbsterklärende Namen für Variablen, Funktionen, Klassen
- Funktionen: max. 20–30 Zeilen, eine Aufgabe
- Klassen: max. 200–300 Zeilen, eine Verantwortung
- Kommentare: **Warum**, nicht **Was** (der Code zeigt das Was)
- Keine Magic Numbers – benannte Konstanten verwenden
- Fehlerfälle explizit behandeln

---

## Lokaler Entwicklungs-Loop

```bash
# 1. Neueste Änderungen aus develop holen
git fetch origin
git rebase origin/develop

# 2. Code schreiben...

# 3. Im Browser testen
python3 -m http.server 8000
# → http://localhost:8000 öffnen und Änderungen prüfen
# Oder: VS Code Live Server Extension nutzen

# 4. Prüfen:
# - Browser-Konsole auf Fehler prüfen (F12)
# - Responsive Design testen (Device Toolbar)
# - Dark Mode / Light Mode testen

# 5. Commit
git add .
git commit -m "feat(bereich): beschreibung"

# 6. Branch pushen
git push origin feature/mein-feature
```

---

## Checkliste (pro Feature)

- [ ] Branch aus aktuellem `develop` erstellt
- [ ] Issue als "In Progress" markiert
- [ ] Code implementiert (HTML/CSS/JS)
- [ ] `escapeHTML()` für dynamische Inhalte verwendet
- [ ] CSS Custom Properties aus `base.css` verwendet
- [ ] Im Browser getestet (Chrome, Firefox, Safari)
- [ ] Responsive Design auf Mobile geprüft
- [ ] Dark Mode / Light Mode funktionieren
- [ ] Browser-Konsole zeigt keine Fehler
- [ ] Conventional-Commit-Format verwendet
- [ ] Keine sensiblen Daten committet
- [ ] Dokumentation aktualisiert (falls nötig)

---

Zurück: [Phase 2 – Planung](02-planung.md) | Weiter: [Phase 4 – Testing](04-testing.md)
