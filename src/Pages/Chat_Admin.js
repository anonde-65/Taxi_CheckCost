import React from 'react'
import { FlatList} from 'react-native'
import { Text, Container, Header, Body, Title, Left, Right, Content, List, ListItem, Thumbnail, Button, Icon } from 'native-base'
import Headers from '../component/Header'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
import { Actions } from 'react-native-router-flux'
import User from '../component/User'
import chkChat from '../component/chkChat'
import styles from '../component/style'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class Chatadmin extends React.Component {

    constructor(props) {
        super(props);
        // AirBnB's Office, and Apple Park
        this.state = {
            cars: [],
            uid: "",
            data: null,
            email: [],
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    async _loadingFont () {
        await Font.loadAsync({
          Mitr: require('../../assets/fonts/Mitr-Regular.ttf')
        })
        this.setState({ loadingFont: false })
      }

    componentDidMount() {
        this._loadingFont()
        Actions.refresh();
        firebase.database().ref('chkUser')
            .on('child_added', (val) => {
                let person = val.val();
                person.uid = val.key;
                this.setState((PrevState) => {
                    return {
                        email: [...PrevState.email, person]
                    }
                })
            })
    }

    //<ListItem onPress={() => Actions.Contact(chkChat.email=item.email,chkChat.uid=item.uid)}></ListItem>
    renderRow = ({ item }) => {
        return (
            <List>
                <ListItem onPress={() => Actions.Contact(chkChat.email=item.email,chkChat.uid=item.uid)}>
                    <Text style={{fontFamily:'Mitr'}}>{item.email}</Text>
                </ListItem>
            </List>
        )

    }
    header() {
        if (User.email === 'anonrock65@gmail.com') {
            return (
                <Header style={[styles.headerBgcolor]}>
                    <Left>
                    <Button transparent onPress={() => Actions.reset('drawer')}><Icon style={{color:'white'}} name='arrow-back'></Icon></Button>
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor,{fontFamily:'Mitr'}]}>Contact for admin</Title>
                    </Body>
                    <Right/>
                </Header>
            )
        }else{
            <Header style={[styles.headerBgcolor]}>
                    <Left>
                        <Headers />
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor,{fontFamily:'Mitr'}]}>Contact for admin</Title>
                    </Body>
                    <Right/>
                </Header>
        }
    }
    
    render() {
        const { loadingFont } = this.state

        if (loadingFont) {
          return <AppLoading />
        }
        return (
            <Container style={{ backgroundColor: "#e8e8e8" }}>
                {this.header()}
                <Content>
                    <FlatList
                        data={this.state.email}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.uid}
                    />
                </Content>
            </Container>
        );
    }
}
export default Chatadmin;