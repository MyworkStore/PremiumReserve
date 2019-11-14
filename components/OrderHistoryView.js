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

export default class OrderHistoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {         
            status:"", 
            urlImage:''
        }          
    }   
     componentDidMount(){
        console.log("#################INPUT VIEW###########");
        //console.log('tb_product_master/');
        //console.log("tb_product_master/"+this.props.orderDetail.product_code);
        //console.log(this.props.orderDetail.order_no);
        console.log(this.props.orderDetail.order_status);                
         this.setState({            
            status :this.props.orderDetail.order_status,           
           // urlImage:'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/itemList%2F9000451.PNG?alt=media&token=73965efe-8e3a-4a36-9dc9-40d26b998130'
        }); 
        if(this.props.orderDetail.order_status == 'C')
        {
            FirebaseHelper.queryFileStorage("/eslip/ORD123456786.PNG").then((image) => {
                resolve(
                    this.setState({              
                        urlImage:image,                                           
                    })                
            );
        }) 
        } 
         //urlMage=image; 
       // console.log('##########'+this.state.text)
    }

    temp()
    {
        switch(this.props.orderDetail.order_status) {
            case "U":
            case "R":
              // code block
              return ( 
                
                <View>
                    <View style={[styles.containerInner ,{ alignItems:'center'}]}>
                    <Ionicons
                      name={'md-images'}
                      size={100}
                      style={{justifyContent:'center',alignItems:'center'}}               
                    />       
                    </View>
                    <View  style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}               >
                        <Text style={styles.fontButton} > ยืนยันBarcode </Text>
                    </TouchableOpacity>
                    </View>
              </View>
            );
            break;
            case "K":
            return (
               
                <View>
                <Image
                     resizeMode='contain'
                     style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                     source={{ uri: this.state.urlImage }}
                 ></Image>
                </View>            
             
            );
              break;       
            case "C":          
            return (
             
                <View>
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
             
                <View>
                <Image
                     resizeMode='contain'
                     style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                     source={{ uri: this.state.urlImage }}
                 ></Image>
                </View>            
           
            );
          }   
    }
    test()
    {
        return(<Text>aaaa</Text>);
    }
    render() {
        console.log("#################RENDER VIEW##########");
        console.log(this.props.orderDetail.order_status);   
        return(<View style={styles.container}>{this.temp()}</View>)
    }

    
}
const styles = StyleSheet.create({  
    container: {   
        justifyContent:'center',            
        height:350, 
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        //borderWidth:0.25,
        //elevation:10,       
        backgroundColor: '#f6f6f6'
    },
    containerInner: {   
      justifyContent:'center',
      height:300, 
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      //borderWidth:0.25,
      //elevation:10,       
      backgroundColor: 'white'
      
  },
    contentLayout: {       
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
    },
    fontButton:{
        fontFamily: 'kanit-bold',
        color:'white'
    },
    button: {
        alignItems: 'center',
        width:'50%',
        backgroundColor: '#F7A221',
        borderRadius:5,
        padding: 10
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