import React from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Text, Container, Content, Header, Body, Title, Left, Right, Picker, Button, Icon, Input, Item, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import styles from '../component/style'
import Headers from '../component/Header'
import * as Font from 'expo-font'
import rate from '../component/Data_rate'
import { AppLoading } from 'expo'

class Change_Rate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '฿',
            startprice: 35,
            one: 0.37,
            ten: 0.31,
            twenty: 0.28,
            fourty: 0.25,
            sixty: 0.22,
            eighty: 0.19,
            timeprice:2
        };
        this._loadingFont = this._loadingFont.bind(this)
    }
    componentDidMount() {
        rate.startprice = this.state.startprice
        rate.one = this.state.one
        rate.ten = this.state.ten
        rate.twenty = this.state.twenty
        rate.fourty = this.state.fourty
        rate.sixty = this.state.sixty
        rate.eighty = this.state.eighty
        rate.type = this.state.selected
        this._loadingFont()
    }
    onValueChange2(value) {
        this.setState({
            selected: value
        });

    }
    async _loadingFont() {
        await Font.loadAsync({
            Mitr: require('../../assets/fonts/Mitr-Regular.ttf'),
        })
        this.setState({ loadingFont: false })
    }
    setValue() {
        rate.startprice = this.state.startprice
        rate.one = this.state.one
        rate.ten = this.state.ten
        rate.twenty = this.state.twenty
        rate.fourty = this.state.fourty
        rate.sixty = this.state.sixty
        rate.eighty = this.state.eighty
        rate.timeprice = this.state.timeprice
        rate.type = this.state.selected
        Actions.reset('drawer')
        this.setState({
            selected: '฿',
            startprice: 35,
            one: 5.50,
            ten: 6.50,
            twenty: 7.50,
            fourty: 8,
            sixty: 9,
            eighty: 10.50
        })
    }
    render() {
        const { loadingFont } = this.state
        if (loadingFont) {
            return <AppLoading />
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                <Header style={[styles.headerBgcolor]}>
                    <Left>
                        <Button transparent onPress={() => Actions.reset('drawer')}><Icon style={{ color: 'white' }} name='arrow-back'></Icon></Button>
                    </Left>
                    <Body>
                        <Title style={[styles.headerBgcolor, { fontFamily: 'Mitr', fontSize: 20 }]}>Change Rate</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ alignItems: 'center' }}>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Start Price :</Label>
                            <Input placeholder='START PRICE'
                                keyboardType='numeric'
                                onChangeText={(start) => this.setState({ startprice: parseInt(start) })}
                                value={this.state.startprice} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 1 km :</Label>
                            <Input placeholder='Enter value than 1 km.'
                                keyboardType='numeric'
                                onChangeText={(one) => this.setState({ one: parseInt(one) })}
                                value={this.state.one} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 10 km :</Label>
                            <Input placeholder='Enter value than 10 km.'
                                keyboardType='numeric'
                                onChangeText={(ten) => this.setState({ ten: parseInt(ten) })}
                                value={this.state.ten} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 20 km :</Label>
                            <Input placeholder='Enter value than 20 km.'
                                keyboardType='numeric'
                                onChangeText={(twenty) => this.setState({ twenty: parseInt(twenty) })}
                                value={this.state.twenty} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 40 km :</Label>
                            <Input placeholder='Enter value than 40 km.'
                                keyboardType='numeric'
                                onChangeText={(fourty) => this.setState({ fourty: parseInt(fourty) })}
                                value={this.state.fourty} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 60 km :</Label>
                            <Input placeholder='Enter value than 60 km.'
                                keyboardType='numeric'
                                onChangeText={(sixty) => this.setState({ sixty: parseInt(sixty) })}
                                value={this.state.sixty} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>distance > 80 km :</Label>
                            <Input placeholder='Enter value than 80 km.'
                                keyboardType='numeric'
                                onChangeText={(eighty) => this.setState({ eighty: parseInt(eighty) })}
                                value={this.state.eighty} />
                        </Item>
                        <Item>
                            <Label style={{ fontFamily: 'Mitr', paddingLeft: 5 }}>Time per minute :</Label>
                            <Input placeholder='Enter price time per minute'
                                keyboardType='numeric'
                                onChangeText={(min) => this.setState({ timeprice: parseInt(min) })}
                                value={this.state.timeprice} />
                        </Item>
                        <Item picker>
                            <Label>Money type : </Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                headerBackButtonTextStyle={{ color: "#fff" }}
                                headerTitleStyle={{ color: "#fff" }}
                                placeholder="Select your Money type"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="฿" value="฿" />
                                <Picker.Item label="$" value="$" />
                                <Picker.Item label="¥" value="¥" />
                                <Picker.Item label="€" value="€" />
                                <Picker.Item label="£" value="£" />
                            </Picker>
                        </Item>
                        <Button style={{ marginTop: 10 }} success onPress={() => this.setValue()}><Text>Submit</Text></Button>
                    </View>
                </Content>

            </View>
        )
    }
}
export default Change_Rate;