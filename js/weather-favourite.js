import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-DTO.js";

const HTTP_OK = 200;

const weatherFavourite = {
    load() {
        let fav_list = document.getElementById("fav-list");

        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.key(i);
            let weatherItem = document.createElement("li");

            weatherItem.setAttribute('class', "weather-container");
            weatherItem.setAttribute('id', `city-${city}`);
            weatherItem.innerHTML = `<p>Loading ${city}...</p>`

            fav_list.append(weatherItem);

            this.loadCity(city).then(weatherData => {
                this.fill(weatherItem, weatherData);
            });
        }
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(data => {
            if (data.cod !== HTTP_OK) {
                throw new Error(data.message);
            }

            return weatherDto.get(data);
            }).catch(e => {
            if (e instanceof TypeError) {
                throw new Error("Connection error");
            }

            throw e;
        });
    },

    addCity(city) {
        let fav_list = document.getElementById("fav-list");
        let weatherItem = document.createElement("li");

        weatherItem.setAttribute('class', "weather-container");
        weatherItem.innerHTML = `<p>Loading ${city}...</p>`
        fav_list.prepend(weatherItem);

        this.loadCity(city).then(weatherData => {
            let name = weatherData.name;

            if (!localStorage.getItem(name)) {
                localStorage.setItem(name, name);
                weatherItem.setAttribute('id', `city-${name}`);

                this.fill(weatherItem, weatherData);
            } else {
                fav_list.removeChild(weatherItem);
                alert("City with the same name is already in the list");
            }
        }).catch(e => {
            alert(e);
            fav_list.removeChild(weatherItem);
        })
    },

    fill(weatherItem, weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let html = document.getElementById("fav-loc-tmp").content.cloneNode(true);

        weatherItem.innerHTML = "";

        weatherItem.append(html);
        weatherItem.setAttribute("id", `city-${name}`);

        weatherItem.getElementsByClassName("fav-loc")[0].innerHTML = name;
        weatherItem.getElementsByClassName("fav-temp")[0].innerHTML = temperature;

        weatherItem.getElementsByClassName("fav-wind")[0].innerHTML = wind;
        weatherItem.getElementsByClassName("fav-cloud")[0].innerHTML = clouds;
        weatherItem.getElementsByClassName("fav-press")[0].innerHTML = pressure;

        weatherItem.getElementsByClassName("fav-hum")[0].innerHTML = humidity;
        weatherItem.getElementsByClassName("fav-coord")[0].innerHTML = coords;

        weatherItem.getElementsByClassName("fav-icon")[0].innerHTML = icon;

        let removeCityButton = weatherItem.getElementsByClassName("close-button")[0];

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    }
};

export default weatherFavourite; 