import React, {useState, useEffect} from 'react'; 
import FreelanceDetails from '../screens/freelanceDetails';
import FreelanceCompanies from '../screens/freelanceCompany';
import {TouchableOpacity, Image, Switch, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Images from '../images/index';
import FreelanceForm from '../freelanceForm/form';
import ChooseCategory from '../freelanceForm/choose';
import ViewBids from '../screens/viewBids';
import ViewProfile from '../screens/viewProfile';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Toast from 'react-native-root-toast';
import { db } from '../firebase/databaseConfig'
import { ref as dbRef, remove} from 'firebase/database'

const Stack = createNativeStackNavigator();

export default function FreelanceStack({navigation}) {
    const [userType, setUserType] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);

    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
    setIsClicked(true)
    } 

    const deleteFreelance = (id) => {
        ref = dbRef(db, `freelance/${id}`)
        remove(ref).then(() => {
            console.log('Freelance Deleted')
        })
    }

    const toggleSwitch = async(state) => {
        
        setIsEnabled(!isEnabled); 
        if(state) {
            await AsyncStorage.getItem("userData", (error, result) => {
                let user = JSON.parse(result);
                console.log("Subscribed to topic")
                var configFreelance = {
                    method:'post',
                    url: "https://iid.googleapis.com/iid/v1/" + user.fcmToken +  "/rel/topics/Freelance",
                    headers: {
                    Authorization: 
                        'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
                        'Content-Type': 'application/json',
                    },
                }
                axios(configFreelance).then(function (response) {
                    console.log(JSON.stringify(response));
                    Toast.show('Freelance Notification Enabled!', {
                        backgroundColor:'#fda172',
                        duration: Toast.durations.LONG,
                        position: -100,
                        shadow: true,
                        borderRadius: 100, 
                        animation: true,
                        opacity:1,
                        hideOnPress: false,
                        delay: 1000,
                    });
                    console.log("Subscribed to topic")
                }).catch(function (error) {
                    console.log(error);
                });
                });
        }else {
            await AsyncStorage.getItem("userData", (error, result) => {
                let user = JSON.parse(result);
                console.log("Unsubscribed to topic")
                var configFreelance = {
                    method:'post',
                    url: "https://iid.googleapis.com/iid/v1/" + user.fcmToken +  "/rel/topics/Freelance",
                    headers: {
                    Authorization: 
                        'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
                        'Content-Type': 'application/json',
                    },
                }
                axios(configFreelance).then(function (response) {
                    console.log(JSON.stringify(response));
                    Toast.show('Freelance Notification Disabled!', {
                        backgroundColor:'#fda172',
                        duration: Toast.durations.LONG,
                        position: -100,
                        shadow: true,
                        borderRadius: 100, 
                        animation: true,
                        opacity:1,
                        hideOnPress: false,
                        delay: 1000,
                    });
                    console.log("Unsubscribed to topic")
                }).catch(function (error) {
                    console.log(error);
                });
                });
        }
    }  

    const mount = async() => {
      const type = await AsyncStorage.getItem("userType");
      const jsonType = JSON.parse(type);
      setUserType(jsonType);
    }

    useEffect(() => {
        mount();
    }, [])

    return (
        // <NavigationContainer independent={true}>
        <Stack.Navigator
        >
            <Stack.Screen 
                name="Freelance Projects" 
                component={FreelanceCompanies}  
                options = {{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image
                                source={Images.profile}
                                style={{ height: 40, width: 40, borderRadius:40, marginRight:10, borderWidth:1, borderColor:'black'}}
                            />
                        </TouchableOpacity>
                    ),
                headerRight: () => (
                    <>
                    {userType === "company"?
                        <TouchableOpacity onPress={() => navigation.navigate("Post a Project")}>
                            <Ionicons name="add-circle-outline" size={35} color="black" />
                        </TouchableOpacity> 
                        : 
                        //show toggle notifications
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(state) => toggleSwitch(state)}
                            value={isEnabled}
                        />
                    }
                    </>
                )
                }}
            />
            <Stack.Screen 
                name="Freelance Details" 
                options={{
                    headerShown:true,
                    headerRight: () => (                    
                    <View style={{justifyContent: 'center'}}>
                        { userType === "company" ? 
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-between', position: 'absolute', right: '6%'}}>
                                <TouchableOpacity onPress={handleClick}
                                    style={{paddingRight:'11%'}}
                                >
                                    <Feather name="edit" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Edit 2")}
                                    style={{paddingRight:'11%', marginLeft: 8}}
                                >
                                    <MaterialIcons name="delete" size={24} color="black" /> 
                                </TouchableOpacity>
                            </View> 
                        : null }
                    </View> 
                  )
                  }} 
            >{props => <FreelanceDetails {...props} isClicked={isClicked} setIsClicked={setIsClicked}/>}</Stack.Screen>
            <Stack.Screen 
                name="Post a Project" 
                component={ChooseCategory}
            />
            <Stack.Screen 
                name="Freelance Form" 
                component={FreelanceForm}
            />
            <Stack.Screen 
                name="View Bids" 
                component={ViewBids}
            />
            <Stack.Screen 
                name="View Profile" 
                component={ViewProfile}
            />
        </Stack.Navigator>
        //</NavigationContainer>
    );
}