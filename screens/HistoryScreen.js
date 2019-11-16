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
import { getLongCurrentTime } from '../components/CommonFunction'



export default class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderDtl: [],
      userid: '',
      pageGo: 'HistoryDetail'
    };
    //AsyncStorage.setItem('userid', '0635162877');

    /*let order = {
      booking_timestamp: 0,
      confirm: "N",
      pic: "",
      product_name: "",
      transaction_url: ""
    }
    FirebaseHelper.writeUserData("store-00005/","transaction/order-yyyyyyyyyy", order) ; */
  }
  getOrder(table, orderByField) {

    FirebaseHelper.listenerData(table, (data) => {
      this.getOrderData(data);
    })
  }
   async getOrderData(dataWait) {
    //console.log("##### VIEW DATA IN LOOP########");
    //console.log(dataWait);
    const result = [];
    let data = dataWait.val();
    let isReview=0;   
    if (data != null) {
      let promiseArr = Object.keys(data).map(function (key, index) {
        //console.log("##### VIEW KEY IN LOOP########");
        // console.log(key);
        //console.log(data[key].product_code); 
        //alert(isReview);
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
              order_no: data[key].order_no,
              phone: data[key].phone,
              product_code: data[key].product_code,
              reason_reject: data[key].reason_reject,
              isReview: isReview
            })
          )
        })
      });
      Promise.all(promiseArr)
        .then(() => {
          this.setState({
            orderDtl: result
          });
          //console.log("############VIEW DATA LAST###################");
          //console.log(this.state.orderDtl);
        });

         
    }
  }


  async componentDidMount() {
    let userid = '';
    userid = await AsyncStorage.getItem('userid');
    //console.log("############VIEW USERID###################");
    //console.log(userid);    
    this.getOrder('tb_user/user-' + userid, "booking_timestamp");
    this.setState({
      userid: userid
    });




    //console.log(this.state.orderDtl);
  }
  _gopage = async (order) => {
    //FireBaseHelper.test();
    //alert("user_review/"+this.state.userid + "-" + orderNo.order_no + "/");  
    //console.log("user_review/"+this.state.userid + "-" + orderNo.order_no + "/");
    //alert('yyyyy');  
    // FireBaseHelper.objectExists().then(data=>{ 
    //alert(order.isReview);
    let userId =this.state.userid;
    let node="";
    let i = 0;    
      node = userId+ "-" + order.order_no;
      FirebaseHelper.existsDoc("user_review/", node).then(data=>{
         if (data.review==1 && order.order_status =='C' ) {
          this.props.navigation.navigate('Review',
            {
              orderDetail: order,
              orderNo: order.order_no,
              userid: this.state.userid
            });
        }
        else {
          this.props.navigation.navigate(this.state.pageGo,
            {
              orderDetail: order,
              orderNo: order.order_no,
              userid: this.state.userid
            });
        }
       });     
    

    // });

  }

  _render = (item) => {
    //console.log("###### FECT ITEM ##########");
    //console.log(item.item);

    return (
      <TouchableHighlight onPress={() => this._gopage(item.item)}>
        <OrderHistoryCard
          orderDetail={item.item}
        />
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View>
        {(this.state.orderDtl.length > 0) ?
          <FlatList
            data={this.state.orderDtl}
            renderItem={this._render}
          />
          :
          <Text style={[styles.fontHeaderInfo, { textAlign: 'center' }]}>ไม้มีข้อมูลการจอง</Text>
        }
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
    justifyContent: 'center',
    height: 250,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    //borderWidth:0.25,
    //elevation:10,       
    backgroundColor: '#f6f6f6'
  },
  containerInner: {
    justifyContent: 'center',
    height: 200,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    //borderWidth:0.25,
    //elevation:10,       
    backgroundColor: 'white'

  },
  containerReason: {
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    //borderWidth:0.25,
    //elevation:10,       
    backgroundColor: '#f6f6f6'

  },
  contentLayout: {
    padding: 5,
  },
  iconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  fontHeaderError: {
    fontFamily: 'kanit-bold',
    color: 'red'
  },
  fontButton: {
    fontFamily: 'kanit-bold',
    color: 'white'
  },
  button: {
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#F7A221',
    borderRadius: 5,
    padding: 10
  }
  ,
  fontHeaderWarnning: {
    fontFamily: 'kanit-bold',
    color: '#D1CE05'
  }
  ,
  fontHeaderSuccess: {
    fontFamily: 'kanit-bold',
    color: 'green'
  },
  fontHeaderInfo: {
    fontFamily: 'kanit-bold',
    color: 'blue'
  },
  fontHeaderDel: {
    fontFamily: 'kanit-bold',
    color: 'blue'
  },
  fontDetailI: {
    fontFamily: 'kanit'

  }
  ,
  fontDetailII: {
    fontFamily: 'kanit',
    fontSize: 10,
    color: '#7d7d7d'

  }
  , fontReason:
  {
    fontFamily: 'kanit-bold',
    color: 'blue',
    fontSize: 12
  }
  , fontReasonDetail:
  {
    fontFamily: 'kanit-bold',
    fontSize: 12
  }
});