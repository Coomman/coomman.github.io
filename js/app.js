import weatherCurrent from "./weather-current.js";
import weatherFav from "./weather-favourite.js";
import geolocationApi from "./geo-api.js";

let searchInput = document.getElementById("search-input");
let searchForm = document.getElementById("search-form");

document.getElementById("update-geo-button").addEventListener("click", () => {
    geolocationApi.update().catch(() => {
       alert("Geolocation error");
   });
});

searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchEventHandler(event);
    }
});
searchForm.addEventListener("submit", searchEventHandler);


function searchEventHandler(event){
    event.preventDefault();

    let city = searchInput.value;
    searchInput.value = "";

    weatherFav.addCity(city);
}


weatherCurrent.load();
weatherFav.load(); 