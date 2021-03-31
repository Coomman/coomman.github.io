import weatherAPI from "./weather-api.js";
import favouritesAPI from "./fav.js";

const weatherFavourite = {
    load() {
        let fav_list = document.getElementById("fav-list");

        favouritesAPI.getAll()
            .then(res => res.json())
            .then(res => {
                let cities = res.data;

                for (let city of cities) {
                    let weatherItem = document.createElement("li");

                    weatherItem.setAttribute('class', "weather-container");
                    weatherItem.setAttribute('id', `city-${city}`);
                    weatherItem.innerHTML = `<p>Loading ${city}...</p>`

                    fav_list.append(weatherItem);

                    this.loadCity(city).then(weatherData => {
                        this.fill(weatherItem, weatherData);
                    });
                }
            });
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(res => {
            return res.data;
        });
    },

    addCity(city) {
        if (city) {
            let fav_list = document.getElementById("fav-list");
            let weatherItem = document.createElement("li");

            weatherItem.setAttribute('class', "weather-container");
            weatherItem.innerHTML = `<p>Loading ${city}...</p>`
            fav_list.prepend(weatherItem);

            favouritesAPI.addCity(city)
                .then(res => res.json())
                .then(res => {
                    if (res.message !== "ok") {
                        throw new Error(res.message);
                    }

                    this.loadCity(city)
                        .then(weather => {
                            weatherItem.setAttribute('id', `city-${weather.city}`);
                            this.fill(weatherItem, weather);
                        })
            }).catch(e => {
                alert(e);
                fav_list.removeChild(weatherItem);
            })
        } else {
            alert("Empty city name");
        }
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

        removeCityButton.addEventListener('click', (e) => {
            let button = e.target;
            button.disabled = true;
            favouritesAPI.removeCity(name)
            .then(() => document.getElementById(`city-${name}`).remove())
            .catch(e => alert(e)).finally(() => {
                button.disabled = false;
            });
        })
    }
};

export default weatherFavourite; 