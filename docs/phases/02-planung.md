# Phase 2 – Planung

## Ziel

In dieser Phase werden alle Anforderungen erfasst, priorisiert und in umsetzbare
Aufgaben zerlegt. Am Ende gibt es einen klaren Plan für die Entwicklung.

## Dauer

Typischerweise: **3–7 Tage** (je nach Projektgröße)

---

## Aufgaben

### 2.1 Anforderungen erheben

**Methoden:**
- Stakeholder-Interviews durchführen
- User Stories schreiben (Als \<Rolle\> möchte ich \<Funktion\>, damit \<Nutzen\>)
- Use Cases definieren
- Nicht-funktionale Anforderungen festhalten (Performance, Sicherheit, Skalierbarkeit)

**Format für User Stories:**
```
Als [Benutzerrolle]
möchte ich [eine Funktion / ein Ziel]
damit [ein Nutzen / Grund].

Akzeptanzkriterien:
- Gegeben [Kontext], wenn [Aktion], dann [Ergebnis]
- ...
```

### 2.2 Issues erstellen

Für jede User Story / jeden Bug einen GitHub Issue erstellen:

1. GitHub → **Issues** → **New Issue**
2. Passendes Template wählen (Bug Report / Feature Request)
3. Labels zuweisen:
   - `feature` – Neue Funktion
   - `bug` – Fehlerbehebung
   - `docs` – Dokumentation
   - `enhancement` – Verbesserung
   - `chore` – Maintenance
   - `priority: high/medium/low` – Priorität

### 2.3 Meilensteine definieren

In GitHub: **Issues** → **Milestones** → **New milestone**

| Meilenstein | Beschreibung | Zieldatum |
|-------------|-------------|-----------|
| v0.1.0 – MVP | Minimale funktionierende Version | TBD |
| v0.2.0 – Beta | Vollständige Features, Testing | TBD |
| v1.0.0 – Release | Produktionsreife Version | TBD |

### 2.4 Architektur entscheiden (ADRs)

Wichtige Architekturentscheidungen als **Architecture Decision Records (ADRs)** dokumentieren.

Vorlage: `docs/architecture/ADR-001-template.md`

Beispiele für ADRs:
- Datenbankwahl (PostgreSQL vs. MongoDB)
- Authentifizierungsstrategie (JWT vs. Session)
- API-Stil (REST vs. GraphQL)
- Frontend-Framework (React vs. Vue)
- Deployment-Plattform

### 2.5 Definition of Done festlegen

Gemeinsam im Team vereinbaren, wann eine Aufgabe als "fertig" gilt:

```markdown
## Definition of Done

Eine Aufgabe gilt als erledigt, wenn:
- [ ] Code implementiert und committet
- [ ] Unit-Tests geschrieben und bestanden
- [ ] Code-Review abgeschlossen (min. 1 Approval)
- [ ] CI/CD-Pipeline grün
- [ ] Dokumentation aktualisiert
- [ ] Feature im Staging getestet
- [ ] Akzeptanzkriterien erfüllt
```

### 2.6 Sprint-Planung (Agile / Scrum)

Falls Scrum verwendet wird:

- Sprint-Dauer festlegen (empfohlen: 1–2 Wochen)
- Sprint-Backlog aus Product-Backlog befüllen
- Story Points schätzen (Fibonacci: 1, 2, 3, 5, 8, 13)
- Sprint-Ziel formulieren

**Meetings:**
| Meeting | Wann | Dauer | Zweck |
|---------|------|-------|-------|
| Sprint Planning | Sprint-Start | 2–4h | Aufgaben für Sprint auswählen |
| Daily Standup | Täglich | 15 min | Status, Blocker |
| Sprint Review | Sprint-Ende | 1–2h | Demo für Stakeholder |
| Retrospektive | Sprint-Ende | 1h | Prozess verbessern |

---

## Checkliste

- [ ] Alle bekannten Anforderungen als GitHub Issues erfasst
- [ ] Issues mit Labels und Meilensteinen versehen
- [ ] Prioritäten festgelegt
- [ ] Architekturentscheidungen als ADRs dokumentiert
- [ ] Definition of Done vereinbart
- [ ] Sprint-Planung durchgeführt (falls Scrum)
- [ ] Abhängigkeiten zwischen Issues identifiziert

---

## Ergebnis

Nach dieser Phase existiert:
✅ Ein vollständiges, priorisiertes Backlog  
✅ Klare Meilensteine und Zieldaten  
✅ Dokumentierte Architekturentscheidungen  
✅ Gemeinsame Definition of Done  

---

Zurück: [Phase 1 – Initialisierung](01-initialisierung.md) | Weiter: [Phase 3 – Entwicklung](03-entwicklung.md)
