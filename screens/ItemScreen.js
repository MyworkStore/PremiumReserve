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
import Card from '../components/Card';
import Constants from 'expo-constants';
import FirebaseHelper from '../helper/FireBaseHelper'

async function imageLoader(table){
  var imageNameList = [];
  var imageList = [];
  
  imageNameList = await getImageName(table);

  if( imageNameList.length > 0 ){

    imageList = await getImage(imageNameList);

  }else{
    Alert.alert("ไม่พบรูปภาพ");
  }

  return imageList;

}

async function getImageName(table){

  const result = [];

  return await FirebaseHelper.queryData(table).then((data) => {
    data.forEach(function(item, index){
      result.push(item);
    })
  }).then(()=>{
    return result;
  })

}

async function getImage(imageNameList){

  var imageStoreList = [];

  await imageNameList.forEach(function(item, index){
    FirebaseHelper.queryFileStorage("/itemList/"+item.pic).then((image) => {
        if( image != undefined ){
          imageStoreList.push(image);
        }
    }).then(()=>{
      return imageStoreList;
    })
  })

  return imageStoreList;

}

function CardItem(props){

  return (
    <Card>
      <Image 
          source={{uri : props.image[0]}} 
          style={
            {
              width: '100%',
              height: '100%',
            }
          }
          resizeMode='contain' 
        />
    </Card>
  )

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

  async componentDidMount() {

    var imageStoreList = [];

    this.setState({
      showLoader: true
    })

    imageStoreList = await imageLoader("tb_product_master");

    setTimeout(() => {
      
      if( imageStoreList.length > 0 ){

        this.setState({
          showLoader: false,
          imageList: imageStoreList
        })
    
      }

    }, 1000);

  }

  render(){

    if( this.state.showLoader ){
      return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>
    }else{
      return (
        <View style={styles.container}>
            <CardItem image={this.state.imageList}/>
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
    marginTop: Constants.statusBarHeight+5,
    paddingHorizontal: 10,
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    borderColor: '#d9d9d9',
    borderWidth: 0.5
  }
  // imagePanel: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // imageGrid: {
  //   width: '80%',
  //   height: '80%',
  //   borderColor: '#000000',
  //   borderWidth: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10
  // },
});
