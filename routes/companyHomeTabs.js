import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import Images from '../images/index';
import JobForm from '../jobForm/JobForm'
import CompanyAccountStack from './myAccountStack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JobDetails from '../screens/jobDetails';
import FreelanceCompanies from '../screens/freelanceCompany';
import JobsCompany from '../screens/jobsCompany';

const Tab = createBottomTabNavigator();

export default function CompanyHomeTab({navigation}) {
  const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(true)
    }
  return (
    // <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Create Post') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
             else if (route.name === 'My Jobs') {
              iconName = focused ? 'ios-briefcase-sharp' : 'ios-briefcase-outline';
            }
             else if (route.name === 'My Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } 
             else if (route.name === 'My Projects') {
              return focused? <MaterialCommunityIcons name="handshake" size={size+1} color={color} />
               : <MaterialCommunityIcons name="handshake-outline" size={size} color={color} />;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ed7117',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}
          options ={{
            headerShown:true,
            headerTitle: () => <Text style={{ fontSize: 26, color: 'grey', fontWeight: 'bold' }}>Drone<Text style={{ fontWeight: 'bold', fontSize: 26, color: 'coral' }}>Walas</Text></Text> ,
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
        <Tab.Screen name="My Jobs" component={JobsCompany} 
          options ={{
            headerShown:true,
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
        <Tab.Screen name="My Projects" component={FreelanceCompanies} 
          options ={{
            headerShown:true,
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Images.profile}
                style={{ height: 40, width: 40, borderRadius:40, marginLeft:10, borderWidth:1, borderColor:'black'}}
              />
            </TouchableOpacity>
          ),
            headerRight: () => (
            <TouchableOpacity style={{marginRight:20}} onPress={() => navigation.navigate("Freelance Form")}>
              <Ionicons name="add-circle-outline" size={35} color="black" />
              
            </TouchableOpacity>
          )
          }}
        />
        <Tab.Screen name="My Account" component={CompanyAccountStack} />
        
        <Tab.Screen name="Job Details" component={JobDetails} 
          options={{
            headerShown:true,
            tabBarButton: () => null,
            tabBarVisible: false,
            headerLeft: () => (
            <TouchableOpacity style={{paddingLeft:15, paddingRight:15}} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
          )
          }}
        />
        
        
      </Tab.Navigator>
      //</NavigationContainer>
  );
}