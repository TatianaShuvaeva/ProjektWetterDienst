document.getElementById('getWeatherBtn').addEventListener('click', wetterAbrufen);

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
}

function wetterAnzeigen(daten) {
    if (daten.error) {
        document.getElementById('weatherInfo').innerHTML = 'Stadt nicht gefunden!';
    } else {
        document.getElementById('weatherInfo').innerHTML = `
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
