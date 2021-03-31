import Geocoder from 'react-native-geocoding';

export const getLocation = () => {
    return new Promise(
        (resolved, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolved(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolved, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolved(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolved, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolved(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}


