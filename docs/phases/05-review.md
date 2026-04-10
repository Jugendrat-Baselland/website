# Phase 5 – Review & Qualitätssicherung

## Ziel

Code-Änderungen werden vor dem Merge durch Teammitglieder geprüft.
Reviews verbessern die Code-Qualität, teilen Wissen und finden Fehler frühzeitig.

## Dauer

Typischerweise: **1–2 Tage** pro Pull Request

---

## Pull-Request-Prozess

### 1. Pull Request erstellen

```bash
# Branch pushen
git push origin feature/mein-feature

# Dann auf GitHub: "Compare & pull request" klicken
```

**Guter PR-Titel:** `feat(hero): Parallax-Scroll-Effekt für Hero-Section hinzufügen`

**PR-Beschreibung** (siehe `.github/PULL_REQUEST_TEMPLATE.md`):
- Was wurde geändert und warum?
- Welche Issues werden geschlossen?
- Wie wurde getestet?
- Screenshots (bei UI-Änderungen)

### 2. CI-Pipeline abwarten

Bevor du Reviewer anforderst: alle automatischen Checks müssen grün sein.

| Check | Beschreibung |
|-------|-------------|
| ✅ Validate | Alle HTML/CSS/JS-Dateien vorhanden |
| ✅ Links | Keine toten internen Links |
| ✅ Security | CodeQL ohne kritische Findings |

### 3. Reviewer anfordern

- Mindestens **1 Reviewer** erforderlich (2 empfohlen)
- Reviewer sollte mit dem Code-Bereich vertraut sein
- Bei breaking changes: Senior-Entwickler einbeziehen

---

## Reviewer-Leitfaden

### Was prüfen?

**Korrektheit:**
- [ ] Löst der Code das Problem korrekt?
- [ ] Werden Randfälle behandelt (z. B. leere Daten, fehlende Bilder)?
- [ ] Funktioniert die Änderung in verschiedenen Browsern?

**Lesbarkeit & Wartbarkeit:**
- [ ] Sind Variablen- und Funktionsnamen selbsterklärend?
- [ ] Ist der Code logisch strukturiert?
- [ ] Gibt es unnötige Komplexität?
- [ ] Sind Kommentare vorhanden wo nötig (Warum, nicht Was)?

**Tests:**
- [ ] Wurde die Änderung im Browser getestet?
- [ ] Responsive Design geprüft?
- [ ] Dark Mode / Light Mode geprüft?
- [ ] Screenshots beigefügt (bei UI-Änderungen)?

**Sicherheit:**
- [ ] Dynamische Inhalte verwenden `escapeHTML()`?
- [ ] Keine sensiblen Daten im Code (Passwörter, Keys)?
- [ ] Externe Links mit `rel="noopener noreferrer"` versehen?

**Performance:**
- [ ] Animationen nutzen GPU-beschleunigte Properties (`transform`, `opacity`)?
- [ ] Keine unnötigen DOM-Manipulationen?
- [ ] Bilder in angemessener Grösse?

### Wie Feedback geben?

**Konstruktiv und respektvoll:**
```
# ❌ Schlecht
"Das ist komplett falsch."

# ✅ Gut
"Ich würde hier einen anderen Ansatz vorschlagen:
[Code-Beispiel], weil [Begründung]. Was denkst du?"
```

**Typen von Review-Kommentaren:**
- 🔴 **Muss geändert werden** – Blocker, muss vor Merge behoben werden
- 🟡 **Sollte geändert werden** – Empfehlung, aber kein Blocker
- 💡 **Vorschlag** – Idee zur Verbesserung (non-blocking)
- ❓ **Frage** – Zum besseren Verständnis

### Entscheidung treffen

| Entscheidung | Bedeutung |
|-------------|-----------|
| **Approve** ✅ | Code ist bereit für Merge |
| **Request Changes** 🔄 | Änderungen erforderlich vor Merge |
| **Comment** 💬 | Anmerkungen ohne explizite Entscheidung |

---

## Author-Leitfaden (Auf Reviews reagieren)

- Alle Kommentare **beantworten** (auch wenn keine Änderung nötig)
- Änderungen **committen** und Kommentar als erledigt markieren
- Bei Uneinigkeit: **diskutieren**, nicht ignorieren
- Bei größeren Änderungen: neues Review anfordern

```bash
# Änderungen nach Review committen
git add .
git commit -m "fix(auth): Review-Kommentare adressiert – Input-Validierung ergänzt"
git push origin feature/mein-feature
```

---

## Merge-Strategien

| Strategie | Verwendung | Wann |
|-----------|-----------|------|
| **Squash and Merge** | Feature-Branches | Viele kleine Commits → ein sauberer Commit |
| **Merge Commit** | Release-Branches | Erhält vollständige Historie |
| **Rebase and Merge** | Kleine Fixes | Lineare Historie ohne Merge-Commit |

**Empfehlung:** Squash and Merge für Feature-/Bugfix-Branches.

---

## Checkliste (Review)

**Author:**
- [ ] PR-Beschreibung vollständig ausgefüllt
- [ ] Self-Review durchgeführt
- [ ] CI-Pipeline grün
- [ ] Reviewer angefragt

**Reviewer:**
- [ ] Code auf Korrektheit geprüft
- [ ] Tests bewertet
- [ ] Sicherheitsaspekte geprüft
- [ ] Konstruktives Feedback gegeben
- [ ] Entscheidung getroffen (Approve / Request Changes)

---

Zurück: [Phase 4 – Testing](04-testing.md) | Weiter: [Phase 6 – Deployment](06-deployment.md)
