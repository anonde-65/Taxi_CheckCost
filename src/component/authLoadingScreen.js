import React from 'react'
import { StatusBar,ActivityIndicator, AsyncStorage } from 'react-native'
import {  View } from 'native-base'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
import User from './User'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class AuthLoadingScreen extends React.Component{

    constructor(props){
        super(props);
        this.bootstrapAsync();
    }
    
    bootstrapAsync=async()=>{
        User.uid = await AsyncStorage.getItem('uid');
        Actions.reset(User.uid?'drawer':'loginPage');
    }
    render(){
        return(
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle='default'/>
            </View>
        );
    }
}
export default AuthLoadingScreen;