## How-to start E2E tests on Windows WSL2 with Docker

### 1. Install an X Server on Windows
To display and interact with GUI applications, you need an X server running on your Windows machine. A popular choice is **VcXsrv**.

- **Download VcXsrv**:
  - Go to the [VcXsrv GitHub release page](https://sourceforge.net/projects/vcxsrv/) and install it.
- **Configure VcXsrv**:
   - Open the app and configure it as follows:
     - Start `XLaunch`.
     - Select **Multiple Windows**.
     - Set the **Display Number** to `:0`.
     - **Disable Native OpenGL** (optional, for compatibility).
     - **Allow all clients** (check the option for easier testing; secure it later).
     - Finish the configuration.

VcXsrv should now be running on your Windows host.

### 2. Build the DevContainer
Open the project in Visual Studio Code and click on the green button in the bottom left corner. Select **Remote-Containers: Reopen in Container**. This will build the Docker container and open the project inside it.

### 3. Start the backend
To start the backend, please run the following command in the terminal:
```bash
python app.py
```

### 4. Run Cypress in Docker
To execute Cypress, please run the following command in the terminal:
```bash
cypress open
```