const key = "84480fb27ab8f1875460d43b51e3edee";

const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
    },

    getByCity(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    }
};

export default weatherAPI; 