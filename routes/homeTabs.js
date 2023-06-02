import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import FreelanceStack from './freelanceStack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import CourseStack from './courseStack';
import JobStack from '../routes/jobStack'
import Account from '../screens/account';
import Images from '../images/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CourseDetails from '../screens/courseDetails';
import JobDetails from '../screens/jobDetails';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Notifications from '../screens/notifications';
import HomeStack from './homeStack'; 

const Tab = createBottomTabNavigator();

export default function HomeTab({navigation}) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true)
  } 
  
  return (
    //<NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Learnings') {
              iconName = focused ? 'ios-school' : 'ios-school-outline';
            }
             else if (route.name === 'Jobs') {
              iconName = focused ? 'ios-briefcase-sharp' : 'ios-briefcase-outline';
            }
             else if (route.name === 'My Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } 
              else if (route.name === 'Freelance') {
                return focused? <MaterialCommunityIcons name="handshake" size={size+1} color={color} />
               : <MaterialCommunityIcons name="handshake-outline" size={size} color={color} />;
              }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown:false,
          tabBarActiveTintColor: '#ed7117',
          tabBarInactiveTintColor: 'gray',
          
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} 
          options ={{
            headerShown: false,
            headerTitle: () => <Text style={{ fontSize: 26, color: 'grey', fontWeight: 'bold' }}>Drones<Text style={{ fontWeight: 'bold', fontSize: 26, color: 'coral' }}>Wala</Text></Text> ,
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.profile}
                style={{ height: 40, width: 40, borderRadius:40, marginLeft:10, borderWidth:1, borderColor:'black'}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
              <TouchableOpacity style={{marginRight:'10%'}} onPress={() => navigation.navigate("Notifications")}>
                <Ionicons name="notifications" size={24} color="grey" />
              </TouchableOpacity>
            )
          }}
        />
        <Tab.Screen name="Jobs" component={JobStack} />

        <Tab.Screen name="Freelance" component={FreelanceStack} />

        <Tab.Screen name="Learnings" component={CourseStack} 
          options ={{
            headerShown:false,
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.profile}
                style={{ height: 40, width: 40, borderRadius:40, marginLeft:10, borderWidth:1, borderColor:'black'}}
              />
            </TouchableOpacity>
          )
          }}
        />
        <Tab.Screen name="My Account" 
          options={{
            headerShown:true,
            headerRight: () => (
            <TouchableOpacity onPress={handleClick}
              style={{paddingRight:'11%'}}
            >
              <FontAwesome5 name="user-edit" size={19} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.profile}
                style={{ height: 40, width: 40, borderRadius:40, marginLeft:10, borderWidth:1, borderColor:'black'}}
              />
            </TouchableOpacity>
          )
          }} 
        >{props => <Account {...props} isClicked={isClicked} setIsClicked={setIsClicked}/>}
        </Tab.Screen>
        

        
      </Tab.Navigator>
      // </NavigationContainer>
  );
}