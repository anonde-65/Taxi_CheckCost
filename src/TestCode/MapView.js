import React from 'react';
import { Image } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import API_MAP from '../../ApiMap'
import MapOrigin from '../component/MapOrigin'
import MapData from '../component/MapData'

const MyMapView = (props) => {
    return (
        <MapView
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}

        >
            {props.region.latitude !== MapOrigin.latitude ?
                <Marker coordinate={props.region} >
                    <Image style={{ width: 30, height: 45, resizeMode: 'stretch' }} source={require('../image/Taxi_mark.png')} />
                </Marker> : null}
            <MapViewDirections
                origin={MapOrigin}
                destination={props.region}
                apikey={API_MAP.API}
                strokeWidth={3}
                strokeColor="#1e90ff"
                onReady={result => {
                    console.log('Props Region : ', props.region)
                    MapData.distance = result.distance,
                        MapData.duration = result.duration,
                        console.log(`Distance: ${MapData.distance} km`),
                        console.log(`Duration: ${MapData.duration} min.`)
                }}
            />

        </MapView>
    )
}

export default MyMapView;