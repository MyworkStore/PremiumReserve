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

import { MonoText } from '../components/StyledText';

export default class HistoryScreen extends React.Component {

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
          หน้าประวัติ
        </Text>
        <TouchableOpacity style={styles.button} onPress={() =>  this.props.navigation.navigate("Home")}>
           <Text style={{fontSize: 18}}>กลับหน้าหลัก</Text>
         </TouchableOpacity>
      </View>
  
    );
  }

}

HistoryScreen.navigationOptions = {
  title: 'ประวัติ',
  headerLeft: null
  // header: null,
  // tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
