# README
In diesem Dokument ist noch einmal alles Wichtige kurz erklärt.
## Wichtige Informationen

Für die volle Funktionalität der Progressive Web App muss ein aktueller Browser verwendet werden: Google Chrome Version 83 oder aktueller.

Das Projekt enthält Informationen bezüglich der Schnittstellen zu Firebase und Google. Diese können bei Missbrauch Kosten verursachen. Deswegen darf dieses Projekt nicht ohne Absprache an unbeteiligte Personen weitergegeben werden.

## Installation

Vorab müssen folgende Softwares installiert werden:

Java: [https://www.java.com/de/download/](https://www.java.com/de/download/)  
Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  
Google Chrome: [https://www.google.de/chrome/?brand=CHBD&gclid=EAIaIQobChMIvP69\_sOY6gIViKztCh2rVA-0EAAYASAAEgIk3PD\_BwE&gclsrc=aw.ds](https://www.google.de/chrome/?brand=CHBD&gclid=EAIaIQobChMIvP69_sOY6gIViKztCh2rVA-0EAAYASAAEgIk3PD_BwE&gclsrc=aw.ds)

Angular: `npm install -g @angular/cli`  
Lite-Server: `npm i -g lite-server`  
Firebase-Tools: `npm i -g firebase-tools`  
Lighthouse: `npm i -g lighthouse`  
Webhint: `npm i -g hint`

Damit alle Packages des Projektes installiert werden: `npm i` über das Terminal in den Ordnern:

-   “./Quellcode/PWA/”
-   “./Quellcode/Firestore Rules/”
-   “./Quellcode/Firestore Functions/functions/”

## Progressive Web App

### Ausführen

Die Progressive Web App kann mit `lite-server` in dem Ordner “./Ergebnisse/PWA/” ausgeführt werden.

> Um die Progressive Web App auf dem Smartphone auszuführen kann ngrok als Tunnel verwendet werden. Mehr Infos: [https://ngrok.com/download](https://ngrok.com/download)

### Builden & Ausführen

Die Progressive Web App kann mit dem Befehl `ng build --prod` in dem Ordner “./Quellcode/PWA/” erstellt werden. Anschließend kann im Ordner “./Quellcode/PWA/dist/PWA” der Befehl `lite-server` zum Ausführen der erstellten Progressive Web App benutzt werden.

## Testen

### Firebase Cloud Firestore Security Rules testen

Für das Testen der Sicherheitsregeln muss zunächst der Emulator mit `firebase emulators:start` im Ordner “./Quellcode/Firestore Rules/” gestartet werden. Während der Emulator aktiv ist, können die Tests mit dem Befehl `npm test` im selben Ordner, aber in einem anderen Terminal ausgeführt werden.

### PWA/Frontend testen

Das Ausführen der Unit- und Integrationstests kann mit dem Befehl `ng test` im Projekt-Ordner “./Quellcode/PWA/” über die CLI ausgeführt werden.

> Testergebnisse sind auch im Ordner “./Ergebnisse/Test-Ergebnisse/Karma.html” zu finden.

## Validieren

### Lighthouse

Für das Validieren mit Lighthouse, muss die Progressive Web App über den Google Chrome Browser aufgerufen werden. Über die F12-Taste öffnen sich die Entwickler-Tools. Unter dem Tag “Audit” oder “Lighthouse” kann ein Report erstellt werden.

> Oder auch mit dem Befehl `lighthouse «Domainname»` über das Terminal. Validations-Ergebnisse sind auch im Ordner “./Ergebnisse/Validations-Ergebnisse/ErgebnisLighthouse” zu finden.

### Webhint

Die Validierung mit Webhint wird im Terminal mit `hint «Domainname»` ausgeführt. Im befindenden Pfad wird das Ergebnis abgespeichert.

> Validations-Ergebnisse sind auch im Ordner “./Ergebnisse/Validations-Ergebnisse/ErgebnisWebhint” zu finden.
