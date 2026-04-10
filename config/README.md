# Konfiguration (`config/`)

Dieses Verzeichnis enthält Konfigurationshinweise für die verschiedenen Umgebungen der Website.

## Struktur

```
config/
├── environments/              # Umgebungsspezifische Konfiguration
│   ├── development.example    # Lokale Entwicklung
│   ├── staging.example        # Vorschau / Test
│   └── production.example     # Live-Website (GitHub Pages)
└── README.md                  # Diese Datei
```

## Umgebungen

| Umgebung | Beschreibung |
|----------|-------------|
| Development | Lokale Entwicklung – `index.html` direkt im Browser oder via `python3 -m http.server` |
| Staging | Vorschau-Branch auf GitHub Pages (z. B. über Pull Request Preview) |
| Production | Live-Website auf GitHub Pages (`main`-Branch) |

## Hinweise

Da diese Website eine **statische Website ohne Build-Prozess** ist, gibt es keine
klassischen Umgebungsvariablen oder `.env`-Dateien. Die Konfigurationsdateien in diesem
Ordner dokumentieren die **Einstellungen und Besonderheiten** jeder Umgebung als Referenz
für das Entwicklungsteam.
