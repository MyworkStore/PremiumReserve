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
        //borderWidth: 1,
        //borderColor: '#8c8c8c',
        borderRadius: 10,
        elevation: 3,
        marginVertical: 5,
        //backgroundColor: '#f2f2f2'
    }

  });