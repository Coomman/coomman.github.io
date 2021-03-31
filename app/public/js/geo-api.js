const default_longitude = "30.421811199999997";
const default_latitude = "59.89662719999999";

let longitude = default_longitude;
let latitude = default_latitude;

const geolocationApi = {
  update() {
    return new Promise((res) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          longitude = position.coords.longitude;
          latitude = position.coords.latitude;
          res();
        },
        () => {
          alert("Give geolocation permission. Default geolocation will be loaded");

          longitude = default_longitude;
          latitude = default_latitude;

          res();
        }
      );
    });
  },

  getLocation() {
    return { longitude, latitude };
  },
};

export default geolocationApi;
