import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

//Page
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import BookingScreen from '../screens/BookingScreen';
import ItemScreen from '../screens/ItemScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen';
import Home2Screen from '../screens/Home2Screen'

import Images from '../helper/imageHelper'
import { tsExportAssignment } from '@babel/types';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      isImage={false}
      name={'ios-home'}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#ff0000',
    //inactiveTintColor: "red"
  },
  tabBarVisible: false
})

HomeStack.path = '';

const AppStack = createStackNavigator(
  {
    Home2: Home2Screen,
    Item: ItemScreen,
    Booking: BookingScreen,
    History: HistoryScreen,
    HistoryDetail: HistoryDetailScreen,   
   
  },
  config
);

AppStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      isImage={false}
      name={'ios-home'}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#ff0000',
    //inactiveTintColor: "red"
  },
  tabBarVisible: false
})

AppStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AppStack,
});

tabNavigator.path = '';


export default createAppContainer(createSwitchNavigator(
  {
    App: tabNavigator,
  }
));

/* export default tabNavigator; */
