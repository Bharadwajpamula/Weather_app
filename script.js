const form = document.getElementById("form");
const CityNameInput = document.getElementById("CityName");
const result = document.getElementById("weather-details");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const CityName = CityNameInput.value.trim();
    if (CityName === "") {
        result.textContent = "Please enter a city name.";
        return;
    }

    const apikey = e4dfb9ea33cb6565635b6c5bab0f47bf;
    const url = `https://api.weatherstack.com/current?access_key=${apikey}&query=${CityName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to fetch weather data");
            }
            return response.json();
        })
        .then(data => {
            // Check if the API returned valid weather data
            if (data.success === false || !data.current) {
                throw new Error("City not found or invalid API key");
            }

            const temp = data.current.temperature; // Temperature in Celsius
            const weather = data.current.weather_descriptions[0]; // Weather description
            const city = data.location.name; // City name
            const pressure = data.current.pressure; // City name
            const humidity = data.current.humidity; // City name

            result.innerHTML = `
                <h4>Weather in ${city}</h4>
                <p>Temperature: ${temp}°C</p>
                <p>WeatherCondition: ${weather}</p>
                <p>Pressure: ${pressure}</p>
                <p>Humidity: ${humidity}</p>
            `;
        })
        .catch(error => {
            result.textContent = `Error: ${error.message}`;
        });
});
