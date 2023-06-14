import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../screens/notifications';

const Stack = createNativeStackNavigator();

export default function NotificationStack({navigation}) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Notifications" 
                component={Notifications}
            />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}