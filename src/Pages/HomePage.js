import React from 'react'
import { View, TouchableHighlight, StyleSheet, Image, Alert, Platform, AlertIOS } from 'react-native'
import { Footer, FooterTab, Button, Text, Icon, Container, Header, Body, Title, Left, Right, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
import haversine from "haversine";
import { AnimatedRegion } from "react-native-maps";
import Headers from "../component/Header"
import User from '../component/User'
import Data from '../component/Data'
import Datarate from '../component/Data_rate'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import styles from '../component/style'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 13.8203896;
const LONGITUDE = 100.5137068;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFont: true,
      flag: this.props.xxx,
      distance: 0,
      distancePrice: 0,
      price: 0,
      totalPrice: 0,
      distanceResult: 0,
      st: "START",
      cl: "#00FF40",
      photo: Data.photo,
      timer: null,
      num_count: 0,
      counter: 0,
      timestop:0,
      min: 0,
      timestopmin:0,
      btngreen: true,
      btnred: false,
      btndis: true,
      uid: '',
      numcar: "0000000",
      //Location
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: 0, longitudeDelta: 0
      })
    };
    this._loadingFont = this._loadingFont.bind(this)
  }
  componentDidCatch() {
    console.log('Photo: ', this.state.photo)
  }

  componentDidMount() {
    this._loadingFont()
    navigator.geolocation.clearWatch(this.watchID);
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ uid: user.uid })
        console.log("This Page Home Uid : ", User.uid);
      }
    });
  }
  //โหลด Font
  async _loadingFont() {
    await Font.loadAsync({
      Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
    })
    this.setState({ loadingFont: false })
  }
  //เช็คเงื่อนไข Start และ Stop
  condition_Start_Stop() {
    if (this.state.st === 'START') {
      if (this.state.price < 35) {
        Alert.prompt(
          "Taxi Registor",
          "Please enter Taxi Registor",
          [
            {
              text: "OK",
              onPress: (numcar, timer) => this.setState({
                numcar: numcar,
                timer: timer = setInterval(this.tick, 1000)
              }) + Actions.Cameras({ numcar: this.state.numcar }) + this.setState({
                price: Datarate.startprice, timer, st: "STOP",
                btnred: true,
                btngreen: false,
                btndis: false,
              }) +
                console.log("this is numcar : ", { numcar: this.state.numcar })
            },
            {
              text: "Cancel",
              onPress: () => console.log("cancel"),
            }
          ]
        );
      }
      //จับระยะทางการเคลื่อนที่แบบ realtime

    } else if (this.state.st === 'STOP') {
      Alert.alert(
        "Confirm stop",
        "You want to stop",
        [
          {
            text: "OK",
            onPress: () => this.ResetResetwatch()
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
          }
        ]
      );
      navigator.geolocation.clearWatch(this.watchID);
    }
    console.log(this.state.st)
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };
  checkEndAlert() {
    Alert.alert('Confirm Stop', 'You want to stop.', [
      { text: 'OK', onPress: () => this.ResetResetwatch() },
      { text: 'Cancel', onPress: () => console.log('No') }
    ])
  }
  //รีเซ็ตเวลา
  ResetResetwatch() {
    navigator.geolocation.clearWatch(this.watchID);
    //-------Insert Data-------//
    firebase.database().ref('user/' + User.uid + '/car/' + this.state.numcar).update(
      {
        price: this.state.totalPrice,
        distance: parseFloat(this.state.distanceTravelled).toFixed(2),
        time: this.state.min + ':' + this.state.counter,
        timestop: this.state.timestopmin + ':' + parseFloat(this.state.timestop).toFixed(0)
      }
    ).then(() => {
      console.log('Update !');
      console.log('This uid after insert :', this.state.uid);
    }).catch((error) => {
      console.log(error);
    });
    //--------Get Data---------//
    let timer = clearInterval(this.state.timer);
    Data.photo = null
    this.setState({
      timer,
      counter: 0,
      price: 0,
      min: 0,
      num_count: 0,
      distanceTravelled: 0,
      st: "START",
      btngreen: true,
      btnred: false,
      btndis: true,
      distancePrice: 0,
      totalPrice: 0,
      photo: [],
      numcar: '000000'
    });
  }
  //จับเวลา
  tick = () => {
    this.setState({
      counter: this.state.counter + 1,
      timestop: this.state.timestop+0.3
    });

    if (this.state.counter === 60) {
      this.setState({
        min: this.state.min + 1,
        counter: 0,
        num_count: this.state.num_count + 1
      })
    }
    if(this.state.timestop ===60){
      this.setState({
        timestopmin:this.state.timestopmin + 1,
        timestop:0
      })
    }
    if (this.state.num_count == 1) {
      this.setState({
        price: this.state.price + Datarate.timeprice,
        num_count: 0
      });
    }
    const { coordinate } = this.state;
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled, distanceResult } = this.state;
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "ios") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceResult:
            distanceResult + this.calcDistance(newCoordinate),
          distanceTravelled:
            distanceTravelled + +this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    //เงื่อนไขการคำนวณ
    if (this.state.distanceTravelled >= 80 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.eighty) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    else if (this.state.distanceTravelled >= 60 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.sixty) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    else if (this.state.distanceTravelled >= 40 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.fourty) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    else if (this.state.distanceTravelled >= 20 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.twenty) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    else if (this.state.distanceTravelled >= 10 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.ten) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    else if (this.state.distanceTravelled > 1 && parseFloat(this.state.distanceResult).toFixed(2) > Datarate.one) {
      this.setState({
        distancePrice: this.state.distancePrice + 2,
        distanceResult: 0
      })
    }
    console.log('DistanceTravelled', this.state.distanceTravelled)
    console.log('DistanceResult', parseFloat(this.state.distanceResult).toFixed(2))
    this.setState({
      totalPrice: this.state.price + this.state.distancePrice
    })
  }
  render() {
    const { loadingFont } = this.state

    if (loadingFont) {
      return <AppLoading />
    }

    return (
      <Container style={{ flex: 1 }}>
        <Header style={[styles.headerBgcolor]}>
          <Left>
            <Headers />
          </Left>
          <Body>
            <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr' }]}>Home</Title>
          </Body>
          <Right><Button transparent onPress={() => Actions.Changerate()}><Text style={{ color: '#fff' }}>Change Rate</Text></Button></Right>
        </Header>
        <View style={[styles.container]}>
          <View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Mitr' }}>Taxi Registor : {this.state.numcar}</Text>
              <Image style={{
                borderColor: '#9c9c9c',
                borderWidth: 2,
                width: 125, height: 125,
                alignSelf: 'center',
                resizeMode: 'stretch',
                marginTop: 10
              }} source={Data.photo} />
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Image style={[styles.image]} source={require('../image/Taxi_price.png')} />
              <Text style={[styles.textborder, { fontFamily: 'Mitr' }]}>{parseFloat(this.state.totalPrice).toFixed(0)} {Datarate.type}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={styles.image} source={require('../image/Taxi_distance.png')} />
                <Text style={[styles.textborder, { marginRight: 5, fontFamily: 'Mitr' }]}>
                  {parseFloat(this.state.distanceTravelled).toFixed(2)} KM.
                  </Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={styles.image} source={require('../image/Taxi_time.png')} />
                <Text style={[styles.textborder, { marginLeft: 5, fontFamily: 'Mitr' }]}>
                  {[this.state.min, " : ", this.state.counter]} Min
                  </Text>
              </View>
            </View>
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Button style={{ width: 200 }}
                success={this.state.btngreen}
                danger={this.state.btnred}
                onPress={() => this.condition_Start_Stop()}>
                <Left /><Text style={{ fontFamily: 'Mitr', fontSize: 22 }}>{this.state.st}</Text><Right />
              </Button>
            </View>
          </View>
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
      </Container>
    );
  }
}

export default Home