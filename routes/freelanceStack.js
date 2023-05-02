import React, {useState, useEffect} from 'react'; 
import FreelanceDetails from '../screens/freelanceDetails';
import FreelanceCompanies from '../screens/freelanceCompany';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import JobDetails from '../screens/jobDetails'
import Apply from '../screens/apply';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Applicants from '../screens/applicants';
import Images from '../images/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function FreelanceStack({navigation}) {
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
                name="Freelance Projects" 
                component={FreelanceCompanies}  
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
                        <TouchableOpacity onPress={() => navigation.navigate("Freelance Form")}>
                            <Ionicons name="add-circle-outline" size={35} color="black" />
                        </TouchableOpacity> : <></>
                    }
                    </>
                )
                }}
            />
            <Stack.Screen 
                name="Freelance Details" 
                component={FreelanceDetails}
            />
            
        </Stack.Navigator>
        //</NavigationContainer>
    );
}