import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Button,
  Picker,
  ScrollView,
  AsyncStorage
} from 'react-native';

import FirebaseHelper from '../helper/FireBaseHelper'
import { getLongCurrentTime } from '../components/CommonFunction'
import Card from '../components/Card'

import Images from '../helper/imageHelper'
import Constants from 'expo-constants';
import Lookup from '../helper/Lookup';


//  function CardItem(props){
//     var param = props.object;
//     return(

//     )
//   }

let order = {
  //"allmem_barcode_pic" : "0976560.png", --
  allmem_barcode_pic: "",
  // //"booking_by" : "A",
  // booking_by: userid,
  // //"booking_qty" : 1,
  // booking_qty: "1",
  // //"booking_timestamp" : 1573199615,
  // booking_timestamp: getLongCurrentTime(),
  // //"booking_value" : 10900,
  // booking_value: orderValue,
  // //"confirm_timestamp" : 1573199615, --
  // confirm_timestamp: "",
  // //"firstname" : "สมัชญ์,"
  // firstname: CustName,
  // //"invoice_pic" : "ORD123456786.PNG", --
  // invoice_pic: "",
  // //"lastname" : "จันทอนุกูล" , --
  // lastname: "",
  // //"notification_flag" : "Y", -- "N"
  // notification_flag: "N",
  // //"order_no" : "0976560",
  // order_no: "order-" + getLongCurrentTime(),
  // //"order_status" : "C", -- "U"
  // order_status: "U",
  // //"phone" : "0635162877",
  // phone: orderCustTel,
  // //"product_code" : "item-9000451",
  // product_code: "item-" + product_code,
  // //"reason_reject" : ""
  // reason_reject: ""
}

