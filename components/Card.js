import React from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    ImageBackground
  } from 'react-native';


export default class Card extends React.Component {

    render(){
        return (
            <View style={styles.cardContainer}>
                {this.props.children}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    
    cardContainer: {
        height: 80,
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#bfbfbf',
        
    }

  });