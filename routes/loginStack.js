import react from 'react';
import Login from '../screens/login';
import SignupStack from './signupStack';
import HomeDrawer from './homeDrawer';
import CompanyHomeTab from './companyHomeTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginStack({navigation}) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="LoginScreen" 
                component={Login}
            />
            <Stack.Screen 
                name="SignupStack" 
                component={SignupStack}
            />
            <Stack.Screen 
                name="HomeDrawer" 
                component={HomeDrawer}
            />
            <Stack.Screen 
                name="CompanyHome" 
                component={CompanyHomeTab}
            />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}