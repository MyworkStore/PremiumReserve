import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  AsyncStorage,
  FlatList,
} from 'react-native';

import OrderHistoryCard from '../components/OrderHistoryCard';
import Lookup from '../helper/Lookup';
import FirebaseHelper from '../helper/FireBaseHelper';
import KeepAwake from 'expo-keep-awake';
import { resolve } from 'uri-js';




export default class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      orderDtl: []
    };
    AsyncStorage.setItem('userid', '0635162877');

  }
   getOrder(table) {
    const result = [];
    FirebaseHelper.queryData(table)
      .then(dataWait => {
        //console.log("##### VIEW DATA IN LOOP########");
        //console.log(dataWait);
        let data=dataWait;       
        let promiseArr= Object.keys(data).map(function (key, index) {          
         // console.log("##### VIEW KEY IN LOOP########");
         // console.log(key);
          //console.log(data[key].product_code);
          return new Promise(resolve => {            
             resolve(
              result.push({
                allmem_barcode_pic: data[key].allmem_barcode_pic,
                booking_by: data[key].booking_by,
                booking_qty: data[key].booking_qty,
                booking_timestamp: data[key].booking_timestamp,
                booking_value: data[key].booking_value,
                confirm_timestamp: data[key].confirm_timestamp,
                firstname: data[key].firstname,
                invoice_pic: data[key].invoice_pic,
                lastname: data[key].lastname,
                notification_flag: data[key].notification_flag,
                order_status: data[key].order_status,
                phone: data[key].phone,
                product_code: data[key].product_code,
                reason_reject: data[key].reason_reject
              })
             )
          })
        });
        Promise.all(promiseArr)
        .then(()=>{ 
                 this.setState({
                   orderDtl:result
                 });
                 //console.log("############VIEW DATA LAST###################");
                 //console.log(this.state.orderDtl);                 
        });
      })
  }

  async componentDidMount() {
    let userid = '';
    userid=await  AsyncStorage.getItem('userid');
    //console.log("############VIEW USERID###################");
   // console.log(userid);    
    this.getOrder('tb_user/user-'+userid);

    //console.log(this.state.orderDtl);
  }
  _render=(item)=>{
    //console.log("###### FECT ITEM ##########");
   // console.log(item);
    
    return(
      <TouchableHighlight onPress={() => this.props.navigation.navigate("HistoryDetail",
      {
        orderDetail:item.item
      })}>
      <OrderHistoryCard
        orderDetail={item.item} 
      />
    </TouchableHighlight>      
    )
  }
  render() {
    return (      
      <View>
         <FlatList
          data={this.state.orderDtl}
          renderItem={this._render}
         />         
      </View>
    );
  }
}

HistoryScreen.navigationOptions = {
  title: 'ประวัติ',
  //headerLeft: null
  // header: null,
  // tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    height: 105,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  contentLayout: {
    flex: 8,
    padding: 5,
  },
  iconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});