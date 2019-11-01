import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Images from '../helper/imageHelper'

export default class ItemScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'ประวัติ',
  //   header: null,
  //   tabBarVisible: false,
  //   tabBarLabel: null,
  //   tabBarIcon: null,
  //  };

  render(){
    return (
    
        <View style={styles.container}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
                รายการสินค้า
            </Text>
        </View>
  
    );
  }

}

ItemScreen.navigationOptions = {
  title: 'รายการสินค้า',
  // header: null,
  // tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});
