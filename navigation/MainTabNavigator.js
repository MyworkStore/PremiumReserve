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

import Images from '../helper/imageHelper'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Item: ItemScreen,
    History: HistoryScreen,
    HistoryDetail: HistoryDetailScreen
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
    showLabel: false,
    activeTintColor: '#ff0000',
    //inactiveTintColor: "red"
  },
  //tabBarVisible: navigation.state.index == 0
})

HomeStack.path = '';

const BookingStack = createStackNavigator(
  {
    Booking: BookingScreen,
  },
  config
);

BookingStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Booking',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      isImage={false}
      name={'ios-book'}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    activeTintColor: "#ff0000",
    inactiveTintColor: "black"
  },
  tabBarVisible: navigation.state.index == 0
})

BookingStack.path = '';

//History
const HistoryStack = createStackNavigator(
  {      
    History: HistoryScreen,
    HistoryDetail: HistoryDetailScreen
  },
  config
);

HistoryStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'History',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      isImage={false}
      name={'ios-bookmarks'}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#ff0000',
    //inactiveTintColor: "red"
  },
  //tabBarVisible: navigation.state.index == 0
})

HistoryStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BookingStack,
  HistoryStack
});

tabNavigator.path = '';


export default createAppContainer(createSwitchNavigator(
  {
    App: tabNavigator,
  }
));

/* export default tabNavigator; */
