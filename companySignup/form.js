import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BasicDetails from './BasicDetailsComp';
import PersonalDetails from './PersonalDetailsComp';
import CompanyDetails from './CompanyDetails';
import { db, auth } from '../firebase/databaseConfig'
import {ref, set} from 'firebase/database'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Form({navigation}) {
    const [screen, setScreen] = useState(0);
    const [loading, setLoading] = useState(false);
    const FormTitle = [
        "Company Signup",
        "Company Signup",
        "Company Signup"
    ]
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            // PersonalDetails
            userId: "",
            name: "",
            email: "",
            foundedin : "",
            nameIsSet:false,
            dateIsSet:false,
            emailIsSet:false,
            userType:"company",

            // BasicDetails
            CINno: "",
            GSTno: "",
            category: [],
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressIsSet:false,
            cityIsSet:false,
            stateIsSet:false,
            pinIsSet:false,
            cinIsSet:false,
            gstIsSet:false,
            isPilot: false,
            // CompanyDetails
            logo: "", // Fix Later
            companyName: "",
            website: "",
            about: "",
            numPeople: "",
            logoIsSet: false,
            companyIsSet: false,
            websiteIsSet : false,
            aboutIsSet: false,
            numPeopleIsSet: false,
            type: ""
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <PersonalDetails formData={formData} setFormData={setFormData}/>
        } else if (screen === 1) {
            return <CompanyDetails formData={formData} setFormData={setFormData}/>
        } else {
            return <BasicDetails formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = async() => {
        if(screen === 2) {
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
            }else validate = true;
           
            if(validate && formData.addressIsSet && formData.cityIsSet && formData.stateIsSet && formData.pinIsSet) {
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
                        var tokenPush = { fcmToken: token, category: formData.category, name:formData.companyName, city:formData.city, state:formData.state, userId:uid};
                        set(ref(db, 'companyTokens/' + uid), tokenPush).then(async() => {
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
    }

    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
           
            // validate name
            if(!formData.nameIsSet)  {
                errMsg = "Name Length too short"
                formData.nameIsSet = false
            }else if (!formData.emailIsSet) {
                errMsg = "Invalid Email"
                formData.emailIsSet = false
            }else if(!formData.dateIsSet) {
                errMsg = "Date Not Set"
                formData.dateIsSet = false
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
            if (!formData.logoIsSet) {
                errMsg = "Select Logo"
                formData.logoIsSet = false
            }else if(!formData.companyIsSet) {
                errMsg = "Invalid Company Name"
                formData.companyIsSet = false
            }else if(!formData.websiteIsSet)  {
                errMsg = "Invalid Website, Try including https"
                formData.websiteIsSet = false
            }else if (!formData.aboutIsSet) {
                errMsg = "Invalid About"
                formData.aboutIsSet = false
            }else if (!formData.numPeopleIsSet) {
                errMsg = "Select Number of People"
                formData.aboutIsSet = false
            }
            else validate = true;
           
            if(validate && formData.logoIsSet && formData.companyIsSet && formData.websiteIsSet && formData.aboutIsSet && formData.numPeopleIsSet) {
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