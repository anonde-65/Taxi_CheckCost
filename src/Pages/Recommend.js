import React from 'react'
import { Alert } from 'react-native'
import { Text, Container, Header, Body, Title, Left, Right, Content, Form, Textarea, Button, ListItem, CheckBox, List } from 'native-base'
import Headers from '../component/Header'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import styles from '../component/style'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class Recommend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //------checkProperty------//
            pro1: 0,
            pro2: 0,
            pro3: 0,
            //--------checkBox-------//
            chk1: false,
            chk2: false,
            chk3: false,
            //------Text----------//
            text: "",
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                this.setState({ uid: user.uid })
                console.log("This Page Home : ", user.uid);
            }
        });
    }
    async _loadingFont() {
        await Font.loadAsync({
            Itim: require('../../assets/fonts/Itim-Regular.ttf'),
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
        })
        this.setState({ loadingFont: false })
    }
    componentDidMount() {
        this._loadingFont()
    }

    submit() {
        if (this.state.chk1 || this.state.chk2 || this.state.chk3 || this.state.text != "") {
            Alert.alert("Success", "Thank you for recommend.")
            //-------Insert Data-------//
            firebase.database().ref('user/' + this.state.uid + '/recommend/').set(
                {
                    การใช้งานยากเกินไป: this.state.pro1,
                    เรทราคาไม่ตรง: this.state.pro2,
                    แผนที่ไม่มีความแม่นยำ: this.state.pro3,
                    คำแนะนำเพิ่มเติม: this.state.text
                }
            ).then(() => {
                console.log('INSERT !');
                console.log('This uid after insert :', this.state.uid);
            }).catch((error) => {
                console.log(error);
            });
            this.setState({
                chk1: false,
                chk2: false,
                chk3: false,
                text: ""
            })
        }
        else
            Alert.alert("ไม่สำเร็จ", "ต้องเลือกอย่างน้อย 1 ข้อ")
    }

    chk1() { if (this.state.chk1 === false) { this.setState({ chk1: true, pro1: 1 }) } else this.setState({ chk1: false, pro1: 0 }) }
    chk2() { if (this.state.chk2 === false) { this.setState({ chk2: true, pro2: 1 }) } else this.setState({ chk2: false, pro2: 0 }) }
    chk3() { if (this.state.chk3 === false) { this.setState({ chk3: true, pro3: 1 }) } else this.setState({ chk3: false, pro3: 0 }) }

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
                        <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr' }]}>Recommend</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
                    <Text style={{ margin: 10, fontSize: 30, fontFamily: 'Mitr' }}>Commend to me : </Text>
                    <List style={{ margin: 20, marginBottom: 30 }}>
                        <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} onPress={() => this.chk1()} >
                            <CheckBox checked={this.state.chk1} onPress={() => this.chk1()} />
                            <Body>
                                <Text style={{ fontFamily: 'Mitr' }}>Usability is too difficult.</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} onPress={() => this.chk2()}>
                            <CheckBox checked={this.state.chk2} onPress={() => this.chk2()} />
                            <Body>
                                <Text style={{ fontFamily: 'Mitr' }}>Rate Price is not correct.</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} onPress={() => this.chk3()}>
                            <CheckBox checked={this.state.chk3} onPress={() => this.chk3()} />
                            <Body>
                                <Text style={{ fontFamily: 'Mitr' }}>Map is not accurate.</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <Form>
                        <Textarea style={{ fontFamily: 'Mitr' }}
                            rowSpan={5}
                            bordered
                            placeholder="Comment..."
                            onChangeText={(text) => this.setState({ text })} />
                        <Button
                            style={{ margin: 30, marginLeft: 60, marginRight: 60 }}
                            rounded
                            onPress={() => this.submit()}><Left />
                            <Text style={{ fontFamily: 'Mitr', fontSize: 25 }}>Submit</Text>
                            <Right /></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default Recommend;