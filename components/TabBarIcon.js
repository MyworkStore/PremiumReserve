import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View,
  Button,
  Alert,
  Text,
  SectionList,
  FlatList,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Images from '../helper/imageHelper';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {

  render() {

    if( this.props.isImage ){
      return(
        <View>
          <Image 
            source={this.props.name} 
            style={
              {
                width: 40, 
                height: 40, 
                marginBottom: -3,
              }
            }
            resizeMode='cover' 
          />
        </View>  
      );
    }else{
      return(
          <Ionicons
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            // color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            color={this.props.focused ? this.props.color : Colors.tabIconDefault}
          />
      );
    }

    // return (
    //   <Icon.Ionicons
    //     name={this.props.name}
    //     size={26}
    //     style={{ marginBottom: -3 }}
    //     color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    //   />
    // );
  }
}