import React from 'react';
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

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation }) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="home" //Pehle bane
                component={Home} //To
                options={{
                    headerTitle: () => <Text style={{ fontSize: 26, color: 'grey', fontWeight: 'bold' }}>Drone<Text style={{ fontWeight: 'bold', fontSize: 26, color: 'coral' }}>Walas</Text></Text>,
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
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15 }} onPress={() => navigation.navigate("home")}>
                            <Ionicons name="arrow-back" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15 }} onPress={() => navigation.navigate("home")}>
                            <Ionicons name="arrow-back" size={26} color="black" />
                        </TouchableOpacity>
                    ),
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