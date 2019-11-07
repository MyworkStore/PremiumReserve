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

import  OrderHistoryCard  from '../components/OrderHistoryCard';

export default class HistoryScreen extends React.Component {

  render() {
    return (
      <View>
        <ScrollView>
          <TouchableHighlight onPress={() =>  this.props.navigation.navigate("HistoryDetail",
        {  orderStatusMsg:'รอการ Upload TrueWallet',
          orderStatus:'U',
          productName:'กระติกโดราเอมอน',
          pic:'9000451.PNG',
          orderNo:'ORD123456789'
          })}>
            <OrderHistoryCard 
              orderStatusMsg={'รอการ Upload TrueWallet'}
              orderStatus ={'U'}
              productName={'กระติกโดราเอมอน'}
              pic={'9000451.PNG'}
              orderNo={'ORD123456789'}
            />
        </TouchableHighlight>
            <OrderHistoryCard
              orderStatusMsg={'รอรับจองจากร้านสาขา'}
              orderStatus ={'K'}
              productName={'กระติกโดราเอมอน'}
              pic={'9000451.PNG'}
              orderNo='ORD123456788'
            />
            <TouchableHighlight onPress={() =>  this.props.navigation.navigate("HistoryDetail")}>
            <OrderHistoryCard
              orderStatusMsg={'ส่งกลับแก้ไข'}
              orderStatus ={'R'}
              productName={'กระติกโดราเอมอน'}
              pic={'9000451.PNG'}
              orderNo='ORD123456787'
            />
            </TouchableHighlight>
          <TouchableHighlight onPress={() =>  this.props.navigation.navigate("HistoryDetail",
          {  orderStatusMsg:'รับจองเรียบร้อย',
          orderStatus:'C',
          productName:'กระติกโดราเอมอน',
          pic:'9000451.PNG',
          orderNo:'ORD123456786'
          }
          )}>
            <OrderHistoryCard
              orderStatusMsg={'รับจองเรียบร้อย'}
              orderStatus ={'C'}
              productName={'กระติกโดราเอมอน'}
              pic={'9000451.PNG'}
              orderNo='ORD123456786'
            />
            </TouchableHighlight>
        </ScrollView>
      </View>     
      );
}

}

HistoryScreen.navigationOptions = {
  title: 'ประวัติ',
  //headerLeft: null
  // header: null,
  // tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
      height: 105,
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 5
  },
  contentLayout: {
      flex: 8,
      padding: 5,
  },
  iconLayout: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
  }
});