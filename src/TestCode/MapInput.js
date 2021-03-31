import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapInput(props) {
    return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} 
                autoFocus={false}
                returnKeyType={'search'}  
                listViewDisplayed={false}   
                fetchDetails={true}
                onPress={(data, details = null) => {
                    props.notifyChange(details.geometry.location);
                }}
                query={{
                    key: 'AIzaSyBOWTkokw9YeVDFJ8qLtDC1_uIgNs2Z4CM',
                    language: 'th'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={500}
            />
    );
}
export default MapInput;