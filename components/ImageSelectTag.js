import * as React from 'react';
import { StyleSheet, Image, View,TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import UploadTag from  '../components/UploadTag'

export default class ImageSelectTag extends React.Component {
  

    constructor(props) {
        super(props);
        //Moment.locale('en');

        this.state = {
            uriUpload:null
        }          
    }
   
    render() {
        let { uriUpload } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>               
                <TouchableOpacity                    
                    style={styles.button}
                    onPress={this._pickImage}>                
                  <UploadTag uriUpload = {uriUpload}/>
                </TouchableOpacity>  
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ uriUpload: result.uri });
            this.props.onUpdate(result.uri);
        }
    };
}
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
  });
