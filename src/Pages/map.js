import React from 'react';
import { Dimensions, View } from 'react-native';
import MapInput from '../TestCode/MapInput';
import MyMapView from '../TestCode/MapView';
import { Actions } from 'react-native-router-flux'
import { Header, Text, Left, Right, Body, Title, Footer, FooterTab, Icon, Button } from 'native-base'
import { getLocation, geocodeLocationByName } from '../TestCode/location-service';
import MapOrigin from '../component/MapOrigin'
import MapDestination from '../component/MapDestination'
import MapData from '../component/MapData'
import Headers from '../component/Header'
import styles from '../component/style'
import MapViewDirections from 'react-native-maps-directions';
import API_MAP from '../../ApiMap'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Datarate from '../component/Data_rate'
import Data from '../component/Data';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {},
            price: 0,
            distance: 0,
            duration: 0,
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    componentWillUnmount() {
        MapDestination.latitude = null
        MapDestination.longitude = null
        MapOrigin.latitude = null
        MapOrigin.longitude = null
        MapData.distance = 0
        MapData.duration = 0
    }
    componentDidMount() {
        this._loadingFont()
        this.getInitialState();
        console.log('Main 1 :', MapData.distance)
        console.log('Main 2 :', MapData.duration)
    }
    async _loadingFont() {
        await Font.loadAsync({
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
        })
        this.setState({ loadingFont: false })
    }
    //รับค่าที่อยู๋ปัจจุบัน
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
    //รับค่าตอนมีการเลือกสถานที่
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
            },
            distance: 0,
            duration: 0
        });
    }
    //เซ็ต Region ให้เป็นที่อยู่ใหม่
    onMapRegionChange(region) {
        console.log('reg', region)
        this.setState({ region });
    }

    render() {
        const { loadingFont } = this.state

        if (loadingFont) {
            return <AppLoading />
        }

        return (
            <View style={{ flex: 1 }}>
                <Header style={[styles.headerBgcolor]}>
                    <Left>
                        <Headers />
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr' }]}>Map</Title>
                    </Body>
                    <Right><Button transparent onPress={() => Actions.Changerate()}><Text style={{color:'#fff'}}>Change Rate</Text></Button></Right>
                </Header>

                <View style={{ flex: 0.4, backgroundColor: '#e8e8e8' }}>
                    <MapInput
                        notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>
                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)}
                            />
                            <MapViewDirections
                                origin={MapOrigin}
                                destination={this.state.region}
                                apikey={API_MAP.API}
                                onReady={result => {
                                    console.log('Props Region : ', this.state.region),
                                        this.setState({ distance: result.distance, duration: result.duration })
                                    if (this.state.distance >= 80) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 10.50) + (this.state.duration * Datarate.timeprice) })
                                    }
                                    else if (this.state.distance >= 60) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 9) + (this.state.duration * Datarate.timeprice) })
                                    }
                                    else if (this.state.distance >= 40) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 8) + (this.state.duration * Datarate.timeprice) })
                                    }
                                    else if (this.state.distance >= 20) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 7.50) + (this.state.duration * Datarate.timeprice) })
                                    }
                                    else if (this.state.distance >= 10) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 6.50) + (this.state.duration * Datarate.timeprice) })
                                    }
                                    else if (this.state.distance >= 1) {
                                        this.setState({ price: Datarate.startprice + (this.state.distance * 5.50) + (this.state.duration * Datarate.timeprice) })
                                    }
                                }}
                            />
                        </View> : null
                }
                <View style={{ alignItems: 'center', backgroundColor: '#e8e8e8' }}>
                    <Text style={{ fontFamily: 'Mitr' }}>Estimated price :
                    {parseFloat(this.state.price).toFixed(0)} บาท
                    </Text>
                    <Text style={{ fontFamily: 'Mitr' }}>Distance :
                    {parseFloat(this.state.distance).toFixed(2)} KM.  Time : {parseFloat(this.state.duration).toFixed(0)} นาที
                    </Text>
                </View>
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button vertical onPress={() => Actions.Home()}>
                            <Icon style={styles.icons} name="home" />
                            <Text style={[styles.icons, { fontFamily: 'Mitr' }]}>Home</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.MapPage()}>
                            <Icon style={styles.icons} name="map" />
                            <Text style={[styles.icons, { fontFamily: 'Mitr' }]}>Map</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.Rate_Price()}>
                            <Icon style={styles.icons} name="paper" />
                            <Text style={[styles.icons, { fontFamily: 'Mitr' }]}>Rate Price</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

export default MapContainer;