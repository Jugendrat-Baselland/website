# Deployment-Anleitung

Diese Anleitung beschreibt den Deployment-Prozess der Jugendrat Baselland Website.

## Übersicht

| Umgebung | Wie | Branch | URL |
|----------|-----|--------|-----|
| Development | Lokal im Browser | Beliebig | `localhost:8000` |
| Staging | Pull Request Preview | `develop` | Lokal oder Codespace |
| Production | Automatisch via GitHub Actions | `main` | GitHub Pages |

## GitHub Pages Deployment (Produktion)

Das Deployment auf Produktion läuft **vollautomatisch** über den CD-Workflow:

1. Änderungen werden auf `main` gepusht (direkt oder via Pull Request Merge)
2. Der GitHub Actions Workflow `.github/workflows/cd.yml` wird ausgelöst
3. Die gesamte Website wird als GitHub Pages Artefakt hochgeladen
4. GitHub Pages stellt die Website bereit

**Kein Build-Prozess nötig** – die Dateien werden 1:1 ausgeliefert.

### Erstmalige Einrichtung

1. GitHub → **Settings** → **Pages**
2. Source: **GitHub Actions** auswählen
3. Der CD-Workflow übernimmt den Rest

### Custom Domain einrichten (optional)

1. Eine `CNAME`-Datei im Root erstellen mit der gewünschten Domain
2. Beim Domain-Provider einen CNAME-Eintrag auf `jugendrat-baselland.github.io` setzen
3. In GitHub Pages Settings die Custom Domain eintragen
4. **"Enforce HTTPS"** aktivieren

## Release-Prozess

### Schritt 1: Develop nach Main mergen

```bash
git checkout main
git pull origin main
git merge --no-ff develop
git tag -a v1.2.0 -m "Release v1.2.0: [kurze Beschreibung]"
git push origin main --tags
```

### Schritt 2: Automatisches Deployment

Nach dem Push auf `main` deployt der CD-Workflow automatisch auf GitHub Pages.
Prüfe den Workflow-Status unter **Actions** auf GitHub.

### Schritt 3: Nach dem Deployment

```bash
# Develop-Branch synchronisieren
git checkout develop
git merge main
git push origin develop
```

## Rollback

Bei Problemen nach dem Deployment:

```bash
# Revert committen
git checkout main
git revert HEAD --no-commit
git commit -m "revert: v1.2.0 zurückgenommen – [Grund]"
git push origin main
# → CD deployt automatisch die zurückgenommene Version
```

## Checkliste vor Produktion

- [ ] Lokal in verschiedenen Browsern getestet
- [ ] Responsive Design auf Mobile geprüft
- [ ] Dark Mode / Light Mode funktionieren
- [ ] Alle Links sind gültig (keine 404-Fehler)
- [ ] CHANGELOG.md aktualisiert
- [ ] Version getaggt
- [ ] Team informiert

Weitere Details: [Phase 6 – Deployment](../phases/06-deployment.md)
