import React, { Component } from 'react';
import { Text, SafeAreaView, View, AsyncStorage } from 'react-native';
import { Left, Right, List, ListItem, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux'
import styles from '../component/style'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import User from './User';

export default class Sidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }
    componentDidMount(){
        this._loadingFont()
    }
    async _loadingFont () {
        await Font.loadAsync({
          Itim: require('../../assets/fonts/Itim-Regular.ttf'),
          Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
        })
        this.setState({ loadingFont: false })
      }

    logOut=async()=>{
        await AsyncStorage.clear();
        Actions.reset("loginPage",{email:'',password:'',uid:''})
    }

    render() {
        const { loadingFont } = this.state
        if (loadingFont) {
          return <AppLoading />
        }
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
                <List>
                    <ListItem >
                        <Left>
                            <Icon style={{width:40}} button onPress={() => Actions.drawerClose()} name="arrow-back" />
                        </Left>
                    </ListItem>
                    <ListItem button onPress={() => Actions.Home()}>
                        <Left >
                            <Text style={[styles.textDrawer,{fontFamily:'Mitr'}]}>Home</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button onPress={() => User.email !== 'anonrock65@gmail.com' ? Actions.Contact() : Actions.Chatadmin() }>
                        <Left>
                            <Text style={[styles.textDrawer,{fontFamily:'Mitr'}]}>Contact</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button onPress={() => Actions.Recommend()}>
                        <Left>
                            <Text style={[styles.textDrawer,{fontFamily:'Mitr'}]}>Recommend</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button onPress={() => Actions.History()}>
                        <Left >
                            <Text style={[styles.textDrawer,{fontFamily:'Mitr'}]}>History</Text>
                        </Left>

                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button onPress={() => Actions.Tool()}>
                        <Left>
                            <Text style={[styles.textDrawer,{fontFamily:'Mitr'}]}>Tool for use</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem button danger onPress={() => this.logOut()}>
                        <Left>
                            <Text style={[styles.textDrawer,{color:"red",fontFamily:'Mitr'}]}>Log Out</Text>
                        </Left>
                    </ListItem>
                </List>
            </SafeAreaView>
        );
    }
}
