import React from 'react'
import { KeyboardAvoidingView, View, Keyboard, Dimensions, Animated, Platform, TextInput } from 'react-native'
import { Button, Text, Container, Header, Body, Title, Left, Right, Icon } from 'native-base'
import { FlatList } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import User from '../component/User'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
import styles from '../component/style'
import chkChat from '../component/chkChat'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const isIOS = Platform.OS === 'ios';
class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: chkChat.email,
            uid: chkChat.uid,
            person: {
                name: User.email,
                pass: User.password
            },
            items: this.props.item,
            textMessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages'),
            loadingFont: true
        };
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(10);
        this._loadingFont = this._loadingFont.bind(this)
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
        this.forceUpdate();
        Actions.refresh();
        //เซ็ต Keyboard ให้ขึ้นตาม Platform 
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true));
        this.keyboardHideListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e, false));
        if (User.email === 'anonrock65@gmail.com') {
            this.state.dbRef.child(chkChat.uid)
                .on('child_added', (value) => {
                    this.setState((prevState) => {
                        return {
                            messageList: [...prevState.messageList, value.val()]
                        }
                    })
                    console.log(value)
                })
        } else {
            this.state.dbRef.child(User.uid)
                .on('child_added', (value) => {
                    this.setState((prevState) => {
                        return {
                            messageList: [...prevState.messageList, value.val()]
                        }
                    })
                    console.log(value)
                })
        }
    }

    componentWillUnmount() {
        this.state.dbRef.off();
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }
    //Keyboard Event
    keyboardEvent = (event, isShow) => {
        let heightIOS = isIOS ? 20 : 60;
        let bottomIOS = isIOS ? 90 : 120;
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? heightIOS : 0
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? bottomIOS : 70
            })
        ]).start();
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            if (User.email === 'anonrock65@gmail.com') {
                let msgId = this.state.dbRef.child(chkChat.uid).push().key;
                let updates = {};
                let message = {
                    message: this.state.textMessage,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    user: User.email,
                    from: User.uid
                }
                updates['messages/' + chkChat.uid + '/' + msgId] = message;
                firebase.database().ref().update(updates);
                this.setState({ textMessage: '' })
            }
            else {
                let msgId = this.state.dbRef.child(User.uid).push().key;
                let updates = {};
                let message = {
                    message: this.state.textMessage,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    user: User.email,
                    from: User.uid
                }
                updates['messages/' + User.uid + '/' + msgId] = message;
                firebase.database().ref().update(updates);
                this.setState({ textMessage: '' })
            }
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'column',
                alignSelf: item.from === User.uid ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.uid ? '#86D5FF' : '#eee',
                maxWidth: '60%',
                borderRadius: 25,
                marginBottom: 10,
                paddingLeft: 8,
                paddingRight: 10,
            }}>
                <View style={{ flexDirection: 'row', alignSelf: item.from === User.uid ? 'flex-end' : 'flex-start', }}>
                    <Text style={{ color: '#000', padding: 3, fontSize: 12, fontFamily: 'Mitr' }}>{item.user}</Text>
                    <Text style={{ color: '#000', padding: 3, fontSize: 12, fontFamily: 'Mitr' }}>{this.convertTime(item.time)}</Text>
                </View>
                <Text style={{
                    color: '#fff',
                    padding: 5,
                    paddingTop: 0,
                    fontSize: 16,
                    alignSelf: item.from === User.uid ? 'flex-end' : 'flex-start',
                    color: item.from === User.uid ? 'white' : 'black',
                    fontFamily: 'Mitr'
                }}>
                    {item.message}
                </Text>
            </View>
        )
    }

    header() {
        return (
            <Header style={[styles.headerBgcolor]}>
                <Left>
                    <Button transparent onPress={() => User.email === 'anonrock65@gmail.com' ? Actions.Chatadmin() : Actions.drawer()}><Icon style={{ color: 'white' }} name='arrow-back'></Icon></Button>
                </Left>
                <Body>
                    <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr' }]}>Chat</Title>
                </Body>
                <Right />
            </Header>
        )
    }
    render() {
        const { loadingFont } = this.state
        if (loadingFont) {
            return <AppLoading />
        }
        let { height } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                <Animated.View style={[styles.bottomBar, { bottom: this.keyboardHeight, backgroundColor: '#1e90ff' }]}>
                    <TextInput style={styles.inputMessage}
                        placeholder="Message..."
                        onChangeText={(textMessage) => this.setState({ textMessage })}
                        value={this.state.textMessage} />
                    <Button style={{
                        marginBottom: 0,
                        width: '14%',
                        marginLeft: 5, height: 37,
                        backgroundColor: '#1e90ff'
                    }}
                        onPress={() => { this.sendMessage() }}>
                        <Icon name='send'></Icon>
                    </Button>
                </Animated.View>
                {this.header()}
                <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    style={{ paddingTop: 10, paddingHorizontal: 5, height }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{ height: this.bottomPadding }} />}
                />
            </KeyboardAvoidingView>
        );
    }
}
export default Contact;