export default class BookingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputBorder: "#cccccc",
      userid: "",
      CustName: "",
      CustLName: "",
      CustTel: "",
      CustNid: "",
      PickerValue: "",
      productCode: "",
      orderCustTel: "",
      productName: "",
      pic: "",
      point: "",
      cash: "",
      stamp: "",
      orderValue: "",
      urlImage: "",
      bookingType:"M"  

    };
    console.ignoredYellowBox = [
      'Setting a timer'
    ];

    //AsyncStorage.setItem('userid', '0839145155');

    //product_code = '9000451';
    //console.log("product is " + this.state.productCode)
    
  }




  async componentDidMount() {
    const { navigation } = this.props;
    let productCode = await navigation.getParam('productCode', 'NO-PRODUCTCODE');
    //alert(productCode);
    this.getProductInfo("tb_product_master/item-" + productCode);
    await this.checkCustTel(); 
    

  }
  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    let productCode = navigation.getParam('productCode', 'NO-PRODUCTCODE');
    //alert(productCode);
    this.getProductInfo("tb_product_master/item-" + productCode);
  }

  onFocus() {
    this.setState({
      inputBorder: '#668cff'
    })
  }

  clearText() {
    this.refs.CustName.clear();
    this.refs.CustTel.clear();
    this.refs.CustNid.clear();
  }

  checkCustTel = async () => {
    AsyncStorage.getItem('userid').then(data => {
      if (data !== null && data !== '') {
        this.setState({ CustTel: data ,userid:data})
      }
    });
  }

  useCustTelorNid() {
    // Check Tel No. || NID
    if ((this.state.CustTel == null || this.state.CustTel == '') && (this.state.CustNid == null || this.state.CustNid == '')) {
      Alert.alert('กรุณาใส่เบอร์โทรศัพท์ หรือ เลขบัตรประชาชน')
    }
    else if ((this.state.CustTel == null || this.state.CustTel == '') && (this.state.CustNid !== null || this.state.CustNid !== '')) {
      orderCustTel = this.state.CustNid;
      //Alert.alert(orderCustTel);
    }
    else if ((this.state.CustTel !== null || this.state.CustTel !== '') && (this.state.CustNid == null || this.state.CustNid == '')) {
      orderCustTel = this.state.CustTel;
      //Alert.alert(orderCustTel);
    }
    else {
      orderCustTel = this.state.CustTel;
      //Alert.alert(orderCustTel);
    }

    // Check stamp || point
    if (this.state.PickerValue.value == "stamp") {
      orderValue = stamp;
    }
    else if (this.state.PickerValue.value == "point") {
      orderValue = point;
    }
  }

  getProductInfo(table) {
    //const result = [];
    //console.log(" ###### IN getProductInfo##### ");
    // console.log(table);
    FirebaseHelper.queryDataObj(table)
      .then(data => {
        return new Promise(resolve => {
          resolve(
            this.setState({
              productName: data.product_name,
              pic: data.pic,
              point: data.all_point,
              cash: data.cash,
              stamp: data.m_stamp,             
            })
          );
          //console.log(" ###### IN getProductInfo##### ");     
          //console.log(data);
          //alert(data.pic_full);
          resolve(
            FirebaseHelper.queryFileStorage("/itemList/" + data.pic).then((image) => {
              //alert(image);  
              this.setState({
                urlImage: image
              });
            })
          );
        });
      }
      );
  }
  // onBlur(element) {
  //   this.setState({
  //     inputBorder: '#000000'
  //   })
  // }

 
  confirm = async () => {
  
    if (this.state.CustName == "" || this.state.CustLName == "" || this.state.CustTel == "" || this.state.bookingType == "") {
      Alert.alert(
        '!แจ้งเดือน',
        'กรูณาระบุข้อมูลให้ครบถ้วน ชื่อ-นามสุกล,เบอร์โทร',
        [

          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },         
        ],
        { cancelable: false },
      );
    }
    else {

      let msg = "";
      if (this.state.bookingType == 'A') {
        msg = "คุณต้องการจอง" + this.state.productName + " จำนวน 1 ชิ้น,ด้วย:" + Lookup['AN'] + "(" + this.state.point + Lookup['AU'] + ") ผู้จอง:" + this.state.CustName + ",เบอร์โทร" + this.state.CustTel;
      }
      else {
        msg = "คุณต้องการจอง" + this.state.productName + " จำนวน 1 ชิ้น,ด้วย:" + Lookup['MN'] + "(" + this.state.stamp + Lookup['MU'] + ") ผู้จอง:" + this.state.CustName + ",เบอร์โทร" + this.state.CustTel;
      }
      Alert.alert(
        'รายละเอียดคำสั่งจอง',
        msg,
        [

          { text: 'ตกลง', onPress: () => this.save() },
          {
            text: 'ยกเลิก',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }
        ],
        { cancelable: false },
      );

    }

  }
  save = async()=>{
    let time = await getLongCurrentTime();
    let userid = this.state.userid;
    let order_no = ""+time;
    let tel = "00000000";     
    let prd = "item-"+productCode;
    let lastname="L";
    let firstname="f";
    let booking_value=200;
    let booking_timestamp=time;
    let order = {                   
          allmem_barcode_pic : "-",
          booking_by : "A",
          booking_qty : 1,
          booking_timestamp : booking_timestamp,
          booking_value : booking_value,
          confirm_timestamp : 0,
          firstname : firstname,
          invoice_pic : "-",
          lastname : lastname,
          notification_flag : "N",
          order_no : order_no,
          order_status : "U",
          phone : tel,
          product_code: prd,
          reason_reject : "-" ,       
     }    
      FirebaseHelper.writeUserData("tb_user", "user-"+userid+"/order-"+order_no, order)
       .then(() => {
          // this.props.navigation.navigate("History")
      })   
  }
  

  render() {

    //this.getProductInfo("tb_product_master/item-"+this.state.orderDetail.product_code);
    //this.getProductInfo("tb_product_master/item-9000451");
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          <View style={styles.imagePanel}>
            <View style={styles.imageGrid}>
              <Image
                //source={Images.productTest} // productTest --> Change to PRD
                source={{ uri: this.state.urlImage }}
                style={
                  {
                    width: 200,
                    height: 200,
                  }
                }
                resizeMode='contain'
              />
            </View>
          </View>
          <Text style={styles.labelText}>
            ชื่อผู้จอง :
          </Text>
          <TextInput
            ref={'CustName'}
            placeholder=""
            style={styles.textBox}
            autoCompleteType={'off'}
            selectTextOnFocus={true}
            defaultValue={this.state.CustName}
            onChangeText={text =>this.setState({
              CustName: text
            })}
          />
          <Text style={styles.labelText}>
            นามสกุลผู้จอง :
          </Text>
          <TextInput
            ref={'CustLName'}
            placeholder=""
            style={styles.textBox}
            autoCompleteType={'off'}
            selectTextOnFocus={true}
            defaultValue={this.state.CustLName}
            onChangeText={text =>this.setState({
              CustLName: text
            })}
          />
          <Text style={styles.labelText}>
            กรอกเบอร์โทรศัพท์ :
          </Text>
          <TextInput
            ref={'CustTel'}
            style={styles.textBox}
            placeholder={'0xx-xxx-xxxx'}
            defaultValue={this.state.CustTel}
            keyboardType={'phone-pad'}
            selectTextOnFocus={true}
            keyboardAppearance={false}
            onChangeText={text =>     this.setState({
                                   CustTel: text
                         })}
          //value={this.state.CustTel} 
          />
          <Text style={styles.labelText}>
            กรุณาเลือกวิธีชำระ :
          </Text>
          <Picker

            selectedValue={this.state.bookingType}
            onValueChange={(itemValue, itemIndex) => this.setState({ bookingType: itemValue })}
          >
            <Picker.Item label={Lookup['MN']} value="M" color="green" />
            <Picker.Item label={Lookup['AN']} value="A" color="blue" />
          </Picker>
          <View style={styles.containerInfo}>
            <View >
              <Text style={styles.labelText}>จำนวน: </Text><Text style={styles.fontDetailI}>1 ชิ้น</Text>
            </View>
            {(this.state.bookingType == 'A') ?
              <View >
                <Text style={styles.labelText}>{Lookup['AN']}: </Text><Text style={styles.fontDetailI}>{this.state.point} {Lookup['AU']}</Text>
              </View>
              :
              <View >
                <Text style={styles.labelText}>{Lookup['MN']}: </Text><Text style={styles.fontDetailI}>{this.state.stamp} {Lookup['MU']}</Text>
              </View>
            }
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.confirm()}>
              <Text style={styles.fontButton} > ยืนยัน </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    );
  }
}

