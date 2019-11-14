import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

//Page
import HomeScreen from '../screens/HomeScreen';
import Home2Screen from '../screens/Home2Screen';
import HistoryScreen from '../screens/HistoryScreen';
import BookingScreen from '../screens/BookingScreen';
import ItemScreen from '../screens/ItemScreen';

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
    Home2: Home2Screen
  },
  config
);

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      isImage={true}
      name={Images.iconHome}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#000000',
    inactiveTintColor: "red"
  },
  tabBarVisible: navigation.state.index > 10
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
  tabBarVisible: navigation.state.index > 10
})

BookingStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BookingStack
});

tabNavigator.path = '';

export default createAppContainer(createSwitchNavigator(
  {
    App: tabNavigator,
  }
));

/* export default tabNavigator; */
