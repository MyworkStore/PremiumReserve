import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OrderHistoryCard from '../components/OrderHistoryCard';
//import  UploadImage  from '../components/UploadImage';
import FirebaseHelper from '../helper/FireBaseHelper';
import { getLongCurrentTime } from '../components/CommonFunction'
import ImageSelectTag from '../components/ImageSelectTag'
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
//import * as DocumentPicker from 'expo-image-picker';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class HistoryDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: true,
      orderDetail: [],
      uriUpload: null,
      loadToken: false,
      token: "",
      message: "",

    }

  }

  componentWillMount() {
    //const { navigation } = this.props;     
    //this.state = {
    //  orderDetail:navigation.getParam('orderDetail', 'NO-orderStatusMsg')
    //  }
    console.log('############### AAAAAAAAAAAA ################');
  }
  componentDidMount()
  {
    this.setState({showLoader:false});
  }

  _picker = async () => {
    this.setState({     
      showLoader:true
    });
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: false
    });
    this.setState({
      uriUpload: result.uri,
      showLoader:false
    });

  }


  render() {
    // const { navigation } = this.props;
    const { navigation } = this.props;    
    if( this.state.showLoader ){
      return <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
    }else{
    return (
      <View>
        <ScrollView>
          <View >
            <OrderHistoryCard
              orderDetail={navigation.getParam('orderDetail', 'NO-orderStatusMsg')}
            />
          </View>

          {this.showDetail()}

        </ScrollView>
      </View>      
    );
    }
  }
  

  insertTransToStore(time, userid, orderDetail) {
    FirebaseHelper.queryDataObjII("tb_product_master/" + orderDetail.product_code)
      .then(data => {
        let order = {
          order_no: orderDetail.order_no,
          booking_timestamp: time,
          confirm: "N",
          pic: data.val().pic,
          product_name: data.val().product_name,
          transaction_url: "tb_user/user-" + userid + "/order-" + orderDetail.order_no
        }
        FirebaseHelper.writeUserData("store-00005/", "transaction/" + orderDetail.order_no, order)
          .then(() => {
            this.props.navigation.navigate("History")
          })
        this.getToken("store-00005/", "transaction/" + orderDetail.order_no);
        FirebaseHelper.queryDataObj("userNoti/store-00005").then(data=>{
          //alert(data);
          this.sendMessage(data); 
        });    
      });
  }
  onUpdate = (val) => {
    this.setState({
      uriUpload: val
    })
  };

  getToken = async (node, key) => {
    this.setState({
      loadToken: true
    })
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {     
      return;
    }
    FirebaseHelper.updateData(node, key, {token:await Notifications.getExpoPushTokenAsync()})    
  }
  sendMessage = (token) => {
    Keyboard.dismiss()
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token,        
        sound: 'default',
        title: 'ข้อความแจ้งเตือน',
        body: "มีคำสั่งซื่อเข้ามาในระบบ",
        badge: 99      
      })
    })
  }

  uploadData = () => {

    if (this.state.uriUpload == null) {
      Alert.alert("แจ้งเตือน!!", "กรุณาเลือกรูป All memeber Barcode", [{ text: 'ตกลง' }]);
    }
    else {
      this.setState({showLoader:true});
      const { navigation } = this.props;
      const userid = navigation.getParam('userid', 'NO-orderStatusMsg');
      const orderDetail = navigation.getParam('orderDetail', 'NO-orderStatusMsg');
      //console.log('############### AAAAAAAAAAAA ################');   
      //console.log(userid); 
      getLongCurrentTime().then((time) => {
        FirebaseHelper.updateData("tb_user/", "user-" + userid + "/order-" + orderDetail.order_no + "/", {
          booking_timestamp: time,
          allmem_barcode_pic: orderDetail.order_no + ".PNG",
          order_status: "K"
        });
        this.insertTransToStore(time, userid, orderDetail);
      });
      FirebaseHelper.uploadImageAllmem(orderDetail.order_no + ".PNG", this.state.uriUpload);

    }

    // console.log("user-"+userid+"/order-"+orderDetail.order_no);
    //FirebaseHelper.updateData("tb_user","user-0635162877/order-0976560",)
  }


  showDetail() {

    const { navigation } = this.props;
    const orderDetail = navigation.getParam('orderDetail', 'NO-orderStatusMsg');
    //console.log(orderDetail);
    // console.log(orderDetail.order_status);
    switch (orderDetail.order_status) {
      case "U":
      case "R":
        // code block
        return (
          <View>
            <View style={styles.containerReason}>
              <Text style={styles.fontReasonDetail}>หมายเหตุ*</Text>
              <Text style={styles.fontReasonDetail}>{orderDetail.reason_reject}</Text>
            </View>
            <View style={styles.container}>
              <View style={[styles.containerInner, { alignItems: 'center' }]}>

                <ImageSelectTag uriUpload={this.state.uriUpload}
                  onUpdate={this.onUpdate}
                />

              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.uploadData()}>
                  <Text style={styles.fontButton} > ยืนยันBarcode </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
        break;
      case "K":
        return (

          <View style={styles.container}>
            <Image
              resizeMode='contain'
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              source={{ uri: this.state.urlImage }}
            ></Image>
          </View>

        );
        break;
        case "D":
        return (           
          <View style={styles.containerReason}>
               <Text style={styles.fontReasonDetail}>หมายเหตุ*</Text>
              <Text style={styles.fontReasonDetail}>{orderDetail.reason_reject}</Text>
        </View>
        );
        break;
      case "C":
        //console.log("############# C-CASE ##############")
        FirebaseHelper.queryFileStorage("/eslip/" + orderDetail.invoice_pic).then((image) => {
          this.setState({
            urlImage: image,
          })
        })
        return (

          <View style={styles.container}>
            <Image
              resizeMode='contain'
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              source={{ uri: this.state.urlImage }}
            ></Image>
          </View>

        );
        break;
      default:
        return (
          <View style={styles.container}>
            <Image
              resizeMode='contain'
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              source={{ uri: this.state.urlImage }}
            ></Image>
          </View>

        );
    }
  }
}

HistoryDetailScreen.navigationOptions = {
  title: 'รายละเอียดการสั่งจอง'
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
  ,
  spinner: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center'
  }
});