BookingScreen.navigationOptions = {
  title: 'จองสินค้า'
};
const styles = StyleSheet.create({

  containerInfo: {
    height: 45,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#f6f6f6'
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: Constants.statusBarHeight + 5,
    flexDirection: 'column',
    paddingHorizontal: 10
  },

  labelText: {
    fontFamily: 'kanit',
    fontSize: 12,
    //backgroundColor: '#FFFFFF',
  },
  labelTextInput: {
    fontFamily: 'kanit',
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  labelTextDetail: {
    fontFamily: 'kanit-bold',
    fontSize: 12,
    //backgroundColor: '#FFFFFF',
  },
  buttonPanel: {
    //backgroundColor: '#FFFFFF',
    marginVertical: 10,
    flexDirection: 'row',
    marginEnd: 5
  },
  actionButton: {
    marginEnd: 5,
    // marginVertical: 5
  },
  imagePanel: {
    flex: 1,
    // backgroundColor: 'blue',
    //backgroundColor: '#4DA8D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGrid: {
    //width: '85%',
    //height: '85%',
    borderColor: '#000000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  formPanel: {
    flex: 1,
    //backgroundColor: '#4DA8D4',
  },
  scrollView: {
    //backgroundColor: 'pink',
    marginHorizontal: 20,
    flex: 1,
  },
  textBox: {
    height: 30,
    borderColor: "#cccccc",
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10
  },
  fontDetailI: {
    fontFamily: 'kanit'
  }
  ,
  fontButton: {
    fontFamily: 'kanit-bold',
    color: 'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  }
});
