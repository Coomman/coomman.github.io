import geolocationApi from "./geo-api.js";
import weatherAPI from "./weather-api.js";
import weatherDto from "./weather-DTO.js";

const weatherCurrent = {
  fill(weatherData) {
    const {
      name,
      temperature,
      pressure,
      wind,
      clouds,
      humidity,
      coords,
      icon,
    } = weatherData;

    let weatherCur = document.getElementById("weather-cur");

    let html = document
      .getElementById("weather-cur-tmp")
      .content.cloneNode(true);

    weatherCur.innerHTML = "";
    weatherCur.append(html);

    document.getElementById("cur-loc").innerHTML = name;
    document.getElementById("cur-temp").innerHTML = temperature;

    document.getElementById("cur-wind").innerHTML = wind;
    document.getElementById("cur-cloud").innerHTML = clouds;
    document.getElementById("cur-press").innerHTML = pressure;

    document.getElementById("cur-hum").innerHTML = humidity;
    document.getElementById("cur-coord").innerHTML = coords;

    document.getElementById("cur-img").innerHTML = icon;
  },

  load() {
    geolocationApi.update().then(() => {
      let { longitude, latitude } = geolocationApi.getLocation();

      weatherAPI
        .getByLocation(longitude, latitude)
        .then((res) => res.json())
        .then((data) => {
          this.fill(weatherDto.get(data));
        })
        .catch((e) => {
          console.log("ERROR");
          alert(e);
        });
    });
  },
};

export default weatherCurrent;
