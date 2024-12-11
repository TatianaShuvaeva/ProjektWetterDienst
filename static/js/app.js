document.getElementById('getWeatherBtn').addEventListener('click', wetterAbrufen);

let wetterDiagramm = null;

function wetterAbrufen() {
    const stadt = document.getElementById('city').value;
    if (!stadt) {
        alert('Bitte geben Sie eine Stadt ein');
        return;
    }

    fetch(`/wetter?stadt=${stadt}`)
        .then(response => response.json())
        .then(daten => {
            wetterAnzeigen(daten);
        })
        .catch(fehler => {
            document.getElementById('weatherInfo').innerHTML = 'Fehler beim Abrufen der Daten';
        });

    fetch(`/vorhersage?stadt=${stadt}`)
        .then(response => response.json())
        .then(daten => {
            zeichneDiagramm(daten.temperaturen);
        })
        .catch(fehler => {
            console.error('Fehler beim Abrufen der Vorhersagedaten:', fehler);
        });
}

function wetterAnzeigen(daten) {
    if (daten.error) {
        document.getElementById('weatherInfo').innerHTML = 'Stadt nicht gefunden!';
    } else {

        const weatherIcon = daten.wetterbedingungen.icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        document.getElementById('weatherInfo').innerHTML = `
            <img src="${iconUrl}" alt="Wetter Icon" class="mb-3">
            <p>Temperatur: ${daten.temperature}°C</p>
            <p>Minimale Temperatur: ${daten.min_temperature}°C</p>
            <p>Maximale Temperatur: ${daten.max_temperature}°C</p>
            <p>Windgeschwindigkeit: ${daten.wind} m/s</p>
            <p>Luftfeuchtigkeit: ${daten.luftfeuchtigkeit}%</p>
            <p>Sonnenaufgang: ${new Date(daten.sonnenaufgang).toLocaleTimeString()}</p>
            <p>Sonnenuntergang: ${new Date(daten.sonnenuntergang).toLocaleTimeString()}</p>
        `;
    }
}

function zeichneDiagramm(temperaturen) {
    const labels = temperaturen.map(d => new Date(d.datum_zeit).toLocaleString());
    const datenTemperatur = temperaturen.map(d => d.temperature);
        
    const ctx = document.getElementById('weatherChart').getContext('2d');

    if (wetterDiagramm) {
        wetterDiagramm.destroy();
    }

    const datasets = [];

    datasets.push({
        label: 'Temperatur (°C)',
        data: datenTemperatur,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: false
    })

   
    wetterDiagramm = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Zeit'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperatur (°C)'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}
