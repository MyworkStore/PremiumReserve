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

 

export default class UploadTag extends Component {
    constructor(props) {
        super(props);
        Moment.locale('en');

        this.state = {
           uriUpload:null
        }          
    }
     componentDidMount(){
        this.setState({
            uriUpload: this.props.uriUpload,           
        });

    }
    componentWillReceiveProps(nextProps){                
     this.setState({
            uriUpload: nextProps.uriUpload,           
        });

    }
    DispalyUpload(){

        if(this.state.uriUpload == null)
        {
             return(             
                <Ionicons
                name={'md-images'}
                size={100}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              />
             );
        }
        else
        {
            return(             
                <Image
                 source={{uri:this.state.uriUpload}}                
                 resizeMode='contain'
                 style={{ width: 150, height: 150, backgroundColor: 'transparent' }}
                />
             );
        }   
    }
    render() {        
        return ( 
            <View>                       
                 {this.DispalyUpload()}
            </View>  
        );
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