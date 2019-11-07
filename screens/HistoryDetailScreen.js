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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  OrderHistoryCard  from '../components/OrderHistoryCard';

function DispalyOrderStatusDetail(props){
    switch(props.param.status) {
        case "U":
          // code block
          return ( 
            <View style={styles.container}>  
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
            <View style={styles.container}>
            <View>
            <Image
                 resizeMode='contain'
                 style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                 source={{ uri: props.param.urlImage }}
             ></Image>
            </View>            
         </View>
        );
          break;
        case "R":
        return (
            <View style={styles.container}>
            <View>
            <Image
                 resizeMode='contain'
                 style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                 source={{ uri: props.param.urlImage }}
             ></Image>
            </View>            
         </View>
        );
          break;
        case "C":
        return (
            <View style={styles.container}>
            <View>
            <Image
                 resizeMode='contain'
                 style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                 source={{ uri: props.param.urlImage }}
             ></Image>
            </View>            
         </View>
        );
        break;
        default:
        return (
            <View style={styles.container}>
            <View>
            <Image
                 resizeMode='contain'
                 style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                 source={{ uri: props.param.urlImage }}
             ></Image>
            </View>            
         </View>
        );
      }

   
}


export default class HistoryDetailScreen extends React.Component {
  state = {
    photo: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            status:"",
            productName:"",
            pic:"",
            orderNo:'',
            urlImage:''
        }
           
    }

    componentWillMount(){
        const { navigation } = this.props;
        this.setState({
            text: navigation.getParam('orderStatusMsg', 'NO-orderStatusMsg'),
            status : navigation.getParam('orderStatus', 'NO-orderStatus'),
            productName:navigation.getParam('productName', 'NO-productName'),
            pic: navigation.getParam('pic', 'NO-pic'),
            orderNo: navigation.getParam('orderNo', 'NO-OrderNo'),
            urlImage:'https://firebasestorage.googleapis.com/v0/b/allpremium-8a053.appspot.com/o/eslip%2FORD123456786.PNG?alt=media&token=78965c5c-9f44-4bc8-bdaf-d368cdcda67c'
        })
       // console.log('##########'+this.state.text)   
     } 
 
  render() {
   // const { navigation } = this.props;
    return (
      <View>
        <ScrollView>
          <View >          
            <OrderHistoryCard
              orderStatusMsg={this.state.text}
              orderStatus ={this.state.status}
              productName={this.state.productName}
              pic={this.state.pic}
              orderNo={this.state.orderNo}
            />
          </View>    
          <DispalyOrderStatusDetail param={this.state} />   
        </ScrollView>      
      </View> 
     
      );
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