import react from 'react'; 
import Jobs from '../screens/jobs';
import JobDetails from '../screens/jobDetails'
import Apply from '../screens/apply';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function JobStack({navigation}) {
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Jobs" 
                component={Jobs}  
            />
            <Stack.Screen 
                name="JobDetails" 
                component={JobDetails}
            />
            <Stack.Screen 
                name="Apply" 
                component={Apply}
            />
            
        </Stack.Navigator>
        </NavigationContainer>
    );
}