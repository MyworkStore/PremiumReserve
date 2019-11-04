import * as WebBrowser from 'expo-web-browser';
import React from 'react';
// import * as firebase from 'firebase';
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
import FirebaseHelper from '../helper/FireBaseHelper'
// import FirebaseHelper2 from '../helper/FirebaseHelper2'
import getData from '../helper/FirebaseHelper2';

export default class ItemScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'ประวัติ',
  //   header: null,
  //   tabBarVisible: false,
  //   tabBarLabel: null,
  //   tabBarIcon: null,
  //  };

  componentDidMount() {

    // let obj = FirebaseHelper.readUserData("tb_product_master");

    console.log("onload")
    // console.log(FirebaseHelper.readUserData("tb_product_master"))
    // console.log(FirebaseHelper2.getData("tb_product_master"));
    FirebaseHelper.readUserData("tb_product_master").then((data)=>{
      console.log("========= API ============")
      console.log(data)
    })

    // console.log(getData("tb_product_master"))

  }

  render(){
    return (
    
      <View style={styles.container}>
        <View style={styles.imagePanel}>
          <View style={styles.imageGrid}>
            <Image 
              source={Images.productTest} 
              style={
                {
                  width: '100%',
                  height: '100%',
                }
              }
              resizeMode='contain' 
            />
          </View>
        </View>
      </View>
  
    );
  }

}

ItemScreen.navigationOptions = {
  title: 'รายการสินค้า',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  imagePanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGrid: {
    width: '80%',
    height: '80%',
    borderColor: '#000000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
});
