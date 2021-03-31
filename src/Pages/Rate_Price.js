import React from "react";
import { View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { Footer, FooterTab, Button, Text, Icon, Container, Header, Body, Title, Left, Right } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Headers from '../component/Header'
import styles from '../component/style'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import firebase from 'firebase'
import { firebaseConfig } from '../../Config'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class Rate_Price extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            price: 35,
            loadingFont: true
        };
        this._loadingFont = this._loadingFont.bind(this)
    }

    componentDidMount() {
        this._loadingFont()
    }
    async _loadingFont () {
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
            <Container>
                <Header style={[styles.headerBgcolor]}>
                    <Left>
                        <Headers />
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr' }]}>Rate Price</Title>
                    </Body>
                    <Right />
                    
                </Header>
                <View style={[styles.container]}>
                    <Text style={{ fontSize: 30, fontFamily: 'Mitr' }}>Rate Price table by distance.</Text>
                    <Text note>(Thailand)</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Body style={styles.bodyRate}>
                            <Text style={[styles.headerRate, { fontFamily: 'Mitr' }]}>Distance over</Text>
                            <Text style={[styles.headerRate, { fontFamily: 'Mitr' }]}>(KM.)</Text>
                        </Body>
                        <Body style={styles.bodyRate}>
                            <Text style={[styles.headerRate, { fontFamily: 'Mitr' }]}>Rate</Text>
                            <Text style={[styles.headerRate, { fontFamily: 'Mitr' }]}>(Bath)</Text>
                        </Body>
                    </View>
                    <ScrollView style={{ width: 375 ,marginBottom:10}}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>35</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1.36</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>37</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1.73</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>39</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>2.09</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>41</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>2.45</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>43</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>2.82</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>45</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>3.18</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>47</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>3.55</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>49</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>3.91</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>51</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>4.27</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>53</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>4.64</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>55</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>5.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>57</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>5.36</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>59</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>5.73</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>61</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>6.09</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>63</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>6.45</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>65</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>6.82</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>67</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>7.18</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>69</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>7.55</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>71</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>8.27</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>75</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>8.64</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>77</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>9.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>79</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>9.36</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>81</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>9.73</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>83</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>10.08</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>85</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>10.38</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>87</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>10.69</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>89</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>91</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11.31</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>93</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>95</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11.92</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>97</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>12.23</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>99</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>12.54</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>101</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>12.85</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>103</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>13.15</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>105</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>13.46</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>107</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>13.77</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>109</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>14.08</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>111</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>14.38</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>113</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>14.69</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>115</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>15.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>117</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>15.31</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>119</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>15.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>121</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>15.92</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>123</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>16.23</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>125</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>16.54</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>127</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>16.85</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>129</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>17.15</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>131</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>17.46</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>133</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>17.77</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>135</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>18.08</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>137</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>18.38</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>139</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>18.69</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>141</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>19.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>143</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>19.31</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>145</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>19.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>147</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>19.92</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>149</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>20.20</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>151</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>20.47</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>153</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>20.73</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>155</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>21.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>157</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>21.27</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>159</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>21.53</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>161</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>21.80</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>163</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>22.07</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>165</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>22.33</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>167</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>22.60</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>169</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>22.87</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>171</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>23.13</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>173</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>23.40</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>175</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>23.67</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>177</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>23.93</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>179</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>24.20</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>181</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>24.47</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>183</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>24.73</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>185</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>25.00</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>187</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>25.27</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>189</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>25.53</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>191</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>25.80</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>193</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>26.07</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>195</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>26.33</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>197</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>26.60</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>199</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>26.87</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>201</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>50.19</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>381</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>100.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>851</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>150.08</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1,375</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>200.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1,901</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>250.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>2,431</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>300.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>2,951</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>350.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>3,481</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>400.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>4,001</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>451.57</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>4,541</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>501.10</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>5,061</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>550.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>5,581</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>600.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>6,101</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>651.57</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>6,641</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>701.10</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>7,161</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>750.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>7,681</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>800.14</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>8,201</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>851.57</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>8,741</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>901.10</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>9,261</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>950.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>9,781</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1000.41</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>10,301</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1051.57</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>10,841</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1101.10</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11,361</Text>
                                </Body>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>1150.62</Text>
                                </Body>
                                <Body style={styles.bodyRate}>
                                    <Text style={[styles.textRate, { fontFamily: 'Mitr' }]}>11,881</Text>
                                </Body>
                            </View>
                        </View>
                    </ScrollView>
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
export default Rate_Price