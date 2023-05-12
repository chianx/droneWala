import { View, Text, ScrollView, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BasicDetails from './BasicDetails';
import PersonalDetails from './PersonalDetails';
import PilotDetails from './PilotDetails';
import messaging from '@react-native-firebase/messaging';
import { db, auth } from '../firebase/databaseConfig'
import { ref, set } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PilotForm({navigation}) {
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Pilot Signup",
        "Pilot Signup",
        "Pilot Signup"
    ]
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState(
        {
            // BasicDetails
            uid: "",
            profile: "",
            name: "",
            email: "",
            dob: "",
            profileIsSet: false,
            nameIsSet:false,
            dateIsSet:false,
            emailIsSet:false,
            userType:"pilot",

            // PersonalDetails
            address: "",
            city: "",
            state: "",
            pincode: "",
            aadhar: "",
            addressIsSet: false,
            cityIsSet: false,
            stateIsSet: false,
            pinIsSet: false,
            aadhaarIsSet: false,

            // PilotDetails
            dcgaCert: false,
            certNum: "",
            droneSelect: [],
            interests: [],
            experience: "",
            selectedDroneIsSet: false,
            dcgaCertIsSet: false,
            experienceIsSet: false,
            interestsIsSet: false,
            type: ""
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <BasicDetails formData={formData} setFormData={setFormData}/>
        } else if (screen === 1) {
            return <PersonalDetails formData={formData} setFormData={setFormData}/>
        } else {
            return <PilotDetails formData={formData} setFormData={setFormData}/>
        }
    }

    const createUserInFirebase = async() => {
        if(screen === 2) {
            var errMsg = "";
            var validate = false;
            // validate name
            if (formData.dcgaCert && !formData.dcgaCertIsSet) {
                errMsg = "Enter the DCGA Number!"
                formData.dcgaCert = false
                formData.dcgaCertIsSet = false
            }else if(!formData.experienceIsSet) {
                errMsg = "Select Experience";
                formData.experienceIsSet = false;
            }else validate = true;
           
            if(validate && formData.experienceIsSet && (!formData.dcgaCert || (formData.dcgaCert && formData.dcgaCertIsSet))) {

                setErrorMessage("");
                var uid = auth.currentUser.uid;
                var fcmToken;
                const authStatus = await messaging().requestPermission();
                const enabled = 
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                setLoading(true);
                if(enabled) {
                    console.log('AUthorization Status: ', authStatus);
                    messaging().getToken().then(token => {
                        console.log(token);
                        fcmToken = token;
                        
                        // -------------------------------------------------
                        // subscribe starts here
                        var configJobs = {
                            method:'post',
                            url: "https://iid.googleapis.com/iid/v1/" + token +  "/rel/topics/Jobs",
                            headers: {
                              Authorization: 
                                  'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
                                  'Content-Type': 'application/json',
                            },
                        }
                        var configFreelance = {
                            method:'post',
                            url: "https://iid.googleapis.com/iid/v1/" + token +  "/rel/topics/Freelance",
                            headers: {
                              Authorization: 
                                  'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
                                  'Content-Type': 'application/json',
                            },
                        }
                        if (token) {
                            axios(configJobs).then(function (response) {
                              console.log(JSON.stringify(response));
                            }).catch(function (error) {
                                console.log(error);
                            });
                            axios(configFreelance).then(function (response) {
                              console.log(JSON.stringify(response));
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                        // subscribe ends here
                        // ---------------------------------------------------

                        var final = {...formData, userId: uid, fcmToken: fcmToken}

                        set(ref(db, 'users/' + uid), final).then(async () => {
                            // Add loading icon.
                            await AsyncStorage.setItem("userData", JSON.stringify(final)); 
                            setLoading(false);
                            navigation.navigate("LoginStack")
                        }).catch((error) => {
                            console.log(error);
                            setErrorMessage("Something went wrong, Please try again.");
                            setLoading(false);
                        })
                        console.log(final)
                        })
                }else {
                    console.log("Failed token generation");
                    setLoading(false);
                }
            }
            else {
                setErrorMessage(errMsg);
            }
        }
    }
    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
           
            // validate name
            if(!formData.profileIsSet) {
                errMsg = "Profile Photo Not Set"
                formData.profileIsSet = false
            }else if(!formData.nameIsSet)  {
                errMsg = "Name Length too short"
                formData.nameIsSet = false
            }else if(!formData.dateIsSet) {
                errMsg = "DOB Not Set"
                formData.dateIsSet = false
            }else if (!formData.emailIsSet) {
                errMsg = "Invalid Email"
                formData.emailIsSet = false
            }
            else validate = true;
           
            if(validate && formData.nameIsSet && formData.dateIsSet && formData.emailIsSet) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }
            else {
                setErrorMessage(errMsg);
            }
        }else if(screen === 1) {
            var errMsg = "";
            var validate = false;
           
            // validate name
            if(!formData.addressIsSet)  {
                errMsg = "Invalid Address"
                formData.addressIsSet = false
            }else if (!formData.cityIsSet) {
                errMsg = "Invalid City"
                formData.cityIsSet = false
            }else if(!formData.stateIsSet) {
                errMsg = "Invalid State"
                formData.stateIsSet = false
            }else if(!formData.pinIsSet) {
                errMsg = "Invalid PIN Code"
                formData.pinIsSet = false
            }else if(!formData.aadhaarIsSet) {
                errMsg = "Invalid Aadhaar Number"
                formData.aadhaarIsSet = false
            }else validate = true;
           
            if(validate && formData.aadhaarIsSet && formData.addressIsSet && formData.cityIsSet && formData.stateIsSet && formData.pinIsSet) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }
            else {
                setErrorMessage(errMsg);
            }
        }
               
    }
    return (
        <Modal visible={true} animationType="slide">
            <View style={styles.wrapper}>
                <Text style={styles.title}>{FormTitle[screen]}</Text>
            </View>

            <ScrollView>
            <View style={{width:'100%', alignItems:'center', marginBottom:100}}>
                {ScreenDisplay()}

                {errorMessage != "" ? <View style={{marginLeft:20, marginBottom: 20}}><Text style={{color:'red', borderRadius: 8, textAlign: 'center',width: 160, height: 30, }}>{errorMessage}</Text></View> : <></>}
            </View>
            </ScrollView>

            <View style={styles.apply}>
                <TouchableOpacity
                    style={[styles.prevButton]}
                    onPress={() => {
                        if(screen === 0) {
                            navigation.goBack();
                        }else {
                            setScreen((currScreen) => currScreen - 1)
                        }
                    }}
                >
                    <Text style={{color:'coral', fontSize:20, textAlign:'center'}}>Previous</Text>
                </TouchableOpacity>

                {screen === 2?
                <TouchableOpacity style={[styles.nextButton]} onPress={() => {createUserInFirebase()}}>
                    <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={[styles.nextButton]} onPress={callNext}>
                    <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Next</Text>
                </TouchableOpacity>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        color: "coral",
        fontWeight: "bold",
        marginVertical: 30,
    },
    prevButton: {
        backgroundColor:'white',
        justifyContent:'center',
        margin:5,
        height:55,
        flex:1 ,
        borderRadius:10,
        width:'48%',
        borderWidth:2,
        borderColor:'coral',
        elevation:5
    },
    nextButton: {
        backgroundColor:'coral',
        flex:1,
        height:55,
        justifyContent:'center',
        margin:5,
        borderRadius:10,
        width:'48%',
        elevation:5
    },
    apply: {
        paddingVertical: 15,
        alignItems:'center',
        width:'100%',
        borderTopWidth:1, borderTopColor:'grey',
        paddingHorizontal: 10,
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        backgroundColor:'#f0f0f0'
    },
});
