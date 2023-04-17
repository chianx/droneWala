import React, {useState} from 'react'; 
import Account from '../screens/companyAccount';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import JobDetails from '../screens/jobDetails'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Applicants from '../screens/applicants'
import Images from '../images/index' 
import Application from '../screens/application'
import { FontAwesome5 } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

export default function CompanyAccountStack({navigation}) {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(true)
    }
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen 
                name="My Account" 
                options = {{
                    headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={Images.profile}
                            style={{ height: 40, width: 40, borderRadius:40, marginRight:10, borderWidth:1, borderColor:'black'}}
                        />
                    </TouchableOpacity>
                    ),
                    headerShown:true,
                    headerRight: () => (
                        <TouchableOpacity onPress={handleClick}
                        style={{paddingRight:'11%'}}
                        >
                        <FontAwesome5 name="user-edit" size={19} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            >
            {props => <Account {...props} isClicked={isClicked} setIsClicked={setIsClicked} />}

            </Stack.Screen>
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
        </NavigationContainer>
    );
}