import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';
import Images from '../helper/imageHelper';
import Constants from 'expo-constants';

function Separator() {
  return <View style={styles.separator} />;
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.checkUser();
  }

 
  checkUser = async () => {
    AsyncStorage.getItem('userid').then(data=>{
      if (data !== null && data !== '' ) {
        console.log("Has Local UserId Link to Home2");
        this.props.navigation.navigate("Home2");
      } 
    });      
  }

  render() {
    return (
      <ImageBackground 
        style={{ flex: 1 }} 
        source={require('./../assets/images/bg.png')}
      >
        <View style={styles.container}>

          <View style={{flex:2}}>
          </View>
          <Separator />

          <View style={{flex:1}}>
            <TextInput
              style={{height: 60, borderColor: 'gray', borderWidth: 1,fontSize: 20, backgroundColor:'#CCEDF6'}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              placeholder="  กรุณากรอกหมายเลขโทรศัพท์"
              autoCompleteType={"tel"}
              keyboardType={"number-pad"}
              maxLength={10}
              allowFontScaling={true}
            />
          </View>
          <Separator />
          <View style={{flex:1}}>
              <View style={styles.actionMenuView}>
                <View style={styles.actionMenu}>
                  <Button
                    title="ยืนยัน"
                    onPress={this.naviToHome2}
                    color="#4d79ff"
                  />
                </View>
              </View>
          </View>
          <Separator />
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Button
              title="คู่มือการใช้งาน"
              onPress={this._handleOpenWithWebBrowserManual}
              color="#4d79ff"
            />
          </View>
          <Separator />
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Button
              title="เงื่อนไขการให้บริการ"
              onPress={this._handleOpenWithWebBrowserPrivacy}
              color="#4d79ff"
            />
          </View>
          <Separator />
          <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#ffffff'}}>
            <Text style={{fontSize: 15, color: '#A97555'}}>แอปพลิเคชั่นนี้อยู่ในช่วงทดสอบ เพื่อปรับปรุงการจองสินค้า Premium</Text>
          </View>
          <Separator />
        </View>
      </ImageBackground>
    );
  }

  naviToHome2 = async () => {
    if (this.state.text.length != 10) {
      Alert.alert(
        'รบกวนกรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก',
        '',
        [
          {text: 'ตกลง'},
        ]
      )
    } else {
      await AsyncStorage.setItem('userid', this.state.text);
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        console.log('User '+value+' Login to Home2');
        this.props.navigation.navigate("Home2");
      }
      
      
    }
  }
  
  _handleOpenWithWebBrowserManual = () => {
    WebBrowser.openBrowserAsync('http://gahp.net/wp-content/uploads/2017/09/sample.pdf');
  }

  _handleOpenWithWebBrowserPrivacy = () => {
    WebBrowser.openBrowserAsync('http://gahp.net/wp-content/uploads/2017/09/sample.pdf');
  }
};

HomeScreen.navigationOptions =  {
  title: 'ALL Premium',
  headerTitleStyle: { flex: 1, textAlign: 'center'}
  //header: null,
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
    flexDirection: 'row-reverse'
  },
  actionMan: {
    flexDirection: 'column',
    alignItems: 'center',
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