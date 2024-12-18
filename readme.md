## Anleitung zum Starten von E2E-Tests unter Windows WSL2 mit Docker

### 1. Installation eines X-Servers unter Windows
Um GUI-Anwendungen anzuzeigen und mit ihnen zu interagieren, benötigen Sie einen X-Server auf Ihrem Windows-Rechner. Eine beliebte Option ist **VcXsrv**.

- **VcXsrv herunterladen**:
  - Gehen Sie zur [VcXsrv GitHub Release-Seite](https://github.com/marchaesen/vcxsrv/releases) und installieren Sie es.
- **VcXsrv konfigurieren**:
   - Öffnen Sie die App und konfigurieren Sie sie wie folgt:
     - Starten Sie `XLaunch`.
     - Wählen Sie **Multiple Windows**.
     - Setzen Sie die **Display Number** auf `:0`.
     - **Deaktivieren Sie Native OpenGL** (optional, für Kompatibilität).
     - **Erlauben Sie alle Clients** (Option für einfacheres Testen aktivieren; später absichern).
     - Schließen Sie die Konfiguration ab.

VcXsrv sollte nun auf Ihrem Windows-Host laufen.

### 2. DevContainer erstellen
Öffnen Sie das Projekt in Visual Studio Code und klicken Sie auf den grünen Button in der unteren linken Ecke. Wählen Sie **Remote-Containers: Reopen in Container**. Dies erstellt den Docker-Container und öffnet das Projekt darin.

### 3. Backend starten
Um das Backend zu starten, führen Sie bitte folgenden Befehl im Terminal aus:
```bash
python app.py
```

### 4. Cypress in Docker ausführen
Um Cypress auszuführen, führen Sie bitte folgenden Befehl im Terminal aus:
```bash
cypress open
```