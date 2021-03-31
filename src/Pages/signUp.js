import React from 'react'
import { AsyncStorage } from 'react-native'
import { Button, Text, Left, Right, Container, Header, Content, Form, Item, Input, Label, Thumbnail, Icon, Body } from 'native-base'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { firebaseConfig } from '../../Config'
import User from '../component/User'
import styles from '../component/style'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            Checkpassword: "",
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    componentDidMount() {
        this._loadingFont()
    }
    async _loadingFont() {
        await Font.loadAsync({
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf')
        })
        this.setState({ loadingFont: false })
    }

    Signup = async (email, password) => {
        try {
            if (this.state.password.length < 8) {
                alert("Please Enter atleast 6 characters")
            }
            else {
                if (this.state.password != this.state.Checkpassword) {
                    alert("Please Check password Incorrect.")
                    return;
                }
            }
            console.log("This mail :", email)
            console.log("This pass :", password)
            firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                AsyncStorage.setItem('uid', user.user.uid);
                firebase.database().ref('chkUser/' + user.user.uid).set({ email: email, uid: user.user.uid })
                User.email = user.user.email
                User.uid = user.user.uid
                User.password = this.state.password;
                Actions.reset("Auth")
            })
            return true;
        }
        catch (error) {
            console.log(error.toString())

        }
    }

    render() {
        const { loadingFont } = this.state

        if (loadingFont) {
            return <AppLoading />
        }
        return (
            <Container style={{ backgroundColor: "#e8e8e8" }}>
                <Content>
                    <Header>
                        <Left>
                            <Button hasText transparent onPress={() => Actions.reset("loginPage")}>
                                <Text style={{ fontFamily: 'Mitr' }}>Back</Text>
                            </Button>
                        </Left>
                    </Header>
                    <Body style={{ marginTop: 10 }}>
                        <Left />
                        <Thumbnail style={styles.image_logo} large source={require('../image/Taxi_logo.png')} />
                        <Right />
                    </Body>
                    <Body style={{ marginTop: 5 }}>
                        <Text note style={{ fontFamily: 'Mitr' }}>Sign Up</Text>
                    </Body>
                    <Form>
                        <Item style={{
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 10
                        }}
                            floatingLabel>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Email</Label>
                            <Input autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email} />
                        </Item>
                        <Item style={{
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 10
                        }} floatingLabel>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Password</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password} />
                        </Item>
                        <Item style={{
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 10
                        }} floatingLabel>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Confirm-Password</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(Checkpassword) => this.setState({ Checkpassword })}
                                value={this.state.Checkpassword} />
                        </Item>
                    </Form>
                    <Button style={{ margin: 10, marginTop: 30 }}
                        success
                        block
                        onPress={() => this.Signup(this.state.email, this.state.password)}>
                        <Text style={{ fontSize: 20, color: '#00FF40', fontFamily: 'Mitr' }}>Sign Up</Text>
                    </Button>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.password}</Text>
                    <Text>{this.state.Checkpassword}</Text>
                </Content>
            </Container>
        );
    }
}
export default LoginPage