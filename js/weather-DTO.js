const weatherDto = {
    get(responseData) {
        return {
            name: responseData.name,
            temperature: `${Math.round(responseData.main.temp)}°C`,

            wind: `${responseData.wind.speed} m/s`,
            clouds: `${responseData.clouds.all} %`,
            pressure: `${responseData.main.pressure} mbar`,

            humidity: `${responseData.main.humidity} %`,
            coords: `[${responseData.coord.lon}, ${responseData.coord.lat}]`,

            icon: `<img src="http://openweathermap.org/img/wn/${responseData.weather[0].icon}@4x.png" alt="logo">`
        }
    }
};

export default weatherDto; 