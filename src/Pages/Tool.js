import React from 'react'
import { Image } from 'react-native'
import { Text, Container, Header, View, DeckSwiper, Card, CardItem, Left, Right, Body, Icon, Title, Button } from 'native-base';
import Headers from '../component/Header'
import styles from '../component/style'
import * as Font from 'expo-font'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const cards = [
    {
        num: '1.',
        text: 'Step 1',
        name: 'หน้าตาการใช้งาน',
        image: require('../image/1.png'),
    },
    {
        num: '2.',
        text: 'Step 2',
        name: 'กด Start กรอกป้ายทะเบียนรถและถ่ายรูปป้ายทะเบียน',
        image: require('../image/2.png'),
    },
    {
        num: '3.',
        text: 'Step 3',
        name: 'กด Stop เพื่อหยุดการทำงาน',
        image: require('../image/3.png'),
    },
];

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }
    async _loadingFont() {
        await Font.loadAsync({
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
        })
        this.setState({ loadingFont: false })
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#e8e8e8" }}>
                <Header style={[styles.headerBgcolor]}>
                    <Left>
                        <Headers />
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr', fontSize: 20 }]}>คู่มือ</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderEmpty={() =>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={{ fontFamily: 'Mitr' }}>หมดแล้ว</Text>
                            </View>
                        }
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <View style={{
                                            width: 50,
                                            height: 50,
                                            borderWidth: 2,
                                            borderRadius: 25,
                                            borderColor: '#9c9c9c',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{ fontFamily: 'Mitr', fontSize: 35, color: '#003399' }}>{item.num}</Text>
                                        </View>
                                        <Body>
                                            <Text style={{ fontFamily: 'Mitr' }}>{item.text}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{ width: 225, alignSelf: 'center', padding: 5, marginBottom: 10 }} cardBody>
                                    <Image style={{ height: 350, resizeMode: 'stretch', flex: 1 }} source={item.image} />
                                </CardItem>
                            </Card>
                        }
                    />
                </View>

                <View style={{
                    flexDirection: "row",
                    flex: 1,
                    position: "absolute",
                    bottom: 50,
                    justifyContent: 'space-between',
                    padding: 15
                }}>
                    <Button onPress={() => this._deckSwiper._root.swipeLeft()}>
                        <Icon name="arrow-back" />
                        <Text style={{ fontFamily: 'Mitr' }}>Previous</Text>
                    </Button>
                    <Button
                    style={{marginLeft:110}}
                        onPressIn={() => this._deckSwiper._root.swipeRight()}>
                        <Icon name="arrow-forward" />
                        <Text style={{ fontFamily: 'Mitr' }}>Next</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
export default Tool;