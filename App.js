import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WalkthroughStack from './routes/walkthroughStack'
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import LoginStack from './routes/loginStack';
import HomeDrawer from './routes/homeDrawer';
import SignupStack from './routes/signupStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// do not remove gesture handler (important)
// import 'react-native-gesture-handler';

export default function App() {

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
  const [login, setLogin] = useState(true);
  // AsyncStorage.setItem("login", ""+login)
  // AsyncStorage.setItem("userType", "pilot")
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
