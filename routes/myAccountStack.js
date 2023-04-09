import React from 'react'; 
import Account from '../screens/companyAccount';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import JobDetails from '../screens/jobDetails'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Applicants from '../screens/applicants'
import Images from '../images/index' 
import Application from '../screens/application'

const Stack = createNativeStackNavigator();

export default function CompanyAccountStack({navigation}) {
    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen 
                name="My Account" 
                component={Account}
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
                name="Applicants" 
                component={Applicants}
            />
            
            <Stack.Screen 
                name="JobDetails" 
                component={JobDetails}
            />
            <Stack.Screen 
                name="Application" 
                component={Application}
            />

        </Stack.Navigator>
        // </NavigationContainer>
    );
}