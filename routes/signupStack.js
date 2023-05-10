import react from 'react'; 
import Pilot from '../screens/dronePilot';
import PilotForm from '../pilotSignup/form'; 
import Signup from '../screens/signup'
import InstitutionForm from '../institutionForm/form';
import CompanyForm from '../companySignup/form';
import LoginStack from './loginStack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function SignupStack({loginNav, navigation}) {
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Signup" 
                component={Signup}  
            />
            <Stack.Screen 
                name="Pilot" 
                component={PilotForm}
                // initialParams={{loginNav: loginNav}}
            />
            <Stack.Screen 
                name="Company" 
                component={CompanyForm}
            />
            <Stack.Screen 
                name="Institute" 
                component={InstitutionForm}
            />
            <Stack.Screen 
                name="LoginStack" 
                component={LoginStack}
            />
        </Stack.Navigator>
        </NavigationContainer>
    );
}