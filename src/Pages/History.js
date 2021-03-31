import React from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Text, Container, Header, Body, Title, Left, Right, Content, List, ListItem, Button, Icon } from 'native-base'
import Headers from '../component/Header'
import firebase from 'firebase'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { firebaseConfig } from '../../Config'
import User from '../component/User'
import styles from '../component/style'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

class History extends React.Component {

  constructor(props) {
    super(props);
    // AirBnB's Office, and Apple Park
    this.state = {
      cars: [],
      uid: "",
      data: null,
      loadingFont: true
    };
    this._loadingFont = this._loadingFont.bind(this)
  }

  componentDidMount() {
    this._loadingFont()
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        const rootRef = firebase.database().ref();
        const userRef = rootRef.child(`user/${User.uid}/car`);
        this.setState({ uid: user.uid })
        console.log("This Page Home : ", user.uid);
        userRef.on('value', (childSnapshot) => {
          const cars = [];
          childSnapshot.forEach((doc) => {
            cars.push({
              distance: doc.val().distance,
              time: doc.val().time,
              timestop: doc.val().timestop,
              price: doc.val().price,
              photo: doc.val().photo,
              key: doc.key,
            });
            this.setState({
              cars: Object.values(cars)
            })
          });
        })
      }
    });
  }

  async _loadingFont() {
    await Font.loadAsync({
      Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
    })
    this.setState({ loadingFont: false })
  }

  render() {
    const { loadingFont } = this.state
    if (loadingFont) {
      return <AppLoading />
    }
    return (
      <Container style={{ backgroundColor: "#e8e8e8" }}>
        <Header style={[styles.headerBgcolor]}>
          <Left>
            <Headers />
          </Left>
          <Body>
            <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr', fontSize: 20 }]}>History</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <FlatList
              data={this.state.cars}
              renderItem={({ item }) => (
                <List>
                  <ListItem last avatar>
                    <Left />
                    <Body>
                      <Text style={{ fontFamily: 'Mitr' }}>Taxi Registor :{item.key}</Text>
                      <Text style={{ fontFamily: 'Mitr' }} note>Distance :{item.distance}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Mitr' }} note>Price:{item.price}</Text>
                        <Text style={{ fontFamily: 'Mitr' }} note>Time:{item.time}</Text>
                      </View>
                      <Text style={{ fontFamily: 'Mitr' }} note>TimeStop:{item.timestop}</Text>
                    </Body>
                    <Right>
                      <Button transparent
                        onPress={() => Alert.alert(`Taxi Registor ${item.key}`,
                        `Distance : ${item.distance} 
                        Price : ${item.price} 
                        Time : ${item.time}
                        TimeStop :${item.timestop}`,
                          ['OK'])}>
                        <Icon active name="arrow-forward" />
                      </Button>
                    </Right>
                  </ListItem>
                </List>)}
            />
          </List>
        </Content>
      </Container>
    );
  }
}
export default History;