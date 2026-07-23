# Erweiterung Trainingszeiten und Hallenzeiten am Wochenende

Diese Version ergänzt den Bereich **Service** um die neue Kachel **Hallenzeiten am WE**.

## Funktionen

- Die Kachel ist ausschließlich für die Rollen **Spieler A** und **Admin** sichtbar.
- **Admin** kann die Wochenend-Tabelle bearbeiten und lokal speichern.
- **Spieler A** kann die Tabelle nur ansehen und über ein Formular eine Zeitanfrage stellen.
- Der Admin sieht die lokal gespeicherten Anfragen und kann sie als erledigt entfernen.
- Die Rolle **Gast** sieht die Kachel nicht und kann den Bereich nicht öffnen.
- Die bestehende Funktion **Trainingszeiten** bleibt unverändert erhalten.

## Excel-Vorlage

Die Datei `Wochenende-Hallenzeiten haWKS.xlsx` ist als fachliche Vorlage beigefügt. Die enthaltenen Datumszeilen und Zeitspalten von 08:00 bis 22:30 Uhr wurden in der Web-App übernommen.

## Hinweis zum Test-Prototyp

Tabellenänderungen und Anfragen werden mit `localStorage` nur im jeweils verwendeten Browser gespeichert. Eine echte Übermittlung zwischen unterschiedlichen Geräten und eine technisch sichere Rollenprüfung benötigen später ein Backend mit Benutzeranmeldung und zentraler Datenbank.
