import React, {useState, useEffect} from 'react'
import {View, Text, ImageBackground, Image,Share, Alert, TouchableOpacity} from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Images from '../images/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfileModal from '../screens/editProfile';
import EditProfileModalComp from '../screens/editProfileComp';

const CustomDrawer = ({prop, navigation}) => {
    const [userType, setUserType] = useState("");
    const [user, setUser] = useState({});
    const mount = async() => {
      const userdata = await AsyncStorage.getItem("userData");
      const val = JSON.parse(userdata);
      setUser(val);
      setUserType(val.userType);
      
    }
    useEffect(() => {
      mount();
    }, []);

    const [launch , setLaunch] = useState(false)
    const signout =() => {
        AsyncStorage.setItem("login", "false");
        AsyncStorage.setItem("userData", "");
        AsyncStorage.setItem("userType", "");
        AsyncStorage.setItem("userId", "");
        
        prop.navigation.navigate("Login")
    }
    const myCustomShare = async () => {
        try {
            const result = await Share.share({
            message:
                'Hey, I have been using DroneWalas powerful to bag amazing high paying projects and jobs of Drone Pilots. Join their community now! \n\n PLAYSTORE_LINK',
            });
            if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log(result.activityType)
            } else {
                // shared
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    const closeEditProfile =() => {
        setLaunch(false)
    }
    const launchEditProfile =() => {
        setLaunch(true)
    }
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView contentContainerStyle={{backgroundColor:'grey'}}>
                <ImageBackground source={Images.coral} style={{padding:20}}>
                    <Image source = {{uri: user.userType === 'pilot'? user.profile : user.logo}} style={{height:80, width:80, borderRadius:40, marginBottom:10}} />
                    <Text style={{color:'white', fontSize:18, paddingBottom:5}}>{user.name}</Text>
                    
                        <View> 
                        <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={launchEditProfile}>
                            <FontAwesome5 name="user-edit" size={12} color="#7DF9FF" />
                            <Text style={{color:'#7DF9FF', paddingLeft:3, position:'relative', bottom:3}}>Edit Profile </Text>
                        </TouchableOpacity>
                        </View>
                        
                </ImageBackground>
            <View style={{flex:1, backgroundColor:'white', paddingTop:10}}>
                <DrawerItemList {...prop} />
            </View>
            </DrawerContentScrollView>
            <View style={{padding:20, borderTopWidth:1, borderTopColor:'#ccc'}}>
                <TouchableOpacity onPress={myCustomShare} style={{paddingVertical:15, flexDirection:'row'}}>
                    <Ionicons name='share-social-outline' size={22}/>
                    <Text style={{fontSize:15, marginLeft:5}}>Tell a Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signout} style={{paddingVertical:15, flexDirection:'row'}}>
                    <Ionicons name='exit-outline' size={22}/>
                    <Text style={{fontSize:15, marginLeft:5}}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {userType === "pilot"? <EditProfileModal
                visible={launch}
                onSave={launchEditProfile}
                onClose={closeEditProfile}
                user={user}
            /> :
            <EditProfileModalComp
                visible={launch}
                onSave={launchEditProfile}
                onClose={closeEditProfile}
                user={user}
            />}
        </View>
                
    )
}
export default CustomDrawer;