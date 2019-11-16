import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,    
    StyleSheet,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Lookup from '../helper/Lookup';
import FirebaseHelper from '../helper/FireBaseHelper';
//import console = require('console');
import Moment from 'moment';

function DispalyOrderStatus(props){

    switch(props.param.status) {
        case "U":
          // code block
          return (
            <Text style={                                   
                 styles.fontHeaderWarnning               
               }>{props.param.text} </Text> 
        );
          break;
        case "K":
        return (
            <Text style={                                   
                 styles.fontHeaderInfo               
               }>{props.param.text} </Text> 
         );
          break;
        case "R":
        return (
            <Text style={                                   
                 styles.fontHeaderRej               
               }>{props.param.text} </Text> 
         );
          break;
          case "D":
          return (
              <Text style={                                   
                   styles.fontHeaderError              
                 }>{props.param.text} </Text> 
           );
        break;
        case "C":
        return (
            <Text style={                                   
                 styles.fontHeaderSuccess               
               }>{props.param.text} </Text> 
         );
        break;
        default:
        return (
            <Text style={                                   
                 styles.fontHeaderError               
               }>{props.param.text} </Text> 
         );
      }   
}
export default class OrderHistoryCard extends Component {
    constructor(props) {
        super(props);
        Moment.locale('en');

        this.state = {
            text: "",
            status:"",
            productName:"",
            pic:"",
            orderNo:'',
            urlImage:''
        }          
    }
    getProductInfo(table) {
        //const result = [];
        //console.log(" ###### IN getProductInfo##### ");
       // console.log(table);
        FirebaseHelper.queryDataObj(table)
        .then(data=>{             
              return new Promise(resolve => { 
                resolve(
                    this.setState({              
                        productName:data.product_name,
                        pic:data.pic                              
                      })                
                    );
                    //console.log(" ###### IN getProductInfo##### ");     
                    //console.log(data);
                 //console.log(data.pic);
                 resolve(
                    FirebaseHelper.queryFileStorage("/itemList/"+data.pic ).then((image) => {
                        this.setState({               
                            urlImage:image
                        });
                    })
                 );
             });
        }           
        );          
      }
     componentDidMount(){
        //console.log("#################INPUT VIEW###########");
        //console.log('tb_product_master/');
        //console.log("tb_product_master/"+this.props.orderDetail.product_code);
        //console.log(this.props.orderDetail.order_no);
        //console.log(this.props.orderDetail);                
         this.setState({
            text: Lookup[this.props.orderDetail.order_status],
            status :this.props.orderDetail.order_status,
            orderNo: this.props.orderDetail.order_no,
            //urlImage:'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/itemList%2F9000451.PNG?alt=media&token=73965efe-8e3a-4a36-9dc9-40d26b998130'
        });
         this.getProductInfo("tb_product_master/"+this.props.orderDetail.product_code);
       // console.log('##########'+this.state.text)
    }
    componentWillReceiveProps(nextProps){
        //console.log("#################INPUT VIEW###########");
        //console.log('tb_product_master/');
        //console.log("tb_product_master/"+this.props.orderDetail.product_code);
        //console.log(this.props.orderDetail.order_no);
        //console.log(this.props.orderDetail);                
         this.setState({
            text: Lookup[nextProps.orderDetail.order_status],
            status :nextProps.orderDetail.order_status,
            orderNo: nextProps.orderDetail.order_no,
            //urlImage:'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/itemList%2F9000451.PNG?alt=media&token=73965efe-8e3a-4a36-9dc9-40d26b998130'
        });
         this.getProductInfo("tb_product_master/"+nextProps.orderDetail.product_code);
       // console.log('##########'+this.state.text)
    }
    render() {
        
        return (           
                <View style={styles.container} >
                    <View style={styles.iconLayout}>
                    <Image  resizeMode='contain'
                            style={{ width: 70, height: 70, backgroundColor: 'transparent' }}
                            source={{ uri: this.state.urlImage }}
                        />
                    </View>
                    <View style={styles.contentLayout}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <DispalyOrderStatus param={this.state} /> 
                            <Text style={{  fontSize: 10, flex: 1, textAlign: 'right' }}>{Moment(this.props.orderDetail.booking_timestamp).format('DD/MM/YYYY HH:mm')}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, padding: 2, borderRadius: 5 }}>
                            <View style={{ flex: 1, backgroundColor: 'white', padding: 8, borderRadius: 5 }}>
                                <Text style={styles.fontDetailI}>{this.state.productName} </Text>
                                <Text style={styles.fontDetailII}>Order # {this.state.orderNo}</Text>
                                <Text style={styles.fontDetailII}>จำนวน # {this.props.orderDetail.booking_qty} ชิ้น  </Text>
                                <Text style={styles.fontDetailII}>แลกด้วย # {(this.props.orderDetail.booking_by=='A')?Lookup['AN']:Lookup['MN']} {this.props.orderDetail.booking_value} {(this.props.orderDetail.booking_by=='A')?Lookup['AU']:Lookup['MU']} </Text>
                            </View>
                        </View>
                    </View>
                </View>
        );
    }

    gotoOrderDetail = () => {
        //readUserData();
        this.props.navigation.navigate("HistoryDetail");
    }
}
const styles = StyleSheet.create({
    container: {
        height: 115,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#f6f6f6'
    },
    contentLayout: {
        flex: 8,
        padding: 5,
    },
    iconLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    fontHeaderError:{
        fontFamily: 'kanit-bold',
        color:'red'
    }
    ,
    fontHeaderRej:{
        fontFamily: 'kanit-bold',
        color:'#FFC300'
    }
    ,
    fontHeaderWarnning:{
        fontFamily: 'kanit-bold',
        color:'#D1CE05'
    }
    ,
    fontHeaderSuccess:{
        fontFamily: 'kanit-bold',
        color:'green'
    },
    fontHeaderInfo:{
        fontFamily: 'kanit-bold',
        color:'blue'
    },
    fontDetailI:{
        fontFamily: 'kanit'   
    }
    ,
    fontDetailII:{
        fontFamily: 'kanit',
        fontSize: 10,  
        color: '#7d7d7d'
   
    }

});