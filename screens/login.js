import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import {FirebaseAuthApplicationVerifier, FirebaseRecaptcha, FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {firebaseConfig} from '../firebase/firebase'
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPTextView from 'react-native-otp-textinput';
import PhoneInput from "react-native-phone-number-input";
import Images from '../images';
import { BackHandler } from 'react-native';
import { db } from '../firebase/databaseConfig'
import { ref, child, get } from 'firebase/database';
import Toast from 'react-native-root-toast';

export default function Login( {navigation} ) {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [allowSend, setAllowSend] = useState(false);
  const otpRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)


  const sendVerification = async() => {
    
    if(allowSend) {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
      setPhoneNumber('');    
      setShowOTP(true);
      console.log(verificationId);
    }
  };

  const getUserData = async(uid) => {
    console.log(uid);
    return get(child(ref(db), "users/" + uid)).then(async (userSnap) => {
      if(userSnap.exists()) {
        var user = userSnap.val()
        console.log(user);
        await AsyncStorage.setItem("userData", JSON.stringify(user));
        await AsyncStorage.setItem("userType", JSON.stringify(user.userType));
        setIsLoading(false);  
        navigation.navigate("HomeDrawer");
      }else {
        console.log("No user found!!!");
        navigation.navigate("SignupStack");
        Toast.show('New User detected', {
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          animation: true,
          opacity:1,
          hideOnPress: false,
          delay: 2000,
        });
      }
    }).catch((error) => {
      console.error("Error while fetching user data ");
    })
  }

  const confirmCode =() => {
    setIsLoading(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase.auth().signInWithCredential(credential)
    .then( async(res)=> {
      console.log(res);
      const isNewUser = res.additionalUserInfo.isNewUser;
      const userId = res.user.uid;
      const phoneNum = res.user.phoneNumber;
      console.log("Pno: "+phoneNum+" user: "+userId+" isnew: "+isNewUser);
      if(isNewUser) { 
        setIsLoading(false);
        await AsyncStorage.setItem("PhoneNum", phoneNum);
        navigation.navigate("SignupStack");
        Toast.show('New User detected', {
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          animation: true,
          opacity:1,
          hideOnPress: false,
          delay: 2000,
        });
      }else {
        getUserData(userId)
        Toast.show('Welcome to DronesWala', {
          backgroundColor:'#fda172',
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          animation: true,
          opacity:1,
          hideOnPress: false,
          delay: 3000,
        });
        await AsyncStorage.setItem("login", "true");
      }
    })
    .catch((error) => {
      console.log("ERROR!!!: " + error);
      setCode('');
      Alert.alert("Invalid Verification Code", "Please try again or choose a different phone number", [{text:'Ok'}]);
      setIsLoading(false);
      return;
    })
  }

  const handleBackButton = () => {
    // Prevent default action (navigating back)
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Return a cleanup function (optional)
    return () => {
      // Code to be executed when component unmounts
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);


  return (
    <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig} 
        />
        
        {/* Logo */}
        <View style={{marginBottom:0, marginTop:60}}>
            <Text style={{fontSize:30, color:'grey', fontWeight:'bold'}}>Drones<Text style={{fontWeight:'bold', fontSize:30, color:'coral'}}>Wala</Text></Text>
        </View>

        <Image style={{width:'100%', height:240}} source={Images.droneDelivery} />

        <View style={styles.divider}>
          <View style={[styles.dividerView, {marginRight:20, marginLeft:20}]}></View>
          <Text style={styles.dividerText}>Login or Sign up</Text>
          <View style={[styles.dividerView, {marginRight:20, marginLeft:20}]}></View>
        </View>
        {!showOTP ? 
        <View style={{width:'100%', alignItems:'center'}}> 
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          onChangeFormattedText={(text) => {
            setPhoneNumber(text);
            if(text.trim().length === 13) {
              setAllowSend(true);
            }else setAllowSend(false);
          }}
          withShadow
          autoFocus
          containerStyle={{marginTop:25, width:'88%'}}
        />
        <TouchableOpacity disabled={!allowSend} style={{backgroundColor:'coral', elevation:5, opacity: allowSend? 1:0.7, justifyContent:'center', borderRadius:10, width:'88%', height:40, marginVertical:20}} 
          onPress={sendVerification}>
          <Text style={{color:'white', textAlign:'center', fontSize:16}}>
            Send verification
          </Text>
        </TouchableOpacity>
        </View> : 
        isLoading? <View style={{position:'absolute', width:'100%', height:'100%', top:0, backgroundColor: '#e0e0e0aa', flex:1, justifyContent:'center', }}><ActivityIndicator size="large" color="coral" /></View> :
        <View style={{width:'100%', alignItems:'center', marginTop:15}}>
          <OTPTextView
            handleTextChange={setCode}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            autoFocus
          />
          <TouchableOpacity style={{backgroundColor:'coral', justifyContent:'center', borderRadius:10, width:'88%', height:40, marginBottom:15}} 
            onPress={confirmCode}>
            <Text style={{color:'white', textAlign:'center', fontSize:16}}>
              Confirm Code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowOTP(false)}><Text style={{color:'grey'}}>Change Phone Number</Text></TouchableOpacity>
        </View> 
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2.5,
    width:40,
    height:40,
    fontSize:16
  },
  divider: {
    flexDirection:'row',
    width:'100%',
    marginTop: '4%',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  dividerView: {
    height:1,
    backgroundColor:'#8e8e8e',
    width:'25%',
    opacity: 0.5
  },
  dividerText: {
    fontSize: 16,
    color:'#8e8e8e'
  },
  mobile: {
    borderWidth:1,
    borderRadius:10,
    height:45,
    borderColor:'#8e8e8e',
    marginTop:20,
    width:'90%',
    padding:10,
    alignSelf:'center'
  }
});
