import React from 'react'
import { TextInput, Image, StyleSheet, TouchableHighlight, Alert, AsyncStorage } from 'react-native'
import { Button, Text, Left, Right, Container, Header, Content, Form, Item, Input, Label, Thumbnail, Icon, Body, View } from 'native-base'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import User from '../component/User'
import styles from '../component/style'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            password: this.props.password,
            uid: this.props.uid,
            loadingFont: true
            //userInfo: null
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    setUid(value) {
        this.state.uid = value
    }
    getUid() {
        return this.uid;
    }
    //โหลด Font เข้าแอพพลิเคชัน
    componentDidMount() {
        this._loadingFont()
    }

    async _loadingFont() {
        await Font.loadAsync({
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf')
        })
        this.setState({ loadingFont: false })
    }
    //Log-in ปกติ
    _login = async (email, password) => {
        try {
            //เชื่อมต่อ Firebase Auth
            firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                AsyncStorage.setItem('uid', user.user.uid);
                this.setState({ uid: user.user.uid })
                User.uid = user.user.uid;
                console.log('Check uid : ', user.user.uid)
                User.password = password
                User.email = email
                if (email !== 'anonrock65@gmail.com') {
                    firebase.database().ref('chkUser/' + User.uid).set({ email: email, uid: User.uid })
                }
                Actions.reset("Auth")
            }).catch(error => {
                Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'Email หรือ Password ของท่านไม่ถูกต้อง')
                console.log(error)
            })
        }
        catch (error) {
            console.log(error)
        }
        //ลืมรหัสผ่าน
    }
    forgotPassword = () => {
        Alert.prompt(
            "ลืมรหัสผ่าน",
            "email-ของคุณ",
            [
                {
                    text: "ตกลง",
                    onPress: (email) =>
                        firebase.auth().sendPasswordResetEmail(email)
                            .then(function (user) {
                                Alert.alert('กรุณาตรวจสอบ Email', 'ทำการส่งคำยืนยันรีเซ็ตรหัสผ่านเรียบร้อยแล้ว')
                            }).catch(function (e) {
                                console.log(e)
                                Alert.alert('ผิดพลาด', 'Email ของท่านไม่ถูกต้อง')
                            })
                },
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("cancel"),
                }
            ]
        )

    }
    //log-In Google
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerData ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = googleUser => {
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase.auth().signInWithCredential(credential).then(function (data) {
                    User.uid = data.user.uid
                    User.email = data.user.displayName
                    console.log('Google name : ', data.user.displayName)
                    console.log('Google name : ', data.user.uid)
                    console.log('user sign in');
                })
                    .catch(function (error) {
                        var errorCode = error.code;
                    })
            } else {
                console.log('User already sighn in firebase')
            }
        }.bind(this))
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: '635327706623-1je8rnhpub7ufqi92m791hu70h90fdjv.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result)
                firebase.database().ref('chkUser/' + User.uid).set({ email: User.email, uid: User.uid })
                await AsyncStorage.setItem('uid', User.uid);
                Actions.reset("Auth")
                result.accessToken
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    //Log in Facebook
    async  loginWithFacebook() {
        try {
            await Facebook.initializeAsync('2691006180984431');
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}`)
                    .then((ress) => ress.json()).then((json) => {
                        User.email = json.name
                        User.uid = json.id
                        AsyncStorage.setItem('uid', json.id);
                        Actions.reset("Auth")
                        firebase.database().ref('chkUser/' + User.uid).set({ email: User.email, uid: User.uid })
                    })
                const credential = firebase.auth.FacebookAuthProvider.credential(token)
                firebase.auth().signInWithCredential(credential).catch(error => {
                    console.log(error);
                });

            } else {
                type === 'cancel'
            }

        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    render() {
        const { loadingFont } = this.state

        if (loadingFont) {
            return <AppLoading />
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                <Form style={{ marginTop: 10, marginBottom: 20, paddingBottom: 10, flex: 0.9 }}>
                    <Body><Left />
                        <Thumbnail style={styles.image_logo} large source={require('../image/Taxi_logo.png')} />
                        <Right /></Body>
                    <View style={{ alignSelf: 'center' }}>
                        <Text note>Welcome</Text></View>
                    <Item floatingLabel style={{
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 10
                    }}
                    >
                        <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email} />
                    </Item>
                    <Item floatingLabel style={{
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 10
                    }}
                    >
                        <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Password</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password} />
                    </Item>
                    <Button style={{
                        margin: 20,
                        marginTop: 30
                    }}
                        block
                        success
                        onPress={() => this._login(this.state.email, this.state.password)}>
                        <Text style={{ fontSize: 25, color: '#00FF40', fontFamily: 'Mitr' }}>Login</Text>
                    </Button>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <Button bordered
                            small
                            danger
                            onPress={() => Actions.reset("Signup")} >
                            <Text style={{ fontFamily: 'Mitr' }} danger> Sign Up </Text>
                        </Button>
                        <Text light style={{
                            color: "red",
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: 26,
                            fontFamily: 'Mitr'
                        }}
                        >|</Text>
                        <Button bordered
                            small
                            danger
                            onPress={() => this.forgotPassword()} >
                            <Text style={{ fontFamily: 'Mitr' }} danger>Forgot Password</Text>
                        </Button>
                    </View>
                </Form>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                    <Button style={{ padding: 5 }} transparent onPress={() => this.loginWithFacebook()}>
                        <Thumbnail square style={styles.image2} source={require('../image/facebook_Icon.png')} />
                        <Text style={{ fontFamily: 'Mitr' }}>Login with Facebook</Text>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                    <Button style={{ padding: 5 }} transparent onPress={() => this.signInWithGoogleAsync()}>
                        <Thumbnail square style={styles.image3} source={require('../image/Gmail_Icon.png')} />
                        <Text style={{ fontFamily: 'Mitr' }}>Login with Google</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
export default LoginPage;