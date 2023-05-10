import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WalkthroughStack from './routes/walkthroughStack'
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import LoginStack from './routes/loginStack';
import HomeDrawer from './routes/homeDrawer';
import SignupStack from './routes/signupStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
// import * as Notifications from 'expo-notifications';
// do not remove gesture handler (important)
// import 'react-native-gesture-handler';

export default function App() {
  const [login, setLogin] = useState(false);
  useEffect( () => {

    messaging().onNotificationOpenedApp( async (remoteMessage) => {
      console.log('Notification recieved', remoteMessage.notification);
    })

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message Handles in th background!', remoteMessage);
    })

    messaging().onMessage(async (remoteMessage) => {
      // const content = {
      //   title: 'My Notification',
      //   body: 'This is a local notification',
      //   data: { customData: 'Optional custom data' },
      // };
    
      // const trigger = {
      //   seconds: 5, // Trigger the notification after 5 seconds (you can use other options like 'minutes', 'hours', etc.)
      // };
    
      // await Notifications.scheduleNotificationAsync({
      //   content,
      //   trigger,
      // });
      console.log('FCM Message Data:', remoteMessage);
      // Handle the received message data here
    });

    const getData = async() => {
      const loginStatus = await AsyncStorage.getItem("login");
      console.log("here",loginStatus);
      if(loginStatus === "true") {
        setLogin(true);
      }else {
        setLogin(false);
      }
    }
    getData();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled) {
        console.log('AUthorization Status: ', authStatus);
        messaging().getToken().then(token => {
            console.log(token);
        })
    }else {
        console.log("Failed token generation");
    }
  }

  // requestUserPermission();
  if (login)
  return (
    <NavigationContainer>
      <HomeDrawer />
    </NavigationContainer>
    // <View style={styles.container}>
    // <JobForm />
    // </View> 
  );
  else return (
    <NavigationContainer>
      <WalkthroughStack />
      {/* <SignupStack /> */}

      {/* <LoginStack /> */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
