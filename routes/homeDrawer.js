import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeTabs from './homeTabs';
import CompanyHomeTab from './companyHomeTabs';
import About from '../screens/about'
import Contact from '../screens/contact'
import CustomDrawer from './customDrawer'
import LoginStack from './loginStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function HomeDrawer({navigation}) {
    const [userType, setUserType] = useState("");
    const mount = async() => {
      const userdata = await AsyncStorage.getItem("userData");
      console.log("In home drawer")
      const val = JSON.parse(userdata)
      console.log(userdata)
      console.log(userdata)
      setUserType(val.userType);
    }
    useEffect(() => {
      mount();
      
    }, [userType]);
    
    console.log("userType in homeDrawer = " + userType);
    return (
      // <NavigationContainer independent={true}>
        <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown : false, 
           
            drawerActiveBackgroundColor:'#fda172',
            drawerActiveTintColor:'white',
            drawerInactiveTintColor:'#333',
            drawerLabelStyle:{ marginLeft:-25, fontSize:15}
          }} 
           drawerContent={(prop) => <CustomDrawer prop={prop} navigation= {navigation}/>}
        >
          <Drawer.Screen name="Home" component= {userType === "company"? CompanyHomeTab: HomeTabs}
            initialParams = {{navigation: navigation}}
            options={{drawerIcon: ({color}) => 
              <Ionicons name="home-outline" size={22} color={color}/>}}
            />
          <Drawer.Screen name="About" component={About} 
            options={{drawerIcon: ({color}) => 
              <Ionicons name="information-circle-outline" size={22} color={color}/>}}
          />
          <Drawer.Screen name="Contact" component={Contact} 
            options={{drawerIcon: ({color}) => 
              <Ionicons name="ios-call-outline" size={22} color={color}/>}}
          />
          <Drawer.Screen name="Login" component={LoginStack} 
            options={{
              drawerItemStyle: {height:0},
              swipeEdgeWidth: 0,
            }}
          />

        </Drawer.Navigator>
      // </NavigationContainer>
    );
  }
