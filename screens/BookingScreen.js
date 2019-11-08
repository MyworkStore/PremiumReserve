import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Button
} from 'react-native';

import Images from '../helper/imageHelper'
import Constants from 'expo-constants';

export default class BookingScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'ประวัติ',
  //   header: null,
  //   tabBarVisible: false,
  //   tabBarLabel: null,
  //   tabBarIcon: null,
  //  };

  constructor (props) {
    super(props);
    this.state = {
      inputBorder: "#cccccc",
      itemName: "",
      itemCount: ""
    };

    // this.textInput = React.createRef();
  }

  onFocus() {
    this.setState({
      inputBorder: '#668cff'
    })
  }

  clearText() {
    this.refs.itemName.clear();
    this.refs.itemCount.clear();
    this.refs.param.clear();
  }

  // onBlur(element) {
  //   this.setState({
  //     inputBorder: '#000000'
  //   })
  // }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.imagePanel}>
          <View style={styles.imageGrid}>
            <Image 
              source={Images.productTest} 
              style={
                {
                  width: '100%',
                  height: '100%',
                }
              }
              resizeMode='contain' 
            />
          </View>
        </View>
        <View style={styles.formPanel}>
          <Text style={styles.labelText}>
            ชื่อสินค้า :
          </Text>
          <TextInput
            ref={'itemName'}
            placeholder=""
            style={{ height: 40, borderColor: this.state.inputBorder, borderWidth: 1, padding: 5 }}
            autoCompleteType={'off'}
            selectTextOnFocus={true}
            defaultValue={this.state.itemName}
          />
          <Text style={styles.labelText}>
            จำนวน :
          </Text>
          <TextInput
            ref={'itemCount'}
            placeholder="0"
            style={{ height: 40, borderColor: this.state.inputBorder, borderWidth: 1, padding: 5 }}
            // onFocus={ () => this.onFocus(this) }
            // onBlur={ () => this.onBlur()}
            defaultValue={this.state.itemCount}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
            // value={}
          />
          <Text>
            Param จากหน้าอื่น
          </Text>
          <TextInput
            ref={'param'}
            placeholder=""
            style={{ height: 40, borderColor: this.state.inputBorder, borderWidth: 1, padding: 5 }}
            autoCompleteType={'off'}
            selectTextOnFocus={false}
            defaultValue={JSON.stringify(this.props.navigation.getParam('productCode', 'NO PARAM'))}
          />
          <View style={styles.buttonPanel}>
            <View style={styles.actionButton}>
              <Button
                title="บันทึก"
                onPress={() => Alert.alert('Right button pressed')}
              />
            </View>
            <View style={styles.actionButton}>
              <Button
                title="ยกเลิก"
                onPress={() => this.clearText()}
                color={'red'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

}

BookingScreen.navigationOptions = {
  title: 'จองสินค้า',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: Constants.statusBarHeight+5,
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  labelText: {
    fontSize: 18
  },
  buttonPanel: {
    marginVertical: 10,
    flexDirection: 'row',
    marginEnd: 5
  },
  actionButton: {
    marginEnd: 5,
    // marginVertical: 5
  },
  imagePanel: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGrid: {
    width: '85%',
    height: '85%',
    borderColor: '#000000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  formPanel: {
    flex: 1
  }
});
