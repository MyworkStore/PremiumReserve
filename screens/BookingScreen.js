import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
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
export default class BookingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
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
  getProductInfo(table) {  
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
          resolve(
            FirebaseHelper.queryFileStorage("/itemList/" + data.pic).then((image) => {           
              this.setState({
                urlImage: image,
                showLoader: false,
              });
            })
          );
        });
      }
      );
  }
  confirm = async () => {  

    if (this.state.CustName == "" || this.state.CustLName == "" || this.state.CustTel == "" || this.state.bookingType == "") {
      Alert.alert(
        '!แจ้งเดือน',
        'กรูณาระบุข้อมูลให้ครบถ้วน ชื่อ-นามสกุล,เบอร์โทร',
        [

          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },         
        ],
        { cancelable: false },
      );
    }
    else {

      let msg = "";
      if (this.state.bookingType == 'A') {
        msg = "คุณต้องการจอง" + this.state.productName + " จำนวน 1 ชิ้น,ด้วย:" + Lookup['AN'] + "(" + this.state.point + Lookup['AU'] + ") ผู้จอง:" + this.state.CustName + " "+ this.state.CustLName + ",เบอร์โทร" + this.state.CustTel;
      }
      else {
        msg = "คุณต้องการจอง" + this.state.productName + " จำนวน 1 ชิ้น,ด้วย:" + Lookup['MN'] + "(" + this.state.stamp + Lookup['MU'] + ") ผู้จอง:" + this.state.CustName + " "+this.state.CustLName +",เบอร์โทร" + this.state.CustTel;
      }
      Alert.alert(
        'รายละเอียดคำสั่งจอง',
        msg,
        [

          { text: 'ตกลง', onPress: () => this.saveData() },
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
   saveData=async()=>{
  //   FirebaseHelper.writeUserData("tb_user", "user-0635162877"+"/order-xxxx", {
  //     xxxxx:'xxxxx'
  //   })
  //   .then(() => {
  //     alert('ididididi');
  //  })
    this.setState({showLoader: false});   
    const { navigation } = this.props;
    let productCode = navigation.getParam('productCode', 'NO-PRODUCTCODE');
    //let productCode = "04444444"
    let userid = this.state.userid;
    //alert(this.state.userid);   
    let tel = this.state.CustTel;     
    let prd = "item-"+productCode;
    let lastname=this.state.CustLName;
    let firstname=this.state.CustName;
    let booking_value=this.state.stamp;
    if(this.state.bookingType=='A')
    {
      booking_value=this.state.point
    }  
    let timeCur = await getLongCurrentTime()
    let order_no = "ORD"+timeCur;  
    let booking_timestamp=timeCur;
    let booking_by=this.state.bookingType;
      let order = {                   
        allmem_barcode_pic : "-",
        booking_by : booking_by,
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
       this.props.navigation.navigate("History")       
   })      
   
     
  }  
  render() {
    //this.getProductInfo("tb_product_master/item-"+this.state.orderDetail.product_code);
    //this.getProductInfo("tb_product_master/item-9000451");
    if( this.state.showLoader ){
      return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
    }else{

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
         
        <View style={styles.containerImg}>
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
            <Text style={{textAlign:'center',fontFamily: 'kanit',fontSize: 18}}>{this.state.productName}</Text>
          </View>
          </View>
        <View style={styles.containerCon}>
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
          </View>
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
  containerImg:{
    height: 250,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#f6f6f6'
  },
  containerCon:{
    height: 200,
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
  },
  spinner: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center'
  }
});
