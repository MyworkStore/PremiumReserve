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
  ActivityIndicator,
  View,
  Alert
} from 'react-native';

import Images from '../helper/imageHelper'
import FirebaseHelper from '../helper/FireBaseHelper'

async function imageLoader(table){
  var imageNameList = [];
  // var imageList = [];
  
  imageNameList = await getImageName(table);

  // console.log("========== Item List ===========")
  // console.log(imageNameList);

  if( imageNameList.length > 0 ){

    var temp = "";
    var imageList = [];

    imageNameList.forEach(async function(item,index){

      temp = await getImage(item.pic);


      // imageList = await getImageList(temp).then((data));

      // imageList.push(getImageList(temp));
      // imageList = getImageList(temp);

      // if( temp != undefined ){
      //   imageList.push(temp);
      // }

      // this.setState({
      //   imageList: imageList
      // })

    })

    setTimeout(() => {
      console.log("======= ItemList =========")
      console.log(imageList);
    }, 3000);
  
    // console.log("TEMP")
    // console.log(temp)

    // console.log("======== LIST =========")
    // console.log(this.state.imageList);

    // console.log(imageList);

  }else{
    Alert.alert("ไม่พบรูปภาพ")
  }

}

function getImageName(table){

  const result = [];

  return FirebaseHelper.queryData(table).then((data) => {
    data.forEach(function(item, index){
      result.push(item);
    })
  }).then(()=>{
    return result;
  })

}

function getImage(item){

  // const result = [];

  return FirebaseHelper.queryFileStorage("/itemList/"+item).then((image) => {
    if( image != "undefined" ){
      // imageStoreList.push(image);
      return image
    }
  }).then((image) => {
    return image;
  })

}

function getImageList(image){

  const imageList = [];

  if( image != undefined ){
    imageList.push(image);
  }

  return imageList;

}

export default class ItemScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showLoader: true,
      imageList: [],
      imageTest: ""
    };

  }


  componentDidMount() {

    var imageNameTemp = [];
    var imageStoreList = [];

    this.setState({
      showLoader: false,
      imageList: 'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/itemList%2F9000451.PNG?alt=media&token=73965efe-8e3a-4a36-9dc9-40d26b998130'
    });

    imageLoader("tb_product_master");

    // FirebaseHelper.queryData("tb_product_master").then((data) => {
    //   console.log("========= API ============")
    //   console.log(data)

    //   if(data.length > 0){

    //     data.forEach(function(item,index){

    //       imageNameTemp.push(item.pic);

    //     })

    //     console.log("=========== TEST ============")
    //     console.log(imageNameTemp)

    //     imageNameTemp.forEach(function(item,index){

    //       console.log("index : " + index)
    //       console.log("Item : " + item)

          // FirebaseHelper.queryFileStorage("/itemList/"+item).then((image) => {
          //   if( image != "undefined" ){
          //     imageStoreList.push(image);
          //   }
          // }).then(() => {
          //   return imageStoreList;
          // })

    //     })

    //     console.log("======= State =======")
    //     console.log(this.state.imageList)

    //     console.log("========= Store List =============")
    //     console.log("imageStoreList : " + imageStoreList)

    //     this.setState({
    //       showLoader: false,
    //       imageList: 'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/itemList%2F9000451.PNG?alt=media&token=73965efe-8e3a-4a36-9dc9-40d26b998130'
    //     });

    //   }

    // })

  }

  render(){

    if( this.state.showLoader ){
      return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>
    }else{
      return (
        <View style={styles.container}>
          <View style={styles.imagePanel}>
            <View style={styles.imageGrid}>
            <Image 
                source={{uri : this.state.imageTest}} 
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
