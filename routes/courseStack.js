import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CourseDetails from '../screens/courseDetails';
import Learning from '../screens/learning'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Images from '../images/index'

const Stack = createNativeStackNavigator();

export default function CourseStack({navigation}) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen 
                name="Courses" 
                component={Learning}
                options = {{
                    headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={Images.profile}
                            style={{ height: 40, width: 40, borderRadius:40, marginRight:10, borderWidth:1, borderColor:'black'}}
                        />
                    </TouchableOpacity>
                ),
                }}
            />
            <Stack.Screen 
                name="Course Details" 
                component={CourseDetails}
            />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}