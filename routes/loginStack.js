import react from 'react';
import Login from '../screens/login';
import SignupStack from './signupStack';
import HomeDrawer from './homeDrawer';
import CompanyHomeTab from './companyHomeTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginStack({navigations}) {
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Login" 
                component={Login}
            />
            <Stack.Screen 
                name="Signup" 
                component={SignupStack}
            />
            <Stack.Screen 
                name="Home" 
                component={HomeDrawer}
            />
            <Stack.Screen 
                name="CompanyHome" 
                component={CompanyHomeTab}
            />
        </Stack.Navigator>
        </NavigationContainer>
    );
}