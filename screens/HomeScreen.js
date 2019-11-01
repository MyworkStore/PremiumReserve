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
  Button,
  ImageBackground
} from 'react-native';

import Images from '../helper/imageHelper'
import Constants from 'expo-constants';


function Separator() {
  return <View style={styles.separator} />;
}


export default class HomeScreen extends React.Component {

  render() {
    return (

      <View style={styles.container}>
        <View style={{flex:1, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>หน้าหลัก</Text>
        </View>
        <Separator />
        <View style={{flex:2, backgroundColor: 'red'}}>

        </View>
        <Separator />
        <View style={{flex:1}}>
            <View style={styles.actionMenuView}>
              <View style={styles.actionMenu}>
                <Button
                  title="รายการสินค้า"
                  onPress={() =>  this.props.navigation.navigate("Item") }
                  color="#4d79ff"
                />
              </View>
              <View style={styles.actionMenu}>
                <Button
                  title="ประวัติการจอง"
                  onPress={() =>  this.props.navigation.navigate("History") }
                  color="#33cc33"
                />
              </View>
            </View>
        </View>
      </View>
    );
  }

}

HomeScreen.navigationOptions =  {
  title: 'จองสินค้า Premium',
  headerTitleStyle: { flex: 1, textAlign: 'center'}
  // header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight+5,
    paddingHorizontal: 10
  },
  pageContent: {
    flex:1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  actionMenuView: {
    flexDirection: 'row'
  },
  actionMenu: {
    marginEnd: 5,
    // marginVertical: 5
  },
  separator: {
    marginVertical: 5,
    // borderBottomColor: '#737373',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
