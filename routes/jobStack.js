import React, {useEffect, useState} from 'react'; 
import Jobs from '../screens/jobs';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import JobDetails from '../screens/jobDetails'
import Apply from '../screens/apply';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Applicants from '../screens/applicants'
import Images from '../images/index'
import Application from '../screens/application';
import JobForm from '../jobForm/JobForm'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function JobStack({navigation}) {
    const [userType, setUserType] = useState("");
  
    const mount = async() => {
      const type = await AsyncStorage.getItem("userType");
      const jsonType = JSON.parse(type);
      setUserType(jsonType);
    }

    useEffect(() => {
        mount();
    }, [])

    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            
        >
            <Stack.Screen 
                name="Jobs" 
                component={Jobs}  
                options = {{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={Images.profile}
                            style={{ height: 40, width: 40, borderRadius:40, marginRight:10, borderWidth:1, borderColor:'black'}}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <>
                    {userType === "company"?
                        <TouchableOpacity onPress={() => navigation.navigate("Post a Job")}>
                            <Ionicons name="add-circle-outline" size={35} color="black" />
                        </TouchableOpacity> : <></>
                    }
                    </>
                )
                }}
            />
            <Stack.Screen 
                name="Job Details" 
                component={JobDetails}
            />
            <Stack.Screen 
                name="Post a Job" 
                component={JobForm}
            />
            <Stack.Screen 
                name="Apply" 
                component={Apply}
            />
            <Stack.Screen 
                name="Application" 
                component={Application}
            />
            <Stack.Screen 
                name="Applicants" 
                component={Applicants}
            />
            
        </Stack.Navigator>
        //</NavigationContainer>
    );
}