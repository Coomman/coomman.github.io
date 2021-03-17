let longitude = "30.421811199999997";
let latitude = "59.89662719999999";

const geolocationApi = {
    update() {
        return new Promise(res => {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                res();
            });
        });
    },

    getLocation() {
        return {longitude, latitude};
    }
};

export default geolocationApi; 