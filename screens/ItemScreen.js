import * as WebBrowser from 'expo-web-browser';
import React from 'react';
// import * as firebase from 'firebase';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  RefreshControl,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback 
} from 'react-native';

import Card from '../components/Card'
import Constants from 'expo-constants'
import FirebaseHelper from '../helper/FireBaseHelper'
// import DeviceInfo from 'react-native-device-info';
// import {getUniqueId} from 'react-native-device-info'

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
  var object = [];

  await imageNameList.forEach(function(item, index){
    FirebaseHelper.queryFileStorage("/itemList/"+item.pic).then((image) => {
        if( image != undefined ){
          object = {
            data: imageNameList[index],
            imageUrl: image
          }
          imageStoreList.push(object);
        }
    }).then(()=>{
      return imageStoreList;
    })
  })

  return imageStoreList;

}

function CardList(props){

  return props.itemList.map((keyItem, index)=>{

    return (
      <TouchableOpacity  key={index} onPress={()=> props.navProp.navigation.navigate("Booking",{
        productCode: keyItem.data.product_code
      })} activeOpacity={1}>
        <CardItem object={keyItem}/>
      </TouchableOpacity >
    )

  })

}

function CardItem(props){

  var param = props.object;

  return (
      <Card>
        <View style={{flexDirection: 'row'}} key={props.index} >
          <View style={{flex: 0.3, margin: 3, backgroundColor: '#ffffff'}}>
            <Image 
              source={{uri : param.imageUrl}} 
              style={
                {
                  width: '100%',
                  height: '100%',
                }
              }
              resizeMode='contain'
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
              <View>
                <Text style={{fontFamily: 'kanit-bold', fontSize: 15}}>
                  {param.data.product_name}
                </Text>
              </View>
              <View style={{backgroundColor: '#ffffff', borderRadius: 10, padding: 5}}>
                <Text>
                  Point : {param.data.all_point}
                </Text>
                <Text>
                  Stamp : {param.data.m_stamp}
                </Text>
                <Text>
                  Cash : {param.data.cash}
                </Text>
              </View>
          </View>
        </View>
      </Card>
  )

}

export default class ItemScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showLoader: true,
      refreshing: false,
      imageList: [],
      imageTest: ""
    };

  }

  async componentWillMount() {
    await this.fetchData();
  }

  async fetchData() {
    var imageStoreList = [];

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

  _onRefresh() {
    this.setState({
      showLoader: false,
      refreshing: true
    });
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render(){

    if( this.state.showLoader ){
      return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
    }else{
      return (
        <View style={styles.container}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} colors={['blue']} />
              }
          >
            <CardList itemList={this.state.imageList} navProp={this.props}/>
          </ScrollView>
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
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  spinner: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center'
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
