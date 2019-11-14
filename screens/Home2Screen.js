import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  ImageBackground,AsyncStorage,
  Dimensions,
} from 'react-native';
import Images from '../helper/imageHelper';
import Constants from 'expo-constants';

function Separator(){
  return <View style={styles.separator} />;
}

export default class Home2Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userid: ''};
    this.loadUserId();
  }

  async loadUserId() {
    try {
        const userId = await AsyncStorage.getItem('userid');
        this.setState({userid: userId});
        console.log('User ID : '+userId);
    }
    catch (error) {
        console.log('Error loadUserId()');
    }
}
  render() {
    
    return (
      <ImageBackground 
        style={{ flex: 1 }} 
        source={require('./../assets/images/bg.png')}
      >
        <View style={styles.container}>
            <Separator />
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{fontSize: 12, color: '#A97555',backgroundColor:'#ffffff'}}>{'หมายเลขโทรศัพท์ : '+this.state.userid+'  '}</Text>
            <Button
              title="LOG OUT"
              onPress={this.naviToHome}
              color="#757882"
            />

            </View>
            <Separator />
            <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
            <TouchableHighlight onPress={() =>  this.props.navigation.navigate("History")}>
              <Image
                style={styles.ImageButtonStyle}
                source={require('./../assets/images/bookingButton.png')}
              />
            </TouchableHighlight>
            </View>
            <Separator />
            <View style={{flex:2,alignItems:'center',justifyContent:'flex-start'}}>
            <TouchableHighlight onPress={() =>  this.props.navigation.navigate("History")}>
              <Image
                style={styles.ImageButtonStyle}
                source={require('./../assets/images/historyButton.png')}
              />
            </TouchableHighlight>
            </View>
            <Separator />
            <View style={{flex:1}}></View>
            <Separator />
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff'}}>
              <Text style={{fontSize: 15, color: '#A97555'}}>แอปพลิเคชั่นนี้อยู่ในช่วงทดสอบ เพื่อปรับปรุงการจองสินค้า Premium</Text>
            </View>
            <Separator />
        </View>
      </ImageBackground>
    );
  }
  naviToHome = async () => {
    await AsyncStorage.removeItem('userid');
    this.props.navigation.navigate("Home");
  }
}



Home2Screen.navigationOptions =  {
  title: 'ALL Premium',
  headerTitleStyle: { flex: 1, textAlign: 'center'}
  // header: null,
};
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width / 5);
const imageWidth = dimensions.width-10;
console.log('imageHeight : '+imageHeight);
console.log('imageWidth : '+imageWidth);
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    marginTop: Constants.statusBarHeight+5,
    paddingHorizontal: 0,
  },
  ImageButtonStyle: {
    width: imageWidth, height: imageHeight, resizeMode: 'stretch',
  },  
  actionMenuView: {
    flexDirection: 'row-reverse'
  },
  actionMenu: {
    marginEnd: 5,
    // marginVertical: 5
  },
});
