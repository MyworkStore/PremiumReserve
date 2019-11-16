import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';

//alert - install
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert'; 

//star-rating - install
import StarRating from 'react-native-star-rating';
//text input - install
import { TextInput } from 'react-native-paper';
//button - install
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import FirebaseHelper from '../helper/FireBaseHelper'
export default class ReviewScreen extends React.Component {
  state = {
    text: '',
    name: '',
    outlinedText: '',
    show: false,   
    userId: '',   
    orderNo: '',    
  };

  //alert open
  handleOpen = () => {
    
    if(this.state.starCount>0){
  
      if(this.state.outlinedText != null && this.state.outlinedText !=''){
        
      }else{
        this.setState({ outlinedText: 'None' })
      }
      let review = {
        userId: this.state.userId,
        star_count : this.state.starCount ,
        memo : this.state.outlinedText,
        orderNo : this.state.orderNo
      }
      
      FirebaseHelper.writeUserData("user_review/", this.state.userId + "-" + this.state.orderNo + "/", review)
      // FirebaseHelper.writeUserData("user_review/", "user-Test-0005/", review)
          .then(() => {
            this.props.navigation.navigate("HistoryDetail",
            {
              orderDetail:this.props.navigation.getParam('orderDetail', 'NO-OrderNo'),
              userid:this.state.userId            
            } //go to e-slip
            )
          })

    }else{
      this.setState({ show: true })
    }
  }

  //alert close
  handleClose = () => {
    this.setState({ show: false })
  }

  _isUsernameValid = () => /^[a-zA-Z]*$/.test(this.state.name);

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //console.log(navigation.getParam('orderNo', 'NO-OrderNo'));
    //console.log(navigation.getParam('userid', 'NO-UserId'));
    this.state = {
      starCount: 0,   
      orderNo: navigation.getParam('orderNo', 'NO-OrderNo'),      
      userId:  navigation.getParam('userid', 'NO-UserId')   
    };  
  }
  componentDidMount()
  {
    const { navigation } = this.props;
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //console.log(navigation.getParam('orderNo', 'NO-OrderNo'));
    //console.log(navigation.getParam('userid', 'NO-UserId'));
    this.state = {
      starCount: 0,   
      orderNo: navigation.getParam('orderNo', 'NO-OrderNo'),      
      userId:  navigation.getParam('userid', 'NO-UserId')   
    };  
  }
  componentWillReceiveProps(nextProps){ 
    const { navigation } = this.props;
    this.state = {
      starCount: 0,   
      orderNo: navigation.getParam('orderNo', 'NO-OrderNo'),      
      userId:  navigation.getParam('userid', 'NO-UserId')   
    };  
}

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}>
        <ScrollView
          style={[styles.container, { backgroundColor: '#4DA8D4'}]}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
        <View style={{alignItems:'center', backgroundColor: '#4DA8D4'}}>
          <Text style={{fontSize: 20,color:'#FFFFFF'}}>ความพึงพอใจการจองสินค้า Premium</Text>
          <Text style={{fontSize: 20}}></Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={'#FFCD00'}/>
        </View>

        <Text style={{fontSize: 30}}></Text>
        <TextInput
          mode="outlined"
          style={{styles:styles.inputContainerStyle,fontSize:20}}
          label="ข้อเสนอแนะ"
          placeholder="ข้อเสนอแนะ..."
          value={this.state.outlinedText}
          defaultValue={{ outlinedText : 'Non' }}
          onChangeText={outlinedText => this.setState({ outlinedText })}
        />
       
        <Text style={{fontSize: 30}}></Text>
        <View style={{alignItems:'center'}}>
        <AwesomeButtonRick 
        type="primary"
        backgroundColor='red'
        textColor = '#FFFFFF'
        backgroundDarker = '#F5B7B1'
        onPress={this.handleOpen} 
        >                  บันทึก                  </AwesomeButtonRick>
        <SCLAlert
          theme="info"
          show={this.state.show}
          title="Notification"
          subtitle="กรุณากรอกคะแนนความพึงพอใจของการจองสินค้า Premium เพื่อดูข้อมูล E-Slip"
          onRequestClose = {this.handleClose}
        >
          <SCLAlertButton theme="info" onPress={this.handleClose}>OK</SCLAlertButton>
        </SCLAlert>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      
    );
  }

}

ReviewScreen.navigationOptions =  {
  title: 'Review',
  headerTitleStyle: { flex: 1, textAlign: 'center'}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
  button: {
    margin: 8,
  },
});