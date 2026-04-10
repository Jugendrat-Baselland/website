# Phase 6 – Deployment

## Ziel

Die Website wird sicher und kontrolliert auf GitHub Pages veröffentlicht.
Das Deployment ist automatisiert und jederzeit rückgängig zu machen.

## Dauer

Typischerweise: **wenige Minuten** (vollautomatisch via GitHub Actions)

---

## Umgebungen

| Umgebung | Branch | URL | Deployment |
|----------|--------|-----|------------|
| **Development** | `develop` | `http://localhost:8000` | Lokal |
| **Staging** | `develop` | Lokal / Codespace | Manuell |
| **Production** | `main` | GitHub Pages URL | Automatisch bei Push |

---

## Deployment-Prozess

### 1. Release vorbereiten

```bash
# Develop-Branch aktualisieren
git checkout develop
git pull origin develop
```

### 2. CHANGELOG.md aktualisieren

```markdown
## [1.2.0] – 2026-04-15

### Hinzugefügt
- Neue Event-Detailseite mit Bildergalerie (#42)
- Magnetische Buttons im Kontaktformular (#58)

### Behoben
- Carousel-Navigation springt auf Mobile (#61)
- Dark Mode Farbkontrast auf Safari (#63)

### Geändert
- Hero-Section Animation optimiert (#55)
```

### 3. In Main mergen und taggen

```bash
# In main mergen
git checkout main
git pull origin main
git merge --no-ff develop

# Git-Tag erstellen
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin main --tags
```

### 4. Automatisches Deployment

Der Push auf `main` löst automatisch den CD-Workflow aus:
→ `.github/workflows/cd.yml`

GitHub Pages wird innerhalb weniger Minuten aktualisiert.

### 5. Develop synchronisieren

```bash
git checkout develop
git merge main
git push origin develop
```

---

## Deployment-Checkliste

**Vor dem Deployment:**
- [ ] Alle geplanten Issues für diesen Release abgeschlossen
- [ ] In verschiedenen Browsern getestet (Chrome, Firefox, Safari)
- [ ] Responsive Design auf Mobile geprüft
- [ ] Dark Mode / Light Mode funktionieren
- [ ] Code-Review für alle PRs abgeschlossen
- [ ] CHANGELOG.md aktualisiert
- [ ] Team informiert

**Nach dem Deployment:**
- [ ] GitHub Pages URL aufrufen und prüfen
- [ ] Alle Seiten erreichbar
- [ ] Navigation funktioniert
- [ ] Bilder laden korrekt
- [ ] Git-Tag erstellt (`v1.2.0`)
- [ ] Team über erfolgreichen Release informiert

---

## Rollback

Falls nach dem Deployment Probleme auftreten:

```bash
# Git-Revert committen
git checkout main
git revert HEAD --no-commit
git commit -m "revert: Release v1.2.0 zurückgenommen – [Grund]"
git push origin main
# → GitHub Actions deployt automatisch die zurückgenommene Version
```

Da GitHub Pages mit GitHub Actions deployt wird, wird jeder Push auf `main`
automatisch die Website aktualisieren – Rollbacks sind sofort wirksam.

---

## Prüfung nach Deployment

Nach jedem Deployment folgende Punkte auf der Live-Website prüfen:

| Prüfpunkt | Beschreibung |
|-----------|-------------|
| Startseite | Hero-Section, Bento-Grid laden korrekt |
| Navigation | Alle Links funktionieren |
| Unterseiten | Team, Events, Projekte, Kontakt erreichbar |
| Interaktion | Dark Mode, Animationen, Flip-Cards |
| Mobile | Responsive Design, Touch-Gesten |
| HTTPS | Website über HTTPS erreichbar |

---

Zurück: [Phase 5 – Review](05-review.md) | Weiter: [Phase 7 – Wartung](07-wartung.md)
