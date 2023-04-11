import react from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import JobStack from '../routes/jobStack'
import Images from '../images/index';
// import CreatePost from '../screens/createPost'
import JobForm from '../jobForm/jobForm'
import CompanyAccountStack from './myAccountStack'
import CompanyAccount from '../screens/companyAccount'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function CompanyHomeTab({navigation}) {
  
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
             else if (route.name === 'JobsStack') {
              iconName = focused ? 'ios-briefcase-sharp' : 'ios-briefcase-outline';
            }
             else if (route.name === 'CompanyAccountStack') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ed7117',
          tabBarInactiveTintColor: 'gray',
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
          //     <Image
          //       source={Images.profile}
          //       style={{ height: 40, width: 40, borderRadius:40, marginLeft:10, borderWidth:1, borderColor:'black'}}
          //     />
          //   </TouchableOpacity>
          // )
        })}
      >
        <Tab.Screen name="Home" component={Home}
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
        <Tab.Screen name="JobsStack" component={JobStack} 
          // options={{
          //   headerRight: () => (
          //   <TouchableOpacity onPress={() => {
          //     navigation.navigate("JobsPage");
          //     console.log(navigation.getParent());
          //   }}
          //     style={{paddingRight:'11%'}}
          //   >
          //     <Ionicons name="arrow-back" size={24} color="black" />
          //   </TouchableOpacity>
          // )
          // }} 
        />
        <Tab.Screen name="Create Post" component={JobForm} 
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
        <Tab.Screen name="CompanyAccountStack" component={CompanyAccountStack} 
          
          
        />
      </Tab.Navigator>
      //</NavigationContainer>
  );
}