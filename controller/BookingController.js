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
import { clear } from 'sisteransi';

export default class BookingController extends React.Component {

  constructor (props) {
    super(props);
    // this.state = {
    //   inputBorder: "#cccccc",
    //   itemName: "",
    //   itemCount: ""
    // };

  }

  booking(){
    this.props.navigation.navigate("home");
  }

//   render(){
//     return (
//       <View style={styles.container}>
//         <Text style={styles.labelText}>
//           ชื่อสินค้า :
//         </Text>
//         <TextInput
//           ref={'itemName'}
//           placeholder=""
//           style={{ height: 40, borderColor: this.state.inputBorder, borderWidth: 1, padding: 5 }}
//           // onFocus={ () => this.onFocus(this) }
//           // onBlur={ () => this.onBlur()}
//           autoCompleteType={'off'}
//           selectTextOnFocus={true}
//           defaultValue={this.state.itemName}
//           // autoFocus={true}
//           // autoCapitalize={'characters'} //all characters.
//           // autoCapitalize={'words'} //first letter of each word.
//           // autoCapitalize={'sentences'} //first letter of each sentence (default).
//           // autoCapitalize={'none'} //don't auto capitalize anything.
//         />
//         <Text style={styles.labelText}>
//           จำนวน :
//         </Text>
//         <TextInput
//           ref={'itemCount'}
//           placeholder="0"
//           style={{ height: 40, borderColor: this.state.inputBorder, borderWidth: 1, padding: 5 }}
//           // onFocus={ () => this.onFocus(this) }
//           // onBlur={ () => this.onBlur()}
//           defaultValue={this.state.itemCount}
//           keyboardType={'numeric'}
//           selectTextOnFocus={true}
//           // value={}
//         />
//         <View style={styles.buttonPanel}>
//           <View style={styles.actionButton}>
//             <Button
//               title="บันทึก"
//               onPress={() => Alert.alert('Right button pressed')}
//             />
//           </View>
//           <View style={styles.actionButton}>
//             <Button
//               title="ยกเลิก"
//               onPress={() => this.clearText()}
//               color={'red'}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }

}