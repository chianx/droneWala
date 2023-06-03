import {React, useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CourseDetails from '../screens/courseDetails';
import Learning from '../screens/learning'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChooseCategory from '../freelanceForm/choose';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Images from '../images/index'
import Home from '../screens/home'
import JobForm from '../jobForm/JobForm';
import Notifications from '../screens/notifications';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import JobDetails from '../screens/jobDetails';
import JobStack from './jobStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { db } from '../firebase/databaseConfig'
import { ref as dbRef, remove} from 'firebase/database'

const Stack = createNativeStackNavigator();

const deleteJob = (id) => {
    ref = dbRef(db, `jobs/${id}`)
    remove(ref).then(() => {
        console.log('Job Deleted')
    })
}

export default function HomeStack({ navigation }) {
    const [userType, setUserType] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
    setIsClicked(true)
    } 
    const mount = async() => {
        const type = await AsyncStorage.getItem("userType");
        const jsonType = JSON.parse(type);
        setUserType(jsonType);
      }
  
      useEffect(() => {
          mount();
      }, [])
    console.log("In homeStack");
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="home"
                component={Home} 
                options={{
                    headerTitle: () => <Text style={{ fontSize: 26, color: 'grey', fontWeight: 'bold' }}>Drones<Text style={{ fontWeight: 'bold', fontSize: 26, color: 'coral' }}>Wala</Text></Text>,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image
                                source={Images.profile}
                                style={{ height: 40, width: 40, borderRadius: 40, marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                            <Ionicons name="notifications" size={24} color="grey" />
                        </TouchableOpacity>
                    )
                }}
            />

            <Stack.Screen
                name="Courses" //Pehle bane
                component={Learning} //To
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image
                                source={Images.profile}
                                style={{ height: 40, width: 40, borderRadius: 40, marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Course Details"
                component={CourseDetails}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Job Post"
                component={JobForm}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Freelance Post"
                component={ChooseCategory}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Job Details" 
                options={{
                    headerShown:true,
                    headerRight: () => (                    
                    <View style={{justifyContent: 'center'}}>
                        { userType === "company" ? 
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-between', position: 'absolute', right: '6%'}}>
                                <TouchableOpacity onPress={handleClick}
                                    style={{paddingRight:'11%'}}
                                >
                                    <Feather name="edit" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Edit 2")}
                                    style={{paddingRight:'11%', marginLeft: 8}}
                                >
                                    <MaterialIcons name="delete" size={24} color="black" /> 
                                </TouchableOpacity>
                            </View> 
                        : null }
                    </View> 
                  )
                  }} 
            >{props => <JobDetails {...props} isClicked={isClicked} setIsClicked={setIsClicked}/>}</Stack.Screen>
            <Stack.Screen
                name="Jobstack"
                component={JobStack}
                options={{
                    headerShown: true,
                }}
            />
            

        </Stack.Navigator>
        // </NavigationContainer> 
    );
}


// notifications //
// course details
// job det
// freelance list
// jobs list
// my acc
// comp acc
// course list