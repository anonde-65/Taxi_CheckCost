import React from 'react';
import { Dimensions, View } from 'react-native';
import MapInput from './MapInput';
import MyMapView from './MapView';
import { Header, Text, Left, Right, Body, Title } from 'native-base'
import { getLocation, geocodeLocationByName } from './location-service';
import MapOrigin from '../component/MapOrigin'
import MapDestination from '../component/MapDestination'
import MapData from '../component/MapData'
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapContainer extends React.Component {
    state = {
        region: {}
    };
    componentWillUnmount() {
        MapDestination.latitude = null
        MapDestination.longitude = null
        MapOrigin.latitude = null
        MapOrigin.longitude = null
        MapData.distance = 0
        MapData.duration = 0
    }
    componentDidMount() {
        this.getInitialState();
        console.log('Main 1 :', MapData.distance)
        console.log('Main 2 :', MapData.duration)
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                MapOrigin.latitude = data.latitude
                MapOrigin.longitude = data.longitude
                console.log('Origin latitude : ', MapOrigin.latitude)
                console.log('Origin longitude : ', MapOrigin.longitude)
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        MapDestination.latitude = loc.lat
        MapDestination.longitude = loc.lng
        /*console.log('Loc Latitude :',loc.lat)
        console.log('Loc Longitude :',loc.lng)*/
        console.log('Destination latitude : ', MapDestination.latitude)
        console.log('Destination longitude : ', MapDestination.longitude)
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        });
    }

    onMapRegionChange(region) {
        console.log('reg', region)
        this.setState({ region });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left />
                    <Body>
                        <Title>แมพ</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 0.3 }}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)
                                }
                            />
                        </View> : null}
                        
            </View>
        );
    }
}

export default MapContainer;