# Erweiterung „Meine Teams der Hawks“

Die Erweiterung basiert auf dem aktuellen Stand des öffentlichen GitHub-Repositories vom 24.07.2026.

## Enthaltene Dateien

- `app.js` – vollständige Ersatzdatei mit Rollenprüfung und neuer Funktion
- `service-worker.js` – vollständige Ersatzdatei mit neuer Cache-Version und Bilddatei
- `assets/meine-teams-hawks.jpeg` – neues Hintergrundbild
- `index-snippet.html` – neue Kachel für die Startseite

## Einbau in GitHub

1. Ersetze im Hauptverzeichnis die vorhandene `app.js` durch die Datei aus diesem Paket.
2. Ersetze die vorhandene `service-worker.js`.
3. Lade `meine-teams-hawks.jpeg` in den vorhandenen Ordner `assets`.
4. Öffne `index.html` und füge den Inhalt aus `index-snippet.html` direkt hinter der vorhandenen Teams-Kachel ein.
5. Ändere in `index.html` zur sicheren Aktualisierung des Browser-Caches:

```html
<link rel="stylesheet" href="styles.css?v=37" />
```

und am Ende der Datei:

```html
<script src="app.js?v=37"></script>
```

6. Committe die Änderungen. GitHub Pages startet anschließend automatisch ein neues Deployment.

## Berechtigungen

- Gast: Kachel ist ausgeblendet.
- Admin: Kachel ist ausgeblendet.
- Spieler A: Kachel ist sichtbar und anklickbar.
- Innerhalb der Funktion sieht Spieler A ausschließlich die Kacheln `Mannschaft A` und `U18`.
- Direkte beziehungsweise manipulierte Aufrufe werden zusätzlich im JavaScript abgefangen.

## Testzugang

- Benutzer: `Spieler A`
- Passwort: `Spieler01`
