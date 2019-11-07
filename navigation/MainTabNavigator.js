import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

//Page
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import BookingScreen from '../screens/BookingScreen';
import ItemScreen from '../screens/ItemScreen';

import Images from '../helper/imageHelper'
import { tsExportAssignment } from '@babel/types';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 5000,
  //     // easing: Easing.out(Easing.poly(4)),
  //     // timing: Animated.timing,
  //   },
  //   screenInterpolator: sceneProps => {
  //     const { layout, position, scene } = sceneProps;
  //     const { index } = scene;

  //     const height = layout.initHeight;
  //     const translateY = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [height, 0, 0],
  //     });

  //     const opacity = position.interpolate({
  //       inputRange: [index - 1, index - 0.99, index],
  //       outputRange: [0, 1, 1],
  //     });

  //     return { opacity, transform: [{ translateY }] };
  //   },
  // }),
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Item: ItemScreen,
    History: HistoryScreen
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
    //inactiveTintColor: ''
  },
  tabBarVisible: navigation.state.index == 0
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
    showLabel: true,
    activeTintColor: "#ff0000",
    //inactiveTintColor: "black"
  },
  tabBarVisible: navigation.state.index == 0
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
