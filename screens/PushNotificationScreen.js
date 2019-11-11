import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    Keyboard,
    ScrollView,
    ActivityIndicator
} from 'react-native'

import Constants from 'expo-constants';
import FirebaseHelper from '../helper/FireBaseHelper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class PushNotificationScreen extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
          loadToken: false,
          token: "",
          message: "",
        };
    
      }

    getToken = async() => {

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
    
        let token = await Notifications.getExpoPushTokenAsync();

        this.setState({
            token: token
        })

        if( this.state.token != "" ){
            this.setState({
                loadToken: false
            })
        }

        const param = {
            token: this.state.token
        }

        FirebaseHelper.update('/userNoti/hok', param)

    }

    sendMessage = () => {
        Keyboard.dismiss()

        let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: 'ExponentPushToken[47dZcMOyoO_tyD97iyunKN]',
                sound: 'default',
                title: 'ทดสอบ Notification',
                body: this.state.message
                
            })
        })

        console.log("========== Response ===========")
        console.log(response)

    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View>
                        <TouchableOpacity style={{backgroundColor: '#33bbff', marginTop: 10, height: 50, alignItems: 'center', justifyContent: 'center'}}
                            onPress={this.getToken}
                        >
                            <Text style={{textAlign: 'center'}}>
                                กดเพื่อรับ token
                            </Text>
                        </TouchableOpacity>
                        {
                            this.state.loadToken == true  ? <ActivityIndicator size="large" color="#0000ff" /> :
                            <Text style={{textAlign: 'center', marginTop: 40}}>
                                {this.state.token}
                            </Text>
                        }
                    </View>
                    {
                        this.state.token == "" ? <View></View> :
                        <View style={{marginTop: 20}}>
                            <TextInput 
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
                            </TouchableOpacity>
                        </View>
                    }
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