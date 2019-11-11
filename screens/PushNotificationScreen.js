import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    Keyboard,
    ScrollView
} from 'react-native'

import Constants from 'expo-constants';
import FirebaseHelper from '../helper/FireBaseHelper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class PushNotificationScreen extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
          token: "",
          message: "",
        };
    
      }

    getToken = async() => {
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
        
          let token = await Notifications.getExpoPushTokenAsync();

          this.setState({
              token: token
          })

          const param = {
              token: this.state.token
          }

          FirebaseHelper.update('/userNoti/hok', param)

    }

    sendMessage = () => {
        Keyboard.dismiss()
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View>
                        <TouchableOpacity style={{backgroundColor: '#3385ff', marginTop: 10, height: 50, alignItems: 'center', justifyContent: 'center'}}
                            onPress={this.getToken}
                        >
                            <Text style={{textAlign: 'center'}}>
                                กดเพื่อรับ token
                            </Text>
                        </TouchableOpacity>
                        <Text>
                            {this.state.token}
                        </Text>
                    </View>
                    {/* <TextInput 
                        style={{borderColor: '#000000', borderWidth: 1, padding: 10}} 
                        placeholder='ใส่ข้อความ Noti'
                        onChangeText={(text)=>{this.setState({message: text})}}
                    />
                    <TouchableOpacity style={{backgroundColor: '#00e600', marginTop: 10, height: 50, alignItems: 'center', justifyContent: 'center'}}
                        onPress={this.sendMessage}
                    >
                        <Text style={{textAlign: 'center'}}>
                            กดเพื่อส่งข้อความ
                        </Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        )
    }

}

PushNotificationScreen.navigationOptions =  {
    title: 'ทดสอบ Push Notification',
    headerTitleStyle: { flex: 1, textAlign: 'center'}
    // header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        justifyContent: 'center',
    }
})