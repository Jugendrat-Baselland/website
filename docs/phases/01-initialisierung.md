# Phase 1 – Initialisierung

## Ziel

In dieser Phase wird das Fundament des Projekts gelegt. Am Ende dieser Phase gibt es
ein funktionierendes Repository, ein klares Projektbild und ein aufgestelltes Team.

## Dauer

Typischerweise: **1–3 Tage**

---

## Aufgaben

### 1.1 Repository erstellen

1. Auf GitHub: **„Use this template"** → **„Create a new repository"**
2. Repository-Name wählen: `kebab-case` (z. B. `jugendrat-website`, `event-management`)
3. Beschreibung eingeben
4. Sichtbarkeit festlegen (Private empfohlen für neue Projekte)
5. **„Create repository from template"** klicken

### 1.2 Branch-Schutzregeln einrichten

In GitHub: **Settings** → **Branches** → **Add rule** für `main`:

| Einstellung | Empfehlung |
|-------------|-----------|
| Require pull request reviews | ✅ Aktivieren (min. 1 Reviewer) |
| Dismiss stale pull request approvals | ✅ Aktivieren |
| Require status checks to pass | ✅ CI-Checks auswählen |
| Require branches to be up to date | ✅ Aktivieren |
| Restrict who can push to matching branches | Optional |

Dieselbe Regel für `develop` einrichten.

### 1.3 Team-Mitglieder einladen

In GitHub: **Settings** → **Collaborators** → **Add people**

Rollen:
- **Admin**: Projektleitung
- **Maintain**: Senior Developer
- **Write**: Entwickler
- **Read**: Stakeholder / Auftraggeber

### 1.4 Projekt-Board erstellen

In GitHub: **Projects** → **New project** → **Board**-Template wählen

Empfohlene Spalten:
- 📋 **Backlog** – Alle geplanten Issues
- 🔄 **In Progress** – Aktuell in Bearbeitung
- 👀 **In Review** – Im Code-Review
- ✅ **Done** – Abgeschlossen

### 1.5 README.md anpassen

Folgende Abschnitte im README.md aktualisieren:
- [ ] Projekttitel und Beschreibung
- [ ] Badge-Links (CI-Status, Coverage, etc.)
- [ ] Installationsanleitung
- [ ] Verwendung / Quickstart
- [ ] Team-Kontakt

### 1.6 Technologie-Stack festlegen

Entscheidungen in `docs/architecture/ADR-001-template.md` dokumentieren:
- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Keine Frameworks oder Build-Tools
- Deployment-Plattform: GitHub Pages
- CI/CD: GitHub Actions

### 1.7 Develop-Branch erstellen

```bash
git checkout -b develop
git push -u origin develop
```

---

## Checkliste

- [ ] Repository aus Template erstellt
- [ ] README.md mit Projektbeschreibung aktualisiert
- [ ] Branch-Schutzregeln für `main` und `develop` eingerichtet
- [ ] Team-Mitglieder eingeladen und Rollen zugewiesen
- [ ] Projekt-Board erstellt
- [ ] Technologie-Stack dokumentiert (ADR-001)
- [ ] Lizenz geprüft und angepasst
- [ ] `develop`-Branch erstellt
- [ ] CI/CD-Workflows für gewählte Technologie angepasst

---

## Ergebnis

Nach dieser Phase existiert:
✅ Ein funktionierendes Repository mit Grundstruktur  
✅ Ein aufgestelltes Team mit klaren Rollen  
✅ Ein dokumentierter Technologie-Stack  
✅ Automatisierte CI/CD-Pipelines (konfiguriert)  
✅ Ein Projekt-Board für das Backlog  

---

Weiter mit: [Phase 2 – Planung](02-planung.md)
