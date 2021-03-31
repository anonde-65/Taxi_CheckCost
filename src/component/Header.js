import React from 'react';
import { View} from 'react-native';
import {Icon} from 'native-base'
import {Actions} from 'react-native-router-flux'
import styles from '../component/style'
// pull in from DrawerTrigger.js

class Header extends React.Component {
  render() {
    return (
      <View style={styles.headerBgcolor}>
        <View style={[styles.trigger]}>
          <Icon style={styles.icons} name={'menu'}size={30}  onPress={() => Actions.drawerOpen()}/>
        </View>
      </View>
    )
  }
}


export default Header;