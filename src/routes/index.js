import React from 'react'
import { Text, StyleSheet, PixelRatio } from 'react-native'
import { Router, Stack, Scene } from 'react-native-router-flux'
import LoginPage from '../Pages/LoginPage'
import MapPage from '../Pages/map'
import Home from '../Pages/HomePage'
import Contact from '../Pages/Contact_Dan'
import MapView from '../Pages/Taxicab_map'
import Rate_Price from '../Pages/Rate_Price'
import Signup from '../Pages/signUp'
import History from '../Pages/History'
import Tool from '../Pages/Tool'
import Recommend from '../Pages/Recommend'
import Sidemenu from '../component/newHeader'
import Cameras from '../Pages/Camera'
import Auth from '../component/authLoadingScreen'
import Chatadmin from '../Pages/Chat_Admin'
import MapContainer from '../TestCode/MapContainer'
import Changerate from '../Pages/Change_Rate'

const TabIcon = ({ selected, title }) => {
        return (

                <Text style={{ color: selected ? 'green' : 'black', fontSize: 30 }}>{title}</Text>
        );
};

class Routes extends React.Component {

        render() {
                return (
                        <Router >
                                <Stack key="root">
                                        <Scene key="Cameras"
                                                component={Cameras}
                                                title="Cameras"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="loginPage"
                                                component={LoginPage}
                                                title="Login"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="Signup"
                                                component={Signup}
                                                title="Signup"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="Auth"
                                                component={Auth}
                                                title="Auth"
                                                hideNavBar={true}
                                                initial={true}
                                        />
                                        <Scene key="Chatadmin"
                                                component={Chatadmin}
                                                title="Chatadmin"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="Contact"
                                                component={Contact}
                                                title="Contact"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="MapContainer"
                                                component={MapContainer}
                                                title="Contact"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene key="Changerate"
                                                component={Changerate}
                                                title="Change"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                        <Scene open={false}
                                                drawer={true}
                                                key="drawer"
                                                contentComponent={Sidemenu}
                                                drawerWidth={220}
                                                hideNavBar>
                                                <Scene key="Home"
                                                        component={Home}
                                                        title="Home"
                                                        hideNavBar={true}
                                                        initial={true}
                                                />
                                                <Scene key="MapPage"
                                                        component={MapPage}
                                                        title="Map"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="Rate_Price"
                                                        component={Rate_Price}
                                                        title="Rate_Price"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="Tool"
                                                        component={Tool}
                                                        title="Tool"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="History"
                                                        component={History}
                                                        title="History"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="Chatadmin"
                                                        component={Chatadmin}
                                                        title="Chatadmin"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="Contact"
                                                        component={Contact}
                                                        title="Contact"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                                <Scene key="Recommend"
                                                        component={Recommend}
                                                        title="Recommend"
                                                        hideNavBar={true}
                                                        initial={false}
                                                />
                                        </Scene>
                                        <Scene key="MapView"
                                                component={MapView}
                                                title="MapView"
                                                hideNavBar={true}
                                                initial={false}
                                        />
                                </Stack>
                        </Router>
                );
        }
}

export default Routes