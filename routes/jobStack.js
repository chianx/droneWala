import react from 'react'; 
import Jobs from '../screens/jobs';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import JobDetails from '../screens/jobDetails'
import Apply from '../screens/apply';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Applicants from '../screens/applicants'
import Images from '../images/index'

const Stack = createNativeStackNavigator();

export default function JobStack({navigation}) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
            
        >
            <Stack.Screen 
                name="Jobs" 
                component={Jobs}  
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
                name="JobDetails" 
                component={JobDetails}
            />
            <Stack.Screen 
                name="Apply" 
                component={Apply}
            />
            <Stack.Screen 
                name="Applicants" 
                component={Applicants}
            />
            
        </Stack.Navigator>
        //</NavigationContainer>
    );
}