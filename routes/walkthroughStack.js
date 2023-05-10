import react from 'react';
import LoginStack from '../routes/loginStack';
import WalkThrough from '../screens/walthroughScreens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function WalkthroughStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Walk through" 
                component={WalkThrough}
            />
            <Stack.Screen 
                name="Login" 
                component={LoginStack}
            />
        </Stack.Navigator>
    );
}