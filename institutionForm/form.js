import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import PersonalDetails from './details';
import { db, auth } from '../firebase/databaseConfig'
import {ref, set} from 'firebase/database'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InstitutionForm({navigation}) {
    const [screen, setScreen] = useState(0);
    const [loading, setLoading] = useState(false);
    const FormTitle = [
        "Institution Form",
    ]
    // Institute name
    // Registration number 
    // Designation
    // Name
    // Email
    // Contact number 
    // Website logo
    
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            userId: "",
            name: "",
            email: "",
            foundedin : "",
            logo: "", 
            instituteName: "",
            registrationNum: "",
            contactNum: "",
            designation: "",
            designationIsSet: false,
            registrationNumIIsSet: false,
            contactNumIsSet: false,
            logoIsSet: false,
            instituteIsSet: false,
            nameIsSet:false,
            dateIsSet:false,
            emailIsSet:false,
            userType:"institute",
            type: ""
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <PersonalDetails formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = async() => {
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
           

            if(!formData.logoIsSet) {
                errMsg = "Select Logo"
                formData.logoIsSet = false
            }else if(!formData.instituteIsSet) {
                errMsg = "Invalid Institute Name"
                formData.instituteIsSet = false
            }else if(!formData.nameIsSet) {
                errMsg = "Invalid Name"
                formData.nameIsSet = false
            }else if(!formData.emailIsSet) {
                errMsg = "Invalid Email"
                formData.emailIsSet = false
            }else if(!formData.dateIsSet) {
                errMsg = "Select Founding Date"
                formData.dateIsSet = false
            }else if(!formData.contactNumIsSet) {
                errMsg = "Invalid Contact Number"
                formData.contactNumIsSet = false
            }else if(!formData.registrationNumIIsSet) {
                errMsg = "Invalid Registration Number"
                formData.registrationNumIIsSet = false
            }else validate = true;
           
            if(validate) {
                setErrorMessage("");
                // Final
                var uid = auth.currentUser.uid
                var fcmToken;
                const authStatus = await messaging().requestPermission();
                const enabled = 
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                setLoading(true);
                if(enabled) {
                    messaging().getToken().then(token => {
                        console.log(token);
                        fcmToken = token;
                        var tokenPush = { fcmToken: token, regNum: formData.registrationNum, instName:formData.instituteName, userId:uid};
                        set(ref(db, 'instituteTokens/' + uid), tokenPush).then(async() => {
                            console.log("Token Push Successful", tokenPush);
                        }).catch((error) => {
                            setErrorMessage("Something went wrong, Please try again.");
                            setLoading(false);
                        })

                        var final =  {...formData, userId: uid, fcmToken:fcmToken};
                        set(ref(db, 'users/' + uid), final).then(async() => {
                            // Add loading icon.
                            setLoading(false);
                            navigation.navigate("LoginStack")
                        }).catch((error) => {
                            // Correct this.
                            setErrorMessage(error.toString);
                            setLoading(false);
                        })
                        console.log(final)
                    })
                }else {
                    console.log("Failed token generation");
                    setLoading(false);
                }
            }else {
                setErrorMessage(errMsg);
            }
            
        }
        // set(ref(db, 'users/'), {formData})
        // Screen 2 Vadilaton
        // const userData = {name:formData.name}
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
                        }
                    }}
                >
                    <Text style={{color:'coral', fontSize:20, textAlign:'center'}}>Previous</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={[styles.nextButton]} onPress={() => {createUserInFirebase()}}>
                    <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop:50,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        color: "coral",
        fontWeight: "bold",
        marginVertical: 30
        // fontFamily:
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